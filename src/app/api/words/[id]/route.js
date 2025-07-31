import { NextResponse } from 'next/server';
import Word from '../../../../model/Word';
import User from '../../../../model/User'; // ✅ Import User for custom prompt
import connectToDatabase from '../../../../lib/db';
import { v2 as cloudinary } from 'cloudinary';
import { verifyToken } from '../../../../lib/verifyToken';

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: 'dzzcfpydw',
  api_key: '871199521185426',
  api_secret: 't6lX7K4UCNYa3pV3nv-BbPmGLjc',
});

export async function PUT(req, { params }) {
  const auth = await verifyToken(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();

    const {
      word,
      tags,
      summary,
      image,
      note,
      autoGenerateImage,
      autoGenerateSummary,
      userId, // fallback if needed
    } = body;

    if (!word || typeof word !== 'string' || word.trim() === '') {
      return NextResponse.json({ error: "The 'word' parameter is required and must be a valid string." }, { status: 400 });
    }

    let updatedSummary = summary || '';
    let updatedImage = image;

    // ✅ Auto-generate Summary if requested
    if (autoGenerateSummary) {
      console.log('[DEBUG] Auto-generating summary for word:', word);

      const claudeApiKey = process.env.CLAUDE_API_KEY;
      if (!claudeApiKey) {
        return NextResponse.json({ error: 'Claude API key is missing in environment variables.' }, { status: 500 });
      }

      // ✅ Fetch user’s custom prompt (if exists)
      const userIdToUse = auth.userId || userId;
      let promptTemplate = '';

      try {
        if (userIdToUse) {
          const user = await User.findById(auth.userId).select('customPrompts');
          if (user?.customPrompts?.spanish?.trim()) {
        promptTemplate = user.customPrompts.spanish.trim();
      }
        }
      } catch (err) {
        console.error('[ERROR] Failed to fetch user prompt:', err);
      }

      // ✅ Fallback spanish prompt if user has no custom prompt
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

      try {
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
          updatedSummary =
            claudeResult?.content?.[0]?.text?.trim() ||
            claudeResult?.completion?.trim() ||
            updatedSummary;
            console.log('🧠 Generated Summary:', updatedSummary);

        } else {
          console.error('[ERROR] Claude API failed');
        }
      } catch (err) {
        console.error('[ERROR] Claude API request error:', err);
      }
    }

    // ✅ Auto-generate Image if requested
    if (autoGenerateImage) {
      console.log('[DEBUG] Auto-generating image for word:', word);

      const openAiApiKey = process.env.OPENAI_API_KEY;
      if (!openAiApiKey) {
        return NextResponse.json({ error: 'OpenAI API key is missing in environment variables.' }, { status: 500 });
      }

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

    // ✅ Update Word in DB
    const updatedWord = await Word.findByIdAndUpdate(
      id,
      {
        word,
        tags,
        summary: updatedSummary,
        image: updatedImage,
        note,
        autoGenerateImage,
        autoGenerateSummary,
      },
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

// ✅ GET Word by ID
export async function GET(req, { params }) {
  const auth = await verifyToken(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { id } = params;
    const word = await Word.findById(id);

    if (!word) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, word }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ✅ DELETE Word by ID
export async function DELETE(req, { params }) {
  const auth = await verifyToken(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { id } = params;
    const deletedWord = await Word.findByIdAndDelete(id);

    if (!deletedWord) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Word deleted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
