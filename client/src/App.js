import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

import HomePage from "./components/HomePage";
import ExplorePage from "./components/ExplorePage";
import Dashboard from "./components/Dashboard";

import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import ForgotPassword from "./components/Auth/ForgotPassword";
import PasswordResetComponent from "./components/Auth/PasswordResetComponent";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function AuthLayout({ handleLogin }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-fill bg-dark text-light">
        <Routes>
          <Route
            path="/auth/login"
            element={<LoginForm handleLogin={handleLogin} client={client} />}
          />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPassword client={client} />}
          />
          <Route
            path="/auth/signup"
            element={<SignupForm handleLogin={handleLogin} client={client} />}
          />
          <Route
            path="/auth/reset-password/:token"
            element={<PasswordResetComponent client={client} />}
          />
        </Routes>
      </main>
    </div>
  );
}

function MainLayout({ loggedIn, handleLogout }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent
        loggedIn={loggedIn}
        handleLogout={handleLogout}
        client={client}
      />
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <FooterComponent />
    </div>
  );
}

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
    <AuthLayout handleLogin={handleLogin} />
  ) : (
    <MainLayout loggedIn={loggedIn} handleLogout={handleLogout} />
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
