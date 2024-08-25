import { Container, Navbar, Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavbarComponent = ({ loggedIn, handleLogout, client }) => {
  const navigate = useNavigate();

  const onLogoutClick = (e) => {
    e.preventDefault();
    client.post("auth/logout/").then(handleLogout);
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand href="/">
          <strong>NexEvent</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/explore">Explore</Nav.Link>
            {loggedIn && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
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
                  href="/login"
                  style={{ transition: "background-color 0.3s" }}
                >
                  Login
                </Button>
                <Button variant="light" href="/signup">
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
