'use client'

import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'
import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter() // use router for redirection

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      console.log('token', data.token)
      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        // login(data) // Call login to update the global state
        router.push('/') // Redirect to the home page
      } else {
        throw new Error(data.message || 'Login failed')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100" style={{ maxWidth: '400px' }}>
        <Col>
          <h3 className="text-center mb-4">Learning Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading} className="w-100">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
