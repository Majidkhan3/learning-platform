'use client'

import { Card, Row, Col, Container } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { FaFlag, FaLock } from 'react-icons/fa'
import AuthProtectionWrapper from '@/components/wrappers/AuthProtectionWrapper'

const languages = [
  {
    title: 'Espagnol',
    route: '/dashboards/espagnol',
    bg: '#fef3c7',
    icon: <FaFlag size={32} />,
  },
  {
    title: 'Portugal',
    route: '/dashboards/portugal',
    bg: '#d1fae5',
    icon: <FaFlag size={32} />,
  },
  {
    title: 'English',
    route: '/dashboards/english',
    bg: '#e0f2fe',
    icon: <FaFlag size={32} />,
  },
  {
    title: 'Coming Soon',
    route: null,
    bg: '#f3f4f6',
    icon: <FaLock size={32} />,
  },
]

const LanguageSelectionPage = () => {
  const router = useRouter()

  const handleClick = (route) => {
    if (route) router.push(route)
  }

  return (
    <AuthProtectionWrapper>
      <Container className="py-5" style={{ maxWidth: '850px' }}>
        <h2 className="mb-5 text-center fw-bold">🌐 Choose a Language</h2>
        <Row className="g-4">
          {languages.map(({ title, route, bg, icon }) => (
            <Col key={title} xs={12} md={6}>
              <Card
                onClick={() => handleClick(route)}
                style={{
                  backgroundColor: bg,
                  cursor: route ? 'pointer' : 'not-allowed',
                  opacity: route ? 1 : 0.6,
                  borderRadius: '1rem',
                  transition: 'transform 0.2s ease-in-out',
                }}
                className="text-center shadow-sm h-100 border-0 hover-scale"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center py-4">
                  <div className="mb-3">{icon}</div>
                  <Card.Title className="h4 mb-2">{title}</Card.Title>
                  <Card.Text className="text-muted">{route ? `Go to ${title} dashboard` : 'Launching soon...'}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </AuthProtectionWrapper>
  )
}

export default LanguageSelectionPage
