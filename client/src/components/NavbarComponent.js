import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";

const NavbarComponent = ({ currentUser, onLogout, onToggleForm }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          {currentUser ? "NexEvent" : "NexEvent Authentication"}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {currentUser ? (
              <form onSubmit={onLogout}>
                <Button type="submit" variant="light">
                  Log out
                </Button>
              </form>
            ) : (
              <Button id="form_btn" onClick={onToggleForm} variant="light">
                Register
              </Button>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
