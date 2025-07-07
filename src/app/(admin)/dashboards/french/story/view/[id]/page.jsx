'use client'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, Form, Row, Col } from 'react-bootstrap'// Import the new AudioPlayer component
import { Icon } from '@iconify/react/dist/iconify.js'
import AudioPlayer from '../../../../../../../ui/AudioPlayer'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'
import { useRef } from 'react'
import { FaSignLanguage } from 'react-icons/fa'


const preprocessDialogues = (dialogueString) => {
  if (!dialogueString) return []
  const lines = dialogueString.split('\n')
  const dialogues = []
  let currentDialogue = {}

  lines.forEach((line) => {
    const trimmedLine = line.trim()
    if (trimmedLine.includes('Personne A :')) {
      currentDialogue.a = trimmedLine.split('Personne A :')[1]?.trim()
    } else if (trimmedLine.includes('Personne B :')) {
      currentDialogue.b = trimmedLine.split('Personne B :')[1]?.trim()
      if (currentDialogue.a || currentDialogue.b) {
        dialogues.push(currentDialogue)
      }
      currentDialogue = {}
    }
  })

  return dialogues
}

const StoryViewer = () => {
  const { id } = useParams()
  const { user, token } = useAuth()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [voiceA, setVoiceA] = useState()
  const [voiceB, setVoiceB] = useState()
  const [availableVoices, setAvailableVoices] = useState([])
  const [dialogues, setDialogues] = useState([])
  const audioRef = useRef(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

   const path = typeof window !== 'undefined' ? window.location.pathname : ''
     let language = 'es-ES' // Default
     
     if (path.includes('/portugais')) language = 'pt-PT'
     else if (path.includes('/french')) language = 'fr-FR'
     else if (path.includes('/english')) language = 'en-US'


  // Fetch available voices from the Polly API
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const res = await fetch(`/api/polly?language=${language}`)
        const data = await res.json()
        if (res.ok) {
          setAvailableVoices(data)
          if (!voiceA && data.length > 0) setVoiceA(data[0].id)
          if (!voiceB && data.length > 1) setVoiceB(data[1].id || data[0].id)


          console.log('Available voices:', data)
        } else {
          setError(data.error || 'Failed to fetch voices')
        }
      } catch (err) {
        console.error('Error fetching voices:', err)
        setError('Failed to fetch voices')
      }
    }

    fetchVoices()
  }, [])

  // Fetch the story by storyId
  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/french/frstories/create/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        })
        const data = await res.json()
        if (res.ok) {
          setStory(data.story)
          const processedDialogues = preprocessDialogues(data.story?.storyText)
          setDialogues(processedDialogues)
          console.log('Processed dialogues:', processedDialogues)
        } else {
          setError(data.error || 'Failed to fetch the story')
        }
      } catch (err) {
        console.error('Error fetching story:', err)
        setError('Failed to fetch the story')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchStory()
  }, [id])

  // Function to speak individual dialogue - for the individual play buttons
  // const speakSingle = async (text, voice) => {
  //   try {
  //     const response = await fetch('/api/polly', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         text,
  //         voice,
  //         language: 'fr-FR',

  //       }),
  //     })

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch Polly API')
  //     }

  //     const audioBlob = await response.blob()
  //     const audioUrl = URL.createObjectURL(audioBlob)

  //     const audio = new Audio(audioUrl)
  //     audio.onended = () => {
  //       URL.revokeObjectURL(audioUrl)
  //     }

  //     await audio.play()
  //   } catch (error) {
  //     console.error('Error playing single dialogue:', error)
  //   }
  // }
 const speakSingle = async (text, voice) => {
  try {
    // ⛔ Stop and clean up existing audio if playing
    if (audioRef.current) {
      audioRef.current.pause()
      URL.revokeObjectURL(audioRef.current.src)
    }

    setIsSpeaking(true); // ✅ Disable other controls

    const response = await fetch(`/api/polly?language=${language}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        voice,
        language,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Polly API')
    }

    const audioBlob = await response.blob()
    const audioUrl = URL.createObjectURL(audioBlob)

    audioRef.current = new Audio(audioUrl)

    // ✅ Reset isSpeaking on end/error
    audioRef.current.onended = () => {
      setIsSpeaking(false)
      URL.revokeObjectURL(audioUrl)
    }

    audioRef.current.onerror = () => {
      setIsSpeaking(false)
    }

    await audioRef.current.play()
  } catch (error) {
    console.error('Error playing single dialogue:', error)
    setIsSpeaking(false)
  }
}
  return (
    <div>
      {loading && (
        <Col className="text-center w-full justify-center py-5">
          <Icon icon="eos-icons:loading" className="text-primary" width="50" height="50" spin />
          <p className="text-muted">Loading stories...</p>
        </Col>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      {story && (
        <>
          {/* Story Details */}
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-2">
                <strong>FR</strong> {story?.title}
              </h4>
              <p className="mb-1 text-muted">Note: {story?.rating || 'No rating'}</p>
              <p className="mb-1 text-muted">
                📅 <strong>{new Date(story?.creationDate).toLocaleDateString()}</strong>
              </p>
              <p className="mb-0 text-muted">
                <strong>Thème:</strong> {story?.theme}
              </p>
            </Card.Body>
          </Card>

          {/* Voice Configuration */}
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">Configuration vocale (Amazon Polly)</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Voix pour la personne A:</Form.Label>
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
                    <Form.Label>Voix pour la personne B:</Form.Label>
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

          {/* Media Player Controls - Now using the AudioPlayer component */}
          {dialogues.length > 0 && <AudioPlayer dialogues={dialogues} voiceA={voiceA} voiceB={voiceB} audioRef={audioRef} isSpeaking={isSpeaking}
  setIsSpeaking={setIsSpeaking} />}

          {/* Display Dialogues */}
          {dialogues.map((dialogue, idx) => (
            <Card className="mb-3" key={idx}>
              <Card.Body>
                <Row>
                  {dialogue.a && (
                    <Col md={6}>
                      <div className="d-flex align-items-center justify-content-between">
                        <strong>🧍 Personne A</strong>
                        <button className="btn btn-link" onClick={() => speakSingle(dialogue.a, voiceA)} disabled={isSpeaking} title="Read this text">
                          <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                        </button>
                      </div>
                      <p>{dialogue.a}</p>
                    </Col>
                  )}
                  {dialogue.b && (
                    <Col md={6}>
                      <div className="d-flex align-items-center justify-content-between">
                        <strong>🧑 Personne B</strong>
                        <button className="btn btn-link" onClick={() => speakSingle(dialogue.b, voiceB)} disabled={isSpeaking} title="Read this text">
                          <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                        </button>
                      </div>
                      <p>{dialogue.b}</p>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </div>
  )
}
export default StoryViewer
