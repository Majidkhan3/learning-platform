// 'use client'

import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useState } from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

const LoginPage = () => {
  const { login,user } = useAuth();
  console.log("user",user)

  // const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      
      console.log(data,"data")
      if(res.ok) {
        // login(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("login data",data)
        // localStorage.setItem("token", data.token);
      }
      if (!res.ok) throw new Error(data.message || 'Login failed')

      // Redirect or show success
      window.location.href = '/' 
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
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
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
