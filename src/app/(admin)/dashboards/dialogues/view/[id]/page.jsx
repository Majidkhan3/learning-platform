'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';

const DialogueViewer = () => {
  const { id } = useParams();
  const [dialogue, setDialogue] = useState(null);
  const [parsedDialogues, setParsedDialogues] = useState([]); // Store parsed dialogues
  const [voiceA, setVoiceA] = useState('');
  const [voiceB, setVoiceB] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]); // Store voices fetched from API
  const [isReading, setIsReading] = useState(false); // To track if reading is in progress
  const audioRef = useRef(null); // To track the currently playing audio

  useEffect(() => {
    if (id) {
      fetch(`/api/dialogues/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.dialogue) {
            setDialogue(data.dialogue);
            parseDialogues(data.dialogue);
          } else {
            console.error('Error: No dialogue data found.');
          }
        })
        .catch((error) => console.error('Error fetching dialogue:', error));
    }
  }, [id]);

  useEffect(() => {
    // Fetch available voices from the Polly API
    fetch('/api/polly')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAvailableVoices(data);
          // Set default voices for Person A and Person B
          if (data.length > 0) {
            setVoiceA(data[0].id); // Default to the first voice
            setVoiceB(data[1]?.id || data[0].id); // Default to the second voice or the first if only one voice is available
          }
        } else {
          console.error('Error: Invalid voices data from API.');
        }
      })
      .catch((error) => console.error('Error fetching voices:', error));
  }, []);

  const parseDialogues = (dialogueString) => {
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

    setParsedDialogues(dialogues);
  };

  const speak = async (text, voiceLabel) => {
    try {
      const response = await fetch('/api/polly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice: voiceLabel,
          language: 'es-ES', // Adjust language as needed
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Polly API');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio; // Track the current audio instance
      await new Promise((resolve, reject) => {
        audio.onended = resolve; // Resolve when the audio finishes
        audio.onerror = reject; // Reject if there's an error
        audio.play();
      });
    } catch (error) {
      console.error('Error fetching Polly API:', error);
    }
  };

  const readDialoguesSequentially = async (dialogues, index = 0) => {
    if (!isReading || index >= dialogues.length) {
      setIsReading(false); // Stop reading when all dialogues are done or stopped
      return;
    }

    const dialogue = dialogues[index];
    if (dialogue.a) {
      await speak(dialogue.a, voiceA); // Speak Person A's dialogue
    }
    if (dialogue.b) {
      await speak(dialogue.b, voiceB); // Speak Person B's dialogue
    }

    // Move to the next dialogue
    readDialoguesSequentially(dialogues, index + 1);
  };

  const stopReading = () => {
    setIsReading(false);
    if (audioRef.current) {
      audioRef.current.pause(); // Stop the currently playing audio
      audioRef.current = null; // Clear the reference
    }
  };

  if (!dialogue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>
        📢 Dialogues générés pour YouTube -{' '}
        <a href={dialogue.url} target="_blank" rel="noopener noreferrer">
          {dialogue.url}
        </a>
      </h3>

      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          Configuration de la synthèse vocale (Amazon Polly)
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Voix pour Personne A:</Form.Label>
                <Form.Select
                  value={voiceA}
                  onChange={(e) => setVoiceA(e.target.value)}
                >
                  {availableVoices.map((voice) => (
                    <option key={voice.id} value={voice.id}>
                      {voice.name} ({voice.gender})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Voix pour Personne B:</Form.Label>
                <Form.Select
                  value={voiceB}
                  onChange={(e) => setVoiceB(e.target.value)}
                >
                  {availableVoices.map((voice) => (
                    <option key={voice.id} value={voice.id}>
                      {voice.name} ({voice.gender})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex mb-3">
        <Button
          variant="success"
          className="me-2"
          onClick={() => {
            if (!isReading) {
              setIsReading(true);
              readDialoguesSequentially(parsedDialogues);
            }
          }}
          disabled={isReading} // Disable button while reading
        >
          Lire tous les dialogues
        </Button>
        <Button variant="danger" onClick={stopReading}>
          Arrêter
        </Button>
      </div>

      {parsedDialogues.map((conv, idx) => (
        <Card className="mb-3" key={idx}>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>🧍 Personne A</strong>
                  <Button
                    variant="link"
                    onClick={() => speak(conv.a, voiceA)}
                    title="Lire ce texte"
                  >
                    <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                  </Button>
                </div>
                <p>{conv.a}</p>
              </Col>
              <Col md={6}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>🧑 Personne B</strong>
                  <Button
                    variant="link"
                    onClick={() => speak(conv.b, voiceB)}
                    title="Lire ce texte"
                  >
                    <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                  </Button>
                </div>
                <p>{conv.b}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default DialogueViewer;