'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Col, Row, Card, Form, Button, Badge, Image } from 'react-bootstrap';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const EditEnglishWord = ({ params }) => {
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
    const fetchData = async () => {
      try {
        const wordRes = await fetch(`/api/english/enword/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const wordData = await wordRes.json();

        const tagsRes = await fetch(`/api/english/entags?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const tagsData = await tagsRes.json();

        if (wordData.success && tagsData.success) {
          // ✅ Load summary into editor (handle both plain text and draft.js raw format)
          let editorState;
          try {
            if (wordData.word.summary) {
              if (wordData.word.summary.trim().startsWith('{')) {
                editorState = EditorState.createWithContent(
                  convertFromRaw(JSON.parse(wordData.word.summary))
                );
              } else {
                editorState = EditorState.createWithContent(
                  ContentState.createFromText(wordData.word.summary)
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
        console.error('Error loading data:', err);
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

  const onEditorStateChange = (editorState) => {
    setFormData((prev) => ({ ...prev, summary: editorState }));
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

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, note: rating }));
  };

  // ✅ Save
  const saveContent = async () => {
    if (!formData.word.trim()) {
      setError('Word is required');
      return;
    }

    try {
      setLoading(true);
      setError('');

// const payload = {
//   word: formData.word,
//   tags: formData.selectedTags,
//   image: formData.image,
//   note: formData.note,
//   autoGenerateImage: formData.autoGenerateImage,
//   autoGenerateSummary: formData.autoGenerateSummary,
//   summary: formData.autoGenerateSummary
//     ? '' // ✅ same as AddWord
//     : JSON.stringify(convertToRaw(formData.summary.getCurrentContent())),
//   userId,
// };
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

      const response = await fetch(`/api/english/enword/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Word updated successfully!');
        router.push('/dashboards/english');
      } else {
        setError(data.error || 'Failed to update word');
      }
    } catch (err) {
      console.error('Error updating word:', err);
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
            <h2 className="mb-4">Edit Word</h2>

            {/* Word */}
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

            {/* Tags */}
            <Form.Group className="mb-4">
              <Form.Label>
                <h4>Tags:</h4>
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
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleTag(tag.name)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
              <small className="text-muted">Click to select/deselect tags</small>
            </Form.Group>

            {/* Summary */}
            {/* ✅ Summary Section – Now same as Add Word */}
            <Form.Group className="mb-4">
              <Form.Label>
                <h4>Summary:</h4>
              </Form.Label>
              <div className="editor-wrapper border rounded p-2">
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
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                />
              </div>

              <Form.Check
                type="checkbox"
                className="mt-2"
                label="Generate summary automatically"
                checked={formData.autoGenerateSummary}
                onChange={handleAutoGenerateSummaryChange}
              />
            </Form.Group>


            {/* Rating */}
            <Form.Group className="mb-4">
              <Form.Label>
                <h4>Rating:</h4>
              </Form.Label>
              <div className="d-flex align-items-center">
                {[1, 2, 3, 4, 5].map((star) => (
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

            {/* Image */}
            <Form.Group className="mb-4">
              <Form.Label>
                <h5>Picture:</h5>
              </Form.Label>
              <div className="d-flex align-items-center gap-3">
                <Form.Check
                  type="checkbox"
                  label="Generate image automatically"
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
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditEnglishWord;
