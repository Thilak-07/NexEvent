import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";
import BackBtn from "./BackBtn";

const SignupForm = ({ handleLogin, client }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, toggleAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      client
        .post("auth/register/", { email, username, password })
        .then(() => {
          toggleAlert(!showAlert);
        })
        .catch((err) => {
          setError(
            "This email is already registered. Please use a different email."
          );
        });
    }
  };

  return (
    <Container className="py-5 position-relative">
      {/* Go Back Button */}
      <BackBtn to={"/"} />

      {/* Login Button */}
      <Button
        variant="primary"
        className="position-absolute top-0 end-0 mt-3 me-3"
        onClick={() => navigate("/auth/login")}
        style={{ borderRadius: "5px", fontWeight: "bold" }}
      >
        Login
      </Button>

      <h2 className="mb-4 text-center">Sign Up</h2>
      <Form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "400px" }}
      >
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
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
        <Form.Group controlId="formConfirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Sign Up
        </Button>
        <div className="text-center mt-3">
          <Link to="/auth/login" className="text-decoration-none">
            Already have an account? Login
          </Link>
        </div>
      </Form>

      <CustomAlert
        show={showAlert}
        handleClose={() => navigate("/auth/login")}
        title="Registration Successful"
        message="Please sign in to continue."
      />
    </Container>
  );
};

export default SignupForm;
