'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';

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
  const [isReading, setIsReading] = useState(false); // To track if reading is in progress
  const audioRef = useRef(null); // To track the currently playing audio

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

  // Fetch available voices from the Polly API
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const res = await fetch('/api/polly'); // Replace with your Polly API endpoint
        const data = await res.json();
        if (res.ok) {
          setAvailableVoices(data); // Assuming the API returns an array of voices
        } else {
          setError(data.error || 'Failed to fetch voices');
        }
      } catch (err) {
        console.error('Error fetching voices:', err);
        setError('Failed to fetch voices');
      }
    };

    fetchVoices();
  }, []);

  const speak = async (text, voice) => {
    try {
      const response = await fetch('/api/polly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice,
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
    console.log('Reading dialogue:', index, dialogues[index]);
    // if (!isReading || index >= dialogues.length) {
    //   console.log('Stopping reading:', index, dialogues[index]);
    //   setIsReading(false); // Stop reading when all dialogues are done or stopped
    //   return;
    // }
  
    const dialogue = dialogues[index];
    console.log('Current dialogue:', dialogue);
    try {
      if (dialogue.a) {
        await speak(dialogue.a, voiceA); // Use Polly to speak Person A's dialogue
      }
      if (dialogue.b) {
        await speak(dialogue.b, voiceB); // Use Polly to speak Person B's dialogue
      }
  
      // Move to the next dialogue
      await readDialoguesSequentially(dialogues, index + 1);
    } catch (error) {
      console.error('Error reading dialogues:', error);
      setIsReading(false); // Stop reading if an error occurs
    }
  };

  const stopReading = () => {
    setIsReading(false);
    if (audioRef.current) {
      audioRef.current.pause(); // Stop the currently playing audio
      audioRef.current = null; // Clear the reference
    }
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
          <Card.Header className="bg-primary text-white">Voice Configuration (Amazon Polly)</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Voice for Person A:</Form.Label>
                  <Form.Select value={voiceA} onChange={(e) => setVoiceA(e.target.value)}>
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
                  <Form.Label>Voice for Person B:</Form.Label>
                  <Form.Select value={voiceB} onChange={(e) => setVoiceB(e.target.value)}>
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

        {/* Dialogue Controls */}
        <div className="d-flex mb-3">
          <Button
            variant="success"
            className="me-2"
            onClick={() => {
              if (!isReading) {
                setIsReading(true);
                readDialoguesSequentially(dialogues);
              }
            }}
            disabled={isReading} // Disable button while reading
          >
            Read All Dialogues
          </Button>
          <Button
            variant="danger"
            onClick={stopReading} // Stop reading when clicked
          >
            Stop
          </Button>
        </div>


        {/* Display Dialogues */}
        {dialogues.map((dialogue, idx) => (
          <Card className="mb-3" key={idx}>
            <Card.Body>
              <Row>
                {dialogue.a && (
                  <Col md={6}>
                    <div className="d-flex align-items-center justify-content-between">
                      <strong>🧍 Person A</strong>
                      <Button variant="link" onClick={() => speak(dialogue.a, voiceA)} title="Read this text">
                        <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                      </Button>
                    </div>
                    <p>{dialogue.a}</p>
                  </Col>
                )}
                {dialogue.b && (
                  <Col md={6}>
                    <div className="d-flex align-items-center justify-content-between">
                      <strong>🧑 Person B</strong>
                      <Button variant="link" onClick={() => speak(dialogue.b, voiceB)} title="Read this text">
                        <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                      </Button>
                    </div>
                    <p>{dialogue.b}</p>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        ))}
      </>
    </div>
  );
};

export default StoryViewer;