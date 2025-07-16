import { NextResponse } from 'next/server'
import Enword from '../../../../../model/Enword'
import connectToDatabase from '../../../../../lib/db'
import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '../../../../../lib/verifyToken'

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dzzcfpydw',
  api_key: '871199521185426',
  api_secret: 't6lX7K4UCNYa3pV3nv-BbPmGLjc',
})
export async function PUT(req, { params }) {
  const auth = await verifyToken(req);

  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();

    const { word, tags, summary, image, note, autoGenerateImage, autoGenerateSummary } = body;

    if (!word || typeof word !== 'string' || word.trim() === '') {
      return NextResponse.json({ error: "The 'word' parameter is required and must be a valid string." }, { status: 400 });
    }

    let updatedSummary = summary || '';
    let updatedImage = image;

    // ✅ Generate Summary if requested
    if (autoGenerateSummary) {
      console.log('[DEBUG] Auto-generating summary for word:', word);

      const claudeApiKey = process.env.CLAUDE_API_KEY;
      if (!claudeApiKey) {
        return NextResponse.json({ error: 'Claude API key is missing in environment variables.' }, { status: 500 });
      }

      const claudePrompt = `
         Responde exclusivamente en español. No incluyas texto en inglés, ni en los ejemplos ni en los sinónimos o antónimos.
    Generate a detailed synthesis for the word ${word} in the following structured format:

1. **Use and Frequency**:
   - Explain how frequently the word is used in the language and in which contexts it is commonly used. Provide a brief description.

2. **Mnemonics**:
   - Provide two creative mnemonics to help remember the word. These can include phonetic associations, visual stories, or other memory aids.

3. **Main Uses**:
   - List the main contexts or scenarios where the word is used. For each context:
     - Provide a title for the context.
     - Include 2-3 example sentences in the language (without translation).

4. **Synonyms**:
   - Provide a list of synonyms for the word.

5. **Antonyms**:
   - Provide a list of antonyms for the word.

Ensure the response is well-structured, clear, and formatted in a way that is easy to read.`;

      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': claudeApiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 512,
          messages: [{ role: 'user', content: claudePrompt }],
        }),
      });

      if (claudeResponse.ok) {
        const claudeResult = await claudeResponse.json();
        updatedSummary =
          claudeResult?.content?.[0]?.text?.trim() ||
          claudeResult?.completion?.trim() ||
          summary;
      } else {
        console.error('[ERROR] Claude API failed');
      }
    }

    // ✅ Generate Image if requested
    if (autoGenerateImage) {
      console.log('[DEBUG] Auto-generating image for word:', word);
      const openAiApiKey = process.env.OPENAI_API_KEY;
      if (!openAiApiKey) {
        return NextResponse.json({ error: 'OpenAI API key is missing in environment variables.' }, { status: 500 });
      }

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
    }

    // ✅ Update Word in DB
    const updatedWord = await Enword.findByIdAndUpdate(
      id,
      { word, tags, summary: updatedSummary, image: updatedImage, note, autoGenerateImage, autoGenerateSummary },
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

export async function GET(req, { params }) {
  const auth = await verifyToken(req)

  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectToDatabase()

    const { id } = params // Get the ID from the route parameters

    // Find the word by ID
    const word = await Enword.findById(id)

    if (!word) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, word }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
export async function DELETE(req, { params }) {
  const auth = await verifyToken(req)

  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectToDatabase()

    const { id } = params // Get the ID from the route parameters

    // Find the word by ID and delete it
    const deletedWord = await Enword.findByIdAndDelete(id)

    if (!deletedWord) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Word deleted successfully!' }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
