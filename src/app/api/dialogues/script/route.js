import { NextRequest, NextResponse } from 'next/server'
import { YoutubeTranscript } from '@/lib/YoutubeTranscript' // Adjust the import path

export async function POST(req) {
  try {
    const { videoUrl, lang } = await req.json()

    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl, {
      lang,
    })

    return NextResponse.json({ success: true, transcript })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
