'use client'
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, ProgressBar } from 'react-bootstrap'
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
  const [progress, setProgress] = useState(0) // Progress state
  const { user, token } = useAuth()
  const userId = user._id

  // Fetch existing words from the database
  const fetchWords = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/french/frword?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      let data;
      try {
        data = await res.json();
      } catch (e) {
        const text = await res.text();
        console.error('❌ Failed to parse JSON. Response was:', text);
        throw new Error('Invalid response from server (not JSON)');
      } if (data.success) {
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

        const response = await fetch(`/api/french/frtags?userId=${user._id}`, {
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
  setLoading(true);
  setError('');
  setSuccessMessage('');
  setProgress(0);

  const wordList = words
    .split('\n')
    .map((word) => word.trim())
    .filter((word) => word !== '');

  if (wordList.length === 0) {
    setError('Please enter at least one word.');
    setLoading(false);
    return;
  }

  try {
    let addedWords = 0;
    let filteredWords = [];

    if (ignoreExisting) {
      // ✅ Ignore duplicates (only add new ones)
      filteredWords = wordList.filter(
        (word) => !existingWords.includes(word.toLowerCase())
      );

      if (filteredWords.length === 0) {
        setError('Tous les mots saisis existent déjà dans la base de données.');
        setLoading(false);
        return;
      }
    } else {
      // ❌ Block if duplicates exist
      const duplicateWords = wordList.filter((word) =>
        existingWords.includes(word.toLowerCase())
      );

      if (duplicateWords.length > 0) {
        setError(
          `Les mots suivants existent déjà et ne peuvent pas être ajoutés : ${duplicateWords.join(', ')}`
        );
        setLoading(false);
        return;
      }

      filteredWords = wordList;
    }

    // Loop through each word and make an API call with progress tracking
    for (let i = 0; i < filteredWords.length; i++) {
      const word = filteredWords[i];
      const response = await fetch(`/api/french/frword`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word,
          tags: selectedTags,
          summary: autoGenerateSummary ? undefined : 'no synthesis',
          note: wordRatings[word] || 0,
          autoGenerateImage,
          autoGenerateSummary,
          userId: user._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to add word: ${word}`);
      }

      addedWords++;
      setProgress(Math.round(((i + 1) / filteredWords.length) * 100)); // Update progress
    }

    // UPDATE EXISTING WORDS LIST HERE - RIGHT AFTER SUCCESSFULLY ADDING WORDS
    // Update the existing words list with the newly added words
    const newExistingWords = [
      ...existingWords,
      ...filteredWords.map(word => word.toLowerCase())
    ];
    setExistingWords(newExistingWords);
    
    setSuccessMessage(`Successfully added ${addedWords} words!`);
    setWords('');
    setSelectedTags([]);
    setWordRatings({});
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
    setProgress(0);
  }
};
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
          <h2>➕ Ajouter plusieurs mots</h2>
          <Card className="mt-3">
            <Card.Body>
              <h5> Formulaire d’ajout en masse</h5>
              <p className="text-muted">Ajouter plusieurs mots portugais à la fois</p>

              {error && <Alert variant="danger">{error}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}

              {progress > 0 && (
                <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />
              )}

              <Row>
                <Col md={8}>
                  <Form.Group controlId="wordList">
                    <Form.Label>Entrez un mot par ligne :</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      placeholder="Example: casa&#10;perro&#10;gato&#10;libro"
                      value={words}
                      onChange={(e) => setWords(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="tags">
                    <Form.Label>Étiquettes (sélectionnez-en une ou plusieurs) :</Form.Label>
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
                    <Form.Text muted> Maintenez Ctrl (ou Cmd) pour sélectionner plusieurs étiquettes</Form.Text>

                    <div className="mt-3">
                      <Form.Check
                        type="checkbox"
                        label="Générer automatiquement l’image"
                        checked={autoGenerateImage}
                        onChange={(e) => setAutoGenerateImage(e.target.checked)}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Générer automatiquement le résumé"
                        checked={autoGenerateSummary}
                        onChange={(e) => setAutoGenerateSummary(e.target.checked)}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Ignorer automatiquement les mots existants"
                        checked={ignoreExisting}
                        onChange={(e) => setIgnoreExisting(e.target.checked)}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col>
                  <h5>Définir des notes par étoiles pour les mots</h5>
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
                  🔍 Vérifier les doublons
                </Button>
                <Button variant="success" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Envoi en cours...' : '✅ Ajouter les mots'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
  )
}