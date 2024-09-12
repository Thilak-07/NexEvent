import apiClient from "./apiClient";

// Fetch all notifications for the authenticated user
export const fetchAllNotifications = async () => {
    try {
        const response = await apiClient.get("/notifications/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get the count of unseen notifications
export const getUnseenNotificationCount = async () => {
    try {
        const response = await apiClient.get("/notifications/unseen/count/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Mark all unseen notifications as seen
export const markAllNotificationsAsSeen = async () => {
    try {
        const response = await apiClient.patch("/notifications/seen/");
        return response.data;
    } catch (error) {
        throw error;
    }
};
