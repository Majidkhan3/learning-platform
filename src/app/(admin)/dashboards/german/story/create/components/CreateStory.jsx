'use client'

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup, Spinner } from 'react-bootstrap'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'

const CreateStory = () => {
  const { user,token } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const [difficulty, setDifficulty] = useState(0)
  const [theme, setTheme] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [words, setWords] = useState('') // New state for words input
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        if (!user?._id) return

        const response = await fetch(`/api/german/gertags?userId=${user._id}`,{headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,         
        },})
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch tags.')
        }
        setTags(data.tags || [])
      } catch (err) {
        console.error('Error fetching tags:', err.message)
        setError('Failed to fetch tags.')
      }
    }

    fetchTags()
  }, [user])

  const handleTagChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value)
    setSelectedTags(selected)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setLoading(true)

    const wordArray = words.split(',').map((word) => word.trim()) // Convert input to an array of words

    try {
      const response = await fetch('/api/german/gerstories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,         
        },
        body: JSON.stringify({
          theme,
          selectedTags,
          rating: difficulty,
          userId: user?._id,
          words: wordArray.map((word) => ({ word })), // Format words as objects
        }),
      })

      const data = await response.json()

      if (!response.ok) {
         console.error('Server response error:', data)
        throw new Error(data.error || 'Failed to generate the story.')
      }

      setSuccessMessage('Story generated successfully!')
      setTimeout(() => {
        router.push(`/dashboards/german/story/view/${data.storyId}`) // Redirect to the story details page
      }, 2000)
    } catch (err) {
      console.error('Error generating story:', err.message)
      setError(err.message || 'Failed to generate the story.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <strong>DE</strong> Eine Geschichte erstellen
        </h2>
        <Button variant="outline-primary" onClick={() => router.push('/dashboards/german/story')}>
          <Icon icon="mdi:arrow-left" className="me-2" />
          Zurück zu den Geschichten
        </Button>
      </div>

      <Card>
        <Card.Body>
          <h4 className="mb-3">Geschichte konfigurieren</h4>
          <p className="text-muted mb-4">Definieren Sie die Kriterien, um eine Geschichte mit 2 Dialogen auf Deutsch zu generieren</p>

          <Form onSubmit={handleSubmit}>
            {/* <Form.Group className="mb-3">
              <Form.Label>
                Story Title <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter story title"
                required
              />
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>Wähle Tags (optional)</Form.Label>
              <Form.Control as="select" multiple onChange={handleTagChange}>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted">Wählen Sie ein oder mehrere Schlagwörter aus, um die zu verwendenden Wörter zu filtern.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Schwierigkeitsgrad (optional)</Form.Label>
              <div>
                {[1, 2, 3, 4].map((star) => (
                  <Icon
                    key={star}
                    icon={difficulty >= star ? 'mdi:star' : 'mdi:star-outline'}
                    className="me-1 text-warning"
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    onClick={() => setDifficulty(star)}
                  />
                ))}
              </div>
              <Form.Text className="text-muted">Wählen Sie den Schwierigkeitsgrad, um die Wörter zu filtern.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Thema der Geschichte</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="In: Eine Reise nach Südamerika, ein Gespräch in einem Restaurant usw."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <Form.Text className="text-muted">Geben Sie Einzelheiten zum gewünschten Thema der Geschichte an.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
               Wörter (durch Kommas getrennt)
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="z. B. Frühstück, Kaffee, Treffen"
                value={words}
                onChange={(e) => setWords(e.target.value)}

              />
              <Form.Text className="text-muted">Geben Sie die Wörter, die in der Geschichte verwendet werden sollen, durch Kommas getrennt ein.</Form.Text>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Alert variant="info">
              <Icon icon="mdi:information" className="me-2" />
              Die Geschichte enthält zwei Dialoge auf Deutsch, die Wörter aus Ihrem Wortschatz verwenden. Das System versucht, mit bis zu 75 Wörtern eine zusammenhängende Geschichte zu erstellen.
            </Alert>

            <div className="text-end">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Generierung...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:pencil" className="me-2" />
                    Geschichte generieren
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default CreateStory