'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Col, Row, Card, Form, Button, Badge, Image } from 'react-bootstrap';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';
import dynamic from 'next/dynamic';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const EditEspagnol = ({ params }) => {
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

  // ✅ Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const wordRes = await fetch(`/api/words/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const wordData = await wordRes.json();

        const tagsRes = await fetch(`/api/tags?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const tagsData = await tagsRes.json();

        if (wordData.success && tagsData.success) {
          let editorState;
          if (wordData.word.summary) {
            try {
              // ✅ If stored as Draft.js raw JSON
              const parsed = JSON.parse(wordData.word.summary);
              editorState = EditorState.createWithContent(convertFromRaw(parsed));
            } catch {
              // ✅ Fallback for plain text (your current DB data)
              editorState = EditorState.createWithContent(
                ContentState.createFromText(wordData.word.summary)
              );
            }
          } else {
            editorState = EditorState.createEmpty();
          }

          setFormData({
            word: wordData.word.word,
            selectedTags: wordData.word.tags || [],
            summary: editorState,
            image: wordData.word.image || '',
            note: wordData.word.note || 0,
            autoGenerateImage: wordData.word.autoGenerateImage || false,
            autoGenerateSummary: wordData.word.autoGenerateSummary || false,
          });

          setAvailableTags(tagsData.tags);
        } else {
          setError(wordData.error || tagsData.error || 'Failed to load data');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    if (id && userId) fetchData();
  }, [id, token, userId]);

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
    if (e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(e.target.files[0]),
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

  const saveContent = async () => {
    if (!formData.word.trim()) {
      setError('Word is required');
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
        summary: JSON.stringify(
          convertToRaw(formData.summary.getCurrentContent())
        ),
        userId,
      };

      const res = await fetch(`/api/words/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Palabra actualizada con éxito!');
        router.push('/dashboards/espagnol');
      } else {
        setError(data.error || 'Failed to update word');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to update word');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Row>
      <Col xl={12}>
        <Card>
          <Card.Body>
            <h2 className="mb-4">Editar palabra</h2>

            {/* Word Input */}
            <Form.Group className="mb-4">
              <Form.Label><h4>Palabra:</h4></Form.Label>
              <Form.Control
                type="text"
                value={formData.word}
                onChange={handleWordChange}
                placeholder="Ingresa la palabra"
              />
            </Form.Group>

            {/* Tags */}
            <Form.Group className="mb-4">
              <Form.Label><h4>Etiquetas:</h4></Form.Label>
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
                    onClick={() => toggleTag(tag.name)}
                    style={{ cursor: 'pointer' }}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
              <small className="text-muted">
                Haz clic para seleccionar/deseleccionar etiquetas
              </small>
            </Form.Group>

            {/* Summary */}
            <Form.Group className="mb-4">
              <Form.Label><h4>Resumen:</h4></Form.Label>
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
                  placeholder="Ingresa tu resumen aquí..."
                />
              </div>
              <Form.Check
                type="checkbox"
                className="mt-2"
                label="Generar resumen automáticamente"
                checked={formData.autoGenerateSummary}
                onChange={handleAutoGenerateSummaryChange}
              />
            </Form.Group>

            {/* Rating */}
            <Form.Group className="mb-4">
              <Form.Label><h4>Calificación:</h4></Form.Label>
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

            {/* Image */}
            <Form.Group className="mb-4">
              <Form.Label><h5>Imagen:</h5></Form.Label>
              <div className="d-flex align-items-center gap-3">
                <Form.Check
                  type="checkbox"
                  label="Generar imagen automáticamente"
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

            {error && <div className="text-danger mb-3">{error}</div>}

            <Button
              variant="primary"
              size="lg"
              onClick={saveContent}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditEspagnol;
