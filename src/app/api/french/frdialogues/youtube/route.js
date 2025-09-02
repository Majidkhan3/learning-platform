import { NextRequest, NextResponse } from 'next/server'
// import TranscriptAPI from 'youtube-transcript-api' // Removed this line
import connectToDatabase from '../../../../../lib/db'
import axios from 'axios' // Added this line
import Frdialogue from '../../../../../model/Frdialogue'
import { verifyToken } from '../../../../../lib/verifyToken'

// Added TranscriptAPI class definition
class TranscriptAPI {
  /**
   * Fetches the transcript of a particular video.
   * @param {string} id - The YouTube video ID
   * @param {string} [langCode] - ISO 639-1 language code
   * @param {object} [config] - Request configurations for the Axios HTTP client.
   */
  static async getTranscript(id, langCode, config = {}) {
    const url = new URL('https://www.youtube.com/watch')
    url.searchParams.set('v', id)
    try {
      const response = await axios.post(
        'https://tactiq-apps-prod.tactiq.io/transcript',
        {
          langCode: langCode || 'en',
          videoUrl: url.toString(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          ...config,
        },
      )
      console.log('Transcript API response:', response) // Debugging line
      if (response.data && response.data.captions) {
        return response.data.captions.map(({ dur, ...rest }) => ({
          ...rest,
          duration: dur,
        }))
      } else {
        console.warn('Transcript API response did not contain captions:', response.data)
        return []
      }
    } catch (e) {
      console.log('error', e)
      if (e.response) {
        if (e.response.status === 415) {
          throw new Error('Unsupported Media Type: Check Content-Type header and request body.')
        } else if (e.response.status === 429) {
          throw new Error('Too Many Requests: Rate limit exceeded.')
        } else if (e.response.status === 406) {
          throw new Error('Invalid video ID.')
        } else if (e.response.status === 503) {
          throw new Error('Video unavailable or captions disabled.')
        }
      }
      throw e
    }
  }

  /**
   * Checks if a video with the specified ID exists on YouTube.
   * @param {string} id - The YouTube video ID
   * @param {object} [config] - Request configurations for the Axios HTTP client.
   */
  static async validateID(id, config = {}) {
    const url = new URL('https://video.google.com/timedtext')
    url.searchParams.set('type', 'track')
    url.searchParams.set('v', id)
    url.searchParams.set('id', 0) // This parameter might not be necessary or could be specific
    url.searchParams.set('lang', 'en')

    try {
      await axios.get(url.toString(), config) // Ensure URL is passed as string
      return true // Explicitly return true
    } catch (_) {
      return false // Explicitly return false
    }
  }
}
// ...existing code...
export async function POST(req) {
  const auth = await verifyToken(req)

  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectToDatabase()
    const { url: youtubeUrl, userId } = await req.json()
    console.log('Request body:', { youtubeUrl, userId })

    if (!youtubeUrl) {
      return NextResponse.json({ error: 'Missing YouTube URL' }, { status: 400 })
    }

    const videoId = extractYouTubeId(youtubeUrl)
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    let transcriptData
    // Try Spanish first, then English
    for (const lang of ['es', 'en']) {
      try {
        console.log(`Fetching transcript [lang=${lang}] for ID:`, videoId)
        console.log('video', videoId, lang)
        transcriptData = await TranscriptAPI.getTranscript(videoId, lang) // Using your new class
        console.log('tran', transcriptData)
        if (transcriptData && transcriptData.length) break
        // throw new Error('Empty transcript') // Consider if this throw is still needed or how to handle empty but successful fetches
      } catch (err) {
        console.warn(`Transcript fetch failed [${lang}]:`, err.message)
        if (lang === 'en') {
          // This means both 'es' and 'en' failed
          return NextResponse.json({ error: 'Unable to fetch transcript in any language' }, { status: 500 })
        }
      }
    }

    // Ensure transcriptData is not undefined before proceeding
    if (!transcriptData || transcriptData.length === 0) {
      console.error('Transcript data is empty or undefined after attempting all languages.')
      return NextResponse.json({ error: 'Failed to retrieve transcript content.' }, { status: 500 })
    }

    const transcript = transcriptData.map((line) => line.text).join(' ')
    console.log('Transcript snippet:', transcript.slice(0, 100), '...')

    // Send to Claude API
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
        messages: [{ role: 'user', content: generatePrompt(transcript) }],
      }),
    })

    if (!claudeResponse.ok) {
      const errData = await claudeResponse.json()
      console.error('Claude API Error:', errData)
      return NextResponse.json({ error: 'Claude API returned an error' }, { status: 500 })
    }

    const { content } = await claudeResponse.json()
    const dialogueText = content?.[0]?.text || ''
    // Generate title using Claude API
    let title = 'Dialogue'
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
          system: 'You are an expert assistant at creating short and relevant titles.',
          messages: [
            {
              role: 'user',
              content: generateTitlePrompt(transcript, dialogueText),
            },
          ],
        }),
      })

      if (titleResponse.ok) {
        const titleData = await titleResponse.json()
        const generatedTitle = titleData?.content?.[0]?.text?.trim() || 'Dialogue'
        title = generatedTitle.replace(/["'.]/g, '').split(' ').slice(0, 4).join(' ').substring(0, 50)
      }
    } catch (titleError) {
      console.warn('Failed to generate title:', titleError.message)
    }

    // Save to MongoDB
    const dialogue = new Frdialogue({ userId, url: youtubeUrl, dialogue: dialogueText, title: title })
    await dialogue.save()

    return NextResponse.json({ status: 'success', dialogueId: dialogue._id.toString(), dialogue: dialogueText, title }, { status: 200 })
  } catch (err) {
    console.error('Unexpected Error:', err.stack || err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function extractYouTubeId(url) {
  const m = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/)
  return m ? m[1] : null
}

function generatePrompt(transcript) {
  return `

En te basant uniquement sur le texte suivant (une transcription d'un podcast en français),
génère 8 dialogues immersifs en français. Chaque dialogue doit être structuré en deux lignes :
la première correspond à une question posée par la personne A, et la seconde est une réponse
détaillée de la personne B sous forme d’un paragraphe de 5 lignes.

Texte du podcast :
${transcript}

Merci de fournir uniquement les dialogues au format :
Dialogue 1 :
Personne A : ...
Personne B : ...
... jusqu'à Dialogue 8.
`
}
function generateTitlePrompt(originalText, dialogues) {
  return `
Sur la base du texte original et des dialogues générés, créez un titre court (maximum 3 à 4 mots) résumant le thème principal du contenu.

Texte original :
${originalText.substring(0, 500)}...

Dialogues générés :
${dialogues.substring(0, 300)}...

Veuillez répondre uniquement avec le titre, sans ponctuation ni guillemets. Le titre doit être en anglais et refléter l'essentiel du contenu.
`
}
