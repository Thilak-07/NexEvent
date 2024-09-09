import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import EventFilters from "../components/EventFilters";
import ConfirmationModal from "../components/ConfirmationModal";
import { deleteEvent } from "../api";
import FiltersProvider, { useFilters } from "../contexts/FiltersContext";

const EventTitleCell = ({ event }) => {
    const navigate = useNavigate();

    const handleTitleClick = (eventId) => {
        navigate(`/explore/events/${eventId}`);
    };

    return (
        <td
            style={{
                color: "black",
                cursor: "pointer",
            }}
            onClick={() => handleTitleClick(event.id)}
            onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgb(1, 1, 194)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
        >
            {event.title}
        </td>
    );
};

const EventActionsCell = ({ event }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const { events, setEvents, filteredEvents, setFilteredEvents } =
        useFilters();

    const handleEdit = (eventId) => {
        navigate(`/dashboard/create?update=true&id=${eventId}`);
    };

    const handleDelete = async () => {
        if (eventToDelete) {
            try {
                await deleteEvent(eventToDelete.id);
                setEvents(
                    events.filter((event) => event.id !== eventToDelete.id)
                );
                setFilteredEvents(
                    filteredEvents.filter(
                        (event) => event.id !== eventToDelete.id
                    )
                );
                toast.success(
                    `Event "${eventToDelete.title}" deleted successfully!`
                );
            } catch (error) {
                console.error("Error deleting event:", error);
                toast.error("Failed to delete the event.");
            } finally {
                setShowModal(false);
                setEventToDelete(null);
            }
        }
    };

    return (
        <>
            <td>
                <Button
                    variant="primary"
                    size="sm"
                    className="me-2 rounded-circle"
                    onClick={() => handleEdit(event.id)}
                >
                    <FaEdit />
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    className="me-2 rounded-circle"
                    onClick={() => {
                        setEventToDelete(event);
                        setShowModal(true);
                    }}
                >
                    <FaTrash />
                </Button>
                <Button
                    variant="success"
                    size="sm"
                    className="me-2 rounded-circle"
                    onClick={() => alert(event.id)}
                >
                    <FaUsers />
                </Button>
            </td>
            <ConfirmationModal
                showModal={showModal}
                setShowModal={setShowModal}
                eventToDelete={eventToDelete}
                handleDelete={handleDelete}
            />
        </>
    );
};

const EventTable = () => {
    const { filteredEvents } = useFilters();

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-GB");
        const formattedTime = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${formattedDate}, ${formattedTime}`;
    };

    return (
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
                                <EventTitleCell event={event} />
                                <td>{formatDateTime(event.date_time)}</td>
                                <td>{event.location}</td>
                                <EventActionsCell event={event} />
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
    );
};

const ManageEvents = () => {
    return (
        <Container className="p-3 mb-5">
            <h1 className="px-2 mb-5 text-center text-sm-start">
                Manage Events
            </h1>
            <FiltersProvider>
                <EventFilters />
                <EventTable />
            </FiltersProvider>
        </Container>
    );
};

export default ManageEvents;
