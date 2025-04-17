import { NextRequest, NextResponse } from 'next/server'
import { YoutubeTranscript } from 'youtube-transcript'
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

    // Get transcript
    let transcriptData
    try {
      transcriptData = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'es' })
      if (!transcriptData || transcriptData.length === 0) {
        console.warn('Transcript is empty or unavailable in Spanish, falling back to English.')
        throw new Error('Empty transcript in Spanish')
      }
    } catch (error) {
      console.error('Transcript Fetch Error (Spanish):', error.message)
      if (error.message.includes('No transcripts are available in es') || error.message === 'Empty transcript in Spanish') {
        console.warn('Spanish transcript not available, falling back to English.')
        try {
          transcriptData = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' })
          if (!transcriptData || transcriptData.length === 0) {
            console.error('Transcript is empty or unavailable in English.')
            return NextResponse.json({ error: 'Unable to fetch transcript in any language' }, { status: 500 })
          }
        } catch (fallbackError) {
          console.error('Fallback Transcript Fetch Error (English):', fallbackError.message)
          return NextResponse.json({ error: 'Unable to fetch transcript' }, { status: 500 })
        }
      } else {
        return NextResponse.json({ error: 'Unable to fetch transcript' }, { status: 500 })
      }
    }

    const transcript = transcriptData.map((line) => line.text).join(' ')
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
