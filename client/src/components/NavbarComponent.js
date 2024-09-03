import { Container, Navbar, Button, Nav } from "react-bootstrap";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { logoutUser } from "../api";
import { useAuth } from "../contexts/AuthContext";

const NexEventLogo = () => {
    return (
        <Navbar.Brand href="/" className="d-flex align-items-center">
            <>
                <img
                    src="favicon.svg"
                    alt="Brand Logo"
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
            variant="outline-light"
            className="me-2"
            as={Link}
            to="/auth/login"
            style={{
                transition: "background-color 0.3s",
            }}
        >
            Login
        </Button>
    );
};

const RegisterButton = () => {
    return (
        <Button variant="light" as={Link} to="/auth/signup">
            Register
        </Button>
    );
};

const LogoutButton = ({ onLogoutClick }) => {
    return (
        <Button as={Nav.Link} onClick={onLogoutClick}>
            Logout
        </Button>
    );
};

const NavbarComponent = () => {
    const navigate = useNavigate();
    const { loggedIn, handleLogout } = useAuth();

    const onLogoutClick = async (e) => {
        e.preventDefault();
        try {
            await logoutUser();
            handleLogout();
            toast.info("Logout successful!", {
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
            toast.error("Logout failed. Please try again.", {
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
                            <LogoutButton onLogoutClick={onLogoutClick} />
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
