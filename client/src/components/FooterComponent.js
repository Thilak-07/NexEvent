import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <footer className="bg-black text-light py-3">
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">&copy; 2024 Ganit Inc. All Rights Reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="/" className="text-light me-3" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="/" className="text-light me-3" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="/" className="text-light me-3" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="/" className="text-light" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
