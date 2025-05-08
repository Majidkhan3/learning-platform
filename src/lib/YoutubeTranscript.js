import { YoutubeTranscript } from 'youtube-transcript'

/**
 * Fetches the YouTube transcript for a given video ID.
 * Tries to fetch in the specified language first, then falls back to English if unavailable.
 *
 * @param {string} videoId - The YouTube video ID.
 * @param {string} primaryLang - The primary language code (e.g., 'es' for Spanish).
 * @param {string} fallbackLang - The fallback language code (e.g., 'en' for English).
 * @returns {Promise<string>} - The transcript as a single string.
 * @throws {Error} - If the transcript cannot be fetched in any language.
 */
export async function fetchYouTubeTranscript(videoId, primaryLang = 'es', fallbackLang = 'en') {
  let transcriptData

  try {
    console.log(`Attempting to fetch transcript in ${primaryLang} for video ID:`, videoId)
    transcriptData = await YoutubeTranscript.fetchTranscript(videoId, { lang: primaryLang })
    if (!transcriptData || transcriptData.length === 0) {
      console.warn(`Transcript is empty or unavailable in ${primaryLang}, falling back to ${fallbackLang}.`)
      throw new Error(`Empty transcript in ${primaryLang}`)
    }
  } catch (error) {
    console.error(`Transcript Fetch Error (${primaryLang}):`, error.stack || error.message)
    if (error.message.includes(`No transcripts are available in ${primaryLang}`) || error.message === `Empty transcript in ${primaryLang}`) {
      console.warn(`${primaryLang} transcript not available, attempting to fetch in ${fallbackLang}.`)
      try {
        console.log(`Attempting to fetch transcript in ${fallbackLang} for video ID:`, videoId)
        transcriptData = await YoutubeTranscript.fetchTranscript(videoId, { lang: fallbackLang })
        if (!transcriptData || transcriptData.length === 0) {
          console.error(`Transcript is empty or unavailable in ${fallbackLang}.`)
          throw new Error(`Unable to fetch transcript in any language`)
        }
      } catch (fallbackError) {
        console.error(`Fallback Transcript Fetch Error (${fallbackLang}):`, fallbackError.stack || fallbackError.message)
        throw new Error(`Unable to fetch transcript`)
      }
    } else {
      throw new Error(`Unexpected Transcript Fetch Error: ${error.message}`)
    }
  }

  return transcriptData.map((line) => line.text).join(' ')
}
