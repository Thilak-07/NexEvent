import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
    const { userName } = useAuth();
    const firstName = userName.split(" ")[0];

    return (
        <Container className="p-3 mt-2 mb-5">
            <h1 className="px-2 mb-4 text-center text-md-start">
                Manage Events
            </h1>
            <Row className="align-items-center">
                <Col xs={12} md={6} className="text-center mb-4 mb-md-0">
                    <img
                        src="/assets/dashboard.svg"
                        alt="Dashboard Icon"
                        className="img-fluid"
                        style={{ maxWidth: "80%", minWidth: "250px" }}
                    />
                </Col>
                <Col
                    xs={12}
                    md={6}
                    className="d-flex flex-column align-items-center align-items-md-start"
                >
                    <h1>
                        Welcome,{" "}
                        <span style={{ color: "#f5a623" }}>{firstName}</span>!
                    </h1>
                    <p
                        className="lead mb-4 text-center text-md-start"
                        style={{ color: "#b0b0b0" }}
                    >
                        Discover events happening around you and manage the ones
                        you're attending or hosting. Stay informed and never
                        miss out on exciting opportunities.
                    </p>
                    <div className="text-center text-md-start mb-md-5 mb-0">
                        <Button
                            variant="outline-primary"
                            as={Link}
                            to={"/explore/events"}
                            className="me-2 custom-login-button"
                            style={{ borderRadius: "5px" }}
                        >
                            Explore Events
                        </Button>
                        <Button
                            variant="outline-primary"
                            as={Link}
                            to={"/dashboard/events"}
                            className="custom-login-button"
                            style={{ borderRadius: "5px" }}
                        >
                            Your Events
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
