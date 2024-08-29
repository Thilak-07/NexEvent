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
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import BackBtn from "./BackBtn";
import CustomAlert from "./CustomAlert";

const SignupForm = ({ client }) => {
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
          toggleAlert(true);
        })
        .catch((err) => {
          setError(
            "This email is already registered. Please use a different email."
          );
        });
    }
  };

  return (
    <main className="flex-fill">
      <Navbar variant="dark" expand="lg" className="pt-3">
        <Container>
          {/* Go Back Button */}
          <Nav className="me-auto">
            <BackBtn to={"/"} />
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-5 position-relative">
        <h2 className="mb-4 text-center">Sign Up</h2>
        <Form
          onSubmit={handleSubmit}
          className="mx-auto"
          style={{ maxWidth: "400px" }}
        >
          {error && <Alert variant="danger">{error}</Alert>}
          {/* Glowy Box */}
          <div className="my-4 glowy-box">
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>
                Username<span style={{ color: "red" }}>&nbsp;*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>
                Email address<span style={{ color: "red" }}>&nbsp;*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>
                Password<span style={{ color: "red" }}>&nbsp;*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>
                Confirm Password<span style={{ color: "red" }}>&nbsp;*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              Sign Up
            </Button>
          </div>
          <div className="text-center mt-3">
            Already have an account?&nbsp;
            <Link to="/auth/login" className="text-decoration-none">
              Login
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
    </main>
  );
};

export default SignupForm;
