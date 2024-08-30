import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "react-bootstrap";
import {
    IoCreateOutline,
    IoNotificationsOutline,
    IoTicketOutline,
    IoPeopleOutline,
} from "react-icons/io5";
import { MdOutlinePrivacyTip, MdOutlineFileDownload } from "react-icons/md";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

SwiperCore.use([Navigation]);

const data = [
    {
        title: "Event Creation Made Easy",
        description:
            "Seamlessly create and manage events with our intuitive event creation feature. Specify event details, such as date, time, location, and description, to provide a clear picture for your attendees. Customize event settings, add event images, and set ticket options effortlessly.",
        icon: <IoCreateOutline />,
    },
    {
        title: "Realtime Notifications",
        description:
            "Stay updated on event activities with our realtime notification feature. Receive notifications on event updates, attendee responses, and more. Never miss out on important event details with our notification feature.",
        icon: <IoNotificationsOutline />,
    },
    {
        title: "Seamless User Invitations",
        description:
            "Invite participants effortlessly by sending invitation links directly through our app. Share invitation links via email, messaging apps, or social media platforms. Ensure a smooth registration process and track attendee responses for effective event management.",
        icon: <IoTicketOutline />,
    },
    {
        title: "Flexible Event Privacy",
        description:
            "Take control over event visibility with our private and public event options. Host private gatherings with exclusive access for selected participants or organize public events to reach a wider audience. Customize privacy settings to suit the unique needs of each event.",
        icon: <MdOutlinePrivacyTip />,
    },
    {
        title: "Easy Attendee Management",
        description:
            "Keep track of attendees with our comprehensive attendee management feature. Easily view and manage RSVPs, track attendance, and collect essential participant information. Scan QR Codes to check-in attendees and ensure a smooth event experience for all participants.",
        icon: <IoPeopleOutline />,
    },
    {
        title: "Download Attendee List",
        description:
            "Staying always connected is unsure in the age of internet. So SpotLight lets the event owners download a list of attendees for each event with our attendee list download feature. Export attendee lists in XLSX format for easy access and management.",
        icon: <MdOutlineFileDownload />,
    },
];

const FeatureCard = ({ item }) => {
    return (
        <Card className="card-custom">
            <Card.Body className="card-body-custom">
                <div className="icon-container">{item.icon}</div>
                <div className="text-content">
                    <Card.Title className="card-title-custom">
                        {item.title}
                    </Card.Title>
                    <Card.Text className="card-text-custom">
                        {item.description}
                    </Card.Text>
                </div>
            </Card.Body>
        </Card>
    );
};

const CardSwiper = () => {
    return (
        <div className="swiper-wrapper-container mt-2 py-4 no-select">
            <Swiper
                spaceBetween={30}
                slidesPerView={3.5}
                navigation
                pagination={{ clickable: true }}
                slidesOffsetBefore={110}
                slidesOffsetAfter={110}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 1.5,
                        slidesOffsetBefore: 50,
                        slidesOffsetAfter: 50,
                    },
                    1024: {
                        slidesPerView: 3.5,
                        slidesOffsetBefore: 110,
                        slidesOffsetAfter: 110,
                    },
                }}
                className="swiper-custom py-3"
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <FeatureCard item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-button-next-custom"></div>
            <div className="swiper-button-prev-custom"></div>
        </div>
    );
};

export default CardSwiper;
