'use client'

import { Card, Row, Col, Container } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { FaFlag, FaLock } from 'react-icons/fa'
import AuthProtectionWrapper, { useAuth } from '@/components/wrappers/AuthProtectionWrapper'

const languages = [
  {
    title: 'Spanish',
    route: '/dashboards/espagnol',
    bg: '#44287d',
    icon: <FaFlag size={32} />,
    access: 'Espagnol'
  },
  {
    title: 'Portuguese',
    route: '/dashboards/portugais',
    bg: '#1d613e',
    icon: <FaFlag size={32} />,
    access: 'Portuguese'
  },
  {
    title: 'English',
    route: '/dashboards/english',
    bg: '#954433',
    icon: <FaFlag size={32} />,
    access: 'English'
  },
  {
    title: 'French',
    route: '/dashboards/french',
    bg: '#FFB300',
    icon: <FaFlag size={32} />,
    access: 'French'
  },
]

const LanguageSelectionPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  const hasAccess = (languageAccess) => {
    return user?.languages?.includes(languageAccess)
  }

  const handleClick = (route, access) => {
    if (route && hasAccess(access)) router.push(route)
  }
console.log("helo")

  return (
      <Container className="py-5" style={{ maxWidth: '850px' }}>
        <h2 className="mb-5 text-center fw-bold">🌐 Choose a Language</h2>
        <Row className="g-4">
          {languages.map(({ title, route, bg, icon, access }) => {
            const userHasAccess = hasAccess(access)
            return (
              <Col key={title} xs={12} md={6}>
                <Card
                  onClick={() => handleClick(route, access)}
                  style={{
                    backgroundColor: bg,
                    cursor: userHasAccess ? 'pointer' : 'not-allowed',
                    opacity: userHasAccess ? 1 : 0.6,
                    borderRadius: '1rem',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                  className="text-center shadow-sm h-100 border-0 hover-scale"
                  onMouseEnter={(e) => {
                    if (userHasAccess) {
                      e.currentTarget.style.transform = 'scale(1.03)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}>
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center py-4">
                    <div className="mb-3">
                      {userHasAccess ? icon : <FaLock size={32} />}
                    </div>
                    <Card.Title className="h4 mb-2">{title}</Card.Title>
                    <Card.Text className="text-muted">
                      {userHasAccess ? `Go to ${title} dashboard` : "You don't have access"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
  )
}

export default LanguageSelectionPage