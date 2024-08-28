import { Container, Navbar, Button, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = ({ loggedIn, handleLogout, client }) => {
  const navigate = useNavigate();

  const onLogoutClick = (e) => {
    e.preventDefault();
    client.post("auth/logout/").then(handleLogout);
    navigate("/auth/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <strong>NexEvent</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/explore">
              Explore
            </Nav.Link>
            {loggedIn && (
              <Nav.Link as={Link} to="/dashboard">
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
