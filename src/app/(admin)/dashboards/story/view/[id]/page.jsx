'use client'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { Button, Card, Form, Row, Col } from 'react-bootstrap'
const preprocessDialogues = (dialogueString) => {
  const lines = dialogueString.split('\n');
  const dialogues = [];
  let currentDialogue = {};

  lines.forEach((line) => {
    if (line.includes('Persona A:') || line.includes('Personne A:')) {
      currentDialogue.a = line.split(/Persona A:|Personne A:/)[1]?.trim();
    } else if (line.includes('Persona B:') || line.includes('Personne B:')) {
      currentDialogue.b = line.split(/Persona B:|Personne B:/)[1]?.trim();
      dialogues.push(currentDialogue); // Add the completed dialogue
      currentDialogue = {}; // Reset for the next dialogue
    }
  });

  return dialogues;
};

const StoryViewer = () => {
  const { id } = useParams();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [voiceA, setVoiceA] = useState('Lucia');
  const [voiceB, setVoiceB] = useState('Enrique');
  const [availableVoices, setAvailableVoices] = useState([]);
  const synthRef = useRef(window.speechSynthesis);

  // Fetch the story by storyId
  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/story/create/${id}`);
        const data = await res.json();
        if (res.ok) {
          setStory(data.story);
        } else {
          setError(data.error || 'Failed to fetch the story');
        }
      } catch (err) {
        console.error('Error fetching story:', err);
        setError('Failed to fetch the story');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStory();
  }, [id]);

  // Load voices when available
  useEffect(() => {
    const loadVoices = () => {
      const voices = synthRef.current.getVoices();
      setAvailableVoices(voices);
    };

    // Some browsers load voices asynchronously
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const speak = (text, voiceLabel) => {
    const utterance = new SpeechSynthesisUtterance(text);

    const selectedVoice = availableVoices.find((v) =>
      v.name.toLowerCase().includes(voiceLabel.toLowerCase())
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    synthRef.current.cancel();
  };

  const dialogues = story?.storyText ? preprocessDialogues(story.storyText) : [];

  return (
    <div>
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
          <Card.Header className="bg-primary text-white">Configuration de la synthèse vocale (Amazon Polly)</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Voix pour Personne A:</Form.Label>
                  <Form.Select value={voiceA} onChange={(e) => setVoiceA(e.target.value)}>
                    <option value="Lucia">Lucia (Female)</option>
                    <option value="Conchita">Conchita (Female)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Voix pour Personne B:</Form.Label>
                  <Form.Select value={voiceB} onChange={(e) => setVoiceB(e.target.value)}>
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
              dialogues.forEach((dialogue, i) => {
                const delay = i * 3000;
                if (dialogue.a) setTimeout(() => speak(dialogue.a, voiceA), delay);
                if (dialogue.b) setTimeout(() => speak(dialogue.b, voiceB), delay + 1500);
              });
            }}
          >
            Lire tous les dialogues
          </Button>
          <Button variant="danger" onClick={stopSpeaking}>
            Arrêter
          </Button>
        </div>

        {/* Display Dialogues */}
        {dialogues.map((dialogue, idx) => (
          <div key={idx}>
            {dialogue.a && (
              <Card className="mb-3">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between">
                    <strong>🧍 Personne A</strong>
                    <Button variant="link" onClick={() => speak(dialogue.a, voiceA)} title="Lire ce texte">
                      <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                    </Button>
                  </div>
                  <p>{dialogue.a}</p>
                </Card.Body>
              </Card>
            )}
            {dialogue.b && (
              <Card className="mb-3">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between">
                    <strong>🧑 Personne B</strong>
                    <Button variant="link" onClick={() => speak(dialogue.b, voiceB)} title="Lire ce texte">
                      <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                    </Button>
                  </div>
                  <p>{dialogue.b}</p>
                </Card.Body>
              </Card>
            )}
          </div>
        ))}
      </>
    </div>
  );
};

export default StoryViewer;
