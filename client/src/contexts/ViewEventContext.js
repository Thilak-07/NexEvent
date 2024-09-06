import { useState, useEffect, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchEventById, createRsvp } from "../api";

const ViewEventContext = createContext();

const ViewEventProvider = ({ children }) => {
    const { id } = useParams();
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
