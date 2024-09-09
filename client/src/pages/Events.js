import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import EventCard from "../components/EventCard";
import CategoryFilter from "../components/CategoryFilter";
import EventFilters from "../components/EventFilters";
import FiltersProvider, { useFilters } from "../contexts/FiltersContext";

const EventsGrid = () => {
    const { filteredEvents } = useFilters();

    return (
        <Container className="min-vh-100">
            <Row>
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <Col
                            key={event.id}
                            sm={12}
                            md={6}
                            lg={4}
                            xxl={3}
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
    );
};

const Events = () => {
    return (
        <>
            <div className="bg-dark pb-2 mb-5" style={{ paddingTop: "60px" }}>
                <h2 className="display-5 text-center text-white my-4">
                    Browse by Category
                </h2>
                <CategoryFilter />
                <EventFilters />
            </div>
            <EventsGrid />
        </>
    );
};

const EventsWrapper = () => {
    return (
        <FiltersProvider>
            <Events />
        </FiltersProvider>
    );
};

export default EventsWrapper;
