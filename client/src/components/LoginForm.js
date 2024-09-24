import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import {
    Container,
    Form,
    Button,
    Navbar,
    Nav,
    InputGroup,
    Spinner,
} from "react-bootstrap";

import BackBtn from "./BackBtn";
import LoginProvider, { useLogin } from "../contexts/LoginContext";

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

const EmailInput = () => {
    const { email, setEmail } = useLogin();

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

const PasswordInput = () => {
    const { password, setPassword, showPassword, togglePasswordVisibility } =
        useLogin();

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
    const { isLoading } = useLogin();

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
                "Login"
            )}
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

const LoginForm = () => {
    const { onSubmit } = useLogin();

    return (
        <main className="flex-fill">
            <Navigation />
            <Container className="py-5 position-relative">
                <LogoUnit />
                <h3 className="mb-4 text-center">Login to NexEvent</h3>
                <Form
                    onSubmit={onSubmit}
                    className="flex-fill mx-auto"
                    style={{ maxWidth: "400px" }}
                >
                    <div className="my-4 glowy-box">
                        <EmailInput />
                        <PasswordInput />
                        <LoginButton />
                    </div>

                    <RedirectionLinks />
                </Form>
            </Container>
        </main>
    );
};

const LoginFormWrapper = () => {
    return (
        <LoginProvider>
            <LoginForm />
        </LoginProvider>
    );
};

export default LoginFormWrapper;
