import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import ForgotPassword from "../components/ForgotPassword";
import PasswordResetComponent from "../components/PasswordResetComponent";

const AuthLayout = ({ handleLogin, client }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-black text-light">
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
    </div>
  );
};

export default AuthLayout;
