import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchAllNotifications, markAllNotificationsAsSeen } from "../api";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const data = await fetchAllNotifications();
                const sortedNotifications = data.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );

                setNotifications(sortedNotifications);
                await markAllNotificationsAsSeen();
                setLoading(false);
            } catch (error) {
                toast.error("Failed to load notifications");
                setLoading(false);
            }
        };

        loadNotifications();
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <Container className="text-center">
                <Spinner animation="border" variant="primary" />
                <p>Loading Notifications...</p>
            </Container>
        );
    }

    return (
        <Container className="p-3 mb-5">
            <h1 className="px-2 mb-5 text-center text-sm-start">
                Notifications
            </h1>

            <Container>
                {notifications.map((notification) => (
                    <Row
                        key={notification.id}
                        className={`align-items-start border-bottom your-events-row ${
                            notification.seen ? "bg-light" : "bg-white"
                        }`}
                        style={{ color: "black" }}
                    >
                        <Col>
                            <h5 className="mb-1">{notification.subject}</h5>
                            <p className="mb-1">
                                You have an event "
                                <strong>{notification.event.title}</strong>"
                                happening at{" "}
                                <strong>{notification.event.location}</strong>{" "}
                                on{" "}
                                <strong>
                                    {formatDate(notification.event.date_time)}
                                </strong>
                                .
                            </p>
                            <small className="text-muted">
                                Sent on: {formatDate(notification.created_at)}
                            </small>
                        </Col>

                        <Col md="auto">
                            {!notification.seen && (
                                <Badge bg="primary" text="light">
                                    New
                                </Badge>
                            )}
                        </Col>
                    </Row>
                ))}
            </Container>

            {notifications.length === 0 && (
                <Container className="text-center">
                    <p>No notifications to display.</p>
                </Container>
            )}
        </Container>
    );
};

export default Notifications;
