import { NextRequest, NextResponse } from 'next/server'
import Dialogue from '@/model/Dialogue'
import connectToDatabase from '@/lib/db'

export async function POST(req) {
  try {
    await connectToDatabase()
    const body = await req.json()
    console.log('Request body:', body)
    const youtubeUrl = body.url

    if (!youtubeUrl) {
      return NextResponse.json({ error: 'Missing YouTube URL' }, { status: 400 })
    }

    // Extract Video ID
    const videoId = extractYouTubeId(youtubeUrl)
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    // Fetch transcript using YouTube Data API
    let transcript
    try {
      const accessToken = await getOAuth2AccessToken() // Fetch OAuth2 access token
      console.log('Access Token:', accessToken) // Log the access token for debugging
      transcript = await fetchYouTubeTranscript(videoId, accessToken)
      console.log('Transcript:', transcript) // Log the transcript for debugging
      if (!transcript) {
        console.error('Transcript is unavailable for this video.')
        return NextResponse.json({ error: 'Transcript is unavailable for this video' }, { status: 400 })
      }
    } catch (error) {
      console.error('Error fetching transcript:', error.message)
      return NextResponse.json({ error: 'Failed to fetch transcript' }, { status: 500 })
    }

    console.log('Transcript fetched successfully:', transcript.slice(0, 100), '...') // Log first 100 characters

    // Send to Claude API to generate dialogues
    let claudeResponse
    try {
      claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
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
              content: generatePrompt(transcript),
            },
          ],
        }),
      })
    } catch (error) {
      console.error('Claude API Request Error:', error.message)
      return NextResponse.json({ error: 'Failed to connect to Claude API' }, { status: 500 })
    }

    const data = await claudeResponse.json()
    if (!claudeResponse.ok) {
      console.error('Claude API Response Error:', data)
      return NextResponse.json({ error: 'Claude API returned an error' }, { status: 500 })
    }

    const content = data?.content?.[0]?.text || ''
    console.log('Claude response:', data)

    // Save dialogue to MongoDB
    try {
      const dialogue = new Dialogue({
        userId: body.userId, // Assuming userId is passed in the body
        url: youtubeUrl,
        dialogue: content, // Save the single string dialogue
      })

      await dialogue.save()

      // Redirect to the dialogue view page
      const dialogueId = dialogue?._id.toString()
      return NextResponse.json({ status: 'success', dialogueId, dialogue: content }, { status: 200 })
    } catch (dbError) {
      console.error('Database Save Error:', dbError.message)
      return NextResponse.json({ error: 'Failed to save dialogue to database' }, { status: 500 })
    }
  } catch (error) {
    console.error('Unexpected Error:', error.stack || error.message || error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function extractYouTubeId(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

async function fetchYouTubeTranscript(videoId, accessToken) {
  const captionsUrl = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}`
  const captionsResponse = await fetch(captionsUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const captionsData = await captionsResponse.json()

  if (!captionsResponse.ok || !captionsData.items || captionsData.items.length === 0) {
    throw new Error('No captions available for this video.')
  }

  const captionTrack = captionsData.items.find((item) => item.snippet.language === 'es' || item.snippet.language === 'en')

  if (!captionTrack) {
    throw new Error('No captions available in Spanish or English.')
  }

  const transcriptUrl = `https://www.googleapis.com/youtube/v3/captions/${captionTrack.id}?tfmt=ttml`
  const transcriptResponse = await fetch(transcriptUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const transcriptText = await transcriptResponse.text()

  if (!transcriptResponse.ok || !transcriptText) {
    throw new Error('Failed to fetch transcript text.')
  }

  return transcriptText
}

async function getOAuth2AccessToken() {
  const tokenUrl = 'https://oauth2.googleapis.com/token'
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  })
  console.log('Token response:', response)
  const data = await response.json()
  if (!response.ok) {
    throw new Error(`Failed to fetch OAuth2 access token: ${data.error}`)
  }

  return data.access_token
}

function generatePrompt(transcript) {
  return `
En te basant uniquement sur le texte suivant (une transcription d'un podcast en espagnol),
génère 8 dialogues immersifs en espagnol. Chaque dialogue doit être structuré en deux lignes :
la première correspond à une question posée par la personne A, et la seconde est une réponse
détaillée de la personne B sous forme d'un paragraphe de 5 lignes.

Texte du podcast :
${transcript}

Merci de fournir uniquement les dialogues au format :
Dialogue 1:
Personne A: ...
Personne B: ...
... jusqu'à Dialogue 8.
`
}
