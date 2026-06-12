"use client";

import {
    Box,
    Drawer,
    IconButton,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import LogoutModal from "./logout-modal";
import NavItem from "./nav-item";
import { DashboardType, getAdminNavItems, getBusinessNavItems, getNavItems } from "./nav-links";

interface SidebarProps {
    isSidebarOpen: boolean;
    isSidebarTextShown: boolean;
    setIsSidebarTextShown: (value: boolean) => void;
    closeSidebar: () => void;
    onLogout?: () => void;
    dashboardType?: DashboardType;
    logoSrc?: string;
    logoAlt?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
    isSidebarOpen,
    isSidebarTextShown,
    setIsSidebarTextShown,
    closeSidebar,
    onLogout,
    dashboardType = 'investor',
    logoSrc = "/logo.png",
    logoAlt = "Company Logo"
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get navigation items based on dashboard type
    const getNavItemsForDashboard = () => {
        if (dashboardType === 'business') {
            return getBusinessNavItems();
        } else if (dashboardType === 'admin') {
            return getAdminNavItems();
        }
        return getNavItems(dashboardType);
    };

    const navItems = getNavItemsForDashboard();
    const pathname = usePathname();

    const sidebarWidth = isSidebarTextShown ? 280 : 80;
    const mobileSidebarWidth = 280;

    // Get logo configuration based on dashboard type
    const getLogoConfig = () => {
        if (dashboardType === 'business') {
            return {
                src: "/logo.png", // You can have different logos
                alt: "Business Dashboard Logo",
                fullWidth: 160,
                fullHeight: 40,
                collapsedWidth: 50,
                collapsedHeight: 50
            };
        } else if (dashboardType === 'admin') {
            return {
                src: "/logo.png", // You can have different logos
                alt: "Admin Dashboard Logo",
                fullWidth: 160,
                fullHeight: 40,
                collapsedWidth: 50,
                collapsedHeight: 50
            };
        }
        return {
            src: logoSrc,
            alt: logoAlt,
            fullWidth: 140,
            fullHeight: 36,
            collapsedWidth: 50,
            collapsedHeight: 50
        };
    };

    const logoConfig = getLogoConfig();

    const handleLogoutConfirm = () => {
        setIsModalOpen(false);
        onLogout?.();
    };

    const handleLogoutCancel = () => {
        setIsModalOpen(false);
    };

    const sidebarContent = (
        <Box
            sx={{
                height: '100vh',
                width: isMobile ? mobileSidebarWidth : sidebarWidth,
                backgroundColor: 'white',
                borderRight: '1px solid #e9ecef',
                display: 'flex',
                flexDirection: 'column',
                transition: 'width 0.3s ease-in-out',
                position: 'relative',
            }}
        >
            {/* Header Section */}
            <Box
                sx={{
                    p: 2,
                    borderBottom: '1px solid #e9ecef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: 80,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {(isSidebarTextShown || isMobile) ? (
                        <Image
                            src={logoConfig.src}
                            alt={logoConfig.alt}
                            width={logoConfig.fullWidth}
                            height={logoConfig.fullHeight}
                            style={{ objectFit: 'contain' }}
                        />
                    ) : (
                        <Image
                            src={logoConfig.src}
                            alt={logoConfig.alt}
                            width={logoConfig.collapsedWidth}
                            height={logoConfig.collapsedHeight}
                            style={{ objectFit: 'contain' }}
                        />
                    )}
                </Box>

                {/* Close button for mobile */}
                {isMobile && (
                    <IconButton
                        onClick={closeSidebar}
                        sx={{
                            width: 32,
                            height: 32,
                            color: '#6c757d',
                            '&:hover': {
                                backgroundColor: '#f8f9fa',
                            }
                        }}
                    >
                        <X size={20} />
                    </IconButton>
                )}
            </Box>

            {/* Navigation Items */}
            <Box
                sx={{
                    flex: 1,
                    overflow: 'hidden',
                    py: 2,
                }}
            >
                <Box sx={{ px: 1 }}>
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.path;
                        // If icon is a function, call it with isActive, else use as is
                        const icon = typeof item.icon === 'function' ? item.icon(isActive) : item.icon;
                        return (
                            <NavItem
                                key={index}
                                icon={icon}
                                path={item.path}
                                title={item.title}
                                children={item.sub || []}
                                isLabelShown={isSidebarTextShown || isMobile}
                                onCloseSidebar={closeSidebar}
                            />
                        );
                    })}
                </Box>
            </Box>

            {/* Logout Section */}
            <Box
                sx={{
                    p: 1,
                    borderTop: '1px solid #e9ecef',
                }}
            >
                <Box
                    onClick={() => setIsModalOpen(true)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: '#f8f9fa',
                        },
                    }}
                >
                    <Image
                        src="/sign-out.png"
                        alt="Logout"
                        width={30}
                        height={30}
                        style={{ objectFit: 'contain' }}
                    />
                    {(isSidebarTextShown || isMobile) && (
                        <Box
                            sx={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#333',
                            }}
                        >
                            Logout
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Toggle Button - Desktop Only */}
            {!isMobile && (
                <Box
                    sx={{
                        position: 'absolute',
                        right: -16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1000,
                    }}
                >
                    <IconButton
                        onClick={() => setIsSidebarTextShown(!isSidebarTextShown)}
                        sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: 'white',
                            border: '1px solid #e9ecef',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            '&:hover': {
                                backgroundColor: '#f8f9fa',
                            }
                        }}
                        aria-label={isSidebarTextShown ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {isSidebarTextShown ? (
                            <ChevronLeft size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </IconButton>
                </Box>
            )}
        </Box>
    );

    if (isMobile) {
        return (
            <>
                <Drawer
                    variant="temporary"
                    open={isSidebarOpen}
                    onClose={closeSidebar}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: mobileSidebarWidth,
                            border: 'none',
                        },
                    }}
                >
                    {sidebarContent}
                </Drawer>

                <LogoutModal
                    open={isModalOpen}
                    onClose={handleLogoutCancel}
                    onConfirm={handleLogoutConfirm}
                />
            </>
        );
    }

    return (
        <>
            <Box
                sx={{
                    width: sidebarWidth,
                    flexShrink: 0,
                    transition: 'width 0.3s ease-in-out',
                }}
            >
                {sidebarContent}
            </Box>

            {/* Logout Confirmation Modal */}
            <LogoutModal
                open={isModalOpen}
                onClose={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
            />
        </>
    );
};

export default Sidebar;