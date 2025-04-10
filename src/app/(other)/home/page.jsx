'use client'

import React from 'react'
import { Card, CardHeader, Col, Container, Row, Navbar, Nav } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'


const Page = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="shadow-sm px-3">
        <Navbar.Brand href="/">
          {/* Replace with your logo */}
          <img src="/logo.svg" alt="Logo" style={{ height: '40px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/logout">
              <IconifyIcon icon="ri:logout-box-line" className="me-1" />
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Page Content */}
      <div className="wrapper py-4">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card className="mt-3">
                <CardHeader className="border-0">
                  <Row className="justify-content-between align-items-center">
                    <Col>
                      <h5 className="mb-0 text-dark fw-medium">Welcome to the Dashboard</h5>
                    </Col>
                    <Col className="text-end">
                      <button type="button" className="btn btn-outline-primary me-2">
                        <IconifyIcon icon="ri:settings-2-line" className="me-1" />
                        More Setting
                      </button>
                      <button type="button" className="btn btn-outline-primary me-2">
                        <IconifyIcon icon="ri:filter-line" className="me-1" />
                        Filters
                      </button>
                    </Col>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Page
