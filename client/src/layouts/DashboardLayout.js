import { Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import CreateEvent from "../pages/CreateEvent";
import YourEvents from "../pages/YourEvents";
import Notifications from "../pages/Notifications";
import Error401Page from "../pages/Error401Page";
import { useAuth } from "../contexts/AuthContext";

const DashboardLayout = () => {
    const { loggedIn } = useAuth();

    if (!loggedIn) {
        return (
            <div className="d-flex flex-column min-vh-100 bg-dark text-light">
                <Error401Page />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column min-vh-100 bg-dark text-light">
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/create" element={<CreateEvent />} />
                <Route path="/dashboard/events" element={<YourEvents />} />
                <Route path="/dashboard/notifications" element={<Notifications />} />
            </Routes>
        </div>
    );
};

export default DashboardLayout;
