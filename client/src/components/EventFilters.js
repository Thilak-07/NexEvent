import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useFilters } from "../contexts/FiltersContext";

const SearchFilter = () => {
    const { searchTerm, setSearchTerm } = useFilters();

    return (
        <Col md={8} className="mb-2">
            <Form.Control
                type="text"
                placeholder="Search by title or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </Col>
    );
};

const DateFilter = () => {
    const { setFilterDate } = useFilters();

    return (
        <Col md={2} className="mb-2">
            <Form.Control
                type="date"
                placeholder="Filter by Date"
                onChange={(e) =>
                    setFilterDate(
                        e.target.value
                            ? new Date(e.target.value).toLocaleDateString(
                                  "en-GB"
                              )
                            : ""
                    )
                }
            />
        </Col>
    );
};

const LocationFilter = () => {
    const { filterLocation, setFilterLocation } = useFilters();

    return (
        <Col md={2} className="mb-2">
            <Form.Control
                type="text"
                placeholder="Filter by location"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
            />
        </Col>
    );
};

const EventFilters = () => {
    return (
        <Container className="my-3">
            <Row>
                <SearchFilter />
                <DateFilter />
                <LocationFilter />
            </Row>
        </Container>
    );
};

export default EventFilters;
