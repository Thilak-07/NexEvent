import apiClient from "./apiClient";

// Fetch all events
export const fetchAllEvents = async () => {
    try {
        const response = await apiClient.get("/events/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch a specific event by ID
export const fetchEventById = async (id) => {
    try {
        const response = await apiClient.get(`/events/${id}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Create a new event
export const createEvent = async (eventData) => {
    try {
        const response = await apiClient.post("/events/", eventData, {
            headers: {
                "Content-Type": "multipart/form-data", // Setting the header specifically for FormData
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update an existing event
export const updateEvent = async (id, eventData) => {
    try {
        const response = await apiClient.patch(`/events/${id}/`, eventData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete an existing event
export const deleteEvent = async (id) => {
    try {
        const response = await apiClient.delete(`/events/${id}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
