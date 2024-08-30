import apiClient from "./apiClient";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register/", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login a user
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login/", { email, password });
    const { access, refresh, user } = response.data;

    // Store tokens
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("user", user);

    return user;
  } catch (error) {
    throw error;
  }
};

// Logout a user
export const logoutUser = async (refreshToken) => {
  try {
    const response = await apiClient.post("/auth/logout/", {
      refresh_token: refreshToken,
    });

    // Clear tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    return response.data;
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
