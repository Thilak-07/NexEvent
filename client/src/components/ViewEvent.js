import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaBookmark,
    FaRegClock,
} from "react-icons/fa";

import Error404Page from "../pages/Error404Page";
import ViewEventProvider, { useViewEvent } from "../contexts/ViewEventContext";

const ImageContainer = () => {
    const { event } = useViewEvent();
    return (
        <Col md={8} className="view-event-image-container">
            <img
                src={event.feature_image}
                alt={event.title}
                className="view-event-image"
            />
        </Col>
    );
};

const EventTitle = () => {
    const { event } = useViewEvent();
    return <Card.Title className="view-event-title">{event.title}</Card.Title>;
};

const EventCategory = () => {
    const { event } = useViewEvent();
    return (
        <Card.Subtitle className="d-flex align-items-center mb-4">
            <FaBookmark className="me-2" />
            <div className="capitalize">{event.category}</div>
        </Card.Subtitle>
    );
};

const EventDate = () => {
    const { event } = useViewEvent();
    return (
        <Card.Text className="d-flex align-items-center mb-1">
            <FaCalendarAlt className="me-2" />
            <strong>Date:&nbsp;</strong>
            {new Date(event.date_time).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
                year: "numeric",
            })}
        </Card.Text>
    );
};

const EventTime = () => {
    const { event } = useViewEvent();
    return (
        <Card.Text className="d-flex align-items-center mb-1">
            <FaRegClock className="me-2" />
            <strong>Time:&nbsp;</strong>
            {new Date(event.date_time).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })}
        </Card.Text>
    );
};

const EventLocation = () => {
    const { event } = useViewEvent();
    return (
        <Card.Text className="d-flex align-items-center">
            <FaMapMarkerAlt className="me-2" />
            <strong>Location:&nbsp;</strong>
            {event.location}
        </Card.Text>
    );
};

const RegisterButton = () => {
    const { handleRegister, isRegistered } = useViewEvent();
    return (
        <Button
            variant="primary"
            onClick={handleRegister}
            disabled={isRegistered}
        >
            {isRegistered ? "Registered" : "Register"}
        </Button>
    );
};

const AboutSection = () => {
    const { event } = useViewEvent();
    return (
        <Row className="mt-4">
            <Col>
                <h4 style={{ fontWeight: "bold" }}>About</h4>
                <hr className="mt-0 mb-2" />
                <p>{event.description}</p>
            </Col>
        </Row>
    );
};

const TermsSection = () => {
    const { event } = useViewEvent();
    return (
        <Row className="mt-4">
            <Col>
                <h4 style={{ fontWeight: "bold" }}>Terms and Conditions</h4>
                <hr className="mt-0 mb-2" />
                <p>{event.terms_and_conditions}</p>
            </Col>
        </Row>
    );
};

const DetailsContainer = () => {
    return (
        <Col md={4}>
            <Card className="view-event-details-container">
                <Card.Body>
                    <EventTitle />
                    <EventCategory />
                    <EventDate />
                    <EventTime />
                    <EventLocation />
                    <RegisterButton />
                </Card.Body>
            </Card>
        </Col>
    );
};

const ViewEvent = () => {
    const { event } = useViewEvent();

    if (!event) return <Error404Page />;

    return (
        <Container className="view-event-container my-4 pt-5">
            <Row className="g-4">
                <ImageContainer />
                <DetailsContainer />
            </Row>
            <AboutSection />
            <TermsSection />
        </Container>
    );
};

const ViewEventWrapper = () => {
    return (
        <ViewEventProvider>
            <ViewEvent />
        </ViewEventProvider>
    );
};

export default ViewEventWrapper;
