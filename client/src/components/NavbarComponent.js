import React, { useState } from "react";
import { Container, Navbar, Button, Nav } from "react-bootstrap";

const NavbarComponent = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">NexEvent</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/explore">Explore</Nav.Link>
            {loggedIn && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
          </Nav>
          <Nav>
            {loggedIn ? (
              <>
                <Button variant="light" className="me-2" onClick={handleLogout}>
                  Logout
                </Button>
              </>
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
                <Button
                  variant="light"
                  href="/signup"
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderColor: "#f8f9fa",
                    color: "#000",
                    transition: "background-color 0.3s",
                  }}
                >
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
