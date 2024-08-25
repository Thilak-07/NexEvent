import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-dark text-light text-center py-5">
        <Container>
          <h1>Welcome to NexEvent</h1>
          <p>Discover and explore events happening around you and beyond.</p>
          <Button variant="light" href="/explore">
            Get Started
          </Button>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <Row>
          <Col md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Easy Event Discovery</Card.Title>
                <Card.Text>
                  Find events near you with our user-friendly search and filter features.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Personalized Dashboard</Card.Title>
                <Card.Text>
                  Keep track of your favorite events and get personalized recommendations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Seamless Booking</Card.Title>
                <Card.Text>
                  Book tickets effortlessly and get instant confirmation for all your events.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Popular Events Section */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Popular Events</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Music Concert</Card.Title>
                <Card.Text>
                  Enjoy a night of live music featuring top artists from around the world.
                </Card.Text>
                <Button variant="dark" href="/explore">
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Art Exhibition</Card.Title>
                <Card.Text>
                  Explore contemporary art pieces and meet the artists behind them.
                </Card.Text>
                <Button variant="dark" href="/explore">
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Tech Conference</Card.Title>
                <Card.Text>
                  Stay ahead of the curve with insights from industry leaders at this tech conference.
                </Card.Text>
                <Button variant="dark" href="/explore">
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
