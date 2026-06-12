"use client";

import {
    Box,
    Collapse,
    Typography,
    useTheme,
} from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { COLORS } from '../../../constants/colors';
import { NavItemProps } from '../../../types/top-bar';


export const NavItem: React.FC<NavItemProps> = ({
    title,
    icon,
    path,
    isLabelShown = true,
    disabled = false,
    clickFunc,
    children = [],
    onCloseSidebar,
}) => {
    const theme = useTheme();
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false);



    // Helper: check if any child is active
    const isChildActive = (childrenArr: any[]): boolean => {
        return childrenArr.some((child) => child.path && pathname === child.path);
    };

    // Only one active: parent is active if matches and no child is active
    let isActive = false;
    if (path) {
        // If this is the dashboard root ("/dashboard" or "/business" or "/admin"), only match exactly
        if (["/dashboard", "/business", "/admin"].includes(path)) {
            isActive = pathname === path;
        } else {
            isActive = (pathname === path || (pathname.startsWith(path) && pathname[path.length] === "/"));
        }
        isActive = isActive && !isChildActive(children);
    }

    // Handle click events
    const handleClick = (e: React.MouseEvent) => {
        if (disabled) {
            e.preventDefault();
            return;
        }

        if (clickFunc) clickFunc();

        if (children.length > 0) {
            setIsExpanded(!isExpanded);
        } else if (onCloseSidebar) {
            onCloseSidebar();
        }
    };

    // Get nav item styles
    const getNavItemStyles = () => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: isLabelShown ? 'space-between' : 'center',
        width: '100%',
        p: 1.5,
        px: 2.5,
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: 1,
        transition: 'all 0.2s ease-in-out',
        backgroundColor: isActive
            ? COLORS.primaryLight
            : 'transparent',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        '&:hover': !disabled && !isActive ? {
            backgroundColor: '#f8f9fa',
        } : {},
        position: 'relative',
    });



    // Get text color
    const getTextColor = (): string => {
        if (disabled) return COLORS.textSecondary;
        return isActive ? COLORS.primary : COLORS.textPrimary;
    };

    // Navigation content component
    const NavContent = () => (
        <Box
            onClick={handleClick}
            sx={getNavItemStyles()}
        >
            {/* Left side - Icon and Text */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flex: 1,
                justifyContent: isLabelShown ? 'flex-start' : 'center'
            }}>
                {/* Icon */}
                <Box sx={{
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& img': {
                        filter: isActive ? 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)' : 'brightness(0) saturate(100%) invert(20%) sepia(8%) saturate(1234%) hue-rotate(202deg) brightness(94%) contrast(86%)',
                        transition: 'filter 0.2s ease-in-out',
                    },
                    '&:hover img': {
                        filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)',
                    },
                }}>
                    {icon}
                </Box>

                {/* Text */}
                <Typography
                    variant="body2"
                    sx={{
                        color: getTextColor(),
                        fontWeight: isActive ? 600 : 500,
                        fontSize: '0.875rem',
                        opacity: isLabelShown ? 1 : 0,
                        width: isLabelShown ? 'auto' : 0,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease-in-out',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {title}
                </Typography>
            </Box>

            {/* Right side - Chevron or Active indicator */}
            {isLabelShown && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Chevron for expandable items */}
                    {children.length > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {isExpanded ? (
                                <ChevronUp size={18} color={COLORS.gray4} />
                            ) : (
                                <ChevronDown size={18} color={COLORS.gray4} />
                            )}
                        </Box>
                    )}

                    {/* Active indicator */}
                    {isActive && !disabled && children.length === 0 && (
                        <Box
                            sx={{
                                width: 4,
                                height: 21,
                                backgroundColor: COLORS.primary,
                                borderRadius: '2px',
                            }}
                        />
                    )}
                </Box>
            )}
        </Box>
    );

    return (
        <Box sx={{ width: '100%' }}>
            {/* Main Navigation Item */}
            {path ? (
                <Link href={path} style={{ textDecoration: 'none' }}>
                    <NavContent />
                </Link>
            ) : (
                <NavContent />
            )}

            {/* Child Links */}
            {children.length > 0 && (
                <Collapse in={isExpanded} timeout={300}>
                    <Box sx={{
                        ml: 5,
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5
                    }}>
                        {children.map((child, idx) => {
                            const isChildActive = pathname === child.path;

                            return (
                                <Link
                                    key={idx}
                                    href={child.path}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Box
                                        onClick={onCloseSidebar}
                                        sx={{
                                            display: 'block',
                                            px: 1,
                                            py: 1.5,
                                            borderRadius: 1,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease-in-out',
                                            backgroundColor: isChildActive
                                                ? COLORS.primaryLight
                                                : 'transparent',
                                            '&:hover': !isChildActive ? {
                                                backgroundColor: '#f8f9fa',
                                            } : {},
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: isChildActive
                                                    ? COLORS.primary
                                                    : COLORS.textPrimary,
                                                fontWeight: isChildActive ? 600 : 400,
                                                fontSize: '0.8125rem',
                                            }}
                                        >
                                            {child.title}
                                        </Typography>
                                    </Box>
                                </Link>
                            );
                        })}
                    </Box>
                </Collapse>
            )}
        </Box>
    );
};

export default NavItem;