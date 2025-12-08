import { NextResponse } from 'next/server'
import connectToDatabase from '../../../../lib/db'
import Enword from '../../../../model/Enword'
import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '../../../../lib/verifyToken'
import User from '../../../../model/User'
import { Agent } from 'http'

cloudinary.config({
  cloud_name: 'dekdaj81k',
  api_key: '359192434457515',
  api_secret: 'gXyA-twPBooq8PYw8OneARMe3EI',
})

// Ollama configuration
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://82.165.170.105:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2:3b'
const OLLAMA_API_KEY = 'LLAMA_API_8c1e7d27f2a441b6a2e4e3fa9e9bc8cd'

// Create an HTTP agent with connection pooling and keep-alive
const httpAgent = new Agent({
  keepAlive: true,
  keepAliveMsecs: 60000, // Increased to 60 seconds
  maxSockets: 5, // Reduced for better connection management
  maxFreeSockets: 2,
  timeout: 120000, // 2 minutes
  freeSocketTimeout: 60000, // Keep sockets alive longer
})

// Keep track of requests to implement basic rate limiting
let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 100 // 100ms minimum between requests

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

    // Basic rate limiting
    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTime
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await new Promise((resolve) => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest))
    }
    lastRequestTime = Date.now()

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 90000) // 90 seconds timeout

    try {
      console.log('🌐 Making request to Ollama for summary generation...')

      // Retry wrapper with exponential backoff to handle transient timeouts or busy models
      const maxAttempts = 3
      const baseDelay = 500 // ms

      const callOllamaWithRetries = async () => {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          const controllerAttempt = new AbortController()
          const attemptTimeout = setTimeout(() => controllerAttempt.abort(), 180000) // 3 minutes per attempt

          const headersAttempt = {
            'Content-Type': 'application/json',
            'User-Agent': 'Ollama-Proxy/1.0',
            ...(process.env.OLLAMA_API_KEY || OLLAMA_API_KEY ? { Authorization: `Bearer ${process.env.OLLAMA_API_KEY || OLLAMA_API_KEY}` } : {}),
          }

          try {
            const start = Date.now()
            const res = await fetch(`${OLLAMA_URL}/api/generate`, {
              method: 'POST',
              headers: headersAttempt,
              body: JSON.stringify({
                model: OLLAMA_MODEL,
                prompt,
                stream: false,
                options: { num_predict: 2048, temperature: 0.7, top_p: 0.9, repeat_penalty: 1.1, num_ctx: 4096 },
              }),
              agent: httpAgent,
              signal: controllerAttempt.signal,
            })

            const elapsed = Date.now() - start
            clearTimeout(attemptTimeout)

            const text = await res.text().catch((e) => {
              console.warn(`Failed to read response text (attempt ${attempt}):`, e)
              return ''
            })

            console.log(`Ollama attempt ${attempt} status=${res.status} time=${elapsed}ms`)

            if (!res.ok) {
              console.error('Ollama returned error:', res.status, res.statusText, text)
              // For 5xx errors, retry; for 4xx, do not retry
              if (res.status >= 500 && attempt < maxAttempts) {
                const delay = baseDelay * Math.pow(2, attempt - 1)
                await new Promise((r) => setTimeout(r, delay))
                continue
              }
              return generatedSummary
            }

            // Try JSON parse, otherwise return raw text
            try {
              const parsed = JSON.parse(text)
              const extracted =
                parsed?.response ||
                parsed?.text ||
                (Array.isArray(parsed?.choices) && (parsed.choices[0]?.text || parsed.choices[0]?.message?.content)) ||
                (typeof parsed?.data === 'string' && parsed.data) ||
                ''
              return (extracted || text || generatedSummary).trim()
            } catch (jsonErr) {
              // Not JSON - likely HTML/text
              return (text || generatedSummary).trim()
            }
          } catch (errAttempt) {
            clearTimeout(attemptTimeout)
            if (errAttempt.name === 'AbortError') {
              console.warn(`Ollama attempt ${attempt} aborted (timeout)`)
            } else {
              console.error(`Ollama attempt ${attempt} failed:`, errAttempt)
            }

            if (attempt < maxAttempts) {
              const delay = baseDelay * Math.pow(2, attempt - 1)
              console.log(`Retrying Ollama in ${delay}ms (attempt ${attempt + 1}/${maxAttempts})`)
              await new Promise((r) => setTimeout(r, delay))
              continue
            }

            // exhausted attempts
            return generatedSummary
          }
        }
        return generatedSummary
      }

      // Execute the retry wrapper
      const ollamaFinal = await callOllamaWithRetries()
      return ollamaFinal
    } catch (err) {
      clearTimeout(timeout)
      if (err.name === 'AbortError') {
        console.error('Ollama API timeout')
      } else {
        console.error('Ollama API error:', err)
      }
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

    const newWord = new Enword({
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

    const words = await Enword.find(query)

    return NextResponse.json({ success: true, words }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
