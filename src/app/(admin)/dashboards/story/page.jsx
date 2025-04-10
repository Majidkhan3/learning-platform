'use client'

import React from 'react'
import { Container, Row, Col, Button, Card, Stack } from 'react-bootstrap'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'

const stories = [
  {
    id: 1,
    title: 'dog',
    date: '2025-03-23',
    theme: 'dog over there',
  },
  {
    id: 2,
    title: 'bag',
    date: '2025-03-23',
    theme: '3-line backpack',
  },
  {
    id: 3,
    title: 'dog',
    date: '2025-03-23',
    theme: 'Dog in Peru',
  },
]

const Page = () => {
    const router = useRouter()
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
        {stories.map((story) => (
          <Col key={story.id}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <strong>{story.title}</strong>
                <Icon
                  icon="mdi:trash"
                  className="text-danger"
                  role="button"
                  style={{ cursor: 'pointer' }}
                />
              </Card.Header>
              <Card.Body>
                <Card.Text className="mb-2">No rating</Card.Text>
                <Card.Text className="mb-2">No tags</Card.Text>
                <Card.Text className="d-flex align-items-center text-muted mb-2">
                  <Icon icon="mdi:calendar" className="me-2" />
                  {story.date}
                </Card.Text>
                <Card.Text>
                  <strong>Theme:</strong> {story.theme}
                </Card.Text>
                <Button variant="primary" className="w-100 mt-3" onClick={() => router.push(`/dashboards/story/view/${story.id}`)}>
                  See the dialogues
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Page
