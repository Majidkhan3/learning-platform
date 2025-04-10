"use client";
import PageTitle from '@/components/PageTitle';
import { Col, Row, Card, Form, Button, Badge, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';

const AddWord = () => {
  const { user } = useAuth();
  const userId = user?._id || ''; // Assuming you have a way to get the user ID

  // Consolidated state for all form data
  const [formData, setFormData] = useState({
    word: '',
    selectedTags: [],
    summary: EditorState.createEmpty(),
    image: '',
    note:0,
  });

  const [availableTags, setAvailableTags] = useState([]); // State for fetched tags
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for API calls

  // Fetch tags from the backend
  const fetchTags = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/tags?userId=${userId}`); // Replace with your API endpoint
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

  // Update summary in formData state
  const onEditorStateChange = (editorState) => {
    setFormData((prev) => ({ ...prev, summary: editorState }));
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
        summary: convertToRaw(formData.summary.getCurrentContent()),
        userId,
      };

      const res = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        });
        setError('');
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
              <h2 className="mb-4">Add a new word</h2>

              {/* Word Input Section */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Word:</h4>
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
                  <h4>Tags:</h4>
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
                <small className="text-muted">Click to select/deselect tags</small>
              </Form.Group>

              {/* Rich Text Editor Section */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Summary:</h4>
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
                    placeholder="Enter your summary here..."
                  />
                </div>
              </Form.Group>

              {/* Youglish Link */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h5>Youglish link:</h5>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={`https://youglish.com/pronounce/${formData.word}/spanish`}
                  readOnly
                />
                <small className="text-muted">Automatically generated from the word</small>
              </Form.Group>

              {/* Picture Upload */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h5>Picture:</h5>
                </Form.Label>
                <div className="d-flex align-items-center gap-3">
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
              </Form.Group>

              <Button
                variant="primary"
                size="lg"
                onClick={saveContent}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Word'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddWord;