import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";

import AuthLayout from "./layouts/AuthLayout";
import LandingLayout from "./layouts/LandingLayout";
import DashboardLayout from "./layouts/DashboardLayout";
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
    const isDashRoute = location.pathname.startsWith("/dashboard");

    return isAuthRoute ? (
        <AuthLayout />
    ) : isDashRoute ? (
        <DashboardLayout />
    ) : (
        <LandingLayout />
    );
}

const AppWrapper = () => {
    return (
        <Router>
            <AuthProvider>
                <App />
            </AuthProvider>
            <ToastContainer />
            <Toaster />
        </Router>
    );
};

export default AppWrapper;
