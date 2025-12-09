'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';

const Youtube = () => {
  const { user,token } = useAuth();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dialogues, setDialogues] = useState(null); // State to store dialogues
  const router = useRouter();

  const isValidYouTubeUrl = (url) => {
    const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDialogues(null); // Reset dialogues on new submission

    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/german/gerdialogues/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify({ url, userId: user?._id }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate dialogue.');
      }

      const data = await res.json();
      console.log('Generated dialogue:', data);

      // Redirect to the dialogue view page after success
      router.push(`/dashboards/german/dialogues/view/${data.dialogueId}`);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="mb-4">Generieren Sie Dialoge aus YouTube</h2>

      <Card className="mb-4">
        <Card.Header className="bg-light fw-bold">Geben Sie eine YouTube-URL ein</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>YouTube-Video-URL (auf Deutsch)</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <small className="text-muted">
                Die Dialoge werden mit Claude (Anthropic) generiert.
              </small>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  {' '}Generierung...
                </>
              ) : (
                'Dialoge extrahieren und generieren'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {dialogues && (
        <Card className="mt-4">
          <Card.Header className="bg-light fw-bold">Generierte Dialoge</Card.Header>
          <Card.Body>
            <div className="mb-3">
              <strong>Dialog:</strong> <pre>{dialogues}</pre>
            </div>
          </Card.Body>
        </Card>
      )}

      <Button variant="secondary" onClick={() => router.push('/dashboards/german/dialogues')}>
        ⬅  Zurück zur Dialogliste
      </Button>
    </>
  );
};

export default Youtube;