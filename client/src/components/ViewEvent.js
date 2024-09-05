import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

import { fetchEventById } from "../api";
import Error404Page from "../pages/Error404Page";

const ViewEvent = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventData = await fetchEventById(id);
                setEvent(eventData);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!event) return <Error404Page />;

    return (
        <Container className="view-event-container my-4 pt-5">
            <Row className="g-4">
                <Col md={8} className="view-event-image-container">
                    <img
                        src={event.feature_image}
                        alt={event.title}
                        className="view-event-image"
                    />
                </Col>
                <Col md={4}>
                    <Card className="view-event-details-container border-light">
                        <Card.Body>
                            <Card.Title className="view-event-title">
                                {event.title}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted view-event-subtitle">
                                <strong>Category:</strong> {event.category}
                            </Card.Subtitle>
                            <Card.Text>
                                <FaCalendarAlt /> Date and Time:{" "}
                                {new Date(event.date_time).toLocaleString()}
                            </Card.Text>
                            <Card.Text>
                                <FaMapMarkerAlt /> Location: {event.location}
                            </Card.Text>
                            <Button variant="primary">Register</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>About</h3>
                    <hr />
                    <p>{event.description}</p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Terms and Conditions</h3>
                    <hr />
                    <p>{event.terms_and_conditions}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ViewEvent;
