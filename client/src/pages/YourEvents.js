import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchAllRsvps, fetchEventById, updateRsvp } from "../api";
import toast from "react-hot-toast";
import { Container, Spinner } from "react-bootstrap";

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

const DateTime = ({ event }) => {
    return (
        <p className="your-events-datetime">
            <strong>Date & Time: </strong>
            {new Date(event.date_time).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })}{" "}
            {new Date(event.date_time).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })}
        </p>
    );
};

const RsvpStatus = ({ event, rsvp, handleRsvpChange }) => {
    return (
        <div className="your-events-rsvp-status">
            <label>
                <strong>RSVP Status:</strong>
                <select
                    value={rsvp.rsvp_status}
                    onChange={(e) => handleRsvpChange(event.id, e.target.value)}
                >
                    <option value="ATTENDING">Attending</option>
                    <option value="NOT_ATTENDING">Not Attending</option>
                    <option value="MAYBE">Maybe</option>
                </select>
            </label>
        </div>
    );
};

const DetailsContainer = ({ event, rsvp, handleRsvpChange }) => {
    return (
        <div className="your-events-details">
            <h2 className="your-events-title">{event.title}</h2>
            <DateTime event={event} />
            <p className="your-events-location">
                <strong>Location:</strong> {event.location}
            </p>
            <RsvpStatus
                event={event}
                rsvp={rsvp}
                handleRsvpChange={handleRsvpChange}
            />
        </div>
    );
};

const YourEvents = () => {
    const [rsvps, setRsvps] = useState([]);
    const [events, setEvents] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch all RSVPs and events
    useEffect(() => {
        const fetchRsvpData = async () => {
            try {
                const rsvpData = await fetchAllRsvps();
                setRsvps(rsvpData);

                const eventDetails = await Promise.all(
                    rsvpData.map(async (rsvp) => {
                        const event = await fetchEventById(rsvp.event);
                        return { ...event, rsvp_status: rsvp.rsvp_status };
                    })
                );

                const eventMap = eventDetails.reduce((acc, event) => {
                    acc[event.id] = event;
                    return acc;
                }, {});

                setEvents(eventMap);
                setLoading(false);
            } catch (error) {
                toast.error("Failed to load your events.");
                console.error("Error fetching RSVPs or events:", error);
            }
        };

        fetchRsvpData();
    }, []);

    const handleRsvpChange = async (eventId, newStatus) => {
        try {
            const updatedRsvpData = {
                rsvp_status: newStatus,
            };
            await updateRsvp(eventId, updatedRsvpData);
            setRsvps((prevRsvps) =>
                prevRsvps.map((rsvp) =>
                    rsvp.event === eventId
                        ? { ...rsvp, rsvp_status: newStatus }
                        : rsvp
                )
            );
            toast.success("RSVP status updated successfully!");
        } catch (error) {
            toast.error("Failed to update RSVP status.");
            console.error("Error updating RSVP status:", error);
        }
    };

    if (loading) {
        return (
            <Container className="text-center">
                <Spinner animation="border" variant="primary" />
                <p>Loading Events...</p>
            </Container>
        );
    }

    return (
        <Container className="p-3 mb-5">
            <h1 className="px-2 mb-5 text-center text-sm-start">
                Your Registered Events
            </h1>
            <Container className="d-flex flex-column gap-1">
                {rsvps.map((rsvp) => {
                    const event = events[rsvp.event];
                    return (
                        <div key={event.id} className="your-events-row">
                            <ImageContainer event={event} />
                            <DetailsContainer
                                event={event}
                                rsvp={rsvp}
                                handleRsvpChange={handleRsvpChange}
                            />
                        </div>
                    );
                })}
            </Container>

            {rsvps.length === 0 && (
                <Container className="text-center">
                    <p>No events to display.</p>
                </Container>
            )}
        </Container>
    );
};

export default YourEvents;
