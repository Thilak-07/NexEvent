import { Route, Routes } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import ForgotPassword from "../components/ForgotPassword";
import PasswordResetComponent from "../components/PasswordResetComponent";

const AuthLayout = ({ handleLogin }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      <Routes>
        <Route
          path="/auth/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/signup" element={<SignupForm />} />
        <Route
          path="/auth/reset-password/:token"
          element={<PasswordResetComponent />}
        />
      </Routes>
    </div>
  );
};

export default AuthLayout;
