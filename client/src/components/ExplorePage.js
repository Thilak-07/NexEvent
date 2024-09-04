import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import { fetchAllEvents } from "../api";

const EventCard = ({ event }) => {
    const { title, location, date_time, feature_image, category } = event;
    const date = new Date(date_time);
    const formattedDate = {
        day: date.toLocaleDateString("en-US", { day: "2-digit" }),
        month: date
            .toLocaleDateString("en-US", { month: "short" })
            .toUpperCase(),
    };

    return (
        <Card className="event-card mb-4 shadow-sm">
            {feature_image ? (
                <Card.Img
                    variant="top"
                    src={feature_image}
                    className="event-image"
                />
            ) : (
                <div className="event-image-placeholder">No Image</div>
            )}
            <div className="tags-container">
                <div className="category-tag">{category}</div>
                <div className="date-tag">
                    <span>{formattedDate.day}</span>
                    <span>{formattedDate.month}</span>
                </div>
            </div>
            <Card.Body className="event-body">
                <Card.Title className="event-title">{title}</Card.Title>
                <Card.Text className="event-location">{location}</Card.Text>
            </Card.Body>
        </Card>
    );
};

const ExplorePage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchAllEvents();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="bg-light min-vh-100 text-dark text-center py-5 d-flex align-items-center">
            <Container className="py-5 mt-5">
                <h2 className="mb-4 text-center">Explore Events</h2>
                <Row>
                    {events.map((event) => (
                        <Col
                            md={4}
                            sm={6}
                            xs={12}
                            key={event.id}
                            className="d-flex flex-column justify-content-center align-items-center"
                        >
                            <EventCard event={event} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default ExplorePage;
