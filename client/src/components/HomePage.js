import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";

const HomePage = () => {
  return (
    <div>
      <div className="bg-dark min-vh-100 text-light text-center py-5 d-flex align-items-center">
        <Container>
          <h1
            className="display-3"
            style={{ fontSize: "4rem", color: "#f5a623" }}
          >
            Welcome to NexEvent
          </h1>
          <p>Discover and explore events happening around you and beyond.</p>
          <Button variant="light" as={Link} to="/explore">
            Explore Events
          </Button>
          {/* <ScrollArrow /> */}
          <a href="#home">
            <svg className="arrows">
              <path className="a1" d="M0 0 L30 32 L60 0"></path>
              <path className="a2" d="M0 20 L30 52 L60 20"></path>
              <path className="a3" d="M0 40 L30 72 L60 40"></path>
            </svg>
          </a>
        </Container>
      </div>
      <section id="home">
        <Container className="py-5 d-flex align-items-center">
          <Row className="w-100">
            <Col xs={12} md={6}>
              <Image src="./landing_imgs/vector.jpg" fluid />
            </Col>
            <Col xs={12} md={6} className="d-flex flex-row align-items-center">
              <div>
                <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                  Unlock Your Creative Potential
                </h1>
                <hr />
                <p>
                  Our app empowers individual contributors and artists like you
                  to unleash your creativity and organize remarkable events.
                  Whether you're planning a solo exhibition, a live performance,
                  or a collaborative workshop, our platform provides the tools
                  and features you need to make your events a resounding
                  success.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <HeroSection />

      <Container className="pt-5 pb-4">
        <h2 className="text-center mb-4">The Best of Live Events</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-4 custom-card">
              <Card.Img variant="top" src="landing_imgs/concert_img.jpg" />
              <Card.Body>
                <Card.Title>Music Concert</Card.Title>
                <Card.Text>
                  Enjoy a night of live music featuring top artists from around
                  the world.
                </Card.Text>
                <Button variant="dark" as={Link} to="/explore">
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 custom-card">
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1618481187866-5c7b6b9b5431?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <Card.Body>
                <Card.Title>Art Exhibition</Card.Title>
                <Card.Text>
                  Explore contemporary art pieces and meet the artists behind
                  them.
                </Card.Text>
                <Button variant="dark" as={Link} to="/explore">
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 custom-card">
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1582192493926-93f4847e1323?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <Card.Body>
                <Card.Title>Tech Conference</Card.Title>
                <Card.Text>
                  Stay ahead of the curve with insights from industry leaders at
                  this tech conference.
                </Card.Text>
                <Button variant="dark" as={Link} to="/explore">
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
