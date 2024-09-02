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
import zxcvbn from "zxcvbn";

import BackBtn from "./BackBtn";
import { registerUser } from "../api";

const UsernameInput = ({ username, setUsername }) => {
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

const EmailInput = ({ email, setEmail }) => {
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

const PasswordInput = ({
    password,
    setPassword,
    showPassword1,
    togglePassword1Visibility,
}) => {
    const [strength, setStrength] = useState({ text: "" });

    const strengthLevels = [
        { text: "Very Weak" }, // Score 0
        { text: "Weak" }, // Score 1
        { text: "Moderate" }, // Score 2
        { text: "Strong" }, // Score 3-4
    ];

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        const result = zxcvbn(newPassword);
        const score = result.score; // Score ranges from 0 (weak) to 4 (strong)

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

const ConfirmPasswordInput = ({
    confirmPassword,
    setConfirmPassword,
    showPassword2,
    togglePassword2Visibility,
}) => {
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
    return (
        <Button variant="success" type="submit" className="w-100">
            Sign Up
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

        if (password.length < 8) {
            toast.error(
                "Your password should have a minimum of 8 characters.",
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            );
        } else if (password !== confirmPassword) {
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
                await registerUser({ username, email, password });
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
                toast.error(err.response.data.error, {
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
                <h2 className="mb-4 text-center">Register</h2>
                <Form
                    onSubmit={handleSubmit}
                    className="mx-auto"
                    style={{ maxWidth: "400px" }}
                >
                    {/* Glowy Box */}
                    <div className="my-4 glowy-box">
                        <UsernameInput
                            username={username}
                            setUsername={setUsername}
                        />
                        <EmailInput email={email} setEmail={setEmail} />
                        <PasswordInput
                            password={password}
                            setPassword={setPassword}
                            showPassword1={showPassword1}
                            togglePassword1Visibility={
                                togglePassword1Visibility
                            }
                        />
                        <ConfirmPasswordInput
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            showPassword2={showPassword2}
                            togglePassword2Visibility={
                                togglePassword2Visibility
                            }
                        />
                        <SignupButton />
                    </div>
                    <RedirectionLink />
                </Form>
            </Container>
        </main>
    );
};

export default SignupForm;
