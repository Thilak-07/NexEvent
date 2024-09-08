import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserDetails, logoutUser } from "../api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("Guest");

    useEffect(() => {
        if (loggedIn) {
            const fetchUserDetails = async () => {
                try {
                    const userDetails = await getUserDetails();
                    setUserName(userDetails.username);
                } catch (error) {}
            };

            fetchUserDetails();
        } else {
            setUserName("Guest");
        }
    }, [loggedIn]);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        setLoggedIn(false);
    };

    const onLogoutClick = async (e) => {
        e.preventDefault();
        try {
            await logoutUser();
            handleLogout();
            toast.info("Logout successful!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate("/auth/login");
        } catch (err) {
            toast.error("Logout failed. Please try again.", {
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
        userName,
        loggedIn,
        setLoggedIn,
        handleLogin,
        handleLogout,
        onLogoutClick,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
