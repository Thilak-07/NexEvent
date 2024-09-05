import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Error404Page = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-dark text-light">
            <Container className="flex-fill d-flex flex-column align-items-center justify-content-center text-center">
                <h1>ERROR 404 | Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Button variant="primary" onClick={handleGoHome}>
                    Go to Home
                </Button>
            </Container>
        </div>
    );
};

export default Error404Page;
