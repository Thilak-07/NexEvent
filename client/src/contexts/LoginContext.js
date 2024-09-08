import { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

import { loginUser } from "../api";
import { useAuth } from "./AuthContext";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { handleLogin } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser(email, password);
            handleLogin();
            toast.success(`🦄 Welcome ${user.username}!`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            const redirectTo =
                new URLSearchParams(location.search).get("redirect") ||
                "/explore";
            navigate(redirectTo);
        } catch (err) {
            toast.error("Invalid Credentials", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const contextValue = {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        togglePasswordVisibility,
        onSubmit,
    };

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => {
    return useContext(LoginContext);
};

export default LoginProvider;
