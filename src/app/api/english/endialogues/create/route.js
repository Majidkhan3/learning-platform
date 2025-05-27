import { NextResponse } from 'next/server'
// import pdfParse from 'pdf-parse'
import Endialogue from '../../../../../model/Endialogue'
import connectToDatabase from '../../../../../lib/db'

export async function POST(req) {
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
        model: 'claude-3-5-sonnet-20240620', // Corrected model name to a valid one, adjust if needed
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

    // Save dialogues to MongoDB
    const dialogue = new Endialogue({
      userId: userId,
      source: 'PDF', // Indicates the original source type
      dialogue: dialogues,
      originalText: extractedText, // Optionally store the original text
      fileName: body.fileName || 'N/A', // Optionally store the file name if sent from client
    })

    await dialogue.save()
    const dialogueId = dialogue?._id.toString()
    return NextResponse.json({ status: 'success', dialogues, dialogueId }, { status: 200 })
  } catch (error) {
    console.error('Error in /api/english/endialogues/create:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

function generatePrompt(text) {
  return `
Based only on the following text (excerpted from a PDF), generate 8 immersive dialogues in English.
Each dialogue must be structured in two lines:
- The first line is a question asked by Person A.
- The second line is a detailed response from Person B, written as a paragraph of 5 lines.

Excerpted text:
${text}

Please provide only the dialogues in the following format:
Dialogue 1:
Person A: ...
Person B: ...
... up to Dialogue 8.
`
}
