import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardSwiper from "./CardSwiper";

const HeroSection = () => {
    return (
        <div className="hero-section">
            <Container className="py-4">
                <Row>
                    <Col md={5} className="text-left">
                        <h1 className="hero-title pb-1">
                            Seamless Event Planning and Organization
                        </h1>
                    </Col>
                    <Col
                        md={7}
                        className="d-flex align-items-center justify-content-center"
                    >
                        <p className="hero-description">
                            Say goodbye to the hassles of event planning. Our
                            user-friendly interface simplifies the process,
                            allowing you to focus on your artistic endeavors.
                            Create and manage events effortlessly, from setting
                            dates and locations to providing event descriptions
                            and ticketing options. Streamline your planning
                            process and bring your vision to reality.
                        </p>
                    </Col>
                </Row>
            </Container>
            <CardSwiper />
        </div>
    );
};

export default HeroSection;
