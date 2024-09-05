import { Route, Routes } from "react-router-dom";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import HomePage from "../components/HomePage";
import ExplorePage from "../pages/ExplorePage";
import Events from "../pages/Events";
import ViewEvent from "../components/ViewEvent";

const LandingLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarComponent />
            <main className="flex-fill">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/explore/events" element={<Events />} />
                    <Route path="/explore/events/:id" element={<ViewEvent />} />
                </Routes>
            </main>
            <FooterComponent />
        </div>
    );
};

export default LandingLayout;
