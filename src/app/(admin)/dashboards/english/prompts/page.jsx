'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';
import { Button, Form, Card } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function PromptsPage() {
  const { user, token } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router=useRouter();

  const DEFAULT_PROMPT = `
   Generate a detailed synthesis for the word {{word}} in the following structured format:

1. **Use and Frequency**:
   - Explain how frequently the word is used in the language and in which contexts it is commonly used. Provide a brief description.

2. **Mnemonics**:
   - Provide two creative mnemonics to help remember the word. These can include phonetic associations, visual stories, or other memory aids.

3. **Main Uses**:
   - List the main contexts or scenarios where the word is used. For each context:
     - Provide a title for the context.
     - Include 2-3 example sentences in the language (without translation).

4. **Synonyms**:
   - Provide a list of synonyms for the word.

5. **Antonyms**:
   - Provide a list of antonyms for the word.

Ensure the response is well-structured, clear, and formatted in a way that is easy to read.
`;

const language='english'
  useEffect(() => {
    if (user?._id) {
      fetch(`/api/users/${user._id}?lang=${language}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.prompt) {
            setPrompt(data.prompt); // ✅ User's custom prompt
          } else {
            setPrompt(DEFAULT_PROMPT); // ✅ Fallback to default
          }
        })
        .catch(() => setPrompt(DEFAULT_PROMPT)); // ✅ If API fails, still show default
    } else {
      setPrompt(DEFAULT_PROMPT);
    }
  }, [user, token]);

  const savePrompt = async () => {
    try {
      setLoading(true);
      setMessage('');
      const res = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt,language }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Prompt saved successfully!');
        router.push('/dashboards/english')
      } else {
        setMessage(`❌ ${data.error || 'Error saving prompt'}`);
      }
    } catch (err) {
      setMessage('❌ Failed to save prompt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <h3>Custom Prompt</h3>
      <Form.Group className="mb-3">
        <Form.Label>Define your custom prompt:</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Define your custom prompt:"
        />
      </Form.Group>
      <Button onClick={savePrompt} disabled={loading}>
        {loading ? 'Saving...' : 'Save Prompt'}
      </Button>
      {message && <p className="mt-2">{message}</p>}
    </Card>
  );
}
