import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthLayout from "./layouts/AuthLayout";
import LandingLayout from "./layouts/LandingLayout";
import { getUserDetails } from "./api";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();

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
    }, []);

    const handleLogout = () => {
        setLoggedIn(false);
    };

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const isAuthRoute = location.pathname.startsWith("/auth");

    return isAuthRoute ? (
        <AuthLayout handleLogin={handleLogin} />
    ) : (
        <LandingLayout loggedIn={loggedIn} handleLogout={handleLogout} />
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
            <ToastContainer />
        </Router>
    );
}

export default AppWrapper;
