import { NextResponse } from 'next/server'
// import pdfParse from 'pdf-parse'
import Dialogue from '@/model/Dialogue'

export async function POST(req) {
  try {
    await connectToDatabase()

    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const pdfData = await pdfParse(buffer)
    const extractedText = pdfData.text

    if (!extractedText) {
      return NextResponse.json({ error: 'Failed to extract text from PDF' }, { status: 400 })
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
        model: 'claude-3-5-sonnet-20241022',
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

    const data = await claudeResponse.json()
    const dialogues = data?.content?.[0]?.text || ''

    // Save dialogues to MongoDB
    const dialogue = new Dialogue({
      userId: formData.get('userId'), // Assuming userId is passed in the form data
      source: 'PDF',
      dialogue: dialogues,
    })

    await dialogue.save()

    return NextResponse.json({ status: 'success', dialogues }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generatePrompt(text) {
  return `
En te basant uniquement sur le texte suivant (extrait d'un fichier PDF),
génère 8 dialogues immersifs en espagnol. Chaque dialogue doit être structuré en deux lignes :
la première correspond à une question posée par la personne A, et la seconde est une réponse
détaillée de la personne B sous forme d'un paragraphe de 5 lignes.

Texte extrait :
${text}

Merci de fournir uniquement les dialogues au format :
Dialogue 1:
Personne A: ...
Personne B: ...
... jusqu'à Dialogue 8.
`
}
