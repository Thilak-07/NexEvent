import React from "react";
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

import CreateEventProvider, {
    useCreateEvent,
} from "../contexts/CreateEventContext";

const TitleInput = () => {
    const { formData, handleChange } = useCreateEvent();

    return (
        <Form.Group as={Row} className="mb-3" controlId="formTitle">
            <Form.Label column sm={3} className="d-flex align-items-center">
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
    );
};

const DescriptionInput = () => {
    const { formData, handleChange } = useCreateEvent();

    return (
        <Form.Group as={Row} className="mb-3" controlId="formDescription">
            <Form.Label column sm={3} className="d-flex align-items-center">
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
    );
};

const DateTimeInput = () => {
    const { formData, handleChange } = useCreateEvent();

    return (
        <Form.Group as={Row} className="mb-3" controlId="formDateTime">
            <Form.Label column sm={3} className="d-flex align-items-center">
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
    );
};

const CategoryInput = () => {
    const { formData, handleChange } = useCreateEvent();

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

    return (
        <Form.Group as={Row} className="mb-3" controlId="formCategory">
            <Form.Label column sm={3} className="d-flex align-items-center">
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
                        <option key={choice.value} value={choice.value}>
                            {choice.label}
                        </option>
                    ))}
                </Form.Control>
            </Col>
        </Form.Group>
    );
};

const LocationInput = () => {
    const { formData, handleChange } = useCreateEvent();

    return (
        <Form.Group as={Row} className="mb-3 " controlId="formLocation">
            <Form.Label column sm={3} className="d-flex align-items-center">
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
    );
};

const TermsInput = () => {
    const { formData, handleChange } = useCreateEvent();

    return (
        <Form.Group
            as={Row}
            className="mb-3"
            controlId="formTermsAndConditions"
        >
            <Form.Label column sm={3} className="d-flex align-items-center">
                <FaClipboardCheck className="me-2" /> Terms and Conditions
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
    );
};

const FeatureImageInput = () => {
    const { fileInputRef, handleChange } = useCreateEvent();

    return (
        <Form.Group as={Row} className="mb-3" controlId="formFeatureImage">
            <Form.Label column sm={3} className="d-flex align-items-center">
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
    );
};

const SubmitButton = () => {
    const { isUpdateMode } = useCreateEvent();

    return (
        <Button variant="primary" type="submit">
            {isUpdateMode ? "Update Event" : "Create Event"}
        </Button>
    );
};

const CreateEvent = () => {
    const { isUpdateMode, handleSubmit } = useCreateEvent();

    return (
        <Container className="p-3 mb-5">
            <h1 className="px-2 mb-5 text-center text-sm-start">
                {isUpdateMode ? "Edit Event" : "Create New Event"}
            </h1>
            <Container>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <TitleInput />
                    <DescriptionInput />
                    <DateTimeInput />
                    <CategoryInput />
                    <LocationInput />
                    <TermsInput />
                    <FeatureImageInput />
                    <SubmitButton />
                </Form>
            </Container>
        </Container>
    );
};

const CreateEventWrapper = () => {
    return (
        <CreateEventProvider>
            <CreateEvent />
        </CreateEventProvider>
    );
};

export default CreateEventWrapper;
