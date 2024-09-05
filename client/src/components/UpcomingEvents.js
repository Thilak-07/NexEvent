import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { fetchAllEvents } from "../api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const EventCard = ({ event }) => {
    const { title, location, date_time, feature_image, category } = event;
    const date = new Date(date_time);
    const formattedDate = {
        day: date.toLocaleDateString("en-US", { day: "2-digit" }),
        month: date
            .toLocaleDateString("en-US", { month: "short" })
            .toUpperCase(),
    };

    return (
        <Card className="event-card shadow-sm">
            {feature_image ? (
                <Card.Img
                    variant="top"
                    src={feature_image}
                    className="event-image"
                />
            ) : (
                <div className="event-image-placeholder">No Image</div>
            )}
            <div className="tags-container">
                <div className="category-tag">{category}</div>
                <div className="date-tag">
                    <span>{formattedDate.day}</span>
                    <span>{formattedDate.month}</span>
                </div>
            </div>
            <Card.Body className="event-body">
                <Card.Title className="event-title">{title}</Card.Title>
                <Card.Text className="event-location">{location}</Card.Text>
            </Card.Body>
        </Card>
    );
};

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchAllEvents();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <section
            id="upcoming-events"
            className="swiper-section bg-light pt-5"
            style={{ padding: "100px" }}
        >
            <Container className="swiper-container-wrapper">
                <h2
                    className="mt-4 mb-0"
                    style={{ textAlign: "left", fontWeight: "bold" }}
                >
                    Discover Exciting Upcoming Events
                </h2>
                <div className="d-flex justify-content-between align-items-end">
                    <p className="lead mb-4" style={{ textAlign: "left" }}>
                        Stay updated with the latest happenings near you.
                    </p>
                    <Link
                        to="/events"
                        className="lead mb-4"
                        style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "blue",
                            textDecoration: "none",
                        }}
                    >
                        All Events <MdKeyboardArrowRight />
                    </Link>
                </div>

                <div className="swiper-container no-select">
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={4}
                        loop={true}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        speed={1500}
                    >
                        {events.map((event) => (
                            <SwiperSlide key={event.id}>
                                <EventCard event={event} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Container>
        </section>
    );
};

export default UpcomingEvents;
