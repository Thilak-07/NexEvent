import { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../api";
import { loginUser } from "../api";
import { useAuth } from "./AuthContext";

const SignupContext = createContext();

const SignupProvider = ({ children }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { handleLogin } = useAuth();

    const togglePassword1Visibility = () => {
        setShowPassword1(!showPassword1);
    };

    const togglePassword2Visibility = () => {
        setShowPassword2(!showPassword2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (password.length < 8) {
            toast.error(
                "Your password should have a minimum of 8 characters.",
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            );
        } else if (password !== confirmPassword) {
            toast.error("Passwords do not match.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            try {
                await registerUser({ username, email, password });
                await loginUser(email, password);
                handleLogin();
                toast.success("Registration Successful!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate("/explore");
            } catch (err) {
                toast.error(err?.response?.data?.error, {
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
        }

        setIsLoading(false);
    };

    const contextValue = {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        showPassword1,
        setShowPassword1,
        showPassword2,
        setShowPassword2,
        togglePassword1Visibility,
        togglePassword2Visibility,
        handleSubmit,
        isLoading,
    };

    return (
        <SignupContext.Provider value={contextValue}>
            {children}
        </SignupContext.Provider>
    );
};

export const useSignup = () => {
    return useContext(SignupContext);
};

export default SignupProvider;
