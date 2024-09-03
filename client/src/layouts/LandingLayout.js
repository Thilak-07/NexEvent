import { Route, Routes } from "react-router-dom";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import HomePage from "../components/HomePage";
import ExplorePage from "../components/ExplorePage";

const LandingLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarComponent />
            <main className="flex-fill">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                </Routes>
            </main>
            <FooterComponent />
        </div>
    );
};

export default LandingLayout;
