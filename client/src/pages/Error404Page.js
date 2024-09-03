import React from "react";
import { Container } from "react-bootstrap";

import FooterComponent from "../components/FooterComponent";

const Error404Page = () => {
    return (
        <>
            <Container className="flex-fill d-flex flex-column align-items-center justify-content-center">
                <h1>ERROR 404 | PAGE NOT FOUND</h1>
            </Container>
            <FooterComponent />
        </>
    );
};

export default Error404Page;
