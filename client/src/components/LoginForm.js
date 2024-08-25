import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ loggedIn, client, handleLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    client
      .post("auth/login/", {
        email: email,
        password: password,
      })
      .then(() => {
        handleLogin();
        navigate("/explore");
      })
      .catch((err) => {
        setError("Invalid Credentials");
      });
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Login</h2>
      <Form
        onSubmit={onSubmit}
        className="mx-auto"
        style={{ maxWidth: "400px" }}
      >
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Password?
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default LoginForm;
