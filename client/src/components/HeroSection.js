import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardSwiper from "./CardSwiper";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <Container className="py-4">
        <Row>
          <Col md={6} className="text-left">
            <h1 className="hero-title pb-1">
              Seamless Event Planning <br /> and Organization
            </h1>
          </Col>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <p className="hero-description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Accusantium doloremque quibusdam consectetur dolore natus fugiat
              quidem hic omnis. Dolorem molestias dolorum placeat, soluta
              dignissimos quaerat autem adipisci? Asperiores, est, omnis,
              doloremque placeat debitis repudiandae obcaecati reprehenderit
              dicta porro dolorum tempora.
            </p>
          </Col>
        </Row>
      </Container>
      <CardSwiper />
    </div>
  );
};

export default HeroSection;
