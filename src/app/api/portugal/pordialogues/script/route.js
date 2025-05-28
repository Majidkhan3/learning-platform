import { NextRequest, NextResponse } from 'next/server'
import { Innertube } from 'youtubei.js' // Import youtubei.js
import { verifyToken } from '../../../../../lib/verifyToken'

export async function POST(req) {
  const auth = await verifyToken(req)
    
      if (!auth.valid) {
        return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
      }
  try {
    const { videoUrl, lang } = await req.json()

    if (!videoUrl) {
      return NextResponse.json({ success: false, error: 'Missing YouTube video URL' }, { status: 400 })
    }

    // Initialize youtubei.js
    const youtube = await Innertube.create()

    // Extract video ID from the URL
    const videoId = extractYouTubeId(videoUrl)
    if (!videoId) {
      return NextResponse.json({ success: false, error: 'Invalid YouTube video URL' }, { status: 400 })
    }

    // Fetch video details
    const videoInfo = await youtube.getInfo(videoId)

    // Check if captions are available
    const captions = videoInfo?.captions?.caption_tracks
    if (!captions || captions.length === 0) {
      return NextResponse.json({ success: false, error: 'No captions available for this video' }, { status: 404 })
    }

    // Find the caption track for the requested language
    const captionTrack = lang ? captions.find((track) => track.language_code === lang) : captions[0] // Default to the first available caption track

    if (!captionTrack) {
      return NextResponse.json({ success: false, error: `No captions available in the requested language (${lang || 'default'})` }, { status: 404 })
    }

    // Fetch the transcript from the caption track URL
    const transcriptResponse = await fetch(captionTrack.base_url)
    const transcriptText = await transcriptResponse.text()

    // Parse the transcript (if needed) and return it
    return NextResponse.json({ success: true, transcript: transcriptText })
  } catch (error) {
    console.error('Error fetching transcript:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

function extractYouTubeId(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}
