import React from "react";
import { Card } from "react-bootstrap";

const EventCard = ({ event }) => {
    const { title, location, date_time, feature_image, category } = event;
    const date = new Date(date_time);
    const formattedDate = {
        day: date.toLocaleDateString("en-US", { day: "2-digit" }),
        month: date
            .toLocaleDateString("en-US", { month: "short" })
            .toUpperCase(),
    };

    return (
        <Card className="event-card shadow-sm">
            {feature_image ? (
                <Card.Img
                    variant="top"
                    src={feature_image}
                    className="event-image"
                />
            ) : (
                <div className="event-image-placeholder">No Image</div>
            )}
            <div className="tags-container">
                <div className="category-tag">{category}</div>
                <div className="date-tag">
                    <span>{formattedDate.day}</span>
                    <span>{formattedDate.month}</span>
                </div>
            </div>
            <Card.Body className="event-body">
                <Card.Title className="event-title">{title}</Card.Title>
                <Card.Text className="event-location">{location}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default EventCard;
