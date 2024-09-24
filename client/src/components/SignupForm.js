import React, { useState } from "react";
import {
    Container,
    Form,
    Button,
    Navbar,
    Nav,
    InputGroup,
    Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import zxcvbn from "zxcvbn";

import BackBtn from "./BackBtn";
import SignupProvider, { useSignup } from "../contexts/SignupContext";

const Navigation = () => {
    return (
        <Navbar variant="dark" expand="lg" className="pt-3">
            <Container>
                <Nav className="me-auto">
                    <BackBtn to={"/"} />
                </Nav>
            </Container>
        </Navbar>
    );
};

const UsernameInput = () => {
    const { username, setUsername } = useSignup();

    return (
        <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>
                Username
                <span style={{ color: "red" }}>&nbsp;*</span>
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
    );
};

const EmailInput = () => {
    const { email, setEmail } = useSignup();

    return (
        <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>
                Email address
                <span style={{ color: "red" }}>&nbsp;*</span>
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
    );
};

const PasswordInput = () => {
    const { password, setPassword, showPassword1, togglePassword1Visibility } =
        useSignup();

    const [strength, setStrength] = useState({ text: "" });

    const strengthLevels = [
        { text: "Very Weak" },
        { text: "Weak" },
        { text: "Moderate" },
        { text: "Strong" },
    ];

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        const result = zxcvbn(newPassword);
        const score = result.score;

        const strengthLevel =
            strengthLevels[Math.min(score, strengthLevels.length - 1)];
        setStrength(strengthLevel);
    };

    return (
        <Form.Group controlId="formBasicPassword" className="mb-3">
            <div className="d-flex justify-content-between">
                <Form.Label>
                    Password
                    <span style={{ color: "red" }}>&nbsp;*</span>
                </Form.Label>
                <Form.Text
                    className={`password-strength-text ${strength.text.toLowerCase()}`}
                >
                    {strength.text}
                </Form.Text>
            </div>
            <InputGroup>
                <InputGroup.Text>
                    <FaLock />
                </InputGroup.Text>
                <Form.Control
                    type={showPassword1 ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
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
    );
};

const ConfirmPasswordInput = () => {
    const {
        confirmPassword,
        setConfirmPassword,
        showPassword2,
        togglePassword2Visibility,
    } = useSignup();

    return (
        <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>
                Confirm Password
                <span style={{ color: "red" }}>&nbsp;*</span>
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
    );
};

const SignupButton = () => {
    const { isLoading } = useSignup();

    return (
        <Button
            variant="success"
            type="submit"
            className="w-100"
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />{" "}
                    Loading...
                </>
            ) : (
                "Sign Up"
            )}
        </Button>
    );
};

const RedirectionLink = () => {
    return (
        <div className="text-center mt-3">
            Already have an account?&nbsp;
            <Link to="/auth/login" className="text-decoration-none">
                Login
            </Link>
        </div>
    );
};

const SignupForm = () => {
    const { handleSubmit } = useSignup();

    return (
        <main className="flex-fill">
            <Navigation />
            <Container className="py-5 position-relative">
                <h2 className="mb-4 text-center">Register</h2>
                <Form
                    onSubmit={handleSubmit}
                    className="mx-auto"
                    style={{ maxWidth: "400px" }}
                >
                    <div className="my-4 glowy-box">
                        <UsernameInput />
                        <EmailInput />
                        <PasswordInput />
                        <ConfirmPasswordInput />
                        <SignupButton />
                    </div>
                    <RedirectionLink />
                </Form>
            </Container>
        </main>
    );
};

const SignupFormWrapper = () => {
    return (
        <SignupProvider>
            <SignupForm />
        </SignupProvider>
    );
};

export default SignupFormWrapper;
