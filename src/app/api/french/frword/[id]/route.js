import { NextResponse } from 'next/server'
import Frword from '../../../../../model/Frword'
import connectToDatabase from '../../../../../lib/db'
import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '../../../../../lib/verifyToken'
import User from '../../../../../model/User'

// Configure Cloudinary
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
export async function PUT(req, { params }) {
  const auth = await verifyToken(req)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  await connectToDatabase()
  const body = await req.json()
  const { word, tags, summary, userId, image, note, autoGenerateImage, autoGenerateSummary, language = 'french' } = body
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
    let promptTemplate = ''

    const user = await User.findById(userId).select('customPrompts')
    if (user?.customPrompts?.[language]?.trim()) {
      promptTemplate = user.customPrompts[language].trim()
    }
    if (!promptTemplate) {
      promptTemplate = `
Générez une synthèse détaillée pour le mot {{word}} dans le format structuré suivant :
1. **Utilisation et Fréquence**:
   - Expliquez à quelle fréquence le mot est utilisé dans la langue et dans quels contextes il est couramment employé. Fournissez une brève description.

2. **Mnémoniques**:
   - Fournissez deux mnémoniques créatifs pour aider à mémoriser le mot. Ceux-ci peuvent inclure des associations phonétiques, des histoires visuelles ou d'autres aides-mémoire.

3. **Utilisations Principales**:
   - Listez les principaux contextes ou scénarios où le mot est utilisé. Pour chaque contexte :
     - Donnez un titre au contexte.
     - Incluez 2-3 phrases d'exemple dans la langue (sans traduction).

4. **Synonymes**:
   - Fournissez une liste de synonymes du mot.

5. *Antonymes**:
   - Fournissez une liste d'antonymes du mot.

Assurez-vous que la réponse est bien structurée, claire et formatée de manière à être facile à lire.Toute la réponse doit être rédigée en français, y compris les mnémoniques, les exemples, les synonymes et les antonymes.
Fournissez uniquement du contenu en français, y compris les phrases d'exemple, les synonymes et les antonymes. `
    }
    let prompt = promptTemplate.trim()
    if (!prompt.includes('{{word}}')) {
      prompt += `\n\nThe word to analyze is: ${word}`
    } else {
      prompt = prompt.replace(/{{word}}/g, word)
    }
    const claudeApiKey = process.env.CLAUDE_API_KEY
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 120000)
    try {
      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': claudeApiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 1500,
          messages: [
            {
              role: 'user',
              content: [{ type: 'text', text: prompt }],
            },
          ],
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
    const updatedWord = await Frword.findByIdAndUpdate(
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

export async function GET(req, { params }) {
  const auth = await verifyToken(req)

  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectToDatabase()

    const { id } = params // Get the ID from the route parameters

    // Find the word by ID
    const word = await Frword.findById(id)

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
    const deletedWord = await Frword.findByIdAndDelete(id)

    if (!deletedWord) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Word deleted successfully!' }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
