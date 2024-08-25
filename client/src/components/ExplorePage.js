import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const eventData = [
  {
    id: 1,
    title: "Music Concert",
    venue: "Chennai",
    time: "2024-08-25 19:00",
    image: "https://placehold.co/400x200",
  },
  {
    id: 2,
    title: "Art Exhibition",
    venue: "Bangalore",
    time: "2024-08-25 19:00",
    image: "https://placehold.co/400x200",
  },
  {
    id: 3,
    title: "Tech Conference",
    venue: "Mumbai",
    time: "2024-08-25 19:00",
    image: "https://placehold.co/400x200",
  },
  {
    id: 4,
    title: "Music Concert",
    venue: "Chennai",
    time: "2024-08-25 19:00",
    image: "https://placehold.co/400x200",
  },
  {
    id: 5,
    title: "Art Exhibition",
    venue: "Bangalore",
    time: "2024-08-25 19:00",
    image: "https://placehold.co/400x200",
  },
  {
    id: 6,
    title: "Tech Conference",
    venue: "Mumbai",
    time: "2024-08-25 19:00",
    image: "https://placehold.co/400x200",
  },
];

const ExplorePage = () => {
  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Explore Events</h2>
      <Row>
        {eventData.map((event) => (
          <Col md={4} sm={6} xs={12} key={event.id}>
            <Card className="mb-4 shadow-sm">
              <Card.Img variant="top" src={event.image} />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                  <strong>Venue:</strong> {event.venue} <br />
                  <strong>Time:</strong> {event.time}
                </Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card> 
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExplorePage;
