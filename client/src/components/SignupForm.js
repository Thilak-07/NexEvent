import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Navbar,
  Nav,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import BackBtn from "./BackBtn";
import { registerUser } from "../api";

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePassword1Visibility = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        await registerUser({ email, username, password });
        toast.success("Registration Successful!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/auth/login"); // Redirect to login after successful registration
      } catch (err) {
        toast.error("Email already exists or registration failed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
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
                  type={showPassword1 ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text
                  onClick={togglePassword1Visibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
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
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <InputGroup.Text
                  onClick={togglePassword2Visibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
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
      </Container>
    </main>
  );
};

export default SignupForm;
