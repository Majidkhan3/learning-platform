import { NextResponse } from 'next/server'
import { PollyClient, SynthesizeSpeechCommand, DescribeVoicesCommand } from '@aws-sdk/client-polly'

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_REGION = process.env.AWS_REGION || 'eu-west-1'

const pollyClient = new PollyClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

const AVAILABLE_VOICES = {
  'es-ES': ['Lucia', 'Enrique', 'Conchita', 'Sergio'],
  'fr-FR': ['Lea', 'Mathieu', 'Celine'],
  'en-US': ['Joanna', 'Matthew', 'Salli', 'Joey'],
  'pt-BR': ['Camila', 'Ricardo', 'Vitoria'],
}

const VOICE_ENGINE_MAP = {
  Lucia: 'neural',
  Enrique: 'standard',
  Sergio: 'neural',
  Conchita: 'standard',
  Lea: 'neural',
  Mathieu: 'standard',
  Céline: 'standard',
  Joanna: 'neural',
  Matthew: 'neural',
  Salli: 'neural',
  Joey: 'standard',
  Camila: 'neural',
  Ricardo: 'standard',
  Vitória: 'standard',
}

// Handle POST requests
export async function POST(req) {
  const body = await req.json()
  const { text, voice = 'Lucia', language = 'es-ES' } = body

  if (!text || !text.trim()) {
    return NextResponse.json({ error: 'Missing or empty text parameter' }, { status: 400 })
  }

  const engine = VOICE_ENGINE_MAP[voice] || 'standard'

  try {
    const command = new SynthesizeSpeechCommand({
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: voice,
      LanguageCode: language,
      Engine: engine,
    })

    const response = await pollyClient.send(command)
    const audioStream = await response.AudioStream.transformToByteArray()

    return new NextResponse(Buffer.from(audioStream), {
      headers: { 'Content-Type': 'audio/mpeg' },
    })
  } catch (error) {
    console.error('Error synthesizing speech:', error)

    // Attempt fallback engine
    const fallbackEngine = engine === 'standard' ? 'neural' : 'standard'
    try {
      const fallbackCommand = new SynthesizeSpeechCommand({
        Text: text,
        OutputFormat: 'mp3',
        VoiceId: voice,
        LanguageCode: language,
        Engine: fallbackEngine,
      })

      const fallbackResponse = await pollyClient.send(fallbackCommand)
      const fallbackAudioStream = await fallbackResponse.AudioStream.transformToByteArray()

      return new NextResponse(Buffer.from(fallbackAudioStream), {
        headers: { 'Content-Type': 'audio/mpeg' },
      })
    } catch (fallbackError) {
      console.error('Error with fallback engine:', fallbackError)
      return NextResponse.json({ error: 'Failed to synthesize speech' }, { status: 500 })
    }
  }
}

// Handle GET requests
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const language = searchParams.get('language')

  if (AVAILABLE_VOICES[language]) {
    const voices = AVAILABLE_VOICES[language].map((voiceId) => ({
      id: voiceId,
      name: voiceId,
      gender: ['Lucia', 'Conchita', 'Lea', 'Celine', 'Joanna', 'Salli', 'Camila', 'Vitoria'].includes(voiceId) ? 'Female' : 'Male',

    }))
    return NextResponse.json(voices)
  } else {
    try {
      const command = new DescribeVoicesCommand({ LanguageCode: language })
      const response = await pollyClient.send(command)

      const voices = response.Voices.map((voice) => ({
        id: voice.Id,
        name: voice.Name,
        gender: voice.Gender,
      }))

      return NextResponse.json(voices)
    } catch (error) {
      console.error('Error describing voices:', error)
      return NextResponse.json({ error: 'Failed to retrieve voices' }, { status: 500 })
    }
  }
}
