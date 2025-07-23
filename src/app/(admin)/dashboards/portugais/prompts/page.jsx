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
     Gere uma síntese detalhada para a palavra {{word}} no seguinte formato estruturado e responda inteiramente em português:

1. **Uso e Frequência:**:
   - Explique com que frequência a palavra é usada na língua portuguesa e em quais contextos ela é mais comum. Forneça uma breve descrição.

2. **Mnemônicos:**:
   - Forneça dois mnemônicos criativos para ajudar a lembrar a palavra. Estes podem incluir associações fonéticas, histórias visuais ou outros recursos de memória.

3. **Principais Usos:**:
   - Liste os principais contextos ou cenários em que a palavra é usada. Para cada contexto:
     - Dê um título para o contexto.
     - Inclua 2 a 3 frases de exemplo (em português, sem tradução).

4. **Sinônimos:**:
   - Forneça uma lista de sinônimos da palavra.

5. **Antônimos:**:
   - Forneça uma lista de antônimos da palavra.
   
Toda a resposta deve ser redigida em português claro e bem estruturado, com boa formatação para facilitar a leitura.
`;

const language = 'portuguese'
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
        setMessage('✅ Prompt guardado com sucesso!');
        router.push('/dashboards/portugais')
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
      <h3>Prompt Personalizado</h3>
      <Form.Group className="mb-3">
        <Form.Label>Defina o seu prompt personalizado:</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escreva aqui o seu próprio resumo personalizado..."
        />
      </Form.Group>
      <Button onClick={savePrompt} disabled={loading}>
        {loading ? 'Salvando...' : 'Guardar Prompt'}
      </Button>
      {message && <p className="mt-2">{message}</p>}
    </Card>
  );
}
