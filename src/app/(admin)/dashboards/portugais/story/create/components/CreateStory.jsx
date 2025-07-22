'use client'

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup, Spinner } from 'react-bootstrap'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'

const CreateStory = () => {
  const { user ,token} = useAuth()
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

        const response = await fetch(`/api/portugal/portags?userId=${user._id}`,{
           headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
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
      const response = await fetch('/api/portugal/porstories/create', {
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
        router.push(`/dashboards/portugais/story/view/${data.storyId}`) // Redirect to the story details page
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
          <strong>PT</strong> Criar uma história
        </h2>
        <Button variant="outline-primary" onClick={() => router.push('/dashboards/portugais/story')}>
          <Icon icon="mdi:arrow-left" className="me-2" />
          Voltar para as histórias
        </Button>
      </div>

      <Card>
        <Card.Body>
          <h4 className="mb-3">Configurações da história</h4>
          <p className="text-muted mb-4"> Defina os critérios para gerar uma história com 2 diálogos em português</p>

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
              <Form.Label> Selecione etiquetas (opcional)</Form.Label>
              <Form.Control as="select" multiple onChange={handleTagChange}>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted"> Selecione uma ou mais etiquetas para filtrar as palavras a serem usadas</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nível de dificuldade (opcional)</Form.Label>
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
              <Form.Text className="text-muted">Selecione o nível de dificuldade para filtrar as palavras</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Tema da história</Form.Label>
              <Form.Control
                as="textarea"
                placeholder=" Ex: Uma viagem à América do Sul, uma conversa em um restaurante, etc."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <Form.Text className="text-muted">Forneça detalhes sobre o tema desejado para a história</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Palavras (separadas por vírgulas)
              </Form.Label>
              <Form.Control
                type="text"
                placeholder=" ex.: café da manhã, café, reunião"
                value={words}
                onChange={(e) => setWords(e.target.value)}
              />
              <Form.Text className="text-muted"> Insira as palavras a serem usadas na história, separadas por vírgulas</Form.Text>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Alert variant="info">
              <Icon icon="mdi:information" className="me-2" />
              A história conterá dois diálogos em português usando palavras do seu vocabulário. O sistema tentará usar até 75 palavras ao criar uma história coerente.
            </Alert>

            <div className="text-end">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:pencil" className="me-2" />
                    Gerar a história
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