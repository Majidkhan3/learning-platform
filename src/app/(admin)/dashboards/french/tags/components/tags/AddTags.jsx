'use client';

import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';

const AddTags = () => {
  const { user ,token } = useAuth();
  const userId = user?._id || ''; 
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');
  const [error, setError] = useState('');

  const fetchTags = async () => {
    try {
      const res = await fetch(`/api/french/frtags?userId=${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();
      if (data.success) {
        // Fetch words to calculate the count for each tag
        const wordsRes = await fetch(`/api/french/frword?userId=${userId}`,{
          headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
        });
        const wordsData = await wordsRes.json();

        if (wordsData.success) {
          const words = wordsData.words;

          // Map tags with their associated word counts
          const tagsWithCounts = data.tags.map((tag) => {
            const wordCount = words.filter((word) => word.tags.includes(tag.name)).length;
            return { ...tag, count: wordCount };
          });

          setTags(tagsWithCounts);
        }
      }
    } catch (err) {
      console.error('Error fetching tags or words:', err);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchTags();
    }
  }, [userId]);

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;

    try {
      const res = await fetch('/api/french/frtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' 
          , Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: newTagName.trim(), userId }),
      });

      const data = await res.json();
      if (data.success) {
        setTags([...tags, { ...data.tag, count: 0 }]); // Add the new tag with a count of 0
        setNewTagName('');
        setError('');
      } else {
        setError(data.error || 'Failed to add tag');
      }
    } catch (err) {
      console.error('Error adding tag:', err);
      setError('Failed to add tag');
    }
  };

  const handleDeleteTag = async (tagName) => {
    try {
      const res = await fetch(`/api/french/frtags?name=${tagName}&userId=${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await res.json();
      if (data.success) {
        setTags(tags.filter((tag) => tag.name !== tagName));
      } else {
        setError(data.error || 'Failed to delete tag');
      }
    } catch (err) {
      console.error('Error deleting tag:', err);
      setError('Failed to delete tag');
    }
  };

  return (
    <Row className="mb-4">
      <Col xs={12}>
        <Card>
          <Card.Body>
            <div className="d-flex align-items-center mb-4">
              <Link href="/dashboards/french" className="me-3">
                <Icon icon="mdi:arrow-left" width={20} />
              </Link>
              <h4 className="mb-0">Gestion des étiquettes</h4>
            </div>

            {/* Add New Tag Section */}
            <div className="mb-4">
              <h5>Ajouter une nouvelle étiquette</h5>
              <Form.Group className="mb-3">
                <Form.Label>Nom de la nouvelle étiquette</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="Entrez le nom de l'étiquette"
                  />
                  <Button variant="primary" style={{ width: '20%' }} className="ms-2" onClick={handleAddTag}>
                    + Ajouter
                  </Button>
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
              </Form.Group>
            </div>

            {/* Existing Tags Section */}
            <div>
              <h5>Étiquettes existantes</h5>
              <ListGroup>
                {tags.map((tag, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <span>{tag.name}</span>
                    <div className="d-flex align-items-center">
                      <Badge bg="light" text="dark" className="me-2">
                        {tag.count} mots{tag.count !== 1 ? 's' : ''}
                      </Badge>
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => handleDeleteTag(tag.name)}
                        aria-label="Delete tag"
                      >
                        <Icon icon="mdi:trash-outline" width={20} />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddTags;