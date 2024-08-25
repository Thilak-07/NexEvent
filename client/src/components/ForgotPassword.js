import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      setMessage("");
    } else {
      setError("");
      setMessage(
        "If an account with that email exists, a password reset link will be sent."
      );
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Forgot Password</h2>
      <Form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "400px" }}
      >
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="info">{message}</Alert>}
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Send Reset Link
        </Button>
        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none">
            Back to Login
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
