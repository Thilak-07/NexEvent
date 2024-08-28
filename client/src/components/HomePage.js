import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div
        className="bg-dark text-light text-center py-5"
      >
        <Container>
          <h1 className="display-3">Welcome to NexEvent</h1>
          <p>Discover and explore events happening around you and beyond.</p>
          <Button variant="light" as={Link} to="/explore">
            Explore Events
          </Button>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          <Col md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Track RSVPs</Card.Title>
                <Card.Text>
                  Keep tabs on your guest list effortlessly and accurately.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Manage Events</Card.Title>
                <Card.Text>
                  Plan, coordinate, and execute your events with ease and
                  precision.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Send Reminders</Card.Title>
                <Card.Text>
                  Ensure no one forgets with timely and personalized reminders.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <h2 className="text-center mb-4">Popular Events</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="https://placehold.co/150x150" />
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
            <Card className="mb-4">
              <Card.Img variant="top" src="https://placehold.co/150x150" />
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
            <Card className="mb-4">
              <Card.Img variant="top" src="https://placehold.co/150x150" />
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
