import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { fetchAllEvents } from "../api";
import EventCard from "../components/EventCard";

const categories = [
    "All",
    "Music",
    "Games",
    "Sports",
    "Film",
    "Fashion",
    "Literature",
    "Technology",
    "Lifestyle",
    "Culture",
    "Charity",
    "Arts",
    "Kids",
    "Other",
];

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Fetch events on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchAllEvents();
                setEvents(data);
                setFilteredEvents(data); // Set initially to all events
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    // Handle category change and filter events
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredEvents(events);
        } else {
            const filtered = events.filter(
                (event) => event.category === category.toLowerCase()
            );
            setFilteredEvents(filtered);
        }
    };

    return (
        <Container className="min-vh-100" style={{ paddingTop: "70px" }}>
            <h2 className="text-center my-4">Browse by Category</h2>

            {/* Filter Row */}
            <Row className="justify-content-center mb-4">
                <Col xs="auto">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={
                                selectedCategory === category
                                    ? "primary"
                                    : "outline-primary"
                            }
                            className="m-2"
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </Col>
            </Row>

            {/* Event Cards Grid */}
            <Row>
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <Col
                            key={event.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            className="mb-4"
                        >
                            <EventCard event={event} />
                        </Col>
                    ))
                ) : (
                    <p className="text-center">
                        No events available for this category.
                    </p>
                )}
            </Row>
        </Container>
    );
};

export default Events;
