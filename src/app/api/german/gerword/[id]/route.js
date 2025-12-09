import { NextResponse } from 'next/server'
import Gerword from '../../../../../model/Gerword'
import User from '../../../../../model/User' // ✅ Import User for custom prompt
import connectToDatabase from '../../../../../lib/db'
import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '../../../../../lib/verifyToken'

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: 'dekdaj81k',
  api_key: '359192434457515',
  api_secret: 'gXyA-twPBooq8PYw8OneARMe3EI',
})
// NEW: Helper function to upload base64 image to Cloudinary
async function uploadBase64ToCloudinary(base64String) {
  try {
    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'word-images',
      resource_type: 'image',
    })
    return result.secure_url
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw error
  }
}

// NEW: Helper function to check if string is base64 image
function isBase64Image(str) {
  return typeof str === 'string' && str.startsWith('data:image/')
}

export async function PUT(req, { params }) {
  const auth = await verifyToken(req)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  await connectToDatabase()
  const body = await req.json()
  const { word, tags, summary, userId, image, note, autoGenerateImage, autoGenerateSummary, language = 'German' } = body
  const { id } = params

  if (!word || !userId) {
    return NextResponse.json({ error: "The 'word' and 'userId' parameters are required." }, { status: 400 })
  }

  const summaryString = typeof summary === 'object' ? JSON.stringify(summary) : summary
  let generatedSummary = summaryString || ''
  let updatedImage = image || ''

  const userImagePromise = (async () => {
    if (!image || autoGenerateImage) return ''

    // If it's a base64 image, upload it to Cloudinary
    if (isBase64Image(image)) {
      try {
        return await uploadBase64ToCloudinary(image)
      } catch (error) {
        console.error('Failed to upload user image to Cloudinary:', error)
        // Return the original base64 as fallback
        return image
      }
    }

    // If it's already a URL (shouldn't happen in your case), return as is
    return image
  })()

  // Prepare summary and image generation promises
  const summaryPromise = (async () => {
    if (!autoGenerateSummary) return generatedSummary

    const user = await User.findById(userId).select('customPrompts')
    let promptTemplate =
      user?.customPrompts?.[language]?.trim() ||
      `
Beantworten Sie die Frage ausschließlich auf German. Verwenden Sie keine englischen Texte, weder in den Beispielen noch bei den Synonymen oder Antonymen.

Erstellen Sie eine detaillierte Zusammenfassung zum Wort {{word}} in folgendem Format:

1. **Verwendung und Häufigkeit**:

- Erläutern Sie, wie häufig das Wort in der Sprache verwendet wird und in welchen Kontexten es üblicherweise vorkommt.

2. **Eselsbrücken**:

- Nennen Sie zwei kreative Eselsbrücken, die Ihnen helfen, sich das Wort zu merken.

3. **Hauptverwendungen**:

- Listen Sie die wichtigsten Kontexte oder Situationen auf, in denen das Wort verwendet wird. Geben Sie für jeden Kontext:

- Geben Sie eine Überschrift an.

- Fügen Sie zwei bis drei Beispielsätze in der Sprache hinzu.

4. **Synonyme**:

- Nennen Sie Synonyme für das Wort.

5. **Antonyme**:

- Nennen Sie Antonyme für das Wort.

Achten Sie auf eine gut strukturierte und leicht verständliche Antwort.
`

    let prompt = promptTemplate.includes('{{word}}') ? promptTemplate.replace(/{{word}}/g, word) : `${promptTemplate}\n\nWord: ${word}`

    const apiKey = process.env.GEMINI_API_KEY;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`

      const body = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1500,
          temperature: 0.2,
        },
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        console.error('Gemini API error:', await response.text())
        return generatedSummary
      }

      const result = await response.json()

      // Correct extraction for Gemini 2.5 Flash-Lite (2025)
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || generatedSummary

      return text
    } catch (err) {
      console.error('Gemini Error:', err)
      return generatedSummary
    }
  })()

  const aiImagePromise = (async () => {
    if (!autoGenerateImage) return ''
    const openAiApiKey = process.env.OPENAI_API_KEY
    if (!openAiApiKey) return ''
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 60000)
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
      return ''
    } catch (err) {
      clearTimeout(timeout)
      console.error('[ERROR] OpenAI request failed:', err)
      return ''
    }
  })()

  try {
    const [finalSummary, userImageUrl, aiImageUrl] = await Promise.all([summaryPromise, userImagePromise, aiImagePromise])

    // Use AI-generated image if available, otherwise use user-uploaded image

    const finalImage = aiImageUrl || userImageUrl || ''
    const updatedWord = await Gerword.findByIdAndUpdate(
      id,
      {
        word,
        note,
        tags,
        summary: finalSummary,
        userId,
        image: finalImage,
        autoGenerateSummary, // <-- Add this
        autoGenerateImage,
      },
      { new: true, runValidators: true },
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
  const auth = await verifyToken(req)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const { id } = params
    const word = await Gerword.findById(id)

    if (!word) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, word }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ✅ DELETE Word by ID
export async function DELETE(req, { params }) {
  const auth = await verifyToken(req)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const { id } = params
    const deletedWord = await Gerword.findByIdAndDelete(id)

    if (!deletedWord) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Word deleted successfully!' }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
