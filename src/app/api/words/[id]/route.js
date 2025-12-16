import { NextResponse } from 'next/server'
import connectToDatabase from '../../../../lib/db'
import Word from '../../../../model/Word'
import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '../../../../lib/verifyToken'
import User from '../../../../model/User'
import { Mistral } from '@mistralai/mistralai'

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dekdaj81k',
  api_key: '359192434457515',
  api_secret: 'gXyA-twPBooq8PYw8OneARMe3EI',
})

// Helper: upload base64 image to Cloudinary
async function uploadBase64ToCloudinary(base64String) {
  try {
    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'word-images',
      resource_type: 'image',
    })
    return result.secure_url
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}

// Helper: check if base64
function isBase64Image(str) {
  return typeof str === 'string' && str.startsWith('data:image/')
}

// Mistral Setup
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY
const MISTRAL_MODEL = process.env.MISTRAL_MODEL || 'mistral-medium-latest'

let mistralClient = null
if (MISTRAL_API_KEY) {
  try {
    mistralClient = new Mistral({ apiKey: MISTRAL_API_KEY })
    console.log(`Mistral client initialized (model: ${MISTRAL_MODEL})`)
  } catch (e) {
    console.warn('Failed to initialize Mistral client:', e?.message || e)
    mistralClient = null
  }
} else {
  console.warn('MISTRAL_API_KEY missing — summary generation disabled')
}
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
    return NextResponse.json({ error: "'word' and 'userId' are required." }, { status: 400 })
  }

  const summaryString = typeof summary === 'object' ? JSON.stringify(summary) : summary
  let generatedSummary = summaryString || ''
  const userImagePromise = (async () => {
    if (!image || autoGenerateImage) return ''

    if (isBase64Image(image)) {
      try {
        return await uploadBase64ToCloudinary(image)
      } catch {
        return image
      }
    }
    return image
  })()
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

    const prompt = promptTemplate.includes('{{word}}') ? promptTemplate.replace(/{{word}}/g, word) : `${promptTemplate}\n\nWord: ${word}`

    if (!mistralClient) return generatedSummary

    // Mistral retry logic (same as POST)
    async function callMistralWithRetries(promptText, max = 3) {
      let attempt = 0
      while (attempt < max) {
        try {
          return await mistralClient.chat.complete({
            model: MISTRAL_MODEL,
            messages: [{ role: 'user', content: promptText }],
          })
        } catch (err) {
          attempt++
          const status = err?.statusCode || null
          if (attempt >= max || (status && status < 500)) throw err

          const delay = Math.min(2000, 500 * 2 ** attempt) + Math.floor(Math.random() * 100)
          console.warn(`Retry ${attempt}: Mistral error`, err?.message)
          await new Promise((res) => setTimeout(res, delay))
        }
      }
    }

    try {
      const res = await callMistralWithRetries(prompt)
      let text = res?.output?.[0]?.content?.[0]?.text || res?.choices?.[0]?.message?.content || ''

      return text.trim() || generatedSummary
    } catch (err) {
      console.error('Mistral summary error:', err)
      return generatedSummary
    }
  })()
  const aiImagePromise = (async () => {
    if (!autoGenerateImage) return ''

    const openAiApiKey = process.env.OPENAI_API_KEY
    if (!openAiApiKey) return ''

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 60000)

      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiApiKey}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: `Create an image illustrating the word '${word}'.`,
          n: 1,
          size: '1024x1024',
        }),
        signal: controller.signal,
      })

      clearTimeout(timeout)

      const data = await res.json()
      const imageUrl = data?.data?.[0]?.url
      if (!imageUrl) return ''

      try {
        const buffer = Buffer.from(await (await fetch(imageUrl)).arrayBuffer())
        const uploaded = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder: 'word-images' }, (err, result) => (err ? reject(err) : resolve(result))).end(buffer)
        })

        return uploaded.secure_url
      } catch {
        return imageUrl
      }
    } catch (error) {
      console.error('AI image error:', error)
      return ''
    }
  })()

  try {
    const [finalSummary, userImageUrl, aiImageUrl] = await Promise.all([summaryPromise, userImagePromise, aiImagePromise])

    const finalImage = aiImageUrl || userImageUrl || ''

    const updatedWord = await Word.findByIdAndUpdate(
      id,
      {
        word,
        note,
        tags,
        summary: finalSummary,
        userId,
        image: finalImage,
        autoGenerateSummary,
        autoGenerateImage,
      },
      { new: true, runValidators: true },
    )

    if (!updatedWord) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Word updated successfully!',
      word: updatedWord,
    })
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
export async function GET(req, { params }) {
  const auth = await verifyToken(req)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }

  await connectToDatabase()

  const { id } = params
  const word = await Word.findById(id)

  if (!word) {
    return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
  }

  return NextResponse.json({ success: true, word })
}
export async function DELETE(req, { params }) {
  const auth = await verifyToken(req)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }

  await connectToDatabase()

  const deleted = await Word.findByIdAndDelete(params.id)

  if (!deleted) {
    return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
  }

  return NextResponse.json({ success: true, message: 'Word deleted successfully!' })
}
