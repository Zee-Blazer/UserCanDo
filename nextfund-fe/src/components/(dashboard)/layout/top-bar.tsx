"use client";

import { useNotifications } from '@/hooks/useNotifications';
import { isProd } from '@/utils/helpers';
import {
    Avatar,
    Badge,
    Box,
    Collapse,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Bell, BellRing, CheckCircle, Menu, Search, Settings as SettingsIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetInvestorSettingsQuery } from '../../../queries/dashboardApi';
import { RootState } from '../../../Redux/store';
import { TopBarProps } from '../../../types/top-bar';
import { Input } from '../../General/ui';

// Helper function to get avatar URL (simplified - backend returns data URLs directly)
const getAvatarUrl = (avatar: string | null | undefined): string | null => {
    if (!avatar) return null;

    
    if (avatar.startsWith('data:') || avatar.startsWith('blob:') || avatar.startsWith('http://') || avatar.startsWith('https://')) {
        return avatar;
    }

    // Fallback: if it's just base64 without data: prefix, try to construct data URL
    if (avatar.length > 100 && !avatar.includes(' ')) {
        let mimeType = 'image/jpeg';
        if (avatar.includes('iVBORw0KGgo')) {
            mimeType = 'image/png';
        } else if (avatar.includes('<svg') || avatar.includes('PHN2Zw')) {
            mimeType = 'image/svg+xml';
        }
        return `data:${mimeType};base64,${avatar}`;
    }

    return avatar;
};

export const TopBar: React.FC<TopBarProps> = ({
    onToggleSidebar,
    userName = "Dike Kalu",
    userInitials = "DK",
    userAvatar
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    const {
        notifications,
        unreadCount,
        isLoading: notificationsLoading,
        markAsRead,
        markAllAsRead,
        formatTime
    } = useNotifications({
        pageSize: 20,
        autoRefetch: true
    });

    // Get avatar from login data (from login response)
    const { loginData } = useSelector((state: RootState) => state.auth);

   
    const { data: investorSettings, refetch: refetchInvestorSettings } = useGetInvestorSettingsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: false,
        refetchOnReconnect: false,
        skip: false,
        pollingInterval: 0, // Disable polling, use explicit refetches
    });

    // Listen for custom event to refetch settings when avatar is updated
    useEffect(() => {
        const handleAvatarUpdate = () => {
            refetchInvestorSettings();
        };

        // Listen for custom event dispatched from settings page
        window.addEventListener('avatarUpdated', handleAvatarUpdate);

        return () => {
            window.removeEventListener('avatarUpdated', handleAvatarUpdate);
        };
    }, [refetchInvestorSettings]);

    
    useEffect(() => {
        if (!loginData?.user_id) {
            return undefined;
        }

        
        if (!loginData.avatar) {
            // Refetch immediately and also after a delay
            refetchInvestorSettings();
            const timer = setTimeout(() => {
                refetchInvestorSettings();
            }, 500);
            return () => clearTimeout(timer);
        } else {
            // If login data has avatar, still refetch once to ensure sync
            const timer = setTimeout(() => {
                refetchInvestorSettings();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [loginData?.user_id, loginData?.avatar, refetchInvestorSettings]);

    
    const investorAvatar = useMemo(() => {
        let avatarValue: string | null = null;

        // First, check investor settings (most up-to-date)
        if (investorSettings) {
            const rawSettings = investorSettings as any;
            let settingsPayload = null;

            if (rawSettings && typeof rawSettings === 'object') {
                if (rawSettings.payload && typeof rawSettings.payload === 'object') {
                    settingsPayload = rawSettings.payload;
                } else {
                    settingsPayload = rawSettings;
                }
            }

            // Check for avatar in various possible locations
            if (settingsPayload) {
                // Check in personal_information (primary location)
                if (settingsPayload.personal_information?.avatar) {
                    avatarValue = settingsPayload.personal_information.avatar;
                }
                // Check at root level of payload
                else if (settingsPayload.avatar) {
                    avatarValue = settingsPayload.avatar;
                }
            }
        }
        // Fallback to login data if other sources don't have avatar
        if (!avatarValue && loginData?.avatar) {
            avatarValue = loginData.avatar;
        }

        // Process the avatar URL to ensure it's in the correct format
        return getAvatarUrl(avatarValue);
    }, [investorSettings, loginData]);

    // Use userAvatar prop if provided (business users), otherwise use investorAvatar
    const displayAvatar = userAvatar || investorAvatar;

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchValue('');
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileAnchorEl(null);
    };

    const handleGoToSettings = () => {
        setProfileAnchorEl(null);
        const pathSegments = pathname.split('/');
        const baseRoute = pathSegments.length > 1 ? `/${pathSegments[1]}` : '/dashboard';

        router.push(`${baseRoute}/settings`);
    };

    const handleMarkAsRead = async (notificationId: string) => {
        await markAsRead([notificationId]);
    };

    const handleMarkAllAsRead = async () => {
        await markAllAsRead();
    };

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: 'white',
                borderBottom: '1px solid #e9ecef',
                px: { xs: 2, sm: 3, md: 4 },
                py: 2,
            }}
        >
            {/* Main Container */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '1200px',
                    mx: 'auto',
                }}
            >
                {/* Left Side - Mobile Menu */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <IconButton
                            onClick={onToggleSidebar}
                            sx={{
                                width: 40,
                                height: 40,
                                color: '#495057',
                                '&:hover': {
                                    backgroundColor: '#f8f9fa',
                                }
                            }}
                        >
                            <Menu size={20} />
                        </IconButton>
                    )}

                    {/* Desktop Search */}
                    {!isProd && !isMobile && (
                        <Box sx={{ ml: 3 }}>
                            {!isSearchOpen ? (
                                <IconButton
                                    onClick={handleSearchToggle}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: '#f8f9fa',
                                        color: '#6c757d',
                                        '&:hover': {
                                            backgroundColor: '#e9ecef',
                                        }
                                    }}
                                >
                                    <Search size={20} />
                                </IconButton>
                            ) : (
                                <Input
                                    placeholder="Search..."
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Search size={20} color="#6c757d" />
                                        </InputAdornment>
                                    }
                                    sx={{
                                        width: '300px',
                                        transition: 'all 0.3s ease-in-out',
                                    }}
                                />
                            )}
                        </Box>
                    )}
                </Box>

                {/* Right Side - Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                    {/* Mobile Search */}
                    {!isProd && isMobile && (
                        <IconButton
                            onClick={handleSearchToggle}
                            sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: '#f8f9fa',
                                color: '#6c757d',
                                '&:hover': {
                                    backgroundColor: '#e9ecef',
                                }
                            }}
                        >
                            <Search size={20} />
                        </IconButton>
                    )}

                    {/* Assistance Logo */}
                    {/* <Box
                        sx={{
                            width: { xs: 36, sm: 40 },
                            height: { xs: 36, sm: 40 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': {
                                opacity: 0.8,
                            }
                        }}
                    >
                        <Image
                            src="/help.png"
                            alt="Assistance"
                            width={isMobile ? 24 : 30}
                            height={isMobile ? 24 : 30}
                            style={{ objectFit: 'contain' }}
                        />
                    </Box> */}

                    {/* Notification Icon */}
                    <IconButton
                        onClick={handleNotificationClick}
                        sx={{
                            width: { xs: 36, sm: 40 },
                            height: { xs: 36, sm: 40 },
                            color: '#6c757d',
                            '&:hover': {
                                backgroundColor: '#f8f9fa',
                                color: '#495057',
                            }
                        }}
                    >
                        <Badge
                            badgeContent={unreadCount}
                            color="error"
                            sx={{
                                '& .MuiBadge-badge': {
                                    fontSize: '0.7rem',
                                    minWidth: '18px',
                                    height: '18px'
                                }
                            }}
                        >
                            <Bell size={20} />
                        </Badge>
                    </IconButton>

                    {/* User Profile */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* User Name - Hidden on mobile */}
                        {!isMobile && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#495057',
                                    fontWeight: 500,
                                    fontSize: { sm: '0.875rem', md: '1rem' },
                                }}
                            >
                                {userName}
                            </Typography>
                        )}
                        <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
                            <Avatar
                                src={displayAvatar || undefined}
                                sx={{
                                    width: { xs: 36, sm: 40 },
                                    height: { xs: 36, sm: 40 },
                                    backgroundColor: displayAvatar ? 'transparent' : '#043A66',
                                    color: 'white',
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                    fontWeight: 600,
                                    borderRadius: '10px',
                                    border: displayAvatar ? 'none' : undefined,
                                }}
                            >
                                {!displayAvatar && userInitials}
                            </Avatar>
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            {/* Mobile Search Collapse */}
            {isMobile && (
                <Collapse in={isSearchOpen}>
                    <Box sx={{ mt: 2 }}>
                        <Input
                            placeholder="Search..."
                            value={searchValue}
                            onChange={handleSearchChange}
                            fullWidth
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search size={20} color="#6c757d" />
                                </InputAdornment>
                            }
                        />
                    </Box>
                </Collapse>
            )}

            {/* Notification Popover */}
            <Popover
                open={Boolean(notificationAnchorEl)}
                anchorEl={notificationAnchorEl}
                onClose={handleNotificationClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        width: 350,
                        maxHeight: 400,
                        mt: 1,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        borderRadius: '12px'
                    }
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Notifications
                    </Typography>
                    <List sx={{ py: 0, minHeight: 200 }}>
                        {notificationsLoading ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    py: 6,
                                    minHeight: 180
                                }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    Loading notifications...
                                </Typography>
                            </Box>
                        ) : notifications.length === 0 ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    py: 6,
                                    minHeight: 180
                                }}
                            >
                                <Bell size={48} color="#ccc" />
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                    No notifications yet
                                </Typography>
                            </Box>
                        ) : (
                            notifications.map((notification, index) => (
                                <React.Fragment key={notification.id}>
                                    <ListItem
                                        sx={{
                                            px: 0,
                                            py: 1.5,
                                            cursor: 'pointer',
                                            borderRadius: '8px',
                                            '&:hover': {
                                                backgroundColor: '#f8f9fa'
                                            }
                                        }}
                                        onClick={() => handleMarkAsRead(notification.id)}
                                    >
                                        <ListItemIcon sx={{ minWidth: 40 }}>
                                            {notification.status === "seen" ? (
                                                <CheckCircle size={20} color="#4caf50" />
                                            ) : (
                                                <BellRing size={20} color="#ff9800" />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant="body2"
                                                    component="span"
                                                    sx={{ fontWeight: notification.status === "seen" ? 400 : 600 }}
                                                >
                                                    {notification.context.action}
                                                </Typography>
                                            }
                                            secondary={
                                                <Box component="span" sx={{ display: 'block' }}>
                                                    <Typography
                                                        variant="body2"
                                                        component="span"
                                                        color="text.secondary"
                                                        sx={{ mb: 0.5, display: 'block' }}
                                                    >
                                                        {notification.context.message}
                                                    </Typography>
                                                    <Typography variant="caption" component="span" color="text.secondary">
                                                        {formatTime(notification.created_at)}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                    {index < notifications.length - 1 && <Divider />}
                                </React.Fragment>
                            ))
                        )}
                    </List>
                    {notifications.length > 0 && unreadCount > 0 && (
                        <Box sx={{ pt: 2, textAlign: 'center' }}>
                            <Typography
                                variant="body2"
                                color="primary"
                                sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                                onClick={handleMarkAllAsRead}
                            >
                                Mark all as read
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Popover>

            {/* Profile Popover */}
            <Popover
                open={Boolean(profileAnchorEl)}
                anchorEl={profileAnchorEl}
                onClose={handleProfileClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        width: 220,
                        mt: 1,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        borderRadius: '12px'
                    }
                }}
            >
                <List sx={{ py: 1 }}>
                    <ListItemButton
                        onClick={handleGoToSettings}
                        sx={{
                            px: 2,
                            py: 1.25,
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.25,
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: '#e8f5e9',
                                '& .MuiListItemIcon-root': {
                                    color: '#33CC33'
                                },
                                '& .MuiTypography-root': {
                                    color: '#33CC33 !important'
                                }
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 28, color: '#495057' }}>
                            <SettingsIcon size={18} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937' }}>
                                    Settings
                                </Typography>
                            }
                            secondary={
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                    Manage your profile
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </List>
            </Popover>

        </Box>
    );
};

export default TopBar;