import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthLayout from "./layouts/AuthLayout";
import LandingLayout from "./layouts/LandingLayout";
import { getUserDetails } from "./api";
import AuthProvider from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";

function App() {
    const location = useLocation();
    const { setLoggedIn } = useAuth();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await getUserDetails();
                setLoggedIn(true);
            } catch (err) {
                setLoggedIn(false);
            }
        };

        checkAuthentication();
    }, [setLoggedIn]);

    const isAuthRoute = location.pathname.startsWith("/auth");

    return isAuthRoute ? <AuthLayout /> : <LandingLayout />;
}

const AppWrapper = () => {
    return (
        <Router>
            <AuthProvider>
                <App />
            </AuthProvider>
            <ToastContainer />
        </Router>
    );
};

export default AppWrapper;
