import { NextResponse } from 'next/server'
import connectToDatabase from '../../../../lib/db'
import Porword from '../../../../model/Porword'
import { v2 as cloudinary } from 'cloudinary'
import { verifyToken } from '../../../../lib/verifyToken'
import User from '../../../../model/User';


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
      language = 'portuguese', // ✅ pass from frontend
    } = body;

    if (!word || !userId) {
      return NextResponse.json({ error: "The 'word' and 'userId' parameters are required." }, { status: 400 });
    }

    const summaryString = typeof summary === 'object' ? JSON.stringify(summary) : summary;
    let generatedSummary = summaryString || '';

    // ✅ Auto-generate Summary
    if (autoGenerateSummary) {
      let promptTemplate = '';

      // ✅ Fetch user custom prompt
      const user = await User.findById(userId).select('customPrompts');
      if (user?.customPrompts?.[language]?.trim()) {
        promptTemplate = user.customPrompts[language].trim();
      }

      // ✅ Fallback Prompt
      if (!promptTemplate) {
        promptTemplate = `
     Gere uma síntese detalhada para a palavra {{word}} no seguinte formato estruturado e responda inteiramente em português:

1. **Uso e Frequência:**:
   - Explique com que frequência a palavra é usada na língua portuguesa e em quais contextos ela é mais comum. Forneça uma breve descrição.

2. **Mnemônicos:**:
   - Forneça dois mnemônicos criativos para ajudar a lembrar a palavra. Estes podem incluir associações fonéticas, histórias visuais ou outros recursos de memória.

3. **Principais Usos:**:
   - Liste os principais contextos ou cenários em que a palavra é usada. Para cada contexto:
     - Dê um título para o contexto.
     - Inclua 2 a 3 frases de exemplo (em português, sem tradução).

4. **Sinônimos:**:
   - Forneça uma lista de sinônimos da palavra.

5. **Antônimos:**:
   - Forneça uma lista de antônimos da palavra.
   
Toda a resposta deve ser redigida em português claro e bem estruturado, com boa formatação para facilitar a leitura.
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
          max_tokens: 512,
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

    // ✅ Save Word
    const newWord = new Porword({
      word,
      note,
      tags,
      summary: generatedSummary,
      userId,
      image,
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

    const words = await Porword.find({ userId })

    return NextResponse.json({ success: true, words }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
