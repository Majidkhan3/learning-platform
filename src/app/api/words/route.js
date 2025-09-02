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
      resource_type: 'image'
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
          model: 'claude-opus-4-1-20250805',
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
     const [finalSummary, userImageUrl, aiImageUrl] = await Promise.all([
       summaryPromise, 
       userImagePromise, 
       aiImagePromise
     ])
     
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
