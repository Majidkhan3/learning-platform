"use client";
import PageTitle from '@/components/PageTitle';
import { Col, Row, Card, Form, Button, Badge, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';
import { useRouter } from 'next/navigation';

const AddWord = () => {
  const router = useRouter();
  const { user, token } = useAuth();
  const userId = user?._id || ''; // Assuming you have a way to get the user ID

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
      const res = await fetch(`/api/portugal/portags?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }); // Replace with your API endpoint
      let data;
      try {
        data = await res.json();
      } catch (e) {
        const text = await res.text();
        console.error('❌ Failed to parse JSON. Response was:', text);
        throw new Error('Invalid response from server (not JSON)');
      }
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

      const res = await fetch('/api/portugal/porword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      let data;
      let responseText;
      try {
        responseText = await res.text();  // read body once
        data = JSON.parse(responseText);  // try parsing JSON
      } catch (e) {
        console.error("❌ Failed to parse JSON. Raw response:", responseText);
        throw new Error("Invalid response from server (not JSON)");
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
  return (
    <>
      <Row>
        <Col xl={12}>
          <Card>
            <Card.Body>
              <h2 className="mb-4">Adicionar uma nova palavra</h2>

              {/* Word Input Section */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Palavra:</h4>
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
                <small className="text-muted">Clique para selecionar/deselecionar etiquetas</small>
              </Form.Group>

              {/* Rich Text Editor Section */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Resumo:</h4>
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
                    placeholder="Insira seu resumo aqui..."
                  />
                </div>
              </Form.Group>

              {/* Auto-Generate Summary Checkbox */}
              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  label="Gerar resumo automaticamente"
                  checked={formData.autoGenerateSummary}
                  onChange={handleAutoGenerateSummaryChange}
                />
              </Form.Group>

              {/* Star Rating Section */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4> Avaliação:</h4>
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
                {loading ? 'Salvando...' : 'Salvar palavra'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddWord;