import { NextResponse } from 'next/server';
import Enword from '../../../../../model/Enword';
import User from '../../../../../model/User'; // ✅ Import User for custom prompt
import connectToDatabase from '../../../../../lib/db';
import { v2 as cloudinary } from 'cloudinary';
import { verifyToken } from '../../../../../lib/verifyToken';

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: 'dzzcfpydw',
  api_key: '871199521185426',
  api_secret: 't6lX7K4UCNYa3pV3nv-BbPmGLjc',
});

export async function PUT(req, { params }) {
  const auth = await verifyToken(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();

    const {
      word,
      tags,
      summary,
      image,
      note,
      autoGenerateImage,
      autoGenerateSummary,
      userId, // fallback if needed
    } = body;

    if (!word || typeof word !== 'string' || word.trim() === '') {
      return NextResponse.json({ error: "The 'word' parameter is required and must be a valid string." }, { status: 400 });
    }

    let updatedSummary = summary || '';
    let updatedImage = image;

    // ✅ Auto-generate Summary if requested
    if (autoGenerateSummary) {
      console.log('[DEBUG] Auto-generating summary for word:', word);

      const claudeApiKey = process.env.CLAUDE_API_KEY;
      if (!claudeApiKey) {
        return NextResponse.json({ error: 'Claude API key is missing in environment variables.' }, { status: 500 });
      }

      // ✅ Fetch user’s custom prompt (if exists)
      const userIdToUse = auth.userId || userId;
      let promptTemplate = '';

      try {
        if (userIdToUse) {
          const user = await User.findById(auth.userId).select('customPrompts');
          if (user?.customPrompts?.english?.trim()) {
        promptTemplate = user.customPrompts.english.trim();
      }
        }
      } catch (err) {
        console.error('[ERROR] Failed to fetch user prompt:', err);
      }

      // ✅ Fallback English prompt if user has no custom prompt
      if (!promptTemplate) {
        promptTemplate = `
Generate a detailed synthesis for the word {{word}} in the following structured format:

1. **Use and Frequency**:
   - Explain how frequently the word is used and in which contexts it is commonly used.

2. **Mnemonics**:
   - Provide two creative mnemonics to help remember the word.

3. **Main Uses**:
   - List the main contexts or scenarios where the word is used. For each context:
     - Provide a title for the context.
     - Include 2-3 example sentences (no translation).

4. **Synonyms**:
   - Provide a list of synonyms.

5. **Antonyms**:
   - Provide a list of antonyms.

Ensure the response is well-structured, clear, and formatted for easy reading.
        `;
      }

        // ✅ Step 2: Ensure the word is always included
  let prompt = promptTemplate.trim();

  if (!prompt.includes('{{word}}')) {
    prompt += `\n\nThe word to analyze is: ${word}`;
  } else {
    prompt = prompt.replace(/{{word}}/g, word);
  }
      try {
        const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': claudeApiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2000,
            messages: [{ role: 'user', content: prompt }],
          }),
        });

        if (claudeResponse.ok) {
          const claudeResult = await claudeResponse.json();
          updatedSummary =
            claudeResult?.content?.[0]?.text?.trim() ||
            claudeResult?.completion?.trim() ||
            updatedSummary;
        } else {
          console.error('[ERROR] Claude API failed');
        }
      } catch (err) {
        console.error('[ERROR] Claude API request error:', err);
      }
    }

    // ✅ Auto-generate Image if requested
    if (autoGenerateImage) {
      console.log('[DEBUG] Auto-generating image for word:', word);

      const openAiApiKey = process.env.OPENAI_API_KEY;
      if (!openAiApiKey) {
        return NextResponse.json({ error: 'OpenAI API key is missing in environment variables.' }, { status: 500 });
      }

      try {
        const openAiResponse = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: `Create an image that best illustrates the word '${word}' based on its common usage.`,
            n: 1,
            size: '1024x1024',
          }),
        });

        if (openAiResponse.ok) {
          const openAiResult = await openAiResponse.json();
          if (openAiResult?.data?.[0]?.url) {
            const generatedImageUrl = openAiResult.data[0].url;

            try {
              const imageResponse = await fetch(generatedImageUrl);
              const arrayBuffer = await imageResponse.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);

              const cloudinaryResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                  { folder: 'word-images' },
                  (error, result) => (error ? reject(error) : resolve(result))
                );
                uploadStream.end(buffer);
              });

              updatedImage = cloudinaryResult.secure_url;
            } catch {
              updatedImage = generatedImageUrl;
            }
          }
        }
      } catch (err) {
        console.error('[ERROR] OpenAI request failed:', err);
      }
    }

    // ✅ Update Word in DB
    const updatedWord = await Enword.findByIdAndUpdate(
      id,
      {
        word,
        tags,
        summary: updatedSummary,
        image: updatedImage,
        note,
        autoGenerateImage,
        autoGenerateSummary,
      },
      { new: true }
    );

    if (!updatedWord) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Word updated successfully!', word: updatedWord }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ✅ GET Word by ID
export async function GET(req, { params }) {
  const auth = await verifyToken(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { id } = params;
    const word = await Enword.findById(id);

    if (!word) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, word }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ✅ DELETE Word by ID
export async function DELETE(req, { params }) {
  const auth = await verifyToken(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { id } = params;
    const deletedWord = await Enword.findByIdAndDelete(id);

    if (!deletedWord) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Word deleted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
