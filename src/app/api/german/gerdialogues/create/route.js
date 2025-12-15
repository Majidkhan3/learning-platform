import { NextResponse } from 'next/server'
import connectToDatabase from '../../../../../lib/db'
import Gerdialogue from '../../../../../model/Gerdialogue'
import { verifyToken } from '../../../../../lib/verifyToken'
import { Mistral } from '@mistralai/mistralai'

// --------------------
// MISTRAL SETUP
// --------------------
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY
const MISTRAL_MODEL = process.env.MISTRAL_MODEL || 'mistral-medium-latest'

let mistralClient = null
if (MISTRAL_API_KEY) {
  try {
    mistralClient = new Mistral({ apiKey: MISTRAL_API_KEY })
    console.log(`Mistral client initialized (model: ${MISTRAL_MODEL})`)
  } catch (e) {
    console.warn('Failed to initialize Mistral client:', e?.message || e)
    mistralClient = null
  }
} else {
  console.warn('MISTRAL_API_KEY missing — AI generation disabled')
}

// Mistral retry helper
async function callMistralWithRetries(prompt, max = 3) {
  let attempt = 0

  while (attempt < max) {
    try {
      return await mistralClient.chat.complete({
        model: MISTRAL_MODEL,
        messages: [{ role: 'user', content: prompt }],
      })
    } catch (err) {
      attempt++
      const status = err?.statusCode || null

      if (attempt >= max || (status && status < 500)) throw err

      const delay =
        Math.min(2000, 500 * 2 ** attempt) + Math.floor(Math.random() * 100)
      console.warn(`Retry ${attempt}: Mistral error`, err?.message)
      await new Promise((res) => setTimeout(res, delay))
    }
  }
}

// --------------------
// MAIN POST HANDLER
// --------------------
export async function POST(req) {
  const auth = await verifyToken(req)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()

    const body = await req.json()
    const { text: extractedText, userId, fileName } = body

    if (!extractedText || !extractedText.trim()) {
      return NextResponse.json({ error: 'Text is required.' }, { status: 400 })
    }
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    if (!mistralClient) {
      return NextResponse.json({ error: 'Mistral is not configured' }, { status: 500 })
    }

    // -------------------------
    // GENERATE DIALOGUES
    // -------------------------
    let dialogueText = ''

    try {
      const result = await callMistralWithRetries(generatePrompt(extractedText))
      dialogueText =
        result?.output?.[0]?.content?.[0]?.text ||
        result?.choices?.[0]?.message?.content ||
        ''

      dialogueText = dialogueText.trim()
    } catch (err) {
      console.error('Mistral dialogue error:', err)
      return NextResponse.json(
        { error: 'Failed to generate dialogues.' },
        { status: 500 }
      )
    }

    // -------------------------
    // GENERATE TITLE
    // -------------------------
    let title = 'Dialogue'

    // If PDF file name is provided → use it (like your logic)
    if (fileName) {
      title = fileName.replace(/\.[^/.]+$/, '').substring(0, 50)
    } else {
      try {
        const titleResult = await callMistralWithRetries(
          generateTitlePrompt(extractedText, dialogueText)
        )

        const t =
          titleResult?.output?.[0]?.content?.[0]?.text ||
          titleResult?.choices?.[0]?.message?.content ||
          ''

        title = t
          .trim()
          .replace(/["“”'.]/g, '')
          .split(' ')
          .slice(0, 4)
          .join(' ')
          .substring(0, 50)
      } catch (err) {
        console.warn('Failed to generate title:', err.message)
      }
    }

    // -------------------------
    // SAVE TO DB
    // -------------------------
    const entry = new Gerdialogue({
      userId,
      title,
      source: 'PDF',
      dialogue: dialogueText,
      originalText: extractedText,
      fileName: fileName || 'N/A',
    })

    await entry.save()

    return NextResponse.json(
      {
        status: 'success',
        dialogues: dialogueText,
        title,
        dialogueId: entry._id.toString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in /api/german/Gerdialogues/create:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// --------------------
// PROMPTS
// --------------------

function generatePrompt(text) {
  return `
Erstellen Sie anhand des folgenden Textes (Auszug aus einer PDF-Datei) acht lebendige englische Dialoge.

Jeder Dialog sollte Folgendes enthalten:

– Eine Frage von Person A.

– Eine ausführliche Antwort von Person B (maximal fünf Zeilen).
Text:
${text}

Ausgabeformat:

Dialog 1:

Figur A: …

Figur B: …

(Fortsetzung bis Dialog 8)
`
}

function generateTitlePrompt(originalText, dialogues) {
  return `
Verfassen Sie einen kurzen Titel in deutscher Sprache mit 3 bis 4 Wörtern, der das Thema des Originaltextes und der generierten Dialoge zusammenfasst.

Original:
${originalText.slice(0, 500)}

Dialogues:
${dialogues.slice(0, 300)}
Bitte antworten Sie NUR mit dem Titel, ohne Anführungszeichen oder Satzzeichen.
`
}
