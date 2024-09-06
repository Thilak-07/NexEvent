import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Box,
    Typography,
    IconButton,
    useMediaQuery,
    CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger icon
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // User icon

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
    const isMobile = useMediaQuery("(max-width: 600px)"); // Media query for mobile view

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const menuItems = [
        { text: "Home", icon: <HomeIcon /> },
        { text: "Events", icon: <EventIcon /> },
        { text: "Notifications", icon: <NotificationsIcon /> },
        { text: "Manage", icon: <SettingsIcon /> },
        { text: "Create", icon: <AddCircleIcon /> },
    ];

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            {/* Hamburger Menu Icon for Mobile View */}
            {isMobile && (
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer}
                    sx={{ position: "absolute", left: 10, top: 10 }} // Align to the left
                >
                    <MenuIcon /> {/* Reverted to Hamburger Icon */}
                </IconButton>
            )}

            {/* Drawer (side panel) */}
            <Drawer
                variant={isMobile ? "temporary" : "permanent"} // Permanent for large screens, temporary for mobile
                anchor="left"
                open={isMobile ? isDrawerOpen : true} // Open based on screen size
                onClose={toggleDrawer}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: 250,
                        boxSizing: "border-box",
                        overflowX: "hidden", // Prevent horizontal scroll
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
                        {/* NexEvent Name */}
                        <Box sx={{ textAlign: "center", padding: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{ color: "primary.main" }}
                            >
                                NexEvent
                            </Typography>
                        </Box>

                        {/* List of buttons */}
                        <List>
                            {menuItems.map((item) => (
                                <ListItem button key={item.text}>
                                    <ListItemIcon
                                        sx={{ color: "primary.main" }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        sx={{ color: "text.primary" }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </div>

                    {/* Bottom section with Username and Logout button */}
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
