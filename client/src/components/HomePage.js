import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";

const ScrollArrow = () => {
    return (
        <a href="#home">
            <svg className="arrows">
                <path className="a1" d="M0 0 L30 32 L60 0"></path>
                <path className="a2" d="M0 20 L30 52 L60 20"></path>
                <path className="a3" d="M0 40 L30 72 L60 40"></path>
            </svg>
        </a>
    );
};

const WelcomeSection = () => {
    return (
        <div
            className="bg-dark min-vh-100 text-light text-center py-5 d-flex align-items-center"
            style={{
                backgroundImage: "url('assets/bullseye-gradient.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Container>
                <h1
                    className="display-2"
                    style={{ color: "#f5a623", fontWeight: "400" }}
                >
                    Welcome to NexEvent
                </h1>
                <p className="lead" style={{ fontSize: "1.25rem" }}>
                    Discover and explore events happening around you and beyond.
                </p>
                <Button
                    variant="light"
                    as={Link}
                    to="/explore/events"
                    style={{
                        borderRadius: "50px",
                        padding: "10px 20px",
                    }}
                >
                    Explore Events
                </Button>
                <ScrollArrow />
            </Container>
        </div>
    );
};

const DescriptionSection = () => {
    return (
        <section id="home">
            <Container className="py-5 d-flex align-items-center">
                <Row className="w-100">
                    <Col xs={12} md={6}>
                        <Image src="assets/vector.jpg" fluid />
                    </Col>
                    <Col
                        xs={12}
                        md={6}
                        className="d-flex flex-row align-items-center"
                    >
                        <div>
                            <h1
                                style={{
                                    fontSize: "3rem",
                                    fontWeight: "bold",
                                }}
                            >
                                Unlock Your Creative Potential
                            </h1>
                            <hr />
                            <p>
                                Our app empowers individual contributors and
                                artists like you to unleash your creativity and
                                organize remarkable events. Whether you're
                                planning a solo exhibition, a live performance,
                                or a collaborative workshop, our platform
                                provides the tools and features you need to make
                                your events a resounding success.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

const EventCard = ({ src, title, text }) => {
    return (
        <Col md={4}>
            <Card className="mb-4 custom-card">
                <Link to="/explore">
                    <Card.Img variant="top" src={src} className="custom-img" />
                </Link>
                <Card.Body>
                    <Card.Title className="card-title">{title}</Card.Title>
                    <Card.Text>{text}</Card.Text>
                    <Button variant="dark" as={Link} to="/explore">
                        Learn More
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

const EventSection = () => {
    return (
        <Container className="pt-5 pb-4">
            <h2 className="text-center mb-4">The Best of Live Events</h2>
            <Row>
                <EventCard
                    src={"assets/concert_img.jpg"}
                    title={"Music Concert"}
                    text={
                        "Enjoy a night of live music featuring top artists from around the world."
                    }
                />
                <EventCard
                    src={
                        "https://images.unsplash.com/photo-1618481187866-5c7b6b9b5431?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    title={"Art Exhibition"}
                    text={
                        "Explore contemporary art pieces and meet the artists behind them."
                    }
                />
                <EventCard
                    src={
                        "https://images.unsplash.com/photo-1582192493926-93f4847e1323?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    title={"Tech Conference"}
                    text={
                        "Stay ahead of the curve with insights from industry leaders at this tech conference."
                    }
                />
            </Row>
        </Container>
    );
};

const HomePage = () => {
    return (
        <div>
            <WelcomeSection />
            <DescriptionSection />
            <HeroSection />
            <EventSection />
        </div>
    );
};

export default HomePage;
