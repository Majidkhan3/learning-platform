'use client'

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Card, Stack } from 'react-bootstrap'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'

const Page = () => {
  const { user ,token } = useAuth()
  const userId = user?._id
  const router = useRouter()
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
// Add after the existing state declarations
const handleDelete = async (storyId) => {
  if (window.confirm('Are you sure you want to delete this story?')) {
    try {
      const response = await fetch(`/api/story/create/${storyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,         
        },
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
  useEffect(() => {
    const fetchStories = async () => {
      if (!userId) return
      try {
        setLoading(true)
        const res = await fetch(`/api/story/create?userId=${userId}`,{
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,         
        },
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
            <strong>ES</strong> Stories in Spanish
          </h2>
        </Col>
        <Col className="text-end">
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button variant="outline-primary">Vocabulary</Button>
            <Button variant="outline-primary">Dialogues</Button>
          </Stack>
        </Col>
      </Row>

      {/* Sub-header */}
      <Row className="align-items-center mb-3">
        <Col>
          <h4>All stories</h4>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => router.push('/dashboards/story/create')}>
            <Icon icon="ic:round-plus" className="me-2" />
            Create a new story
          </Button>
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
            {stories.map((story) => (
              <Col key={story.storyId}>
                <Card>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <strong>{story.title}</strong>
                    <Icon
                      icon="mdi:trash"
                      className="text-danger"
                      role="button"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDelete(story.storyId)}
                    />{' '}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="mb-2">{story.rating || 'No rating'}</Card.Text>
                    <Card.Text className="mb-2">{story.tags?.join(', ') || 'No tags'}</Card.Text>
                    <Card.Text className="d-flex align-items-center text-muted mb-2">
                      <Icon icon="mdi:calendar" className="me-2" />
                      {new Date(story.creationDate).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>
                      <strong>Theme:</strong> {story.theme}
                    </Card.Text>
                    <Button variant="primary" className="w-100 mt-3" onClick={() => router.push(`/dashboards/espagnol/story/view/${story.storyId}`)}>
                      See the dialogues
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
