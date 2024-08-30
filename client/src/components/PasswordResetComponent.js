import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

import FooterComponent from "./FooterComponent";
import { checkTokenValidity, resetPassword } from "../api";

const PasswordResetComponent = ({ client }) => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await checkTokenValidity(token);
            } catch {
                toast.error("Invalid token.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate("/");
            }
        };

        verifyToken();
    }, [token, navigate]);

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
            return;
        }

        try {
            await resetPassword(token, password);
            toast.success("Password successfully updated!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate("/auth/login");
        } catch {
            toast.error(
                "Failed to reset password. The token may be invalid or expired.",
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
        }
    };

    return (
        <>
            <Container className="py-5 flex-fill mt-5">
                <h2 className="mb-4 text-center">Reset Your Password</h2>
                <Form
                    onSubmit={handleSubmit}
                    className="mx-auto"
                    style={{ maxWidth: "400px" }}
                >
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FaLock />
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group
                        controlId="formConfirmPassword"
                        className="mb-3"
                    >
                        <Form.Label>Confirm New Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <FaLock />
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Reset Password
                    </Button>
                    <div className="text-center mt-3">
                        <Link to="/" className="text-decoration-none">
                            Back to Home
                        </Link>
                    </div>
                </Form>
            </Container>
            <FooterComponent />
        </>
    );
};

export default PasswordResetComponent;
