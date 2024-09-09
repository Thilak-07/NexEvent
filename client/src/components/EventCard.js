import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const FeatureImage = ({ feature_image }) => {
    return feature_image ? (
        <Card.Img variant="top" src={feature_image} className="event-image" />
    ) : (
        <div className="event-image-placeholder">No Image</div>
    );
};

const EventTags = ({ category, formattedDate }) => {
    return (
        <div className="tags-container">
            <div className="category-tag">{category}</div>
            <div className="date-tag">
                <span>{formattedDate.day}</span>
                <span>{formattedDate.month}</span>
            </div>
        </div>
    );
};

const EventBody = ({ title, location }) => {
    return (
        <Card.Body className="event-body">
            <Card.Title className="event-title">{title}</Card.Title>
            <Card.Text className="event-location">{location}</Card.Text>
        </Card.Body>
    );
};

const EventCard = ({ event }) => {
    const { id, title, location, date_time, feature_image, category } = event;
    const date = new Date(date_time);
    const formattedDate = {
        day: date.toLocaleDateString("en-US", { day: "2-digit" }),
        month: date
            .toLocaleDateString("en-US", { month: "short" })
            .toUpperCase(),
    };

    return (
        <Link
            to={`/explore/events/${id}`}
            className="event-card-link d-flex justify-content-center justify-content-md-start"
        >
            <Card className="event-card shadow-sm">
                <FeatureImage feature_image={feature_image} />
                <EventTags category={category} formattedDate={formattedDate} />
                <EventBody title={title} location={location} />
            </Card>
        </Link>
    );
};

export default EventCard;
