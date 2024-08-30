import apiClient from "./apiClient";

// Fetch user details
export const getUserDetails = async () => {
    try {
        const response = await apiClient.get("/auth/user/");
        return response.data.user;
    } catch (error) {
        throw error;
    }
};
