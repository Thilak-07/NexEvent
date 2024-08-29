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
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import BackBtn from "./BackBtn";
import { toast } from "react-toastify";

const LoginForm = ({ client, handleLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    client
      .post("auth/login/", {
        email: email,
        password: password,
      })
      .then(() => {
        handleLogin();
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/explore");
      })
      .catch((err) => {
        toast.error("Invalid Credentials", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
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
        {/* Company Logo */}
        <div className="text-center mb-2">
          <img
            src="/favicon.svg"
            alt="Company Logo"
            style={{ maxWidth: "70px" }}
          />
        </div>

        <h3 className="mb-4 text-center">Login to NexEvent</h3>
        <Form
          onSubmit={onSubmit}
          className="flex-fill mx-auto"
          style={{ maxWidth: "400px" }}
        >
          {/* Glowy Box */}
          <div className="my-4 glowy-box">
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
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
              <div className="d-flex justify-content-between align-items-center">
                <Form.Label>Password</Form.Label>
                <Link
                  to="/auth/forgot-password"
                  className="text-decoration-none"
                  style={{ fontSize: "0.9rem" }}
                >
                  Forgot Password?
                </Link>
              </div>
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              Login
            </Button>
          </div>
          <div className="text-center mt-3">
            New to NexEvent?&nbsp;
            <Link to="/auth/signup" className="text-decoration-none">
              Create an account
            </Link>
          </div>
        </Form>
      </Container>
    </main>
  );
};

export default LoginForm;
