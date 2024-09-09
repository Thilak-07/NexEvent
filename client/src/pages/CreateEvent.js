import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import {
    FaCalendarAlt,
    FaImage,
    FaLocationArrow,
    FaListAlt,
    FaFileAlt,
    FaTags,
    FaClipboardCheck,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createEvent, updateEvent, fetchEventById } from "../api";

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date_time: "",
        category: "",
        location: "",
        terms_and_conditions: "",
        feature_image: null,
    });

    const [searchParams] = useSearchParams();
    const isUpdateMode = searchParams.get("update") === "true";
    const eventId = searchParams.get("id");
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60000);
        return localDate.toISOString().slice(0, 16);
    };

    useEffect(() => {
        if (isUpdateMode && eventId) {
            const fetchEvent = async () => {
                try {
                    const event = await fetchEventById(eventId);
                    setFormData({
                        ...event,
                        date_time: formatDateForInput(event.date_time),
                        feature_image: null,
                    });
                } catch (error) {
                    toast.error("Failed to fetch event details.");
                }
            };

            fetchEvent();
        }
    }, [isUpdateMode, eventId]);

    const CATEGORY_CHOICES = [
        { value: "music", label: "Music" },
        { value: "games", label: "Games" },
        { value: "sports", label: "Sports" },
        { value: "arts", label: "Arts" },
        { value: "film", label: "Film" },
        { value: "literature", label: "Literature" },
        { value: "technology", label: "Technology" },
        { value: "culture", label: "Culture" },
        { value: "lifestyle", label: "Lifestyle" },
        { value: "charity", label: "Charity" },
        { value: "fashion", label: "Fashion" },
        { value: "kids", label: "Kids" },
        { value: "other", label: "Other" },
    ];

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "feature_image") {
            const file = files[0];
            const allowedTypes = ["image/jpeg", "image/png"];

            if (file) {
                if (allowedTypes.includes(file.type)) {
                    setFormData({
                        ...formData,
                        feature_image: file,
                    });
                } else {
                    toast.error("Please select a JPEG or PNG image.");
                    e.target.value = "";
                }
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== undefined) {
                eventData.append(key, formData[key]);
            }
        }

        try {
            if (isUpdateMode && eventId) {
                await updateEvent(eventId, eventData);
                toast.success("Event updated successfully!");
                navigate("/dashboard/manage");
            } else {
                await createEvent(eventData);
                toast.success("Event created successfully!");
            }

            // Reset the form fields
            setFormData({
                title: "",
                description: "",
                date_time: "",
                category: "",
                location: "",
                terms_and_conditions: "",
                feature_image: null,
            });

            // Clear the file input field
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            toast.error("Failed to save the event. Please try again.");
            console.error("Error saving event:", error);
        }
    };

    return (
        <Container className="p-3 mb-5">
            <h1 className="px-2 mb-5 text-center text-sm-start">
                {isUpdateMode ? "Edit Event" : "Create New Event"}
            </h1>
            <Container>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.Group as={Row} className="mb-3" controlId="formTitle">
                        <Form.Label
                            column
                            sm={3}
                            className="d-flex align-items-center"
                        >
                            <FaListAlt className="me-2" /> Title
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter event title"
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formDescription"
                    >
                        <Form.Label
                            column
                            sm={3}
                            className="d-flex align-items-center"
                        >
                            <FaFileAlt className="me-2" /> Description
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter event description"
                                rows={4}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formDateTime"
                    >
                        <Form.Label
                            column
                            sm={3}
                            className="d-flex align-items-center"
                        >
                            <FaCalendarAlt className="me-2" /> Date & Time
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="datetime-local"
                                name="date_time"
                                value={formData.date_time}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formCategory"
                    >
                        <Form.Label
                            column
                            sm={3}
                            className="d-flex align-items-center"
                        >
                            <FaTags className="me-2" /> Category
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                as="select"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select category</option>
                                {CATEGORY_CHOICES.map((choice) => (
                                    <option
                                        key={choice.value}
                                        value={choice.value}
                                    >
                                        {choice.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3 "
                        controlId="formLocation"
                    >
                        <Form.Label
                            column
                            sm={3}
                            className="d-flex align-items-center"
                        >
                            <FaLocationArrow className="me-2" /> Location
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter event location"
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formTermsAndConditions"
                    >
                        <Form.Label
                            column
                            sm={3}
                            className="d-flex align-items-center"
                        >
                            <FaClipboardCheck className="me-2" /> Terms and
                            Conditions
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                as="textarea"
                                name="terms_and_conditions"
                                value={formData.terms_and_conditions}
                                onChange={handleChange}
                                placeholder="Enter terms and conditions"
                                rows={4}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formFeatureImage"
                    >
                        <Form.Label
                            column
                            sm={3}
                            className="d-flex align-items-center"
                        >
                            <FaImage className="me-2" /> Feature Image
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="file"
                                name="feature_image"
                                onChange={handleChange}
                                accept="image/*"
                                ref={fileInputRef}
                            />
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {isUpdateMode ? "Update Event" : "Create Event"}
                    </Button>
                </Form>
            </Container>
        </Container>
    );
};

export default CreateEvent;
