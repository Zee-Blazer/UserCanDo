"use client";

import {
    Backdrop,
    Box,
    useTheme
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import Sidebar from "../../components/(dashboard)/layout/sidebar";
import TopBar from "../../components/(dashboard)/layout/top-bar";
import { useLogout } from "../../hooks/useLogout";
// import { useGetBusinessListingDocumentsQuery } from "../../queries/businessApi";
import { useBusinessSelector } from "../../Redux/selectors";

export default function Layout({ children }: { children: React.ReactNode }) {
    const logout = useLogout();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
    const [isSidebarTextShown, setIsSidebarTextShown] = useState(true);

    const { businessUserProfile } = useBusinessSelector();
    // const { data: listingDocuments } = useGetBusinessListingDocumentsQuery(businessUserProfile?.business_id);

    const fullname = `${businessUserProfile?.first_name} ${businessUserProfile?.last_name}`;
    const getInitials = (name: string) =>
        name ? name.split(" ").map(n => n[0]?.toUpperCase()).join("") : "";

    const closeSidebar = () => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const getSidebarWidth = () => {
        if (isMobile) return 0;
        return isSidebarTextShown ? 280 : 80;
    };

    const sidebarWidth = getSidebarWidth();

    const getDashboardStyles = () => {
        return {
            backgroundColor: '#f5f7fa',
            topBarColor: '#ffffff',
            borderColor: '#e2e8f0'
        };
    };

    const dashboardStyles = getDashboardStyles();

    // console.log("listingDocuments in layout: ", listingDocuments);
    // console.log("Business Profile Data: ", businessUserProfile);
    // console.log("Business Profile Data: ", businessUserProfile.business_id);
    // console.log("Business Profile Data: ", businessUserProfile.user_id);

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: dashboardStyles.backgroundColor,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Mobile Backdrop */}
            {isMobile && (
                <Backdrop
                    open={isSidebarOpen}
                    onClick={closeSidebar}
                    sx={{
                        zIndex: theme.zIndex.drawer - 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                />
            )}

            {/* Top Bar */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: isMobile ? 0 : `${sidebarWidth}px`,
                    width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
                    zIndex: theme.zIndex.appBar,
                    backgroundColor: dashboardStyles.topBarColor,
                    borderBottom: `1px solid ${dashboardStyles.borderColor}`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                    height: '80px',
                    transition: 'all 0.3s ease-in-out',
                }}
            >
                <TopBar
                    onToggleSidebar={toggleSidebar}
                    userName={fullname || "Business User"}
                    userInitials={getInitials(fullname) || "BU"}
                    userAvatar={businessUserProfile?.avatar}
                />
            </Box>

            {/* Sidebar */}
            <Box
                sx={{
                    position: 'fixed',
                    zIndex: isMobile ? theme.zIndex.appBar + 10 : 1200,
                    height: '100vh',
                    width: isMobile ? 'auto' : `${sidebarWidth}px`,
                    transition: 'all 0.3s ease-in-out',
                    left: 0,
                    top: 0,
                }}
            >
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    isSidebarTextShown={isSidebarTextShown}
                    setIsSidebarTextShown={setIsSidebarTextShown}
                    closeSidebar={closeSidebar}
                    dashboardType="business"
                    logoSrc={undefined}
                    logoAlt={undefined}
                    onLogout={logout}
                />
            </Box>

            {/* Main Content Area */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    ml: isMobile ? 0 : `${sidebarWidth}px`,
                    transition: 'margin-left 0.3s ease-in-out',
                    width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
                }}
            >
                {/* Page Content */}
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        p: { xs: 2, sm: 3, md: 4 },
                        backgroundColor: dashboardStyles.backgroundColor,
                        overflow: 'auto',
                        mt: '80px',
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: '1400px',
                            mx: 'auto',
                            width: '100%',
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
