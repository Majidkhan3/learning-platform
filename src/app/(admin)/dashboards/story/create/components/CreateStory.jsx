'use client'

import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  InputGroup,
} from 'react-bootstrap'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'

const CreateStory = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [difficulty, setDifficulty] = useState(0)
  const [theme, setTheme] = useState('')

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <strong>ES</strong> Create a Story
        </h2>
        <Button variant="outline-primary" onClick={() => router.push('/dashboards/story')}>
          <Icon icon="mdi:arrow-left" className="me-2" />
          Back to stories
        </Button>
      </div>

      <Card>
        <Card.Body>
          <h4 className="mb-3">Story Settings</h4>
          <p className="text-muted mb-4">
            Define the criteria to generate a story with 2 dialogues in Spanish
          </p>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Story Title <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter story title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select tags (optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Select one or more tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <Form.Text className="text-muted">
                Select one or more tags to filter the words to use
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Difficulty level (optional)</Form.Label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    icon={
                      difficulty >= star
                        ? 'mdi:star'
                        : 'mdi:star-outline'
                    }
                    className="me-1 text-warning"
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    onClick={() => setDifficulty(star)}
                  />
                ))}
              </div>
              <Form.Text className="text-muted">
                Select the difficulty level to filter words
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Theme of the story</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ex: A trip to South America, a conversation in a restaurant, etc."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <Form.Text className="text-muted">
                Provide details on the desired theme for the story
              </Form.Text>
            </Form.Group>

            <Alert variant="info">
              <Icon icon="mdi:information" className="me-2" />
              The story will contain two dialogues in Spanish using words from
              your vocabulary. The system will attempt to use up to 75 words
              while creating a coherent story.
            </Alert>

            <div className="text-end">
              <Button variant="primary">
                <Icon icon="mdi:pencil" className="me-2" />
                Generate the story
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default CreateStory
