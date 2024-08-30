import apiClient from "./apiClient";

// Register a new user
export const registerUser = async (userData) => {
  try {
    await apiClient.post("/auth/register/", userData);
  } catch (error) {
    throw error;
  }
};

// Login a user
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login/", { email, password });
    const { access, refresh } = response.data;

    // Store tokens
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  } catch (error) {
    throw error;
  }
};

// Logout a user
export const logoutUser = async (refreshToken) => {
  try {
    await apiClient.post("/auth/logout/", { refresh_token: refreshToken });

    // Clear tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    throw error;
  }
};

// Request a password reset
export const requestPasswordReset = async (email) => {
  try {
    const response = await apiClient.post("/auth/request-reset/", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Check if the reset token is valid
export const checkTokenValidity = async (token) => {
  try {
    const response = await apiClient.post("/auth/token-validity/", { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Reset the password using the reset token
export const resetPassword = async (token, password) => {
  try {
    const response = await apiClient.post(`/auth/reset-password/${token}/`, {
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
