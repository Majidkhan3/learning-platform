import { NextResponse } from 'next/server'
// import pdfParse from 'pdf-parse'
import Pordialogue from '../../../../../model/Pordialogue'
import connectToDatabase from '../../../../../lib/db'
import { verifyToken } from '../../../../../lib/verifyToken'

export async function POST(req) {
  const auth = await verifyToken(req)

  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectToDatabase()

    const body = await req.json()
    const { text: extractedText, userId } = body

    if (!extractedText || typeof extractedText !== 'string' || !extractedText.trim()) {
      return NextResponse.json({ error: 'Text is required and must be a non-empty string' }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Send extracted text to Claude API to generate dialogues
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLAUDE_API_KEY || '',
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: 'Tu es un assistant expert en rédaction de dialogues immersifs.',
        messages: [
          {
            role: 'user',
            content: generatePrompt(extractedText),
          },
        ],
      }),
    })

    if (!claudeResponse.ok) {
      const errorData = await claudeResponse.json().catch(() => ({ message: 'Failed to parse Claude error response' }))
      console.error('Claude API Error:', errorData)
      throw new Error(errorData.error?.message || errorData.message || `Claude API error! status: ${claudeResponse.status}`)
    }

    const data = await claudeResponse.json()
    const dialogues = data?.content?.[0]?.text || ''
    console.log('dialogues', dialogues)
    if (!dialogues) {
      console.warn('Claude API did not return any dialogues.')
      // Decide if this is an error or if empty dialogues are acceptable
      // return NextResponse.json({ error: 'Failed to generate dialogues from Claude API' }, { status: 500 });
    }
    // Generate title using Claude API
    let title = 'Dialogue'
    if (body.fileName) {
      // Remove extension and make it clean
      title = body.fileName.replace(/\.[^/.]+$/, '').substring(0, 50)
    } else {
      // ✅ Only generate title via Claude if no fileName was provided
      try {
        const titleResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': process.env.CLAUDE_API_KEY || '',
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 50,
            system: 'You are an expert assistant in creating short and relevant titles.',
            messages: [
              {
                role: 'user',
                content: generateTitlePrompt(extractedText, dialogues),
              },
            ],
          }),
        })

        if (titleResponse.ok) {
          const titleData = await titleResponse.json()
          const generatedTitle = titleData?.content?.[0]?.text?.trim() || 'Dialogue'
          title = generatedTitle
            .replace(/["""'.]/g, '')
            .split(' ')
            .slice(0, 4)
            .join(' ')
            .substring(0, 50)
        }
      } catch (titleError) {
        console.warn('Failed to generate title:', titleError.message)
      }
    }

    // Save dialogues to MongoDB
    const dialogue = new Pordialogue({
      userId: userId,
      title: title,
      source: 'PDF', // Indicates the original source type
      dialogue: dialogues,
      originalText: extractedText, // Optionally store the original text
      fileName: body.fileName || 'N/A', // Optionally store the file name if sent from client
    })

    await dialogue.save()
    const dialogueId = dialogue?._id.toString()
    return NextResponse.json({ status: 'success', dialogues, title, dialogueId }, { status: 200 })
  } catch (error) {
    console.error('Error in /api/portugal/pordialogues/create:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

function generatePrompt(text) {
  return `
Com base apenas no seguinte texto (extraído de um ficheiro PDF), gera 8 diálogos imersivos em português. Cada diálogo deve ser estruturado em duas linhas: a primeira corresponde a uma pergunta feita pela Pessoa A, e a segunda é uma resposta detalhada da Pessoa B sob a forma de um parágrafo com 5 linhas.

Texto extraído:
${text}

Por favor, fornece apenas os diálogos no seguinte formato:
Diálogo 1:
Pessoa A: ...
Pessoa B: ...
... até ao Diálogo 8.
`
}
function generateTitlePrompt(originalText, dialogues) {
  return `
Com base no texto original e nos diálogos gerados, crie um título curto (máximo de 3 a 4 palavras) resumindo o tema principal do conteúdo.

Texto original:
${originalText.substring(0, 500)}...

Diálogos gerados:
${dialogues.substring(0, 300)}...

Responda apenas com o título, sem pontuação ou aspas. O título deve ser em inglês e refletir a essência do conteúdo.
`
}
