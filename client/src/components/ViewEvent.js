import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaBookmark,
    FaRegClock,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { fetchEventById, createRsvp } from "../api";
import Error404Page from "../pages/Error404Page";
import { useAuth } from "../contexts/AuthContext";

const ViewEvent = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const { loggedIn } = useAuth();

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

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createRsvp({ event: id });
            toast.success("Event Registered");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

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
                    <Card className="view-event-details-container">
                        <Card.Body>
                            <Card.Title className="view-event-title">
                                {event.title}
                            </Card.Title>

                            <Card.Subtitle className="d-flex align-items-center mb-4">
                                <FaBookmark className="me-2" />
                                <div className="capitalize">
                                    {event.category}
                                </div>
                            </Card.Subtitle>

                            <Card.Text className="d-flex align-items-center mb-1">
                                <FaCalendarAlt className="me-2" />
                                <strong>Date:&nbsp;</strong>
                                {new Date(event.date_time).toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday: "short",
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                    }
                                )}
                            </Card.Text>

                            <Card.Text className="d-flex align-items-center mb-1">
                                <FaRegClock className="me-2" />
                                <strong>Time:&nbsp;</strong>
                                {new Date(event.date_time).toLocaleTimeString(
                                    "en-US",
                                    {
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                    }
                                )}
                            </Card.Text>

                            <Card.Text className="d-flex align-items-center">
                                <FaMapMarkerAlt className="me-2" />
                                <strong>Location:&nbsp;</strong>
                                {event.location}
                            </Card.Text>
                            <Button
                                variant="primary"
                                onClick={handleRegister}
                                disabled={!loggedIn}
                            >
                                Register
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <h4 style={{ fontWeight: "bold" }}>About</h4>
                    <hr className="mt-0 mb-2" />
                    <p>{event.description}</p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h4 style={{ fontWeight: "bold" }}>Terms and Conditions</h4>
                    <hr className="mt-0 mb-2" />
                    <p>{event.terms_and_conditions}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ViewEvent;
