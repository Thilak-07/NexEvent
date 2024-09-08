import React from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

function BackBtn({ to }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackClick = () => {
        const redirectTo =
            new URLSearchParams(location.search).get("redirect") || to;
        navigate(redirectTo);
    };

    return (
        <Button
            variant="link"
            className="d-flex align-items-center gap-1 fw-bold rounded-pill transition-all duration-500"
            style={{
                color: "gray",
                textDecoration: "none",
                border: "none",
                backgroundColor: "transparent",
            }}
            onClick={handleBackClick}
            onMouseOver={(e) => {
                const spanElement = e.currentTarget.querySelector("span");
                const arrElement = e.currentTarget.querySelector("#ArrowBack");
                spanElement.style.transform = "translateX(0)";
                spanElement.style.color = "white";
                arrElement.style.transform = "scale(0.7)";
            }}
            onMouseOut={(e) => {
                const spanElement = e.currentTarget.querySelector("span");
                const arrElement = e.currentTarget.querySelector("#ArrowBack");
                spanElement.style.transform = "translateX(16px)";
                spanElement.style.color = "transparent";
                arrElement.style.transform = "scale(1)";
            }}
        >
            <MdOutlineArrowBack
                id="ArrowBack"
                className="rounded-circle transition-all"
                size={24}
                style={{
                    color: "white",
                }}
            />
            <span
                className="text-gray-100"
                style={{
                    transition: "transform 0.2s, color 0.2s",
                    transform: "translateX(16px)",
                    color: "transparent",
                }}
            >
                Go back
            </span>
        </Button>
    );
}

export default BackBtn;
