'use client'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, Form, Row, Col } from 'react-bootstrap'
import AudioPlayer from '../../../../../../ui/AudioPlayer' // Import the new AudioPlayer component
import { Icon } from '@iconify/react/dist/iconify.js'

const preprocessDialogues = (dialogueString) => {
  if (!dialogueString) return []
  const lines = dialogueString.split('\n')
  const dialogues = []
  let currentDialogue = {}

  lines.forEach((line) => {
    const trimmedLine = line.trim()
    if (trimmedLine.includes('Personne A:')) {
      currentDialogue.a = trimmedLine.split('Personne A:')[1]?.trim()
    } else if (trimmedLine.includes('Personne B:')) {
      currentDialogue.b = trimmedLine.split('Personne B:')[1]?.trim()
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
  
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [voiceA, setVoiceA] = useState('Lucia')
  const [voiceB, setVoiceB] = useState('Enrique')
  const [availableVoices, setAvailableVoices] = useState([])
  const [dialogues, setDialogues] = useState([])

  // Fetch available voices from the Polly API
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const res = await fetch('/api/polly')
        const data = await res.json()
        if (res.ok) {
          setAvailableVoices(data)
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
        const res = await fetch(`/api/story/create/${id}`,{
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,         
        },
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
  const speakSingle = async (text, voice) => {
    try {
      const response = await fetch('/api/polly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice,
          language: 'es-ES',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch Polly API')
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      const audio = new Audio(audioUrl)
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl)
      }

      await audio.play()
    } catch (error) {
      console.error('Error playing single dialogue:', error)
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
                <strong>ES</strong> {story?.title}
              </h4>
              <p className="mb-1 text-muted">Rating: {story?.rating || 'No rating'}</p>
              <p className="mb-1 text-muted">
                📅 <strong>{new Date(story?.creationDate).toLocaleDateString()}</strong>
              </p>
              <p className="mb-0 text-muted">
                <strong>Theme:</strong> {story?.theme}
              </p>
            </Card.Body>
          </Card>

          {/* Voice Configuration */}
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">Voice Configuration (Amazon Polly)</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Voice for Person A:</Form.Label>
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
                    <Form.Label>Voice for Person B:</Form.Label>
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
          {dialogues.length > 0 && <AudioPlayer dialogues={dialogues} voiceA={voiceA} voiceB={voiceB} />}

          {/* Display Dialogues */}
          {dialogues.map((dialogue, idx) => (
            <Card className="mb-3" key={idx}>
              <Card.Body>
                <Row>
                  {dialogue.a && (
                    <Col md={6}>
                      <div className="d-flex align-items-center justify-content-between">
                        <strong>🧍 Person A</strong>
                        <button className="btn btn-link" onClick={() => speakSingle(dialogue.a, voiceA)} title="Read this text">
                          <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                        </button>
                      </div>
                      <p>{dialogue.a}</p>
                    </Col>
                  )}
                  {dialogue.b && (
                    <Col md={6}>
                      <div className="d-flex align-items-center justify-content-between">
                        <strong>🧑 Person B</strong>
                        <button className="btn btn-link" onClick={() => speakSingle(dialogue.b, voiceB)} title="Read this text">
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
