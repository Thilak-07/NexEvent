import React, { useState, useEffect, createContext, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

import FooterComponent from "./FooterComponent";
import { checkTokenValidity, resetPassword } from "../api";

export const PasswordResetContext = createContext();

const PasswordInput = () => {
    const { password, showPassword, setPassword } =
        useContext(PasswordResetContext);

    return (
        <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>New Password</Form.Label>
            <InputGroup>
                <InputGroup.Text>
                    <FaLock />
                </InputGroup.Text>
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </InputGroup>
        </Form.Group>
    );
};

const ConfirmPasswordInput = () => {
    const { confirmPassword, showPassword, setConfirmPassword } =
        useContext(PasswordResetContext);

    return (
        <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <InputGroup>
                <InputGroup.Text>
                    <FaLock />
                </InputGroup.Text>
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </InputGroup>
        </Form.Group>
    );
};

const ShowPasswordCheckBox = () => {
    const { showPassword, setShowPassword } = useContext(PasswordResetContext);

    return (
        <Form.Group controlId="formShowPassword" className="mb-3">
            <Form.Check
                type="checkbox"
                label="Show Password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
            />
        </Form.Group>
    );
};

const ResetPasswordButton = () => {
    return (
        <Button variant="primary" type="submit" className="w-100">
            Reset Password
        </Button>
    );
};

const RedirectionLink = () => {
    return (
        <div className="text-center mt-3">
            <Link to="/" className="text-decoration-none">
                Back to Home
            </Link>
        </div>
    );
};

const Error404Page = () => {
    return (
        <>
            <Container className="flex-fill d-flex flex-column align-items-center justify-content-center">
                <h1>ERROR 404 | PAGE NOT FOUND</h1>
            </Container>
            <FooterComponent />
        </>
    );
};

const PasswordResetComponent = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
            toast.success("Password updated successfully!", {
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
        } catch (err) {
            const error_message = err.response.data.error
                ? err.response.data.error
                : "Password field may not be blank.";

            toast.error(error_message, {
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

    const contextValue = {
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        showPassword,
        setShowPassword,
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
                    <PasswordResetContext.Provider value={contextValue}>
                        <PasswordInput />
                        <ConfirmPasswordInput />
                        <ShowPasswordCheckBox />
                    </PasswordResetContext.Provider>

                    <ResetPasswordButton />
                    <RedirectionLink />
                </Form>
            </Container>
            <FooterComponent />
        </>
    );
};

const PasswordResetWrapper = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [verified, setVerified] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await checkTokenValidity(token);
                setVerified(true);
            } catch {
                setVerified(false);
            }
        };

        verifyToken();
    }, [token, navigate]);

    return verified ? <PasswordResetComponent /> : <Error404Page />;
};

export default PasswordResetWrapper;
