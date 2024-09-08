import { useState, useEffect, createContext, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { fetchEventById, createRsvp } from "../api";
import { useAuth } from "./AuthContext";

const ViewEventContext = createContext();

const ViewEventProvider = ({ children }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loggedIn } = useAuth();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventData = await fetchEventById(id);
                setEvent(eventData);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!loggedIn) {
            navigate(`/auth/login?redirect=/explore/events/${id}`);
            return;
        }

        try {
            await createRsvp({ event: id });
            toast.success("Event Registered");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    const contextValue = {
        event,
        handleRegister,
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
