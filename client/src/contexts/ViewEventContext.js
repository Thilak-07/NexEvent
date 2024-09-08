import { useState, useEffect, createContext, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { fetchEventById, createRsvp, fetchRsvpByEventId } from "../api";
import { useAuth } from "./AuthContext";

const ViewEventContext = createContext();

const ViewEventProvider = ({ children }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loggedIn } = useAuth();
    const [event, setEvent] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventData = await fetchEventById(id);
                setEvent(eventData);

                // Check if the user is already registered
                if (loggedIn) {
                    try {
                        await fetchRsvpByEventId(id);
                        setIsRegistered(true); // User is registered
                    } catch (error) {
                        if (error.response.status === 404) {
                            setIsRegistered(false); // User is not registered
                        } else {
                            console.error(
                                "Error checking registration status:",
                                error
                            );
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchData();
    }, [id, loggedIn]);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!loggedIn) {
            navigate(`/auth/login?redirect=/explore/events/${id}`);
            return;
        }

        try {
            await createRsvp({ event: id });
            setIsRegistered(true);
            toast.success("Event Registered");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    const contextValue = {
        event,
        handleRegister,
        isRegistered,
    };

    return (
        <ViewEventContext.Provider value={contextValue}>
            {children}
        </ViewEventContext.Provider>
    );
};

export const useViewEvent = () => {
    return useContext(ViewEventContext);
};

export default ViewEventProvider;
