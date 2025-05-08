import { NextResponse } from 'next/server'
import { fetchYouTubeTranscript } from '@/lib/YoutubeTranscript'
import Dialogue from '@/model/Dialogue'
import connectToDatabase from '@/lib/db'

export async function POST(req) {
  console.log('YouTube dialogue generation request received')

  try {
    await connectToDatabase()
    const body = await req.json()
    console.log('Request body:', body)
    const youtubeUrl = body.url

    if (!youtubeUrl) {
      console.error('Missing YouTube URL in request')
      return NextResponse.json({ error: 'Missing YouTube URL' }, { status: 400 })
    }

    // Extract Video ID
    const videoId = extractYouTubeId(youtubeUrl)
    if (!videoId) {
      console.error('Invalid YouTube URL:', youtubeUrl)
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    console.log('Extracted video ID:', videoId)

    // Get transcript using the updated utility function
    let transcript
    try {
      // Try with Spanish as primary language, English as fallback
      transcript = await fetchYouTubeTranscript(videoId, 'es', 'en')

      // Verify we actually got content
      if (!transcript || transcript.trim().length < 50) {
        console.error('Transcript is too short or empty:', transcript)
        return NextResponse.json({ error: 'Transcript is too short or empty' }, { status: 500 })
      }

      console.log('Transcript fetched successfully:', transcript.slice(0, 100), '...')
    } catch (error) {
      console.error('Transcript Fetch Error:', error.message)

      // Check for specific error messages and provide better user feedback
      if (error.message.includes('Transcript is disabled')) {
        return NextResponse.json(
          {
            error: 'Transcript is disabled on this video. Please try a different video with captions enabled.',
          },
          { status: 400 },
        )
      } else if (error.message.includes('No transcripts are available')) {
        return NextResponse.json(
          {
            error: 'No transcripts are available for this video. Please try a different video.',
          },
          { status: 400 },
        )
      }

      return NextResponse.json({ error: error.message || 'Unable to fetch transcript' }, { status: 500 })
    }

    // Send to Claude API to generate dialogues
    let claudeResponse
    try {
      console.log('Sending request to Claude API')
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

      if (!claudeResponse.ok) {
        const errorData = await claudeResponse.json().catch(() => ({}))
        console.error('Claude API Error Response:', errorData)
        return NextResponse.json(
          {
            error: 'Claude API returned an error: ' + (errorData.error?.message || 'Unknown error'),
          },
          { status: 500 },
        )
      }
    } catch (error) {
      console.error('Claude API Request Error:', error.message)
      return NextResponse.json({ error: 'Failed to connect to Claude API' }, { status: 500 })
    }

    const data = await claudeResponse.json()
    console.log('Claude response received:', data?.content?.[0]?.text?.slice(0, 100) + '...')

    const content = data?.content?.[0]?.text || ''
    if (!content) {
      console.error('Empty content from Claude API')
      return NextResponse.json({ error: 'Empty response from Claude API' }, { status: 500 })
    }

    // Save dialogue to MongoDB
    try {
      console.log('Saving dialogue to database')
      const dialogue = new Dialogue({
        userId: body.userId,
        url: youtubeUrl,
        dialogue: content,
      })

      await dialogue.save()
      console.log('Dialogue saved successfully, ID:', dialogue._id.toString())

      // Return success response with dialogue ID
      return NextResponse.json(
        {
          status: 'success',
          dialogueId: dialogue._id.toString(),
          dialogue: content,
        },
        { status: 200 },
      )
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
