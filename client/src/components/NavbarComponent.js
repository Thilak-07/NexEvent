import { Container, Navbar, Button, Nav } from "react-bootstrap";
import { Link, useNavigate, NavLink } from "react-router-dom";

const NavbarComponent = ({ loggedIn, handleLogout, client }) => {
  const navigate = useNavigate();

  const onLogoutClick = (e) => {
    e.preventDefault();
    client.post("auth/logout/").then(handleLogout);
    navigate("/auth/login");
  };

  return (
    <Navbar variant="dark" expand="lg" className="bg-dark py-2 fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "#f5a623" : "grey",
              })}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/explore"
              style={({ isActive }) => ({
                color: isActive ? "#f5a623" : "grey",
              })}
            >
              Explore
            </Nav.Link>
            {loggedIn && (
              <Nav.Link
                as={NavLink}
                to="/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "#f5a623" : "grey",
                })}
              >
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            {loggedIn ? (
              <Button variant="light" onClick={onLogoutClick}>
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  className="me-2"
                  as={Link}
                  to="/auth/login"
                  style={{ transition: "background-color 0.3s" }}
                >
                  Login
                </Button>
                <Button variant="light" as={Link} to="/auth/signup">
                  Signup
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
