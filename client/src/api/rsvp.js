import apiClient from "./apiClient";

// Fetch all RSVPs
export const fetchAllRsvps = async () => {
    try {
        const response = await apiClient.get("/rsvp/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch a specific RSVP by event ID
export const fetchRsvpByEventId = async (eventId) => {
    try {
        // Send a GET request to retrieve RSVP by eventId
        const response = await apiClient.get(`/rsvp/${eventId}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Create a new RSVP
export const createRsvp = async (rsvpData) => {
    try {
        const response = await apiClient.post("/rsvp/", rsvpData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update an existing RSVP
export const updateRsvp = async (rsvpData) => {
    try {
        const response = await apiClient.patch(`/rsvp/`, rsvpData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
