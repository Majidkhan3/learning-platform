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
  const auth = await verifyToken(req)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  await connectToDatabase()
  const body = await req.json()
  const { word, tags, summary, userId, image, note, autoGenerateImage, autoGenerateSummary, language = 'spanish' } = body
  const { id } = params

  if (!word || !userId) {
    return NextResponse.json({ error: "The 'word' and 'userId' parameters are required." }, { status: 400 })
  }

  const summaryString = typeof summary === 'object' ? JSON.stringify(summary) : summary
  let generatedSummary = summaryString || ''
  let updatedImage = image || ''

  // Prepare summary and image generation promises
  const summaryPromise = (async () => {
    if (!autoGenerateSummary) return generatedSummary
    let promptTemplate = ''
    const user = await User.findById(userId).select('customPrompts')
    if (user?.customPrompts?.[language]?.trim()) {
      promptTemplate = user.customPrompts[language].trim()
    }
    if (!promptTemplate) {
      promptTemplate = `
Generate a detailed synthesis for the word {{word}} in the following structured format:

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

Ensure the response is well-structured, clear, and formatted in a way that is easy to read.
`
    }
    let prompt = promptTemplate.trim()
    if (!prompt.includes('{{word}}')) {
      prompt += `\n\nThe word to analyze is: ${word}`
    } else {
      prompt = prompt.replace(/{{word}}/g, word)
    }
    const claudeApiKey = process.env.CLAUDE_API_KEY
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 40000)
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
        signal: controller.signal,
      })
      clearTimeout(timeout)
      if (claudeResponse.ok) {
        const claudeResult = await claudeResponse.json()
        return claudeResult?.content?.[0]?.text?.trim() || claudeResult?.completion?.trim() || generatedSummary
      }
      return generatedSummary
    } catch (err) {
      clearTimeout(timeout)
      console.error('Claude API timeout or error:', err)
      return generatedSummary || 'No summary available.'
    }
  })()

  const imagePromise = (async () => {
    if (!autoGenerateImage) return updatedImage
    const openAiApiKey = process.env.OPENAI_API_KEY
    if (!openAiApiKey) return updatedImage
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20000)
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
        signal: controller.signal,
      })
      clearTimeout(timeout)
      if (openAiResponse.ok) {
        const openAiResult = await openAiResponse.json()
        if (openAiResult?.data?.[0]?.url) {
          const generatedImageUrl = openAiResult.data[0].url
          try {
            const imageResponse = await fetch(generatedImageUrl)
            const arrayBuffer = await imageResponse.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const cloudinaryResult = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream({ folder: 'word-images' }, (error, result) =>
                error ? reject(error) : resolve(result),
              )
              uploadStream.end(buffer)
            })
            return cloudinaryResult.secure_url
          } catch {
            return generatedImageUrl
          }
        }
      }
      return updatedImage
    } catch (err) {
      clearTimeout(timeout)
      console.error('[ERROR] OpenAI request failed:', err)
      return updatedImage
    }
  })()

  try {
    const [finalSummary, finalImage] = await Promise.all([summaryPromise, imagePromise])
    const updatedWord = await Enword.findByIdAndUpdate(
      id,
      {
        word,
        note,
        tags,
        summary: finalSummary,
        userId,
        image: finalImage,
      },
      { new: true, runValidators: true }
    )

    if (!updatedWord) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Word updated successfully!', word: updatedWord }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
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
