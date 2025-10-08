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
  const [difficulty, setDifficulty] = useState(-1) // Changed to -1 to indicate no selection
  const [theme, setTheme] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [words, setWords] = useState('') // New state for words input
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const [fetchingWords, setFetchingWords] = useState(false) // New state for fetching words

  useEffect(() => {
    const fetchTags = async () => {
      try {
        if (!user?._id) return

        const response = await fetch(`/api/english/entags?userId=${user._id}`, {
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

  // Function to fetch words by rating and/or tags
  const fetchWords = async (rating = null, tags = null) => {
    if (!user?._id) return

    setFetchingWords(true)
    try {
      let url = `/api/english/enword?userId=${user._id}`
      
      if (rating !== null && rating >= 0) {
        url += `&rating=${rating}`
      }
      
      if (tags && tags.length > 0) {
        url += `&tags=${tags.join(',')}`
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch words.')
      }

      // Extract words and join them with commas
      const wordList = data.words?.map(wordObj => wordObj.word).join(', ') || ''
      setWords(wordList)
    } catch (err) {
      console.error('Error fetching words:', err.message)
      setError('Failed to fetch words.')
    } finally {
      setFetchingWords(false)
    }
  }

  // Function to fetch words by rating (0-4)
  const fetchWordsByRating = async (rating) => {
    await fetchWords(rating, selectedTags.length > 0 ? selectedTags : null)
  }

  // Modified handleStarClick function to handle 0-4 rating and deselection
  const handleStarClick = (star) => {
    // If clicking the same star, deselect it
    if (difficulty === star) {
      setDifficulty(-1)
      setWords('') // Clear words when deselecting
    } else {
      setDifficulty(star)
      fetchWordsByRating(star)
    }
  }

  const handleTagChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value)
    setSelectedTags(selected)
    
    // Fetch words based on selected tags and current difficulty
    if (selected.length > 0) {
      fetchWords(difficulty >= 0 ? difficulty : null, selected)
    } else if (difficulty >= 0) {
      // If no tags selected but difficulty is set, fetch by difficulty only
      fetchWordsByRating(difficulty)
    } else {
      // Clear words if no tags and no difficulty
      setWords('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setLoading(true)

    const wordArray = words.split(',').map((word) => word.trim()).filter(word => word) // Filter out empty words

    try {
      const response = await fetch('/api/english/enstories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
        body: JSON.stringify({
          // title,
          theme,
          selectedTags,
          rating: difficulty >= 0 ? difficulty : null, // Send null if no difficulty selected
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
        router.push(`/dashboards/english/story/view/${data.storyId}`) // Redirect to the story details page
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
          <strong>ES</strong> Create a Story
        </h2>
        <Button variant="outline-primary" onClick={() => router.push('/dashboards/english/story')}>
          <Icon icon="mdi:arrow-left" className="me-2" />
          Back to stories
        </Button>
      </div>

      <Card>
        <Card.Body>
          <h4 className="mb-3">Story Settings</h4>
          <p className="text-muted mb-4">Define the criteria to generate a story with 2 dialogues in English</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select tags (optional)</Form.Label>
              <Form.Control as="select" multiple onChange={handleTagChange}>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted">Select one or more tags to filter the words to use</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Difficulty level (optional)</Form.Label>
              <div className="d-flex align-items-center">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Icon
                    key={star}
                    icon={difficulty >= star ? 'mdi:star' : 'mdi:star-outline'}
                    className="me-1 text-warning"
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    onClick={() => handleStarClick(star)}
                  />
                ))}
                {difficulty >= 0 && (
                  <Button
                    variant="link"
                    size="sm"
                    className="ms-2 p-0 text-muted"
                    onClick={() => {
                      setDifficulty(-1)
                      setWords('')
                    }}
                  >
                    Clear
                  </Button>
                )}
                {fetchingWords && (
                  <Spinner animation="border" size="sm" className="ms-2" />
                )}
              </div>
              <Form.Text className="text-muted">
                Select the difficulty level (0-4 stars) to fetch words with that rating. Click the same star to deselect.
                {difficulty >= 0 && ` Currently selected: ${difficulty} star${difficulty !== 1 ? 's' : ''}`}
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
              <Form.Text className="text-muted">Provide details on the desired theme for the story</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Words (comma-separated)
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., breakfast, coffee, meeting"
                value={words}
                onChange={(e) => setWords(e.target.value)}               
              />
              <Form.Text className="text-muted">
                Enter words to be used in the story, separated by commas. 
                {difficulty >= 0 && ` Words with ${difficulty}-star rating have been loaded.`}
              </Form.Text>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Alert variant="info">
              <Icon icon="mdi:information" className="me-2" />
              The story will contain two dialogues in English using words from your vocabulary. The system will attempt to use up to 75 words while
              creating a coherent story.
            </Alert>

            <div className="text-end">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:pencil" className="me-2" />
                    Generate the story
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