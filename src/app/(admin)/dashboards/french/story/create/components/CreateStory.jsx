'use client'

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup, Spinner } from 'react-bootstrap'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'

const CreateStory = () => {
  const { user, token } = useAuth()
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

        const response = await fetch(`/api/french/frtags?userId=${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        })
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
      const response = await fetch('/api/french/frstories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Ensure you have the token available
        },
        body: JSON.stringify({
          // title,
          theme,
          selectedTags,
          rating: difficulty,
          userId: user?._id,
          words: wordArray.map((word) => ({ word })), // Format words as objects
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate the story.')
      }

      setSuccessMessage('Story generated successfully!')
      setTimeout(() => {
        router.push(`/dashboards/french/story/view/${data.storyId}`) // Redirect to the story details page
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
          <strong>FR</strong> Créer une histoire
        </h2>
        <Button variant="outline-primary" onClick={() => router.push('/dashboards/french/story')}>
          <Icon icon="mdi:arrow-left" className="me-2" />
          Retour aux histoires
        </Button>
      </div>

      <Card>
        <Card.Body>
          <h4 className="mb-3"> Paramètres de l’histoire</h4>
          <p className="text-muted mb-4"> Définissez les critères pour générer une histoire avec 2 dialogues en français</p>

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
              <Form.Label> Sélectionnez des étiquettes (optionnel)</Form.Label>
              <Form.Control as="select" multiple onChange={handleTagChange}>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted"> Sélectionnez une ou plusieurs étiquettes pour filtrer les mots à utiliser</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Niveau de difficulté (optionnel)</Form.Label>
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
              <Form.Text className="text-muted">Sélectionnez le niveau de difficulté pour filtrer les mots</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Thème de l’histoire</Form.Label>
              <Form.Control
                as="textarea"
                placeholder=" Ex : Un voyage en Amérique du Sud, une conversation dans un restaurant, etc."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <Form.Text className="text-muted">Fournissez des détails sur le thème souhaité pour l’histoire</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Mots (séparés par des virgules) 
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="ex. : petit-déjeuner, café, réunion"
                value={words}
                onChange={(e) => setWords(e.target.value)}
              />
              <Form.Text className="text-muted"> Entrez les mots à utiliser dans l’histoire, séparés par des virgules</Form.Text>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Alert variant="info">
              <Icon icon="mdi:information" className="me-2" />
              L’histoire contiendra deux dialogues en français utilisant des mots de votre vocabulaire. Le système tentera d’utiliser jusqu’à 75 mots tout en créant une histoire cohérente..
            </Alert>

            <div className="text-end">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Générateur...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:pencil" className="me-2" />
                    Générer l'histoire
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