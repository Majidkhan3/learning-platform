'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Col, Row, Card, Form, Button, Badge, Image } from 'react-bootstrap';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';
import dynamic from 'next/dynamic';
import { EditorState, convertFromRaw, convertToRaw,ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const EditPortugais = ({ params }) => {
  const { user, token } = useAuth();
  const userId = user?._id || '';
  const id = params.id;
  const router = useRouter();

  const [formData, setFormData] = useState({
    word: '',
    selectedTags: [],
    summary: EditorState.createEmpty(),
    image: '',
    note: 0,
    autoGenerateImage: false,
    autoGenerateSummary: false,
  });

  const [availableTags, setAvailableTags] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

    // ✅ Fetch word data by ID
  useEffect(() => {
    if (id) {
      fetch(`/api/portugal/porword/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            const wordData = result.word;

            // ✅ Handle summary (DraftJS JSON or plain text)
            let editorState;
            try {
              if (wordData.summary) {
                if (wordData.summary.startsWith('{')) {
                  editorState = EditorState.createWithContent(
                    convertFromRaw(JSON.parse(wordData.summary))
                  );
                } else {
                  // ✅ Plain text → convert to DraftJS state
                  editorState = EditorState.createWithContent(
                    ContentState.createFromText(wordData.summary)
                  );
                }
              } else {
                editorState = EditorState.createEmpty();
              }
            } catch (e) {
              console.error('Error parsing summary:', e);
              editorState = EditorState.createEmpty();
            }

            setFormData({
              word: wordData.word,
              selectedTags: wordData.tags || [],
              summary: editorState,
              image: wordData.image || '',
              note: wordData.note || 0,
              autoGenerateImage: wordData.autoGenerateImage || false,
              autoGenerateSummary: wordData.autoGenerateSummary || false,
            });
          } else {
            console.error('Error fetching data:', result.error);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [id]);

  // ✅ Fetch available tags
  useEffect(() => {
    fetch(`/api/portugal/portags?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAvailableTags(data.tags);
        } else {
          setError(data.error || 'Falha ao buscar etiquetas');
        }
      })
      .catch((err) => {
        console.error('Error fetching tags:', err);
        setError('Falha ao buscar etiquetas');
      });
  }, [userId, token]);

  // ✅ Handlers
  const handleWordChange = (e) => {
    setFormData((prev) => ({ ...prev, word: e.target.value }));
  };

  const toggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleAutoGenerateImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      autoGenerateImage: e.target.checked,
    }));
  };

  const handleAutoGenerateSummaryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      autoGenerateSummary: e.target.checked,
    }));
  };

  const onEditorStateChange = (editorState) => {
    setFormData((prev) => ({ ...prev, summary: editorState }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, note: rating }));
  };

  // ✅ Save Content
  const saveContent = async () => {
    if (!formData.word.trim()) {
      setError('A palavra é obrigatória');
      return;
    }

    try {
      setLoading(true);
      setError('');

 const payload = {
   word: formData.word,
   tags: formData.selectedTags,
   image: formData.image,
   note: formData.note,
   autoGenerateImage: formData.autoGenerateImage,
   autoGenerateSummary: formData.autoGenerateSummary,
   summary: formData.autoGenerateSummary
     ? '' // ✅ Important: tells backend to regenerate using user's prompt
     : JSON.stringify(convertToRaw(formData.summary.getCurrentContent())),
   userId, // ✅ Make sure this is included!
 };
      const response = await fetch(`/api/portugal/porword/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Palavra atualizada com sucesso!');
        router.push('/dashboards/portugais');
      } else {
        setError(data.error || 'Falha ao atualizar a palavra');
      }
    } catch (err) {
      console.error('Error updating word:', err);
      setError('Falha ao atualizar a palavra');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Row>
        <Col xl={12}>
          <Card>
            <Card.Body>
              <h2 className="mb-4">Editar palavra</h2>

              {/* ✅ Word Input */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Palavra:</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.word}
                  onChange={handleWordChange}
                  placeholder="Insira a palavra"
                />
              </Form.Group>

              {/* ✅ Tags */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Etiquetas:</h4>
                </Form.Label>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {availableTags.map((tag) => (
                    <Badge
                      key={tag._id}
                      pill
                      bg={
                        formData.selectedTags.includes(tag.name)
                          ? 'primary'
                          : 'light'
                      }
                      text={
                        formData.selectedTags.includes(tag.name)
                          ? 'white'
                          : 'dark'
                      }
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                {error && <p className="text-danger">{error}</p>}
                <small className="text-muted">
                  Clique para selecionar/deselecionar etiquetas
                </small>
              </Form.Group>

              {/* ✅ Summary - SAME as Add Word */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Resumo:</h4>
                </Form.Label>
                <div
                  className="border rounded p-2"
                  style={{ minHeight: '200px' }}
                >
                  <Editor
                    editorState={formData.summary}
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                      options: [
                        'inline',
                        'blockType',
                        'fontSize',
                        'list',
                        'textAlign',
                        'colorPicker',
                        'link',
                        'emoji',
                        'remove',
                        'history',
                      ],
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                    placeholder="Insira seu resumo aqui..."
                  />
                </div>
                <Form.Check
                  type="checkbox"
                  className="mt-2"
                  label="Gerar resumo automaticamente"
                  checked={formData.autoGenerateSummary}
                  onChange={handleAutoGenerateSummaryChange}
                />
              </Form.Group>

              {/* ✅ Rating */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Avaliação:</h4>
                </Form.Label>
                <div className="d-flex align-items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`me-2 ${
                        formData.note >= star ? 'text-warning' : 'text-muted'
                      }`}
                      style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                      onClick={() => handleRatingChange(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </Form.Group>

              {/* ✅ Image Upload */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h5>Imagem:</h5>
                </Form.Label>
                <div className="d-flex align-items-center gap-3">
                  <Form.Check
                    type="checkbox"
                    label="Gerar imagem automaticamente"
                    checked={formData.autoGenerateImage}
                    onChange={handleAutoGenerateImageChange}
                  />
                </div>
                {!formData.autoGenerateImage && (
                  <div className="d-flex align-items-center gap-3 mt-3">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-auto"
                    />
                    {formData.image && (
                      <Image
                        src={formData.image}
                        alt="Preview"
                        width={100}
                        height={100}
                        className="border rounded"
                      />
                    )}
                  </div>
                )}
              </Form.Group>

              <Button
                variant="primary"
                size="lg"
                onClick={saveContent}
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditPortugais;
