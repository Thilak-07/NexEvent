import apiClient from "./apiClient";

// Fetch all Guests
export const fetchAllGuests = async (id) => {
    try {
        const response = await apiClient.get(`/guests?event_id=${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete an existing registration
export const removeGuest = async (pk) => {
    try {
        const response = await apiClient.delete(`/guests/${pk}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
