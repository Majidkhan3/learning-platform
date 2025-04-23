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
  'fr-FR': ['Léa', 'Mathieu', 'Céline'],
  'en-US': ['Joanna', 'Matthew', 'Salli', 'Joey'],
  'pt-BR': ['Camila', 'Ricardo', 'Vitória'],
}

const VOICE_ENGINE_MAP = {
  Lucia: 'neural',
  Enrique: 'standard',
  Sergio: 'neural',
  Conchita: 'standard',
  Léa: 'neural',
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

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text, voice = 'Lucia', language = 'es-ES' } = req.body

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Missing or empty text parameter' })
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

      res.setHeader('Content-Type', 'audio/mpeg')
      res.send(Buffer.from(audioStream))
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

        res.setHeader('Content-Type', 'audio/mpeg')
        res.send(Buffer.from(fallbackAudioStream))
      } catch (fallbackError) {
        console.error('Error with fallback engine:', fallbackError)
        res.status(500).json({ error: 'Failed to synthesize speech' })
      }
    }
  } else if (req.method === 'GET') {
    const { language = 'es-ES' } = req.query

    if (AVAILABLE_VOICES[language]) {
      const voices = AVAILABLE_VOICES[language].map((voiceId) => ({
        id: voiceId,
        name: voiceId,
        gender: ['Lucia', 'Conchita', 'Léa', 'Céline', 'Joanna', 'Salli', 'Camila', 'Vitória'].includes(voiceId) ? 'Female' : 'Male',
      }))
      res.status(200).json(voices)
    } else {
      try {
        const command = new DescribeVoicesCommand({ LanguageCode: language })
        const response = await pollyClient.send(command)

        const voices = response.Voices.map((voice) => ({
          id: voice.Id,
          name: voice.Name,
          gender: voice.Gender,
        }))

        res.status(200).json(voices)
      } catch (error) {
        console.error('Error describing voices:', error)
        res.status(500).json({ error: 'Failed to retrieve voices' })
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
