import { NextResponse } from 'next/server'
import connectToDatabase from '../../../../lib/db'
import Porword from '../../../../model/Porword'
import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '../../../../lib/verifyToken'
import User from '../../../../model/User'
import { Mistral } from '@mistralai/mistralai'

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
  console.warn('MISTRAL_API_KEY not set — Mistral disabled')
}

export async function POST(req) {
  const auth = await verifyToken(req)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  await connectToDatabase()
  const body = await req.json()
  const { word, tags, summary, userId, image, note, autoGenerateImage, autoGenerateSummary, language = 'english' } = body

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

  // Prepare summary generation promise
  const summaryPromise = (async () => {
    if (!autoGenerateSummary) return generatedSummary

    const user = await User.findById(userId).select('customPrompts')
    let promptTemplate =
      user?.customPrompts?.[language]?.trim() ||
      `
Crie uma síntese detalhada para a palavra {{word}} no seguinte formato estruturado:

1. **Uso e Frequência**:
- Explique com que frequência a palavra é utilizada na língua e em que contextos é comummente utilizada. Apresente uma breve descrição.

2. **Mnemónicas**:
- Forneça dois mnemónicos criativos para ajudar a recordar a palavra. Podem incluir associações fonéticas, histórias visuais ou outros recursos de memória.

3. **Principais Utilizações**:
- Enumere os principais contextos ou cenários em que a palavra é utilizada. Para cada contexto:
- Forneça um título para o contexto.
- Inclua 2 a 3 frases de exemplo na língua (sem tradução).

4. **Sinónimos**:
- Forneça uma lista de sinónimos para a palavra.

5. **Antónimos**:
- Forneça uma lista de antónimos para a palavra.

Certifique-se de que a resposta está bem estruturada, clara e formatada de forma a ser de fácil leitura.
`

    let prompt = promptTemplate.includes('{{word}}') ? promptTemplate.replace(/{{word}}/g, word) : `${promptTemplate}\n\nWord: ${word}`

    if (!mistralClient) {
      console.warn('Mistral client not configured — skipping auto-generated summary')
      return generatedSummary
    }

    // Retry helper for transient errors (503/unreachable backend)
    async function callMistralWithRetries(promptText, maxAttempts = 3) {
      let attempt = 0
      while (attempt < maxAttempts) {
        try {
          return await mistralClient.chat.complete({
            model: MISTRAL_MODEL,
            messages: [{ role: 'user', content: promptText }],
          })
        } catch (err) {
          attempt++
          const status = err?.statusCode || err?.status || null
          // If non-retriable (4xx) or out of attempts, rethrow
          if (attempt >= maxAttempts || (status && status < 500)) {
            throw err
          }
          // Exponential backoff with jitter
          const backoff = Math.min(2000, 500 * Math.pow(2, attempt)) + Math.floor(Math.random() * 100)
          console.warn(`Mistral request failed (attempt ${attempt}) status=${status} — retrying in ${backoff}ms`, err?.message || err)
          await new Promise((res) => setTimeout(res, backoff))
        }
      }
      return null
    }

    try {
      const chatResponse = await callMistralWithRetries(prompt)
      if (!chatResponse) return generatedSummary

      // Extract text from Mistral response (robust to different shapes)
      let text = ''
      if (chatResponse?.output?.[0]?.content?.[0]?.text) {
        text = chatResponse.output[0].content[0].text
      } else if (chatResponse?.choices?.[0]?.message?.content) {
        text = chatResponse.choices[0].message.content
      } else if (typeof chatResponse === 'string') {
        text = chatResponse
      } else {
        text = JSON.stringify(chatResponse)
      }

      return text?.trim() || generatedSummary
    } catch (err) {
      console.error('Mistral Error:', err)
      return generatedSummary
    }
  })()

  // Prepare auto-generated image promise
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

    const newWord = new Porword({
      word,
      note,
      tags,
      summary: finalSummary,
      userId,
      image: finalImage,
      autoGenerateSummary,
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
    const rating = searchParams.get('rating')
    const tags = searchParams.get('tags')

    if (!userId) {
      return NextResponse.json({ error: "The 'userId' parameter is required." }, { status: 400 })
    }

    // Build query object
    let query = { userId }

    // Add rating filter if provided (using note field as rating, now including 0)
    if (rating !== null && rating !== undefined) {
      query.note = parseInt(rating)
    }

    // Add tags filter if provided
    if (tags) {
      const tagArray = tags.split(',').map((tag) => tag.trim())
      query.tags = { $in: tagArray }
    }

    const words = await Porword.find(query)

    return NextResponse.json({ success: true, words }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
