import { Container, Navbar, Button, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NexEventLogo = () => {
    return (
        <Navbar.Brand href="/" className="d-flex align-items-center">
            <>
                <img
                    src="/favicon.svg"
                    alt="Logo"
                    width="55"
                    height="55"
                    className="position-absolute"
                />
                <strong style={{ marginInlineStart: "55px" }}>NexEvent</strong>
            </>
        </Navbar.Brand>
    );
};

const HomeLink = () => {
    return (
        <Nav.Link
            as={NavLink}
            to="/"
            className="d-flex justify-content-center"
            style={({ isActive }) => ({
                color: isActive ? "#f5a623" : "grey",
            })}
        >
            Home
        </Nav.Link>
    );
};

const ExploreLink = () => {
    return (
        <Nav.Link
            as={NavLink}
            to="/explore"
            className="d-flex justify-content-center"
            style={({ isActive }) => ({
                color: isActive ? "#f5a623" : "grey",
            })}
        >
            Explore
        </Nav.Link>
    );
};

const DashboardLink = () => {
    return (
        <Nav.Link
            as={NavLink}
            to="/dashboard"
            className="d-flex justify-content-center"
            style={({ isActive }) => ({
                color: isActive ? "#f5a623" : "grey",
            })}
        >
            Dashboard
        </Nav.Link>
    );
};

const LoginButton = () => {
    return (
        <Button
            className="custom-login-button me-lg-2 my-lg-0 my-2 d-flex justify-content-center"
            as={Link}
            to="/auth/login"
        >
            Login
        </Button>
    );
};

const RegisterButton = () => {
    return (
        <Button
            className="custom-register-button d-flex justify-content-center"
            as={Link}
            to="/auth/signup"
        >
            Register
        </Button>
    );
};

const LogoutButton = () => {
    const { onLogoutClick } = useAuth();

    return (
        <Button as={Nav.Link} onClick={onLogoutClick}>
            Logout
        </Button>
    );
};

const NavbarComponent = () => {
    const { loggedIn } = useAuth();

    return (
        <Navbar variant="dark" expand="lg" className="bg-dark py-2 fixed-top">
            <Container>
                <NexEventLogo />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <HomeLink />
                        <ExploreLink />
                        {loggedIn && <DashboardLink />}
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedIn ? (
                            <LogoutButton />
                        ) : (
                            <>
                                <LoginButton />
                                <RegisterButton />
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
