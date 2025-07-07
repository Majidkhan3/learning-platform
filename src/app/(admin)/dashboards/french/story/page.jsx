'use client'

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Card, Stack, Form } from 'react-bootstrap'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'

const Page = () => {
  const { user, token } = useAuth()
  const userId = user?._id
  const router = useRouter()
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortOrder, setSortOrder] = useState('newest');
  const [editingStoryId, setEditingStoryId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('')
  const [savingTitle, setSavingTitle] = useState(false)
  // Add after the existing state declarations
  const handleDelete = async (storyId) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        const response = await fetch(`/api/french/frstories/create/${storyId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.ok) {
          // Remove the deleted story from the state
          setStories(stories.filter(story => story.storyId !== storyId));
        } else {
          throw new Error('Failed to delete story');
        }
      } catch (error) {
        console.error('Error deleting story:', error);
        alert('Failed to delete story');
      }
    }
  };
      const handleStoryTitleDoubleClick = (storyId, currentTitle) => {
  setEditingStoryId(storyId)
  setEditingTitle(currentTitle || '')
}

const handleStoryTitleSave = async (storyId) => {
  if (!editingTitle.trim()) {
    alert('Title cannot be empty')
    return
  }

  setSavingTitle(true)
  try {
    const res = await fetch(`/api/french/frstories/create/${storyId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: editingTitle.trim() }),
    })

    if (!res.ok) throw new Error('Failed to update title')

    const data = await res.json()
    setStories((prev) =>
      prev.map((story) =>
        story.storyId === storyId ? { ...story, title: data.story.title } : story
      )
    )

    setEditingStoryId(null)
    setEditingTitle('')
  } catch (err) {
    console.error('Error updating title:', err)
    alert('Failed to update title')
  } finally {
    setSavingTitle(false)
  }
}

const handleStoryTitleCancel = () => {
  setEditingStoryId(null)
  setEditingTitle('')
}

  useEffect(() => {
    const fetchStories = async () => {
      if (!userId) return
      try {
        setLoading(true)
        const res = await fetch(`/api/french/frstories/create?userId=${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }

        })
        const data = await res.json()
        if (res.ok) {
          setStories(data.stories)
        }
      } catch (err) {
        console.error('Error fetching stories:', err)
        setError('Failed to fetch stories')
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [userId])

  if (error) return <div className="text-center text-danger py-5">{error}</div>

  return (
    <Container className="py-5">
      {/* Header Section */}
      <Row className="align-items-center mb-4">
        <Col>
          <h2>
            <strong>FR</strong>  Histoires en français
          </h2>
        </Col>
        <Col className="text-end">
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button variant="outline-primary">Vocabulaire</Button>
            <Button variant="outline-primary">Dialogues</Button>
          </Stack>
        </Col>
      </Row>

      {/* Sub-header */}
      <Row className="align-items-center mb-3">
        <Col>
          <h4>Toutes les histoires</h4>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => router.push('/dashboards/french/story/create')}>
            <Icon icon="ic:round-plus" className="me-2" />
            Créer une nouvelle histoire
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-end d-flex justify-content-end align-items-end" style={{ gap: '0.75rem' }}>
          <Form.Select
            size="sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ width: '230px' }}
          >
            <option value="newest">Du plus récent au plus ancien</option>
            <option value="oldest">Du plus ancien au plus récent</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Stories Grid */}
      <Row xs={1} sm={2} md={3} className="g-4">
        {loading ? (
          <Col className="text-center w-full justify-center py-5">
            <Icon icon="eos-icons:loading" className="text-primary" width="50" height="50" spin />
            <p className="text-muted">Loading stories...</p>
          </Col>
        ) : (
          <>
            {[...stories]
              .sort((a, b) => {
                const tA = new Date(a.creationDate).getTime();
                const tB = new Date(b.creationDate).getTime();
                return sortOrder === 'newest' ? tB - tA : tA - tB;
              })
              .map((story) => (
                <Col key={story.storyId}>
                  <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                                                                  {editingStoryId === story.storyId ? (
                        <div className="d-flex align-items-center gap-2 w-100">
                          <Form.Control
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleStoryTitleSave(story.storyId)
                              else if (e.key === 'Escape') handleStoryTitleCancel()
                            }}
                            autoFocus
                            size="sm"
                            maxLength={50}
                          />
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleStoryTitleSave(story.storyId)}
                            disabled={savingTitle}
                          >
                            {savingTitle ? <Icon icon="eos-icons:loading" width={16} height={16} /> : 'Enregistrer'}
                          </Button>
                          <Button variant="secondary" size="sm" onClick={handleStoryTitleCancel} disabled={savingTitle}>
                            Annuler
                          </Button>
                        </div>
                      ) : (
                        <strong
                          role="button"
                          title="Double-click to edit title"
                          onDoubleClick={() => handleStoryTitleDoubleClick(story.storyId, story.title)}
                          style={{ cursor: 'pointer' }}
                        >
                          {story.title || 'Sans titre'}
                        </strong>
                      )}
                      <Icon
                        icon="mdi:trash"
                        className="text-danger"
                        role="button"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(story.storyId)}
                      />
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="mb-2">{story.rating || 'Aucune note'}</Card.Text>
                      <Card.Text className="mb-2">{story.tags?.join(', ') || 'No tags'}</Card.Text>
                      <Card.Text className="d-flex align-items-center text-muted mb-2">
                        <Icon icon="mdi:calendar" className="me-2" />
                        {new Date(story.creationDate).toLocaleDateString()}
                      </Card.Text>
                      <Card.Text>
                        <strong>thème:</strong> {story.theme}
                      </Card.Text>
                      <Button
                        variant="primary"
                        className="w-100 mt-3"
                        onClick={() => router.push(`/dashboards/french/story/view/${story.storyId}`)}
                      >
                       Voir les dialogues
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </>
        )}
      </Row>
    </Container>
  )
}

export default Page
