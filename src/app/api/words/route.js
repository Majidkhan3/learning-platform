import { NextResponse } from 'next/server'
import connectToDatabase from '../../../lib/db'
import Word from '../../../model/Word'
import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '../../../lib/verifyToken'
import User from '../../../model/User';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dzzcfpydw',
  api_key: '871199521185426',
  api_secret: 't6lX7K4UCNYa3pV3nv-BbPmGLjc',
})

export async function POST(req) {
  const auth = await verifyToken(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await req.json();
    const {
      word,
      tags,
      summary,
      userId,
      image,
      note,
      autoGenerateImage,
      autoGenerateSummary,
      language = 'spanish', // ✅ pass from frontend
    } = body;

    if (!word || !userId) {
      return NextResponse.json({ error: "The 'word' and 'userId' parameters are required." }, { status: 400 });
    }

    const summaryString = typeof summary === 'object' ? JSON.stringify(summary) : summary;
    let generatedSummary = summaryString || '';
    let updatedImage = image || ''; // ✅ Declare updatedImage before using it


    // ✅ Auto-generate Summary
    if (autoGenerateSummary) {
      let promptTemplate = '';

      // ✅ Fetch user custom prompt
      const user = await User.findById(userId).select('customPrompts');
      console.log('User Custom Prompts:', user?.customPrompts, 'Language:', language);
      if (user?.customPrompts?.[language]?.trim()) {
        promptTemplate = user.customPrompts[language].trim();
      }

      // ✅ Fallback Prompt
      if (!promptTemplate) {
        promptTemplate = `
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
    
   Asegúrate de que la respuesta esté bien estructurada, sea clara y esté formateada de manera que sea fácil de leer.
`;
      }

      // ✅ Step 2: Ensure the word is always included
      let prompt = promptTemplate.trim();

      if (!prompt.includes('{{word}}')) {
        prompt += `\n\nThe word to analyze is: ${word}`;
      } else {
        prompt = prompt.replace(/{{word}}/g, word);
      }
      const claudeApiKey = process.env.CLAUDE_API_KEY;

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
      });

      if (claudeResponse.ok) {
        const claudeResult = await claudeResponse.json();
        generatedSummary =
          claudeResult?.content?.[0]?.text?.trim() ||
          claudeResult?.completion?.trim() ||
          generatedSummary;
      }
    }

    // ✅ Handle Image Generation (unchanged from your code)
    if (autoGenerateImage) {
          console.log('[DEBUG] Auto-generating image for word:', word);
    
          const openAiApiKey = process.env.OPENAI_API_KEY;
          if (!openAiApiKey) {
            return NextResponse.json({ error: 'OpenAI API key is missing in environment variables.' }, { status: 500 });
          }
    const cleanWord = word.replace(/<[^>]*>|[*_~`]/g, '').trim();
          try {
            const openAiResponse = await fetch('https://api.openai.com/v1/images/generations', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${openAiApiKey}`,
              },
              body: JSON.stringify({
                model: 'dall-e-3',
                 prompt: `A realistic or artistic image illustrating the meaning of the word "${cleanWord}". Do not include any text in the image.`,

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
          } catch (err) {
            console.error('[ERROR] OpenAI request failed:', err);
          }
        }

    // ✅ Save Word
    const newWord = new Word({
      word,
      note,
      tags,
      summary: generatedSummary,
      userId,
      image: updatedImage,
    });

    await newWord.save();

    return NextResponse.json({ success: true, message: 'Word saved successfully!', word: newWord }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
