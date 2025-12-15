import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '../../../../../lib/db'
import axios from 'axios'
import Frdialogue from '../../../../../model/Frdialogue'
import { verifyToken } from '../../../../../lib/verifyToken'
import { Mistral } from '@mistralai/mistralai'

// --------------------
// MISTRAL SETUP
// --------------------
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY
const MISTRAL_MODEL = process.env.MISTRAL_MODEL || 'mistral-medium-latest'

let mistralClient = null
if (MISTRAL_API_KEY) {
  try {
    mistralClient = new Mistral({ apiKey: MISTRAL_API_KEY })
    console.log(`Mistral initialized (model: ${MISTRAL_MODEL})`)
  } catch (e) {
    console.warn("Failed to initialize Mistral:", e?.message || e)
    mistralClient = null
  }
}

// Mistral retry wrapper
async function callMistralWithRetries(prompt, max = 3) {
  let attempt = 0
  while (attempt < max) {
    try {
      return await mistralClient.chat.complete({
        model: MISTRAL_MODEL,
        messages: [{ role: "user", content: prompt }],
      })
    } catch (err) {
      attempt++
      const status = err?.statusCode || null

      if (attempt >= max || (status && status < 500)) throw err

      const delay = Math.min(2000, 500 * 2 ** attempt) + Math.random() * 100
      await new Promise(res => setTimeout(res, delay))
    }
  }
}

// --------------------
// Transcript API (unchanged)
// --------------------
class TranscriptAPI {
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
          headers: { 'Content-Type': 'application/json' },
          ...config,
        }
      )

      if (response.data && response.data.captions) {
        return response.data.captions.map(({ dur, ...rest }) => ({
          ...rest,
          duration: dur,
        }))
      } else {
        return []
      }
    } catch (e) {
      throw e
    }
  }

  static async validateID(id, config = {}) {
    const url = new URL('https://video.google.com/timedtext')
    url.searchParams.set('type', 'track')
    url.searchParams.set('v', id)
    url.searchParams.set('id', 0)
    url.searchParams.set('lang', 'en')

    try {
      await axios.get(url.toString(), config)
      return true
    } catch {
      return false
    }
  }
}

// --------------------
// MAIN POST ROUTE
// --------------------
export async function POST(req) {
  const auth = await verifyToken(req)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 })
  }

  try {
    await connectToDatabase()

    const { url: youtubeUrl, userId } = await req.json()
    if (!youtubeUrl) {
      return NextResponse.json({ error: "Missing YouTube URL" }, { status: 400 })
    }

    const videoId = extractYouTubeId(youtubeUrl)
    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 })
    }

    // ---------------------------------------
    // Fetch transcript (Spanish → English)
    // ---------------------------------------
    let transcriptData
    for (const lang of ["es", "en"]) {
      try {
        transcriptData = await TranscriptAPI.getTranscript(videoId, lang)
        if (transcriptData && transcriptData.length) break
      } catch (err) {
        if (lang === "en") {
          return NextResponse.json(
            { error: "Unable to fetch transcript in any language" },
            { status: 500 }
          )
        }
      }
    }

    if (!transcriptData || transcriptData.length === 0) {
      return NextResponse.json(
        { error: "Failed to retrieve transcript content." },
        { status: 500 }
      )
    }

    const transcript = transcriptData.map((l) => l.text).join(" ")

    // ---------------------------------------
    // Generate Dialogues with MISTRAL
    // ---------------------------------------
    if (!mistralClient) {
      return NextResponse.json(
        { error: "Mistral API not configured." },
        { status: 500 }
      )
    }

    let dialogueText = ""
    try {
      const result = await callMistralWithRetries(generatePrompt(transcript))

      dialogueText =
        result?.choices?.[0]?.message?.content?.trim() ||
        result?.output_text?.trim() ||
        "";


      dialogueText = dialogueText.trim()
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to generate dialogues" },
        { status: 500 }
      )
    }

    // ---------------------------------------
    // Generate Title with MISTRAL
    // ---------------------------------------
    let title = "Dialogue"
    try {
      const titleResp = await callMistralWithRetries(
        generateTitlePrompt(transcript, dialogueText)
      )

      const rawTitle =
        titleResp?.choices?.[0]?.message?.content ||
        titleResp?.output_text ||
        "";


      title = rawTitle
        .trim()
        .replace(/["'.]/g, "")
        .split(" ")
        .slice(0, 4)
        .join(" ")
        .substring(0, 50)
    } catch (err) {
      console.log("Title generation failed:", err.message)
    }

    // ---------------------------------------
    // Save to DB
    // ---------------------------------------
    const entry = new Frdialogue({
      userId,
      url: youtubeUrl,
      dialogue: dialogueText,
      title,
    })

    await entry.save()

    return NextResponse.json(
      {
        status: "success",
        dialogueId: entry._id.toString(),
        dialogue: dialogueText,
        title,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error("Internal Error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// --------------------
// Helpers
// --------------------
function extractYouTubeId(url) {
  const m = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/
  )
  return m ? m[1] : null
}

function generatePrompt(transcript) {
  return `
À partir de la seule transcription de ce podcast, créez 8 dialogues immersifs en anglais.

Chaque dialogue doit comporter :

- Une question de la personne A.

- Une réponse de 5 lignes de la personne B.

Transcript:
${transcript}

Format :

Dialogue 1 :

Personnage A : …

Personnage B : …

Dialogue 2 :
…
Dialogue 8 :
…
`
}

function generateTitlePrompt(originalText, dialogues) {
  return `
À partir de la transcription et des dialogues générés,

créez un court titre french de 3 à 4 mots.

Text:
${originalText.slice(0, 500)}

Dialogues:
${dialogues.slice(0, 300)}

Répondez UNIQUEMENT avec le titre. Sans guillemets.
`
}
