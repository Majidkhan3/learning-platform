// pages/add-words.js
"use client"
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export default function AddWordsPage() {
  const [words, setWords] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [options] = useState(['medicine', 'food', 'journey', 'family', 'education']);
  const [ignoreExisting, setIgnoreExisting] = useState(true);
  const [noSummary, setNoSummary] = useState(false);
  const [noImage, setNoImage] = useState(false);

  const handleTagChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedTags(selected);
  };

  const handleSubmit = () => {
    // Add your submission logic here
    alert(`Submitting ${words.split('\n').length} words with tags: ${selectedTags.join(', ')}`);
  };

  return (
    <Row>
<Col lg={12}>


    <Container className="mt-4" fluid>
      <h2>➕ Add multiple words</h2>
      <Card className="mt-3">
        <Card.Body>
          <h5>Bulk Add Form</h5>
          <p className="text-muted">Add multiple Spanish words at once</p>
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
                <Form.Control as="select" multiple onChange={handleTagChange}>
                  {options.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text muted>
                  Hold Ctrl (or Cmd) to select multiple tags
                </Form.Text>

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
            <Button variant="primary">🔍 Check for duplicates</Button>
            <Button variant="success" onClick={handleSubmit}>
              ✅ Add the words
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
    </Col>
    </Row>
  );
}
