import { NextResponse } from 'next/server'
// import pdfParse from 'pdf-parse'
import Frdialogue from '../../../../../model/Frdialogue'
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
    const dialogue = new Frdialogue({
      userId: userId,
      source: 'PDF', // Indicates the original source type
      title: title,
      dialogue: dialogues,
      originalText: extractedText, // Optionally store the original text
      fileName: body.fileName || 'N/A', // Optionally store the file name if sent from client
    })

    await dialogue.save()
    const dialogueId = dialogue?._id.toString()
    return NextResponse.json({ status: 'success', dialogues, title, dialogueId }, { status: 200 })
  } catch (error) {
    console.error('Error in /api/french/frdialogues/create:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

function generatePrompt(text) {
  return `
En te basant uniquement sur le texte suivant (extrait d'un fichier PDF), 
génère 8 dialogues immersifs en français. Chaque dialogue doit être structuré en deux lignes : 
la première correspond à une question posée par la personne A, et la seconde est une réponse 
détaillée de la personne B sous forme d’un paragraphe de 5 lignes.

Texte extrait :
${text}

Merci de fournir uniquement les dialogues au format :
Dialogue 1:
Personne A: ...
Personne B: ...
... jusqu'à Dialogue 8.
`
}
function generateTitlePrompt(originalText, dialogues) {
  return `
À partir du texte original et des dialogues générés, créez un titre court (3 à 4 mots maximum) résumant le thème principal du contenu.

Texte original :
${originalText.substring(0, 500)}...

Dialogues générés :
${dialogues.substring(0, 300)}...

Répondez uniquement avec le titre, sans ponctuation ni guillemets. Le titre doit être en anglais et refléter l'essence du contenu.
`
}
