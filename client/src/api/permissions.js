import apiClient from "./apiClient";

// Function to get users based on roles
export const getUsersByRole = async (role) => {
    try {
        const response = await apiClient.get(`/auth/access-control/`, {
            params: role ? { role: role } : undefined,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update a user role
export const updateUserRole = async (email, newRole) => {
    try {
        const response = await apiClient.patch(
            `/auth/access-control/update_role/`,
            {
                email: email,
                role: newRole,
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
