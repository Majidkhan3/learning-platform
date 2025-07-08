"use client";
import PageTitle from '@/components/PageTitle';
import { Col, Row, Card, Form, Button, Badge, Image } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';

const AddWord = () => {
  const { user,token } = useAuth();
  const userId = user?._id || ''; // Assuming you have a way to get the user ID
  const router = useRouter();

  // Consolidated state for all form data
  const [formData, setFormData] = useState({
    word: '',
    selectedTags: [],
    summary: EditorState.createEmpty(),
    image: '',
    note: 0, // Default note value
    autoGenerateImage: false, // State for auto-generate image checkbox
    autoGenerateSummary: false, // State for auto-generate summary checkbox
  });

  const [availableTags, setAvailableTags] = useState([]); // State for fetched tags
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for API calls

  // Fetch tags from the backend
  const fetchTags = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/tags?userId=${userId}`,
        {headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },}
      ); // Replace with your API endpoint
      const data = await res.json();
      if (data.success) {
        setAvailableTags(data.tags); // Assuming the API returns tags in this format
      } else {
        setError(data.error || 'Failed to fetch tags');
      }
    } catch (err) {
      console.error('Error fetching tags:', err);
      setError('Failed to fetch tags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTags();
    }
  }, [userId]);

  // Update formData state for word input
  const handleWordChange = (e) => {
    setFormData((prev) => ({ ...prev, word: e.target.value }));
  };

  // Toggle tags in formData state
  const toggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file), // For preview
      }));
    }
  };

  // Handle checkbox change for auto-generate image
  const handleAutoGenerateImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      autoGenerateImage: e.target.checked,
    }));
  };

  // Handle checkbox change for auto-generate summary
  const handleAutoGenerateSummaryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      autoGenerateSummary: e.target.checked,
    }));
  };

  // Update summary in formData state
  const onEditorStateChange = (editorState) => {
    setFormData((prev) => ({ ...prev, summary: editorState }));
  };

  // Handle star rating change
  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, note: rating }));
  };

  // Save content to backend
  const saveContent = async () => {
    if (!formData.word.trim()) {
      setError('Word is required');
      return;
    }

    try {
      setLoading(true);

      // Prepare data for backend
      const payload = {
        word: formData.word,
        tags: formData.selectedTags,
        image: formData.image,
        note: formData.note,
        autoGenerateImage: formData.autoGenerateImage,
        autoGenerateSummary: formData.autoGenerateSummary,
        summary: convertToRaw(formData.summary.getCurrentContent()),
        userId,
      };

      const res = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        alert('Word saved successfully!');
        setFormData({
          word: '',
          selectedTags: [],
          summary: EditorState.createEmpty(),
          image: null,
          note: 0,
          autoGenerateImage: false,
          autoGenerateSummary: false,
        });
        setError('');
        router.push('/dashboards/espagnol');

      } else {
        setError(data.error || 'Failed to save word');
      }
    } catch (err) {
      console.error('Error saving word:', err);
      setError('Failed to save word');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col xl={12}>
          <Card>
            <Card.Body>
              <h2 className="mb-4">Agregar una nueva palabra</h2>

              {/* Word Input Section */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Palabra:</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.word}
                  onChange={handleWordChange}
                  placeholder="Enter the word"
                />
              </Form.Group>

              {/* Tags Section */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Etiquetas:</h4>
                </Form.Label>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {availableTags.map((tag) => (
                    <Badge
                      key={tag._id}
                      pill
                      bg={formData.selectedTags.includes(tag.name) ? 'primary' : 'light'}
                      text={formData.selectedTags.includes(tag.name) ? 'white' : 'dark'}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                {error && <p className="text-danger">{error}</p>}
                <small className="text-muted">Haz clic para seleccionar/deseleccionar etiquetas</small>
              </Form.Group>

              {/* Rich Text Editor Section */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Resumen:</h4>
                </Form.Label>
                <div className="border rounded p-2" style={{ minHeight: '200px' }}>
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
              </Form.Group>

              {/* Auto-Generate Summary Checkbox */}
              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  label="Generar resumen automáticamente"
                  checked={formData.autoGenerateSummary}
                  onChange={handleAutoGenerateSummaryChange}
                />
              </Form.Group>

              {/* Star Rating Section */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Calificación:</h4>
                </Form.Label>
                <div className="d-flex align-items-center">
                  {[1, 2, 3, 4].map((star) => (
                    <span
                      key={star}
                      className={`me-2 ${formData.note >= star ? 'text-warning' : 'text-muted'}`}
                      style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                      onClick={() => handleRatingChange(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </Form.Group>

              {/* Picture Upload */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h5> Imagen:</h5>
                </Form.Label>
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

              <Button
                variant="primary"
                size="lg"
                onClick={saveContent}
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Palabra'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddWord;