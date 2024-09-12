import React, { useState } from "react";
import {
    Drawer,
    Button,
    Box,
    Typography,
    IconButton,
    useMediaQuery,
    CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import {
    Menu as MenuIcon,
    Home as HomeIcon,
    Event as EventIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    AddCircle as AddCircleIcon,
    Logout as LogoutIcon,
    Security as SecurityIcon,
} from "@mui/icons-material";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",
        },
        background: {
            default: "#1c2027",
            paper: "#13161b",
        },
        text: {
            primary: "rgb(156, 156, 156)",
            secondary: "#aaaaaa",
        },
    },
});

const BurgerMenu = ({ isMobile, toggleDrawer }) => {
    return (
        isMobile && (
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ position: "absolute", left: 10, top: 10 }}
            >
                <MenuIcon />
            </IconButton>
        )
    );
};

const NexEventLogo = () => {
    const { userName } = useAuth();

    return (
        <Box
            sx={{
                textAlign: "center",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 1,
            }}
        >
            <Box
                sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    border: "2px solid rgba(245, 166, 35, 0.8)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 1,
                    overflow: "hidden",
                }}
            >
                <Box
                    as={Link}
                    to={"/explore/events"}
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={"/assets/profile.png"}
                        alt="Profile"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            </Box>
            <Typography sx={{ color: "white" }}>
                {userName || "Guest"}
            </Typography>
        </Box>
    );
};

const MenuItems = ({ handleNavigation }) => {
    const { role } = useAuth();
    const location = useLocation();
    const isManager = role === "MANAGER";
    const isAdmin = role === "ADMIN";

    const menuItems = [
        { text: "Home", icon: <HomeIcon />, path: "/dashboard" },
        { text: "Events", icon: <EventIcon />, path: "/dashboard/events" },
        {
            text: "Notifications",
            icon: <NotificationsIcon />,
            path: "/dashboard/notifications",
        },
        (isManager || isAdmin) && {
            text: "Manage",
            icon: <SettingsIcon />,
            path: "/dashboard/manage",
        },
        isAdmin && {
            text: "Create",
            icon: <AddCircleIcon />,
            path: "/dashboard/create",
        },
        isAdmin && {
            text: "Access Control",
            icon: <SecurityIcon />,
            path: "/dashboard/permissions",
        },
    ].filter(Boolean);

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {menuItems.map((item) => (
                <Button
                    key={item.text}
                    variant="text"
                    startIcon={item.icon}
                    sx={{
                        justifyContent: "flex-start",
                        textAlign: "left",
                        color:
                            location.pathname === item.path
                                ? "#f5a623"
                                : "text.primary",
                        px: 3,
                        py: 1.5,
                        "&:hover": {
                            backgroundColor: "background.default",
                        },
                    }}
                    onClick={() => handleNavigation(item.path)}
                >
                    {item.text}
                </Button>
            ))}
        </Box>
    );
};

const LogoutButton = () => {
    const { onLogoutClick } = useAuth();

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
                variant="text"
                startIcon={<LogoutIcon />}
                onClick={onLogoutClick}
                sx={{
                    justifyContent: "flex-start",
                    textAlign: "left",
                    color: "text.primary",
                    px: 3,
                    py: 1.5,
                    mb: 1.5,
                    "&:hover": {
                        backgroundColor: "background.default",
                    },
                }}
            >
                Logout
            </Button>
        </Box>
    );
};

const SidePanel = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 600px)");
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        if (isMobile) {
            toggleDrawer();
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <BurgerMenu isMobile={isMobile} toggleDrawer={toggleDrawer} />

            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                anchor="left"
                open={isMobile ? isDrawerOpen : true}
                onClose={toggleDrawer}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: 250,
                        boxSizing: "border-box",
                        overflowX: "hidden",
                        bgcolor: "background.paper",
                    },
                }}
            >
                <Box
                    sx={{
                        width: 250,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-between",
                    }}
                    role="presentation"
                >
                    <div>
                        <NexEventLogo />
                        <MenuItems handleNavigation={handleNavigation} />
                    </div>

                    <div>
                        <LogoutButton />
                    </div>
                </Box>
            </Drawer>
        </ThemeProvider>
    );
};

export default SidePanel;
