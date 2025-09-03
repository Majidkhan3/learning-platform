'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Col, Row, Card, Form, Button, Badge, Image } from 'react-bootstrap';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';
import dynamic from 'next/dynamic';
import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
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

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Convert file to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          image: event.target.result, // This will be a base64 string like "data:image/jpeg;base64,..."
        }));
        // Clear any previous errors
        setError('');
      };

      reader.onerror = () => {
        setError('Error reading file. Please try again.');
      };

      reader.readAsDataURL(file);
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
      setError('Word is required');
      return;
    }

    try {
      setError('');
      setLoading(true);

      const payload = {
        word: formData.word,
        tags: formData.selectedTags,
        image: formData.image, // This will be base64 string or empty
        note: formData.note,
        autoGenerateImage: formData.autoGenerateImage,
        autoGenerateSummary: formData.autoGenerateSummary,
        summary: formData.autoGenerateSummary
          ? undefined
          : JSON.stringify(convertToRaw(formData.summary.getCurrentContent())),
        userId,
      };

      const res = await fetch(`/api/portugal/porword/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await res.json();
      } catch (e) {
        const text = await res.text();
        console.error('❌ Failed to parse JSON. Response was:', text);
        throw new Error('Invalid response from server (not JSON)');
      }

      // Check response
      if (!data) {
        throw new Error('No response from server');
      }

      if (res.ok && (data.success || data._id)) {
        alert('Word saved successfully!');

        // Reset form
        setFormData({
          word: '',
          selectedTags: [],
          summary: EditorState.createEmpty(),
          image: '',
          note: 0,
          autoGenerateImage: false,
          autoGenerateSummary: false,
        });

        // Navigate back to dashboard
        router.push('/dashboards/portugais');
      } else {
        // Handle different error cases
        const errorMsg = data.message ||
          data.error ||
          (data.errors ? data.errors.join(', ') : 'Failed to save word');
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('Error saving word:', err);

      // Provide user-friendly error messages
      if (err.message.includes('image') || err.message.includes('generate')) {
        setError('Word was saved, but there was an issue with the image. Please try uploading a different image.');
      } else if (err.message.includes('summary')) {
        setError('Word was saved, but there was an issue generating the summary.');
      } else if (err.message.includes('network') || err.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'Failed to save word. Please try again.');
      }
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
                  {[1, 2, 3, 4].map((star) => (
                    <span
                      key={star}
                      className={`me-2 ${formData.note >= star ? 'text-warning' : 'text-muted'
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
                  <div className="mt-3">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mb-3"
                    />
                    {formData.image && (
                      <div className="d-flex align-items-center gap-3">
                        <Image
                          src={formData.image}
                          alt="Preview"
                          width={100}
                          height={100}
                          className="border rounded"
                          style={{ objectFit: 'cover' }}
                        />
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        >
                          Remove Image
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                {formData.autoGenerateImage && (
                  <small className="text-muted d-block mt-2">
                    An image will be automatically generated based on the word.
                  </small>
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
