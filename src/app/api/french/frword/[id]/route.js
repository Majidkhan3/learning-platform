import { NextResponse } from 'next/server'
import Frword from '../../../../../model/Frword'
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
Générez une synthèse détaillée pour le mot ${word} dans le format structuré suivant :
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
Fournissez uniquement du contenu en français, y compris les phrases d'exemple, les synonymes et les antonymes.`;

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
    const updatedWord = await Frword.findByIdAndUpdate(
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
