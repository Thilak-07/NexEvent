import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Navbar,
  Nav,
  InputGroup,
} from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

import BackBtn from "./BackBtn";
import { requestPasswordReset } from "../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(
      "If an account with this email exists, a password reset link will be sent."
    );

    try {
      await requestPasswordReset(email);
    } catch (err) {
      // Optionally, handle the error, e.g., show a toast notification
    }
  };

  return (
    <main className="flex-fill">
      <Navbar variant="dark" expand="lg" className="py-3">
        <Container>
          {/* Go Back Button */}
          <Nav className="me-auto">
            <BackBtn to={"/auth/login"} />
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-5 position-relative">
        <h2 className="mb-4 text-center">Forgot Password</h2>
        <Form
          onSubmit={handleSubmit}
          className="mx-auto"
          style={{ maxWidth: "400px" }}
        >
          {message && <Alert variant="info">{message}</Alert>}
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Send Reset Link
          </Button>
          <div className="text-center mt-3">
            <Link to="/auth/login" className="text-decoration-none">
              Back to Login
            </Link>
          </div>
        </Form>
      </Container>
    </main>
  );
};

export default ForgotPassword;
