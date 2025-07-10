"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { AdminContext } from "@/context/AdminContext";
import { useNotificationContext } from "@/context/useNotificationContext";

const LoginPage = () => {
const {showNotification} = useNotificationContext()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is already authenticated
    const adminToken = localStorage.getItem("admin_token");
    const admin = localStorage.getItem("admin");

    if (adminToken && admin) {
      // Redirect to /admin/home if authenticated
      router.push("/admin/users");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log(data, "data");

      if (res.ok) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin", JSON.stringify(data.user));
        console.log("Admin data stored in localStorage:", data.isAdmin);
        
        router.push("/admin/users"); // Redirect to /admin/dashboard/home
        showNotification({
            message: 'Successfully logged in. Redirecting....',
            variant: 'success',
          })
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100" style={{ maxWidth: "400px" }}>
        <Col>
          <h3 className="text-center mb-4">Admin Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-100"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const AdminPage = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     // Check if admin is already authenticated
//     const adminToken = localStorage.getItem("admin_token");
//     const admin = localStorage.getItem("admin");
//     const isAdmin = admin && JSON.parse(admin).isAdmin;

//     if (adminToken && isAdmin) {
//       setIsAuthenticated(true);
//       router.push("/admin/home"); // Redirect to /admin/home if authenticated
//     }
//   }, [router]);

//   if (isAuthenticated) {
//     return null; // Prevent rendering the login page while redirecting
//   }

  return <LoginPage />;
};

export default AdminPage;
