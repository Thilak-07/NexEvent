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
import { toast } from "react-toastify";

import BackBtn from "./BackBtn";
import { loginUser } from "../api";

const LogoUnit = () => {
    return (
        <div className="text-center mb-2">
            <img
                src="/favicon.svg"
                alt="Company Logo"
                style={{ maxWidth: "70px" }}
            />
        </div>
    );
};

const EmailInput = ({ email, setEmail }) => {
    return (
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
    );
};

const PasswordInput = ({
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
}) => {
    return (
        <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
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
    );
};

const LoginButton = () => {
    return (
        <Button variant="success" type="submit" className="w-100">
            Login
        </Button>
    );
};

const RedirectionLinks = () => {
    return (
        <div className="text-center mt-3">
            <div>
                New to NexEvent?&nbsp;
                <Link to="/auth/signup" className="text-decoration-none">
                    Create an account
                </Link>
            </div>
            <Link to="/auth/forgot-password" className="text-decoration-none">
                Forgot Password?
            </Link>
        </div>
    );
};

const LoginForm = ({ handleLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
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
        } catch (err) {
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
                <LogoUnit />
                <h3 className="mb-4 text-center">Login to NexEvent</h3>
                <Form
                    onSubmit={onSubmit}
                    className="flex-fill mx-auto"
                    style={{ maxWidth: "400px" }}
                >
                    {/* Glowy Box */}
                    <div className="my-4 glowy-box">
                        <EmailInput email={email} setEmail={setEmail} />
                        <PasswordInput
                            password={password}
                            setPassword={setPassword}
                            showPassword={showPassword}
                            togglePasswordVisibility={togglePasswordVisibility}
                        />
                        <LoginButton />
                    </div>

                    <RedirectionLinks />
                </Form>
            </Container>
        </main>
    );
};

export default LoginForm;
