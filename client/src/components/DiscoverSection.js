import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const HeadText = () => {
    return (
        <h1 className="display-4">
            Explore the Best Events Happening Around You
        </h1>
    );
};

const LeadText = () => {
    return (
        <p className="lead">
            Discover upcoming events, find your interests, and never miss out on
            what's happening in your city.
        </p>
    );
};

const UpcomingEventsButton = () => {
    return (
        <Button
            variant="primary"
            size="lg"
            className="custom-button upcoming-button mb-2 mb-md-0 me-md-2"
            href="#upcoming-events"
        >
            Upcoming Events
        </Button>
    );
};

const BrowseButton = () => {
    return (
        <Button
            variant="outline-light"
            size="lg"
            className="custom-button browse-button"
            as={Link}
            to="/explore/events"
        >
            Browse <FaArrowRight className="ms-2" />
        </Button>
    );
};

const ButtonGroup = () => {
    return (
        <div className="button-group mt-3 d-flex flex-column flex-md-row align-items-md-start justify-content-center justify-content-md-start">
            <UpcomingEventsButton />
            <BrowseButton />
        </div>
    );
};

const DiscoverSection = () => {
    return (
        <section
            className="discover-section d-flex align-items-center min-vh-100"
            style={{
                background:
                    "url(assets/explore-hero.jpg) no-repeat center center",
                backgroundSize: "cover",
                color: "white",
            }}
        >
            <Container>
                <Row className="align-items-center">
                    <Col md={8} className="text-center text-md-start">
                        <HeadText />
                        <LeadText />
                        <ButtonGroup />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default DiscoverSection;
