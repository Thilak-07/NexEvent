import { useState, useEffect, createContext, useContext, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createEvent, updateEvent, fetchEventById } from "../api";
const CreateEventContext = createContext();

const CreateEventProvider = ({ children }) => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [searchParams] = useSearchParams();
    const isUpdateMode = searchParams.get("update") === "true";
    const eventId = searchParams.get("id");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date_time: "",
        category: "",
        location: "",
        terms_and_conditions: "",
        feature_image: null,
    });

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

    const contextValue = {
        formData,
        handleChange,
        fileInputRef,
        isUpdateMode,
        handleSubmit,
    };

    return (
        <CreateEventContext.Provider value={contextValue}>
            {children}
        </CreateEventContext.Provider>
    );
};

export const useCreateEvent = () => {
    return useContext(CreateEventContext);
};

export default CreateEventProvider;
