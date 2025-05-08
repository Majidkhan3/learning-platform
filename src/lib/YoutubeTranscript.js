import { YoutubeTranscript } from 'youtube-transcript'

/**
 * Fetches the YouTube transcript for a given video ID with enhanced error logging
 * and multiple language support.
 *
 * @param {string} videoId - The YouTube video ID.
 * @param {string} primaryLang - The primary language code (e.g., 'es' for Spanish).
 * @param {string} fallbackLang - The fallback language code (e.g., 'en' for English).
 * @returns {Promise<string>} - The transcript as a single string.
 * @throws {Error} - If the transcript cannot be fetched in any language.
 */
export async function fetchYouTubeTranscript(videoId, primaryLang = 'es', fallbackLang = 'en') {
  if (!videoId) {
    console.error('Invalid YouTube video ID provided:', videoId)
    throw new Error('Invalid YouTube video ID')
  }

  console.log(`[Transcript] Starting transcript fetch for video: ${videoId}`)

  // Try multiple languages in sequence
  const languagesToTry = [primaryLang, fallbackLang, 'auto'] // Add 'auto' as final fallback

  let lastError = null
  for (const lang of languagesToTry) {
    try {
      console.log(`[Transcript] Attempting to fetch transcript in ${lang} for video ID: ${videoId}`)

      // Add timeout to prevent hanging requests
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Transcript fetch timed out for language: ${lang}`)), 15000),
      )

      const fetchPromise = YoutubeTranscript.fetchTranscript(videoId, { lang })
      const transcriptData = await Promise.race([fetchPromise, timeoutPromise])

      if (!transcriptData || transcriptData.length === 0) {
        console.warn(`[Transcript] Empty transcript in ${lang}, will try next language if available.`)
        continue
      }

      // Success! Process and return the transcript
      console.log(`[Transcript] Successfully fetched transcript in ${lang} (${transcriptData.length} entries)`)
      return transcriptData.map((line) => line.text).join(' ')
    } catch (error) {
      const errorMsg = error.stack || error.message || 'Unknown error'
      console.error(`[Transcript] Error fetching transcript in ${lang}:`, errorMsg)

      // Store error for potential later use
      lastError = error

      // Continue to the next language
      continue
    }
  }

  // If we get here, we've tried all languages and failed
  console.error('[Transcript] Failed to fetch transcript in any language')
  throw new Error(lastError?.message || 'Unable to fetch transcript after trying multiple languages')
}

/**
 * Alternative transcript fetcher that uses direct API access
 * Can be used as a fallback if the YoutubeTranscript package fails
 */
export async function fetchTranscriptAlt(videoId) {
  try {
    console.log(`[Transcript-Alt] Attempting alternative transcript fetch for video ID: ${videoId}`)

    // First, try to get video info to check if captions are available
    const infoRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`)
    const html = await infoRes.text()

    if (!html.includes('"captions":')) {
      console.error('[Transcript-Alt] No captions available for this video')
      throw new Error('No captions available for this video')
    }

    // This is a simplified approach - a more robust solution would parse the caption tracks
    // from the video info and make additional requests

    console.log('[Transcript-Alt] Alternative method would require additional implementation')
    throw new Error('Alternative transcript fetch method is not fully implemented')
  } catch (error) {
    console.error('[Transcript-Alt] Error:', error.message)
    throw error
  }
}
