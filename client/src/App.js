import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import SignupForm from "./components/SignupForm";
import ExplorePage from "./components/ExplorePage";
import Dashboard from "./components/Dashboard";
import FooterComponent from "./components/FooterComponent";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

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

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavbarComponent
          loggedIn={loggedIn}
          handleLogout={handleLogout}
          client={client}
        />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<LoginForm handleLogin={handleLogin} client={client} />}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword client={client} />}
            />
            <Route
              path="/signup"
              element={<SignupForm handleLogin={handleLogin} client={client} />}
            />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
