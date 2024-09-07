import React, { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import { fetchAllEvents } from "../api";

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [filterLocation, setFilterLocation] = useState("");

    // Fetch all events when component mounts
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchAllEvents();
                setEvents(data);
                setFilteredEvents(data); // Initialize filteredEvents with all events
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    // Format date to dd/mm/yy and time to HH:MM
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-GB"); // dd/mm/yyyy
        const formattedTime = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }); // HH:MM
        return `${formattedDate}, ${formattedTime}`;
    };

    // Handle search and filters
    useEffect(() => {
        const filterEvents = () => {
            let filtered = events;

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
    }, [searchTerm, filterDate, filterLocation, events]);

    return (
        <Container>
            <h1 className="my-4">Manage Events</h1>

            {/* Filter Row */}
            <Container className="mb-2">
                <Row>
                    <Col md={6} className="mb-2">
                        <Form.Control
                            type="text"
                            placeholder="Search by title or location"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col md={3} className="mb-2">
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
                    <Col md={3} className="mb-2">
                        <Form.Control
                            type="text"
                            placeholder="Filter by Location"
                            value={filterLocation}
                            onChange={(e) => setFilterLocation(e.target.value)}
                        />
                    </Col>
                </Row>
            </Container>

            {/* Event table */}
            <Container>
                <Table responsive bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Event Title</th>
                            <th>Date and Time</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <tr key={event.id}>
                                    <td>{event.id}</td>
                                    <td>{event.title}</td>
                                    <td>{formatDateTime(event.date_time)}</td>
                                    <td>{event.location}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() =>
                                                alert(
                                                    `Edit event ID: ${event.id}`
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() =>
                                                alert(
                                                    `Delete event ID: ${event.id}`
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No events available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
};

export default ManageEvents;
