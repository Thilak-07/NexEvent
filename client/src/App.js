import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "./components/NavbarComponent";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [currentUser, setCurrentUser] = useState(false);
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    client
      .get("auth/user/")
      .then(() => setCurrentUser(true))
      .catch(() => setCurrentUser(false));
  }, []);

  const updateFormBtn = () => {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  };

  const submitRegistration = (e) => {
    e.preventDefault();
    client
      .post("auth/register/", { email, username, password })
      .then(updateFormBtn);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    client
      .post("auth/login/", { email, password })
      .then(() => setCurrentUser(true));
  };

  const submitLogout = (e) => {
    e.preventDefault();
    client.post("auth/logout/").then(() => setCurrentUser(false));
  };

  const handleChange = (field, value) => {
    if (field === "email") setEmail(value);
    if (field === "username") setUsername(value);
    if (field === "password") setPassword(value);
  };

  return (
    <div>
      <NavbarComponent
        currentUser={currentUser}
        onLogout={submitLogout}
        onToggleForm={updateFormBtn}
      />
      {currentUser ? (
        <div className="center">
          <h2>You're logged in!</h2>
        </div>
      ) : registrationToggle ? (
        <RegistrationForm
          email={email}
          username={username}
          password={password}
          onChange={handleChange}
          onSubmit={submitRegistration}
        />
      ) : (
        <LoginForm
          email={email}
          password={password}
          onChange={handleChange}
          onSubmit={submitLogin}
        />
      )}
    </div>
  );
}

export default App;
