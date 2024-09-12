import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="text-center">
                <Col>
                    <div className="p-4 rounded shadow-sm">
                        <div className="mb-4">
                            <img
                                src="/assets/dashboard.png"
                                alt="Dashboard Icon"
                                style={{ width: "50%", height: "50%" }}
                            />
                        </div>
                        <h1>Welcome, Attendee!</h1>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
