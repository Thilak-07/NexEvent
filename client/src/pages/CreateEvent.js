import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import {
    FaCalendarAlt,
    FaImage,
    FaLocationArrow,
    FaListAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { createEvent } from "../api";

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

    const fileInputRef = useRef(null);

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
            eventData.append(key, formData[key]);
        }

        try {
            await createEvent(eventData);
            toast.success("Event created successfully!");
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
            toast.error("Failed to create event. Please try again.");
            console.error("Error creating event:", error);
        }
    };

    return (
        <Container>
            <h1 className="my-4">Create New Event</h1>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group as={Row} className="mb-3" controlId="formTitle">
                    <Form.Label column sm={2}>
                        <FaListAlt /> Title
                    </Form.Label>
                    <Col sm={10}>
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
                    <Form.Label column sm={2}>
                        Description
                    </Form.Label>
                    <Col sm={10}>
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

                <Form.Group as={Row} className="mb-3" controlId="formDateTime">
                    <Form.Label column sm={2}>
                        <FaCalendarAlt /> Date & Time
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="datetime-local"
                            name="date_time"
                            value={formData.date_time}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formCategory">
                    <Form.Label column sm={2}>
                        Category
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            as="select"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select category</option>
                            {CATEGORY_CHOICES.map((choice) => (
                                <option key={choice.value} value={choice.value}>
                                    {choice.label}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formLocation">
                    <Form.Label column sm={2}>
                        <FaLocationArrow /> Location
                    </Form.Label>
                    <Col sm={10}>
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
                    <Form.Label column sm={2}>
                        Terms and Conditions
                    </Form.Label>
                    <Col sm={10}>
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
                    <Form.Label column sm={2}>
                        <FaImage /> Feature Image
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="file"
                            name="feature_image"
                            onChange={handleChange}
                            accept="image/*"
                            ref={fileInputRef}
                            required
                        />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Event
                </Button>
            </Form>
        </Container>
    );
};

export default CreateEvent;
