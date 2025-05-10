import { YoutubeTranscript } from 'youtube-transcript'

/**
 * Fetches the YouTube transcript for a given video ID with enhanced error handling
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

      const fetchPromise = await YoutubeTranscript.fetchTranscript(videoId, { lang })
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

      // Check for specific error messages about disabled transcripts
      if (errorMsg.includes('Transcript is disabled')) {
        // Don't try other languages if transcripts are disabled altogether
        throw new Error('Transcript is disabled on this video. Please try a different video with captions enabled.')
      }

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
 * Check if a YouTube video has captions available (without actually fetching them)
 * This can be used as a pre-check before attempting to fetch the full transcript
 *
 * @param {string} videoId - The YouTube video ID to check
 * @returns {Promise<boolean>} - True if captions appear to be available
 */
export async function checkCaptionsAvailability(videoId) {
  try {
    // This is a lightweight request to YouTube's oEmbed endpoint
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)

    if (!response.ok) {
      return false
    }

    // We can't directly check for caption availability from the oEmbed response,
    // but at least we confirm the video exists and is publicly accessible
    await response.json()

    return true // Video exists, captions may or may not be available
  } catch (error) {
    console.error(`Error checking video availability: ${error.message}`)
    return false
  }
}

/**
 * Check if a YouTube URL is valid and returns the video ID
 *
 * @param {string} url - YouTube URL to validate
 * @returns {string|null} - Video ID or null if invalid
 */
export function validateYouTubeUrl(url) {
  if (!url) return null

  // Regular expression to extract YouTube video ID
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  const match = url.match(regex)

  return match ? match[1] : null
}
