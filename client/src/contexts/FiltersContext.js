import { useState, useEffect, createContext, useContext } from "react";
import { fetchAllEvents } from "../api";

const FiltersContext = createContext();

const FiltersProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [categorizedEvents, setCategorizedEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [filterLocation, setFilterLocation] = useState("");

    // Fetch events on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchAllEvents();
                const sortedData = data.sort(
                    (a, b) => new Date(a.date_time) - new Date(b.date_time)
                );

                setEvents(sortedData);
                setCategorizedEvents(sortedData);
                setFilteredEvents(sortedData);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            setCategorizedEvents(events);
        } else {
            const filtered = events.filter(
                (event) => event.category === category.toLowerCase()
            );
            setCategorizedEvents(filtered);
        }
    };

    // Handle search and filters
    useEffect(() => {
        const filterEvents = () => {
            let filtered = categorizedEvents;

            // Filter by search term (title and location)
            if (searchTerm) {
                filtered = filtered.filter(
                    (event) =>
                        event.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        event.location
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                );
            }

            // Filter by date (if selected)
            if (filterDate) {
                filtered = filtered.filter(
                    (event) =>
                        new Date(event.date_time).toLocaleDateString(
                            "en-GB"
                        ) === filterDate
                );
            }

            // Filter by location (if selected)
            if (filterLocation) {
                filtered = filtered.filter((event) =>
                    event.location
                        .toLowerCase()
                        .includes(filterLocation.toLowerCase())
                );
            }

            setFilteredEvents(filtered);
        };

        filterEvents();
    }, [searchTerm, filterDate, filterLocation, categorizedEvents]);

    const contextValue = {
        events,
        setEvents,
        filteredEvents,
        setFilteredEvents,
        selectedCategory,
        handleCategoryChange,
        searchTerm,
        setSearchTerm,
        setFilterDate,
        filterLocation,
        setFilterLocation,
    };

    return (
        <FiltersContext.Provider value={contextValue}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFilters = () => {
    return useContext(FiltersContext);
};

export default FiltersProvider;
