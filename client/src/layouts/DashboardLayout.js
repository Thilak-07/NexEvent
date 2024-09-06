import { Route, Routes } from "react-router-dom";

import DashboardHome from "../pages/DashboardHome";
import CreateEvent from "../pages/CreateEvent";
import YourEvents from "../pages/YourEvents";
import Notifications from "../pages/Notifications";
import ManageEvents from "../pages/ManageEvents";
import Error401Page from "../pages/Error401Page";
import SidePanel from "../components/SidePanel";
import { useAuth } from "../contexts/AuthContext";
import { Col, Container, Row } from "react-bootstrap";

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
        <div className="d-flex min-vh-100 bg-dark text-light">
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <SidePanel />
                    </Col>
                    <Col md={9}>
                        <Routes>
                            <Route path="/dashboard" element={<DashboardHome />} />
                            <Route path="/dashboard/create" element={<CreateEvent />} />
                            <Route path="/dashboard/events" element={<YourEvents />} />
                            <Route path="/dashboard/manage" element={<ManageEvents />} />
                            <Route path="/dashboard/notifications" element={<Notifications />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DashboardLayout;
