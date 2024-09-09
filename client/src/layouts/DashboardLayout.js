import { Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import DashboardHome from "../pages/DashboardHome";
import CreateEvent from "../pages/CreateEvent";
import YourEvents from "../pages/YourEvents";
import Notifications from "../pages/Notifications";
import ManageEvents from "../pages/ManageEvents";
import Error401Page from "../pages/Error401Page";
import SidePanel from "../components/SidePanel";
import { useAuth } from "../contexts/AuthContext";

const ErrorPage = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-dark text-light">
            <Error401Page />
        </div>
    );
};

// ProtectedRoute component to handle superuser-only access
const ProtectedRoute = ({ children }) => {
    const { isSuperUser } = useAuth();

    if (!isSuperUser) {
        return <ErrorPage />;
    }
    return children;
};

const DashboardLayout = () => {
    const { loggedIn } = useAuth();

    if (!loggedIn) {
        return <ErrorPage />;
    }

    return (
        <div className="d-flex min-vh-100 bg-dark text-light">
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <SidePanel />
                    </Col>
                    <Col md={9}>
                        <Routes>
                            <Route path="/dashboard" element={<DashboardHome />} />
                            <Route path="/dashboard/events" element={<YourEvents />} />
                            <Route path="/dashboard/notifications" element={<Notifications />} />
                            <Route
                                path="/dashboard/create"
                                element={
                                    <ProtectedRoute>
                                        <CreateEvent />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/dashboard/manage"
                                element={
                                    <ProtectedRoute>
                                        <ManageEvents />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DashboardLayout;
