import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

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
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [categorizedEvents, setCategorizedEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [filterLocation, setFilterLocation] = useState("");

    // Fetch events on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchAllEvents();
                const sortedData = data.sort(
                    (a, b) => new Date(a.date_time) - new Date(b.date_time)
                );

                setEvents(sortedData);
                setCategorizedEvents(sortedData);
                setFilteredEvents(sortedData);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            setCategorizedEvents(events);
        } else {
            const filtered = events.filter(
                (event) => event.category === category.toLowerCase()
            );
            setCategorizedEvents(filtered);
        }
    };

    // Handle search and filters
    useEffect(() => {
        const filterEvents = () => {
            let filtered = categorizedEvents;

            // Filter by search term (title and location)
            if (searchTerm) {
                filtered = filtered.filter(
                    (event) =>
                        event.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        event.location
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                );
            }

            // Filter by date (if selected)
            if (filterDate) {
                filtered = filtered.filter(
                    (event) =>
                        new Date(event.date_time).toLocaleDateString(
                            "en-GB"
                        ) === filterDate
                );
            }

            // Filter by location (if selected)
            if (filterLocation) {
                filtered = filtered.filter((event) =>
                    event.location
                        .toLowerCase()
                        .includes(filterLocation.toLowerCase())
                );
            }

            setFilteredEvents(filtered);
        };

        filterEvents();
    }, [searchTerm, filterDate, filterLocation, categorizedEvents]);

    return (
        <>
            <div className="bg-dark pb-2 mb-5" style={{ paddingTop: "60px" }}>
                <h2 className="display-5 text-center text-white my-4">
                    Browse by Category
                </h2>

                {/* Category Filter Row */}
                <div className="d-flex flex-wrap justify-content-center mb-2">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant="dark" // Assuming variant="none" is a default or neutral state
                            className="m-2"
                            onClick={() => handleCategoryChange(category)}
                            style={{
                                color:
                                    selectedCategory === category
                                        ? "#f5a623"
                                        : "grey",
                                backgroundColor: "transparent",
                                border: "none",
                            }}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Filter Row */}
                <Container className="mb-3">
                    <Row>
                        <Col md={8} className="mb-2">
                            <Form.Control
                                type="text"
                                placeholder="Search by title or location"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                        <Col md={2} className="mb-2">
                            <Form.Control
                                type="date"
                                placeholder="Filter by Date"
                                onChange={(e) =>
                                    setFilterDate(
                                        e.target.value
                                            ? new Date(
                                                  e.target.value
                                              ).toLocaleDateString("en-GB")
                                            : ""
                                    )
                                }
                            />
                        </Col>
                        <Col md={2} className="mb-2">
                            <Form.Control
                                type="text"
                                placeholder="Filter by location"
                                value={filterLocation}
                                onChange={(e) =>
                                    setFilterLocation(e.target.value)
                                }
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="min-vh-100">
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
                                className="d-flex justify-content-center mb-4"
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
        </>
    );
};

export default Events;
