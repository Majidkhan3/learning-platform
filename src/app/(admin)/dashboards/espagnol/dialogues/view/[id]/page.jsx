'use client'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { Button, Card, Form, Row, Col } from 'react-bootstrap'
import AudioPlayer from '../../../../../../../ui/AudioPlayer'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'

const DialogueViewer = () => {
  const { user, token } = useAuth()
  const { id } = useParams()
  const [dialogue, setDialogue] = useState(null)
  const [parsedDialogues, setParsedDialogues] = useState([]) // Store parsed dialogues
  const [voiceA, setVoiceA] = useState('')
  const [voiceB, setVoiceB] = useState('')
  const [availableVoices, setAvailableVoices] = useState([]) // Store voices fetched from API
  const [isReading, setIsReading] = useState(false) // To track if reading is in progress
  const audioRef = useRef(null) // To track the currently playing audio
  const [title, setTitle] = useState('') // Default title
  const [isSpeaking, setIsSpeaking] = useState(false)
  const path = typeof window !== 'undefined' ? window.location.pathname : ''
let language = 'es-ES' // Default

if (path.includes('/portugais')) language = 'pt-PT'
else if (path.includes('/french')) language = 'fr-FR'
else if (path.includes('/english')) language = 'en-US'

  useEffect(() => {
    if (id) {
      fetch(`/api/dialogues/${id}`,
        {headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }}
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.dialogue) {
            setTitle(data.title || 'Dialogue') // Set title if available, otherwise default to 'Dialogue'
            setDialogue(data.dialogue)
            parseDialogues(data.dialogue)
          } else {
            console.error('Error: No dialogue data found.')
          }
        })
        .catch((error) => console.error('Error fetching dialogue:', error))
    }
  }, [id])

  useEffect(() => {
  fetch(`/api/polly?language=${language}`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setAvailableVoices(data)

        if (data.length > 0) {
          setVoiceA(data[0].id)
          setVoiceB(data[1]?.id || data[0].id)
        }
      } else {
        console.error('Invalid voices data from API.')
      }
    })
    .catch((error) => console.error('Error fetching voices:', error))
}, [])


  const parseDialogues = (dialogueString) => {
    const lines = dialogueString.split('\n')
    const dialogues = []
    let currentDialogue = {}

    lines.forEach((line) => {
      if (line.includes('Persona A:') || line.includes('Personne A:')) {
        currentDialogue.a = line.split(/Persona A:|Personne A:/)[1]?.trim()
      } else if (line.includes('Persona B:') || line.includes('Personne B:')) {
        currentDialogue.b = line.split(/Persona B:|Personne B:/)[1]?.trim()
        dialogues.push(currentDialogue) // Add the completed dialogue
        currentDialogue = {} // Reset for the next dialogue
      }
    })

    setParsedDialogues(dialogues)
  }


const speak = async (text, voiceLabel) => {
  if (!voiceLabel) {
    console.error('No voice selected')
    setIsSpeaking(false)
    return
  }

  try {
    setIsSpeaking(true)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      URL.revokeObjectURL(audioRef.current.src)
      audioRef.current = null
    }

    const response = await fetch('/api/polly', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, voice: voiceLabel, language }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Polly API error:', response.status, errorText)
      throw new Error(`Failed to fetch Polly API: ${response.status} ${errorText}`)
    }

    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const audio = new Audio(url)
    audioRef.current = audio

    audio.onended = () => {
      URL.revokeObjectURL(url)
      audioRef.current = null
      setIsSpeaking(false)
    }

    audio.onerror = () => {
      URL.revokeObjectURL(url)
      audioRef.current = null
      setIsSpeaking(false)
    }

    await audio.play()
  } catch (err) {
    console.error('Audio error:', err)
    setIsSpeaking(false)
  }
}

  // const speak = async (text, voiceLabel) => {
  //   try {
  //     const response = await fetch('/api/polly', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`, // Include token for authentication
  //       },
  //       body: JSON.stringify({
  //         text,
  //         voice: voiceLabel,
  //         language: 'es-ES', // Adjust language as needed
  //       }),
  //     })

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch Polly API')
  //     }

  //     const audioBlob = await response.blob()
  //     const audioUrl = URL.createObjectURL(audioBlob)

  //     const audio = new Audio(audioUrl)
  //     audioRef.current = audio // Track the current audio instance
  //     await new Promise((resolve, reject) => {
  //       audio.onended = resolve // Resolve when the audio finishes
  //       audio.onerror = reject // Reject if there's an error
  //       audio.play()
  //     })
  //   } catch (error) {
  //     console.error('Error fetching Polly API:', error)
  //   }
  // }

  const readDialoguesSequentially = async (dialogues, index = 0) => {
    if (!isReading || index >= dialogues.length) {
      setIsReading(false) // Stop reading when all dialogues are done or stopped
      return
    }

    const dialogue = dialogues[index]
    if (dialogue.a) {
      await speak(dialogue.a, voiceA) // Speak Person A's dialogue
    }
    if (dialogue.b) {
      await speak(dialogue.b, voiceB) // Speak Person B's dialogue
    }

    // Move to the next dialogue
    readDialoguesSequentially(dialogues, index + 1)
  }

  const stopReading = () => {
    setIsReading(false)
    if (audioRef.current) {
      audioRef.current.pause() // Stop the currently playing audio
      audioRef.current = null // Clear the reference
    }
  }

  if (!dialogue) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>
        📢 <a href={title} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h3>

      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">Configuration de la synthèse vocale (Amazon Polly)</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Voix pour Personne A:</Form.Label>
                <Form.Select value={voiceA} onChange={(e) => setVoiceA(e.target.value)}>
                  {availableVoices.map((voice) => (
                    <option key={voice.id} value={voice.id}>
                      {voice.name} ({voice.gender})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Voix pour Personne B:</Form.Label>
                <Form.Select value={voiceB} onChange={(e) => setVoiceB(e.target.value)}>
                  {availableVoices.map((voice) => (
                    <option key={voice.id} value={voice.id}>
                      {voice.name} ({voice.gender})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      
      {parsedDialogues.length > 0 && <AudioPlayer dialogues={parsedDialogues} voiceA={voiceA} voiceB={voiceB}  audioRef={audioRef}  isSpeaking={isSpeaking}  setIsSpeaking={setIsSpeaking} language={language}/>}

      {parsedDialogues.map((conv, idx) => (
        <Card className="mb-3" key={idx}>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>🧍 Personne A</strong>
                  <Button variant="link" onClick={() => speak(conv.a, voiceA)} disabled={isSpeaking} title="Lire ce texte">
                    <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                  </Button>
                </div>
                <p>{conv.a}</p>
              </Col>
              <Col md={6}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>🧑 Personne B</strong>
                  <Button variant="link" onClick={() => speak(conv.b, voiceB)} disabled={isSpeaking} title="Lire ce texte">
                    <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                  </Button>
                </div>
                <p>{conv.b}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default DialogueViewer
