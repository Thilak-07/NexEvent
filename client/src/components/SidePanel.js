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
    AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",
        },
        background: {
            default: "#121212",
            paper: "#1d1d1d",
        },
        text: {
            primary: "#ffffff",
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
    return (
        <Box
            as={Link}
            to={"/explore"}
            sx={{
                textAlign: "center",
                padding: 2,
                textDecoration: "None",
            }}
        >
            <Typography variant="h6" sx={{ color: "primary.main" }}>
                NexEvent
            </Typography>
        </Box>
    );
};

const MenuItems = ({ handleNavigation }) => {
    const menuItems = [
        { text: "Home", icon: <HomeIcon />, path: "/dashboard" },
        { text: "Events", icon: <EventIcon />, path: "/dashboard/events" },
        {
            text: "Notifications",
            icon: <NotificationsIcon />,
            path: "/dashboard/notifications",
        },
        { text: "Manage", icon: <SettingsIcon />, path: "/dashboard/manage" },
        { text: "Create", icon: <AddCircleIcon />, path: "/dashboard/create" },
    ];

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
                        color: "text.primary",
                        padding: 2,
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

const UserName = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 2 }}
        >
            <AccountCircleIcon sx={{ color: "primary.main", mr: 1 }} />
            <Typography variant="body1" sx={{ color: "text.primary" }}>
                Alderson
            </Typography>
        </Box>
    );
};

const LogoutButton = () => {
    return (
        <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={() => {
                // Dummy logout function
                console.log("Logging out...");
            }}
        >
            Logout
        </Button>
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
                        <Box sx={{ textAlign: "center", paddingBottom: 2 }}>
                            <UserName />
                            <LogoutButton />
                        </Box>
                    </div>
                </Box>
            </Drawer>
        </ThemeProvider>
    );
};

export default SidePanel;
