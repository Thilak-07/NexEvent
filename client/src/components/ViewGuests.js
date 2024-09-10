import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Table, Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchAllGuests, fetchEventById, removeGuest } from "../api";

// Utility function for formatting date and time
const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })} ${date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })}`;
};

const ImageContainer = ({ event }) => {
    return (
        <Link
            to={`/explore/events/${event.id}`}
            className="your-events-image-container"
        >
            <img
                className="your-events-image"
                src={event.feature_image}
                alt={event.title}
            />
        </Link>
    );
};

const DetailsContainer = ({ event }) => {
    return (
        <div className="your-events-details">
            <h2 className="your-events-title">{event.title}</h2>
            <p className="your-events-location">
                <strong>Location:</strong> {event.location}
            </p>
            <p className="your-events-datetime">
                <strong>Date & Time: </strong>
                {formatDateTime(event.date_time)}
            </p>
        </div>
    );
};

const RemoveButton = ({ guest, guests, setGuests }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleConfirmRemove = async () => {
        try {
            await removeGuest(guest.id);
            toast.success(`Guest removed successfully!`);
            setGuests(guests.filter((g) => g.id !== guest.id));
        } catch (error) {
            console.error("Error removing guest:", error);
            toast.error("Failed to remove the guest.");
        }
        handleClose();
    };

    return (
        <>
            <Button variant="danger" size="sm" onClick={handleShow}>
                Remove
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove this guest?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmRemove}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const ViewGuests = () => {
    const { id } = useParams();
    const [guests, setGuests] = useState([]);
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventDetails = await fetchEventById(id);
                setEvent(eventDetails);

                const guestsData = await fetchAllGuests(id);
                setGuests(guestsData);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="p-3 mb-5">
            <h1 className="px-2 mb-5 text-center text-sm-start">Guests List</h1>
            <Container>
                <div className="your-events-row">
                    <ImageContainer event={event} />
                    <DetailsContainer event={event} />
                </div>
                <Table responsive bordered hover>
                    <thead style={{ verticalAlign: "middle" }}>
                        <tr>
                            <th className="table-header">Registration ID</th>
                            <th className="table-header">Username</th>
                            <th className="table-header">Email</th>
                            <th className="table-header">RSVP Status</th>
                            <th className="table-header">Registration Date</th>
                            <th className="table-header">Last Updated Date</th>
                            <th className="table-header">Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ verticalAlign: "middle" }}>
                        {guests.length > 0 ? (
                            guests.map((guest) => (
                                <tr key={guest.id}>
                                    <td>{guest.id}</td>
                                    <td>{guest.user.username}</td>
                                    <td>{guest.user.email}</td>
                                    <td>{guest.rsvp_status}</td>
                                    <td>
                                        {formatDateTime(
                                            guest.registration_date
                                        )}
                                    </td>
                                    <td>
                                        {formatDateTime(guest.last_updated)}
                                    </td>
                                    <td>
                                        <RemoveButton
                                            guest={guest}
                                            guests={guests}
                                            setGuests={setGuests}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No registrations available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
};

export default ViewGuests;
