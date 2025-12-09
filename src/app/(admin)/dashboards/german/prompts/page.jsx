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
Beantworten Sie die Frage ausschließlich auf Spanisch. Verwenden Sie keine englischen Texte, weder in den Beispielen noch bei den Synonymen oder Antonymen.

Erstellen Sie eine detaillierte Zusammenfassung zum Wort {{word}} in folgendem Format:

1. **Verwendung und Häufigkeit**:

- Erläutern Sie, wie häufig das Wort in der Sprache verwendet wird und in welchen Kontexten es üblicherweise vorkommt.

2. **Eselsbrücken**:

- Nennen Sie zwei kreative Eselsbrücken, die Ihnen helfen, sich das Wort zu merken.

3. **Hauptverwendungen**:

- Listen Sie die wichtigsten Kontexte oder Situationen auf, in denen das Wort verwendet wird. Geben Sie für jeden Kontext:

- Geben Sie eine Überschrift an.

- Fügen Sie zwei bis drei Beispielsätze in der Sprache hinzu.

4. **Synonyme**:

- Nennen Sie Synonyme für das Wort.

5. **Antonyme**:

- Nennen Sie Antonyme für das Wort.

Achten Sie auf eine gut strukturierte und leicht verständliche Antwort.
`;

const language = 'german'
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
        setMessage('✅ Nachricht erfolgreich gespeichert!');
        router.push('/dashboards/german')
      } else {
        setMessage(`❌ ${data.error || 'Fehler beim Speichern der Nachricht'}`);
      }
    } catch (err) {
      setMessage('❌ Fehler beim Speichern der Nachricht');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <h3>Benutzerdefinierte Nachricht</h3>
      <Form.Group className="mb-3">
        <Form.Label>Definieren Sie Ihre benutzerdefinierte Nachricht:</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Geben Sie hier Ihre benutzerdefinierte Zusammenfassung ein..."
        />
      </Form.Group>
      <Button onClick={savePrompt} disabled={loading}>
        {loading ? 'Speichern...' : 'Nachricht speichern'}
      </Button>
      {message && <p className="mt-2">{message}</p>}
    </Card>
  );
}
