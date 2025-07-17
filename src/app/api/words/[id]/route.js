import { NextResponse } from 'next/server'
import Word from '../../../../model/Word'
import connectToDatabase from '../../../../lib/db'
import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '../../../../lib/verifyToken'

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dzzcfpydw',
  api_key: '871199521185426',
  api_secret: 't6lX7K4UCNYa3pV3nv-BbPmGLjc',
})
// export async function PUT(req, { params }) {
//   const auth = await verifyToken(req)

//   if (!auth.valid) {
//     return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
//   }
//   try {
//     await connectToDatabase()

//     const { id } = params // Get the ID from the route parameters
//     const body = await req.json() // Parse the request body

//     // Validate the request body
//     const { word, tags, summary, image, note, autoGenerateImage } = body
//     if (!word || typeof word !== 'string' || word.trim() === '') {
//       return NextResponse.json({ error: "The 'word' parameter is required and must be a valid string." }, { status: 400 })
//     }

//     let updatedImage = image // Default to the provided image

//     // If autoGenerateImage is true, generate a new image
//     if (autoGenerateImage) {
//       console.log('[DEBUG] Auto-generating image for word:', word)

//       const openAiApiKey = process.env.OPENAI_API_KEY
//       if (!openAiApiKey) {
//         return NextResponse.json({ error: 'OpenAI API key is missing in environment variables.' }, { status: 500 })
//       }

//       const openAiHeaders = {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${openAiApiKey}`,
//       }

//       const openAiData = {
//         model: 'dall-e-3',
//         prompt: `Create an image that best illustrates the word '${word}' based on its common usage.`,
//         n: 1,
//         size: '1024x1024',
//       }

//       const openAiResponse = await fetch('https://api.openai.com/v1/images/generations', {
//         method: 'POST',
//         headers: openAiHeaders,
//         body: JSON.stringify(openAiData),
//       })

//       if (openAiResponse.ok) {
//         const openAiResult = await openAiResponse.json()
//         if (openAiResult?.data?.[0]?.url) {
//           const generatedImageUrl = openAiResult.data[0].url

//           try {
//             // Upload to Cloudinary
//             console.log('[DEBUG] Uploading image to Cloudinary')

//             const imageResponse = await fetch(generatedImageUrl)
//             const arrayBuffer = await imageResponse.arrayBuffer()
//             const buffer = Buffer.from(arrayBuffer)

//             const cloudinaryResult = await new Promise((resolve, reject) => {
//               const uploadStream = cloudinary.uploader.upload_stream({ folder: 'word-images' }, (error, result) => {
//                 if (error) {
//                   console.error('[ERROR] Cloudinary upload error:', error)
//                   reject(error)
//                 } else {
//                   resolve(result)
//                 }
//               })
//               uploadStream.end(buffer)
//             })

//             updatedImage = cloudinaryResult.secure_url // Save the Cloudinary URL
//             console.log('[DEBUG] Cloudinary upload successful:', updatedImage)
//           } catch (uploadError) {
//             console.error('[ERROR] Failed to upload image to Cloudinary:', uploadError)
//             updatedImage = generatedImageUrl // Fall back to OpenAI URL
//           }
//         }
//       } else {
//         const errorDetails = await openAiResponse.json()
//         console.error(`[ERROR] OpenAI API error: ${openAiResponse.status}, ${JSON.stringify(errorDetails)}`)
//         return NextResponse.json({ error: `OpenAI API error: ${errorDetails.error.message}` }, { status: openAiResponse.status })
//       }
//     }

//     // Find the word by ID and update it
//     const updatedWord = await Word.findByIdAndUpdate(
//       id,
//       { word, tags, summary, image: updatedImage, note, autoGenerateImage },
//       { new: true }, // Return the updated document
//     )

//     if (!updatedWord) {
//       return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
//     }

//     return NextResponse.json({ success: true, message: 'Word updated successfully!', word: updatedWord }, { status: 200 })
//   } catch (error) {
//     console.error('Error:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }
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
      Genera una síntesis detallada para la palabra ${word} en el siguiente formato estructurado:
     
1. **Uso y Frecuencia**:
   - Explica con qué frecuencia se utiliza la palabra en el idioma y en qué contextos es comúnmente usada. Proporciona una breve descripción.

2. **Mnemotecnias**:
   - Proporciona dos mnemotecnias creativas para ayudar a recordar la palabra. Estas pueden incluir asociaciones fonéticas, historias visuales u otras ayudas de memoria.

3. **Usos Principales**:
   - Enumera los principales contextos o escenarios en los que se utiliza la palabra. Para cada contexto:
     - Proporciona un título para el contexto.
     - Incluye de 2 a 3 frases de ejemplo en el idioma (sin traducción).

4. **Sinónimos**:
   - Proporciona una lista de sinónimos de la palabra.

5. **Antónimos**:
   - Proporciona una lista de antónimos de la palabra.
    
   Asegúrate de que la respuesta esté bien estructurada, sea clara y esté formateada de manera que sea fácil de leer.`;

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
    const updatedWord = await Word.findByIdAndUpdate(
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
    const word = await Word.findById(id)

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
    const deletedWord = await Word.findByIdAndDelete(id)

    if (!deletedWord) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Word deleted successfully!' }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
