import { NextResponse } from 'next/server'
import connectToDatabase from '../../../lib/db'
import Word from '../../../model/Word'
import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '../../../lib/verifyToken'
import User from '../../../model/User'

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: 'dekdaj81k',
  api_key: '359192434457515',
  api_secret: 'gXyA-twPBooq8PYw8OneARMe3EI',
})
// Helper function to upload base64 image to Cloudinary
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

// Helper function to check if string is base64 image
function isBase64Image(str) {
  return typeof str === 'string' && str.startsWith('data:image/')
}

export async function POST(req) {
  const auth = await verifyToken(req)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  await connectToDatabase()
  const body = await req.json()
  const { word, tags, summary, userId, image, note, autoGenerateImage, autoGenerateSummary, language = 'spanish' } = body

  if (!word || !userId) {
    return NextResponse.json({ error: "The 'word' and 'userId' parameters are required." }, { status: 400 })
  }

  const summaryString = typeof summary === 'object' ? JSON.stringify(summary) : summary
  let generatedSummary = summaryString || ''
  let updatedImage = image || ''
  // Handle user-uploaded base64 image
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
Responde exclusivamente en español. No incluyas texto en inglés, ni en los ejemplos ni en los sinónimos o antónimos.
Genera una síntesis detallada para la palabra {{word}} en el siguiente formato estructurado:

1. **Uso y Frecuencia**:
   - Explica con qué frecuencia se utiliza la palabra en el idioma y en qué contextos es comúnmente usada.

2. **Mnemotecnias**:
   - Proporciona dos mnemotecnias creativas para ayudar a recordar la palabra.

3. **Usos Principales**:
   - Enumera los principales contextos o escenarios en los que se utiliza la palabra. Para cada contexto:
     - Proporciona un título para el contexto.
     - Incluye de 2 a 3 frases de ejemplo en el idioma.

4. **Sinónimos**:
   - Proporciona una lista de sinónimos de la palabra.

5. **Antónimos**:
   - Proporciona una lista de antónimos de la palabra.

Asegúrate de que la respuesta esté bien estructurada y fácil de leer.
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

    const newWord = new Word({
      word,
      note,
      tags,
      summary: finalSummary,
      userId,
      image: finalImage,
      autoGenerateSummary, // <-- Add this
      autoGenerateImage,
    })
    await newWord.save()
    return NextResponse.json({ success: true, message: 'Word saved successfully!', word: newWord }, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req) {
  const auth = await verifyToken(req)

  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: "The 'userId' parameter is required." }, { status: 400 })
    }

    const words = await Word.find({ userId })

    return NextResponse.json({ success: true, words }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
