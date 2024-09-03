import React, { useState, useEffect, createContext, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

import Error404Page from "../pages/Error404Page";
import FooterComponent from "./FooterComponent";
import { checkTokenValidity, resetPassword } from "../api";

export const PasswordResetContext = createContext();

const PasswordInput = ({ label, password, setPassword }) => {
    const { showPassword } = useContext(PasswordResetContext);

    const placeholder =
        label === "New Password"
            ? "Enter new password"
            : "Confirm new password";

    return (
        <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>{label}</Form.Label>
            <InputGroup>
                <InputGroup.Text>
                    <FaLock />
                </InputGroup.Text>
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                position: "bottom-right",
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
                position: "bottom-right",
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
                position: "bottom-right",
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
                        <PasswordInput
                            label={"New Password"}
                            password={password}
                            setPassword={setPassword}
                        />
                        <PasswordInput
                            label={"Confirm New Password"}
                            password={confirmPassword}
                            setPassword={setConfirmPassword}
                        />
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
    const [verified, setVerified] = useState(false);

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
