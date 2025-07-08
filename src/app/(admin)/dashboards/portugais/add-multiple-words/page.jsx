'use client'
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'

export default function AddWordsPage() {
  const [words, setWords] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [tags, setTags] = useState([])
  const [ignoreExisting, setIgnoreExisting] = useState(true)
  const [autoGenerateImage, setAutoGenerateImage] = useState(false)
  const [autoGenerateSummary, setAutoGenerateSummary] = useState(false) // New state for auto-generate summary
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [fetchingTags, setFetchingTags] = useState(true)
  const [existingWords, setExistingWords] = useState([]) // Store existing words from the database
  const [wordRatings, setWordRatings] = useState({})
  const { user ,token } = useAuth()
  const userId = user._id

  // Fetch existing words from the database
  const fetchWords = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/portugal/porword?userId=${userId}`,{
         headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          
        }
      })
      const data = await res.json()
      if (data.success) {
        setExistingWords(data.words.map((wordObj) => wordObj.word.toLowerCase())) // Store existing words in lowercase
      } else {
        setError(data.error || 'Failed to fetch words')
      }
    } catch (err) {
      console.error('Error fetching words:', err)
      setError('Failed to fetch words')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchWords()
    }
  }, [userId])

  // Fetch tags from the backend
  useEffect(() => {
    const fetchTags = async () => {
      try {
        if (!user?._id) return

        const response = await fetch(`/api/portugal/portags?userId=${user._id}`,{
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
      } finally {
        setFetchingTags(false)
      }
    }

    fetchTags()
  }, [user])

  const handleTagChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value)
    setSelectedTags(selected)
  }

  const handleRatingChange = (word, rating) => {
    setWordRatings((prevRatings) => ({
      ...prevRatings,
      [word]: rating,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setSuccessMessage('')

    const wordList = words
      .split('\n')
      .map((word) => word.trim())
      .filter((word) => word !== '')

    if (wordList.length === 0) {
      setError('Please enter at least one word.')
      setLoading(false)
      return
    }

    try {
      let addedWords = 0

      // Filter out existing words if ignoreExisting is true
      const filteredWords = ignoreExisting
        ? wordList.filter((word) => !existingWords.includes(word.toLowerCase()))
        : wordList

      if (filteredWords.length === 0) {
        setError('All the entered words already exist in the database.')
        setLoading(false)
        return
      }

      // Loop through each word and make an API call
      for (const word of filteredWords) {
        const response = await fetch(`/api/portugal/porword?userId=${user._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Ensure you have the token available
          },
          body: JSON.stringify({
            word, // Send one word at a time
            tags: selectedTags,
            summary:"no synthesis",
            note: wordRatings[word] || 0, // Default to 0 if no rating is selected
            autoGenerateImage, // Pass the autoGenerateImage flag
            autoGenerateSummary, // Pass the autoGenerateSummary flag
            userId: user._id,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || `Failed to add word: ${word}`)
        }

        addedWords++
      }

      setSuccessMessage(`Successfully added ${addedWords} words!`)
      setWords('')
      setSelectedTags([])
      setWordRatings({})
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckDuplicates = () => {
    setError('')
    setSuccessMessage('')

    // Split the input into individual words
    const wordList = words
      .split('\n')
      .map((word) => word.trim())
      .filter((word) => word !== '')

    if (wordList.length === 0) {
      setError('Please enter at least one word to check for duplicates.')
      return
    }

    // Find duplicates
    const duplicateWords = wordList.filter((word) => existingWords.includes(word.toLowerCase()))

    if (duplicateWords.length > 0) {
      setError(`The following words already exist: ${duplicateWords.join(', ')}`)
    } else {
      setSuccessMessage('No duplicates found. You can proceed to add the words.')
    }
  }

  return (
    <Row>
      <Col lg={12}>
        <Container className="mt-4" fluid>
          <h2>➕  Adicionar várias palavras</h2>
          <Card className="mt-3">
            <Card.Body>
              <h5>Formulário de adição em massa</h5>
              <p className="text-muted">Adicionar várias palavras em português de uma vez</p>

              {error && <Alert variant="danger">{error}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}

              <Row>
                <Col md={8}>
                  <Form.Group controlId="wordList">
                    <Form.Label>Insira uma palavra por linha:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      placeholder="exemplo: casa&#10;perro&#10;gato&#10;libro"
                      value={words}
                      onChange={(e) => setWords(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="tags">
                    <Form.Label>Etiquetas (selecione uma ou mais):</Form.Label>
                    {fetchingTags ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <Form.Control as="select" multiple onChange={handleTagChange}>
                        {tags.map((tag) => (
                          <option key={tag._id} value={tag.name}>
                            {tag.name}
                          </option>
                        ))}
                      </Form.Control>
                    )}
                    <Form.Text muted>Mantenha pressionado Ctrl (ou Cmd) para selecionar várias etiquetas</Form.Text>

                    <div className="mt-3">
                      <Form.Check
                        type="checkbox"
                        label="Gerar a imagem automaticamente"
                        checked={autoGenerateImage}
                        onChange={(e) => setAutoGenerateImage(e.target.checked)}
                      />
                      <Form.Check
                        type="checkbox"
                        label=" Gerar o resumo automaticamente"
                        checked={autoGenerateSummary}
                        onChange={(e) => setAutoGenerateSummary(e.target.checked)}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Ignorar automaticamente as palavras existentes"
                        checked={ignoreExisting}
                        onChange={(e) => setIgnoreExisting(e.target.checked)}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col>
                  <h5>Definir classificações por estrelas para as palavras</h5>
                  {words
                    .split('\n')
                    .map((word) => word.trim())
                    .filter((word) => word !== '')
                    .map((word) => (
                      <div key={word} className="d-flex align-items-center mb-2">
                        <span className="me-3">{word}</span>
                        {[1, 2, 3, 4].map((star) => (
                          <span
                            key={star}
                            className={`me-2 ${wordRatings[word] >= star ? 'text-warning' : 'text-muted'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleRatingChange(word, star)}>
                            ★
                          </span>
                        ))}
                      </div>
                    ))}
                </Col>
              </Row>

              <div className="mt-4 d-flex justify-content-between">
                <Button variant="primary" onClick={handleCheckDuplicates} disabled={loading}>
                  🔍  Verificar duplicatas
                </Button>
                <Button variant="success" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Enviando...' : '✅  Adicionar as palavras'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
  )
}