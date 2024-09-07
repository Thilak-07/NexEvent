import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import { fetchAllEvents } from "../api";
import EventCard from "./EventCard";

const HeadText = () => {
    return (
        <h2
            className="mt-4 mb-0"
            style={{ textAlign: "left", fontWeight: "bold" }}
        >
            Discover Exciting Upcoming Events
        </h2>
    );
};

const LinkToAllEvents = () => {
    return (
        <Link
            to="/explore/events"
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
    );
};

const LeadText = () => {
    return (
        <div className="d-flex justify-content-between align-items-end">
            <p className="lead mb-4" style={{ textAlign: "left" }}>
                Stay updated with the latest happenings near you.
            </p>
            <LinkToAllEvents />
        </div>
    );
};

const SwiperContainer = ({ events }) => {
    return (
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
    );
};

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchAllEvents();

                const upcomingEvents = data
                    .sort(
                        (a, b) => new Date(a.date_time) - new Date(b.date_time)
                    )
                    .slice(0, 10);

                setEvents(upcomingEvents);
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
                <HeadText />
                <LeadText />
                <SwiperContainer events={events} />
            </Container>
        </section>
    );
};

export default UpcomingEvents;
