import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to include the Authorization header
apiClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Refresh access token
const refreshAccessToken = async () => {
    console.log("Refresh refreshAccesToken() Called.");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
        const response = await apiClient.post("/token/refresh/", {
            refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem("accessToken", access);
        return access;
    } catch (error) {
        throw error;
    }
};

// Response interceptor for token refresh and error handling
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (refreshToken) {
                    const newAccessToken = await refreshAccessToken();

                    apiClient.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return apiClient(originalRequest);
                }
            } catch (e) {
                window.location.reload(); // Refresh the page
                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
