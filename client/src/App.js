import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LandingLayout from "./layouts/LandingLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    client
      .get("auth/user/")
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const isAuthRoute = location.pathname.startsWith("/auth");

  return isAuthRoute ? (
    <AuthLayout handleLogin={handleLogin} client={client} />
  ) : (
    <LandingLayout
      loggedIn={loggedIn}
      handleLogout={handleLogout}
      client={client}
    />
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
