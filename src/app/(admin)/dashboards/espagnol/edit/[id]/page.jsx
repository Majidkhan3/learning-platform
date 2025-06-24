'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Col, Row, Card, Form, Button, Badge, Image } from 'react-bootstrap';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';


const EditEspagnol = ({ params }) => {
  
  const { user ,token} = useAuth();
  const userId = user?._id || ''; 
  const id = params.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    word: '',
    selectedTags: [],
    summary: '',
    image: '',
    note: 0,
    autoGenerateImage: false,
  });
  const [availableTags, setAvailableTags] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
console.log("toke",token)
  // Fetch word data by ID
  useEffect(() => {
    if (id) {
      fetch(`/api/words/${id}`,{
          headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            const wordData = result.word;
            setFormData({
              word: wordData.word,
              selectedTags: wordData.tags || [],
              summary: wordData.summary || '',
              image: wordData.image || '',
              note: wordData.note || 0,
              autoGenerateImage: false,
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

  // Fetch available tags
  useEffect(() => {
    fetch(`/api/tags?userId=${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
    }) // Replace with your API endpoint for tags
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAvailableTags(data.tags);
        } else {
          setError(data.error || 'Failed to fetch tags');
        }
      })
      .catch((err) => {
        console.error('Error fetching tags:', err);
        setError('Failed to fetch tags');
      });
  }, []);

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

  // Update summary in formData state
  const handleSummaryChange = (e) => {
    setFormData((prev) => ({ ...prev, summary: e.target.value }));
  };

  // Handle star rating change
  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, note: rating }));
  };

  // Save updated content to backend
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
        summary: formData.summary,
      };

      const response = await fetch(`/api/words/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`  // Include token for authentication
         },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Word updated successfully!');
        router.push('/dashboards/espagnol');
         // Redirect back to the main page
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Row>
        <Col xl={12}>
          <Card>
            <Card.Body>
              <h2 className="mb-4">Edit Word</h2>

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

              {/* Summary Section */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Summary:</h4>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={formData.summary}
                  onChange={handleSummaryChange}
                  placeholder="Enter your summary here..."
                />
              </Form.Group>

              {/* Star Rating Section */}
              <Form.Group className="mb-4">
                <Form.Label>
                  <h4>Rating:</h4>
                </Form.Label>
                <div className="d-flex align-items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
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
    </>
  );
};

export default EditEspagnol;