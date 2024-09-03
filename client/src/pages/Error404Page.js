import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";

const Error404Page = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <>
            <Container className="flex-fill d-flex flex-column align-items-center justify-content-center text-center">
                <h1>ERROR 401 | Unauthorized</h1>
                <p>You do not have permission to access this page.</p>
                <Button variant="primary" onClick={handleGoHome}>
                    Go to Home
                </Button>
            </Container>
            <FooterComponent />
        </>
    );
};

export default Error404Page;
