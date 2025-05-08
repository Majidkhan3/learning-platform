'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';

const Youtube = () => {
  const { user } = useAuth();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorDetails, setErrorDetails] = useState('');
  const [dialogues, setDialogues] = useState(null);
  const router = useRouter();

  const isValidYouTubeUrl = (url) => {
    const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrorDetails('');
    setDialogues(null);

    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/dialogues/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, userId: user?._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle different error types
        if (data.error?.includes('Transcript is disabled')) {
          setError('This video does not have available transcripts/captions.');
          setErrorDetails(
            'The video owner has disabled transcripts for this video. Please try a different video that has captions enabled.'
          );
        } else if (data.error?.includes('Unable to fetch transcript')) {
          setError('Could not fetch transcript from this video.');
          setErrorDetails(
            'Please make sure the video has captions available and try again, or try with a different video.'
          );
        } else {
          setError(data.error || 'Failed to generate dialogue.');
        }
        throw new Error(data.error || 'Failed to generate dialogue.');
      }

      console.log('Generated dialogue:', data);
      
      // Redirect to the dialogue view page after success
      router.push(`/dashboards/dialogues/view/${data.dialogueId}`);
    } catch (err) {
      console.error('Error details:', err);
      // Error message is already set above
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="mb-4">Generate dialogues from YouTube</h2>

      <Card className="mb-4">
        <Card.Header className="bg-light fw-bold">Enter a YouTube URL</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>YouTube video URL (in Spanish)</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <small className="text-muted">
                Important: The video must have captions/subtitles enabled by the creator.
              </small>
            </Form.Group>

            {error && (
              <Alert variant="danger">
                <strong>{error}</strong>
                {errorDetails && <p className="mt-2 mb-0">{errorDetails}</p>}
              </Alert>
            )}

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  {' '}Generating...
                </>
              ) : (
                'Extract and generate dialogs'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {dialogues && (
        <Card className="mt-4">
          <Card.Header className="bg-light fw-bold">Generated Dialogues</Card.Header>
          <Card.Body>
            <div className="mb-3">
              <strong>Dialogue:</strong> <pre>{dialogues}</pre>
            </div>
          </Card.Body>
        </Card>
      )}

      <Button variant="secondary" onClick={() => router.push('/dashboards/dialogues')}>
        ⬅ Return to the list of dialogues
      </Button>
    </>
  );
};

export default Youtube;