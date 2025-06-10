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
  const auth = await verifyToken(req)

  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectToDatabase()

    const { id } = params // Get the ID from the route parameters
    const body = await req.json() // Parse the request body

    // Validate the request body
    const { word, tags, summary, image, note, autoGenerateImage } = body
    if (!word || typeof word !== 'string' || word.trim() === '') {
      return NextResponse.json({ error: "The 'word' parameter is required and must be a valid string." }, { status: 400 })
    }

    let updatedImage = image // Default to the provided image

    // If autoGenerateImage is true, generate a new image
    if (autoGenerateImage) {
      console.log('[DEBUG] Auto-generating image for word:', word)

      const openAiApiKey = process.env.OPENAI_API_KEY
      if (!openAiApiKey) {
        return NextResponse.json({ error: 'OpenAI API key is missing in environment variables.' }, { status: 500 })
      }

      const openAiHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAiApiKey}`,
      }

      const openAiData = {
        model: 'dall-e-3',
        prompt: `Create an image that best illustrates the word '${word}' based on its common usage.`,
        n: 1,
        size: '1024x1024',
      }

      const openAiResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: openAiHeaders,
        body: JSON.stringify(openAiData),
      })

      if (openAiResponse.ok) {
        const openAiResult = await openAiResponse.json()
        if (openAiResult?.data?.[0]?.url) {
          const generatedImageUrl = openAiResult.data[0].url

          try {
            // Upload to Cloudinary
            console.log('[DEBUG] Uploading image to Cloudinary')

            const imageResponse = await fetch(generatedImageUrl)
            const arrayBuffer = await imageResponse.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            const cloudinaryResult = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream({ folder: 'word-images' }, (error, result) => {
                if (error) {
                  console.error('[ERROR] Cloudinary upload error:', error)
                  reject(error)
                } else {
                  resolve(result)
                }
              })
              uploadStream.end(buffer)
            })

            updatedImage = cloudinaryResult.secure_url // Save the Cloudinary URL
            console.log('[DEBUG] Cloudinary upload successful:', updatedImage)
          } catch (uploadError) {
            console.error('[ERROR] Failed to upload image to Cloudinary:', uploadError)
            updatedImage = generatedImageUrl // Fall back to OpenAI URL
          }
        }
      } else {
        const errorDetails = await openAiResponse.json()
        console.error(`[ERROR] OpenAI API error: ${openAiResponse.status}, ${JSON.stringify(errorDetails)}`)
        return NextResponse.json({ error: `OpenAI API error: ${errorDetails.error.message}` }, { status: openAiResponse.status })
      }
    }

    // Find the word by ID and update it
    const updatedWord = await Enword.findByIdAndUpdate(
      id,
      { word, tags, summary, image: updatedImage, note, autoGenerateImage },
      { new: true }, // Return the updated document
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
