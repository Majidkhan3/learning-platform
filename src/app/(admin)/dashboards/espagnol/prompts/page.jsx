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
Responde exclusivamente en español. No incluyas texto en inglés, ni en los ejemplos ni en los sinónimos o antónimos.
Genera una síntesis detallada para la palabra {{word}} en el siguiente formato estructurado:

1. **Uso y Frecuencia**:
   - Explica con qué frecuencia se utiliza la palabra en el idioma y en qué contextos es comúnmente usada.

2. **Mnemotecnias**:
   - Proporciona dos mnemotecnias creativas para ayudar a recordar la palabra.

3. **Usos Principales**:
   - Enumera los principales contextos o escenarios en los que se utiliza la palabra. Para cada contexto:
     - Proporciona un título para el contexto.
     - Incluye de 2 a 3 frases de ejemplo en el idioma.

4. **Sinónimos**:
   - Proporciona una lista de sinónimos de la palabra.

5. **Antónimos**:
   - Proporciona una lista de antónimos de la palabra.

Asegúrate de que la respuesta esté bien estructurada y fácil de leer.
`;

const language = 'spanish'
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
        setMessage('✅ ¡Mensaje guardado exitosamente!');
        router.push('/dashboards/espagnol')
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
      <h3>Mensaje personalizado</h3>
      <Form.Group className="mb-3">
        <Form.Label>Defina su mensaje personalizado:</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe tu propio resumen personalizado aquí..."
        />
      </Form.Group>
      <Button onClick={savePrompt} disabled={loading}>
        {loading ? 'Guardar...' : 'Mensaje para guardar'}
      </Button>
      {message && <p className="mt-2">{message}</p>}
    </Card>
  );
}
