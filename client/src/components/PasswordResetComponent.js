import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";

const PasswordResetComponent = ({ client }) => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErr, setValidationErr] = useState("");

  useEffect(() => {
    client
      .post("auth/token-validity/", { token })
      .then(() => setValidationErr(""))
      .catch(() => setValidationErr("Invalid token."));
  }, [client, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    client
      .post(`auth/reset-password/${token}/`, {
        password: password,
      })
      .then(() => {
        setSuccess(`Password successfully updated! Redirecting to homepage...`);
        setTimeout(() => {
          navigate("/");
        }, 4000);
      })
      .catch((err) => {
        setError(
          "Failed to reset password. The token may be invalid or expired."
        );
      });
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Reset Your Password</h2>
      {validationErr ? (
        <Alert variant="danger">{validationErr}</Alert>
      ) : (
        <Form
          onSubmit={handleSubmit}
          className="mx-auto"
          style={{ maxWidth: "400px" }}
        >
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Reset Password
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default PasswordResetComponent;
