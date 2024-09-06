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
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            {isMobile && (
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer}
                    sx={{ position: "absolute", left: 10, top: 10 }}
                >
                    <MenuIcon />
                </IconButton>
            )}

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
                        <Box
                            as={Link}
                            to={"/explore"}
                            sx={{
                                textAlign: "center",
                                padding: 2,
                                textDecoration: "None",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ color: "primary.main" }}
                            >
                                NexEvent
                            </Typography>
                        </Box>

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
                                            backgroundColor:
                                                "background.default",
                                        },
                                    }}
                                    onClick={() => handleNavigation(item.path)}
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </Box>
                    </div>

                    <div>
                        <Box sx={{ textAlign: "center", paddingBottom: 2 }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ mb: 2 }}
                            >
                                <AccountCircleIcon
                                    sx={{ color: "primary.main", mr: 1 }}
                                />
                                <Typography
                                    variant="body1"
                                    sx={{ color: "text.primary" }}
                                >
                                    Alderson
                                </Typography>
                            </Box>
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
                        </Box>
                    </div>
                </Box>
            </Drawer>
        </ThemeProvider>
    );
};

export default SidePanel;
