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
Générez une synthèse détaillée pour le mot {{word}} dans le format structuré suivant :
1. **Utilisation et Fréquence**:
   - Expliquez à quelle fréquence le mot est utilisé dans la langue et dans quels contextes il est couramment employé. Fournissez une brève description.

2. **Mnémoniques**:
   - Fournissez deux mnémoniques créatifs pour aider à mémoriser le mot. Ceux-ci peuvent inclure des associations phonétiques, des histoires visuelles ou d'autres aides-mémoire.

3. **Utilisations Principales**:
   - Listez les principaux contextes ou scénarios où le mot est utilisé. Pour chaque contexte :
     - Donnez un titre au contexte.
     - Incluez 2-3 phrases d'exemple dans la langue (sans traduction).

4. **Synonymes**:
   - Fournissez une liste de synonymes du mot.

5. *Antonymes**:
   - Fournissez une liste d'antonymes du mot.

Assurez-vous que la réponse est bien structurée, claire et formatée de manière à être facile à lire.Toute la réponse doit être rédigée en français, y compris les mnémoniques, les exemples, les synonymes et les antonymes.
Fournissez uniquement du contenu en français, y compris les phrases d'exemple, les synonymes et les antonymes.
Asegúrate de que la respuesta esté bien estructurada y fácil de leer.
`;

const language = 'french'
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
        setMessage('✅ Linvite a été enregistrée avec succès !');
        router.push('/dashboards/french')
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
      <h3>Invite personnalisée</h3>
      <Form.Group className="mb-3">
        <Form.Label>Définissez votre invite personnalisée :</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Rédigez votre propre résumé personnalisé ici…"
        />
      </Form.Group>
      <Button onClick={savePrompt} disabled={loading}>
        {loading ? 'Enregistrement...' : 'Enregistrer linvite'}
      </Button>
      {message && <p className="mt-2">{message}</p>}
    </Card>
  );
}
