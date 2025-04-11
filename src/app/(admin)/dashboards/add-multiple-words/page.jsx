'use client'
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'

export default function AddWordsPage() {
  const [words, setWords] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [tags, setTags] = useState([]) // Dynamically fetched tags
  const [ignoreExisting, setIgnoreExisting] = useState(true)
  const [noSummary, setNoSummary] = useState(false)
  const [noImage, setNoImage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [fetchingTags, setFetchingTags] = useState(true)
  const [getwords, setGetWords] = useState([])
  const { user } = useAuth()
  const userId = user._id
  const fetchWords = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/words?userId=${userId}`) // Replace with your API endpoint
      const data = await res.json()
      if (data.success) {
        setGetWords(data.words) // Assuming the API returns words in this format
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
  console.log('getwords', getwords)
  useEffect(() => {
    if (userId) {
      fetchWords()
    }
  }, [userId]) // Ensure this runs only when `userId` changes
  // Fetch tags dynamically
  useEffect(() => {
    const fetchTags = async () => {
      try {
        if (!user?._id) return

        const response = await fetch(`/api/tags?userId=${user._id}`)
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
    console.log('[DEBUG] Selected tags:', selected)
    setSelectedTags(selected)
  }

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
  
    const wordList = words
      .split('\n')
      .map((word) => word.trim())
      .filter((word) => word !== '');
  
    if (wordList.length === 0) {
      setError('Please enter at least one word.');
      setLoading(false);
      return;
    }
  
    if (selectedTags.length === 0) {
      setError('Please select at least one tag.');
      setLoading(false);
      return;
    }
  
    try {
      let addedWords = 0;
  
      // Loop through each word and make an API call
      for (const word of wordList) {
        const response = await fetch(`/api/words?userId=${user._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            word, // Send one word at a time
            tags: selectedTags,
            note: 4,
            image: '',
            userId: user._id,
          }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error || `Failed to add word: ${word}`);
        }
  
        addedWords++;
      }
  
      setSuccessMessage(`Successfully added ${addedWords} words!`);
      setWords('');
      setSelectedTags([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCheckDuplicates = () => {
    setError('');
    setSuccessMessage('');
  
    // Split the input into individual words
    const wordList = words.split('\n').map((word) => word.trim()).filter((word) => word !== '');
  
    if (wordList.length === 0) {
      setError('Please enter at least one word to check for duplicates.');
      return;
    }
  
    // Extract existing words from getwords
    const existingWords = getwords.map((wordObj) => wordObj.word.toLowerCase());
  
    // Find duplicates
    const duplicateWords = wordList.filter((word) => existingWords.includes(word.toLowerCase()));
  
    if (duplicateWords.length > 0) {
      setError(`The following words already exist: ${duplicateWords.join(', ')}`);
    } else {
      setSuccessMessage('No duplicates found. You can proceed to add the words.');
    }
  };
  console.log('[DEBUG] User ID:', tags)

  return (
    <Row>
      <Col lg={12}>
        <Container className="mt-4" fluid>
          <h2>➕ Add multiple words</h2>
          <Card className="mt-3">
            <Card.Body>
              <h5>Bulk Add Form</h5>
              <p className="text-muted">Add multiple Spanish words at once</p>

              {error && <Alert variant="danger">{error}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}

              <Row>
                <Col md={8}>
                  <Form.Group controlId="wordList">
                    <Form.Label>Enter one word per line:</Form.Label>
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
                    <Form.Label>Tags (select one or more):</Form.Label>
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
                    <Form.Text muted>Hold Ctrl (or Cmd) to select multiple tags</Form.Text>

                    <div className="mt-3">
                      <Form.Check
                        type="checkbox"
                        label="Do not automatically generate the summary"
                        checked={noSummary}
                        onChange={(e) => setNoSummary(e.target.checked)}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Do not automatically generate the image"
                        checked={noImage}
                        onChange={(e) => setNoImage(e.target.checked)}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Automatically ignore existing words"
                        checked={ignoreExisting}
                        onChange={(e) => setIgnoreExisting(e.target.checked)}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <div className="mt-4 d-flex justify-content-between">
                <Button variant="primary" onClick={handleCheckDuplicates} disabled={loading}>
                  🔍 Check for duplicates
                </Button>
                <Button variant="success" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Submitting...' : '✅ Add the words'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
  )
}
