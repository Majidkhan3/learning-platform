'use client'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { Button, Card, Form, Row, Col } from 'react-bootstrap'

const StoryViewer = () => {
  const { id } = useParams()

  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [voiceA, setVoiceA] = useState('Lucia')
  const [voiceB, setVoiceB] = useState('Enrique')
  const [availableVoices, setAvailableVoices] = useState([])
  const synthRef = useRef(window.speechSynthesis)

  // Fetch the story by storyId
  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/story/create/${id}`)
        const data = await res.json()
        if (res.ok) {
          setStory(data.story)
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

  // Load voices when available
  useEffect(() => {
    const loadVoices = () => {
      const voices = synthRef.current.getVoices()
      setAvailableVoices(voices)
    }

    // Some browsers load voices asynchronously
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = loadVoices
    }

    loadVoices()
  }, [])

  const speak = (text, voiceLabel) => {
    const utterance = new SpeechSynthesisUtterance(text)

    const selectedVoice = availableVoices.find(v =>
      v.name.toLowerCase().includes(voiceLabel.toLowerCase())
    )

    if (selectedVoice) {
      utterance.voice = selectedVoice
    }

    synthRef.current.speak(utterance)
  }

  const stopSpeaking = () => {
    synthRef.current.cancel()
  }

  // if (loading) return <div className="text-center py-5">Loading...</div>
  // if (error) return <div className="text-center text-danger py-5">{error}</div>

  return (
    <div>
      {/* {story && ( */}
        <>
          {/* Story Details */}
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-2">
                <strong>ES</strong> {story?.title}
              </h4>
              <p className="mb-1 text-muted">{story?.rating || 'No rating'}</p>
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
            <Card.Header className="bg-primary text-white">
              Configuration de la synthèse vocale (Amazon Polly)
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Voix pour Personne A:</Form.Label>
                    <Form.Select
                      value={voiceA}
                      onChange={(e) => setVoiceA(e.target.value)}
                    >
                      <option value="Lucia">Lucia (Female)</option>
                      <option value="Conchita">Conchita (Female)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Voix pour Personne B:</Form.Label>
                    <Form.Select
                      value={voiceB}
                      onChange={(e) => setVoiceB(e.target.value)}
                    >
                      <option value="Enrique">Enrique (Male)</option>
                      <option value="Miguel">Miguel (Male)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Dialogue Controls */}
          <div className="d-flex mb-3">
            <Button
              variant="success"
              className="me-2"
              onClick={() => {
                story?.storyText?.split('\n').forEach((line, i) => {
                  const delay = i * 3000
                  setTimeout(() => speak(line, i % 2 === 0 ? voiceA : voiceB), delay)
                })
              }}
            >
              Lire tous les dialogues
            </Button>
            <Button variant="danger" onClick={stopSpeaking}>
              Arrêter
            </Button>
          </div>

          {/* Display Dialogues */}
          {story?.storyText?.split('\n\n').map((dialogue, idx) => (
            <Card className="mb-3" key={idx}>
              <Card.Body>
                <p>{dialogue}</p>
              </Card.Body>
            </Card>
          ))}
        </>
      {/* )} */}
    </div>
  )
}

export default StoryViewer