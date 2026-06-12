'use client';

import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { StatsCard } from '../(dashboard)/dashboard/stat-card';

export const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'users'>('overview');

    const adminStatsData = [
        {
            icon: 'people-blue',
            title: 'Total Users',
            value: '1,247',
            subtitle: 'Active users across all types',
            bgColor: '#EEF2FF',
            subtitleBgColor: '#EEF1F4',
            subtitleTextColor: '#043A66'
        },
        {
            icon: 'system-coins',
            title: 'Total Investments',
            value: '$45.2M',
            subtitle: 'Across all investment types',
            bgColor: '#F0FDF4',
            subtitleBgColor: '#E8F5E8',
            subtitleTextColor: '#33CC33'
        },
        {
            icon: 'job-search',
            title: 'Active Opportunities',
            value: '156',
            subtitle: 'Opportunities in the system',
            bgColor: '#FFFBEB',
            subtitleBgColor: '#FFF4E6',
            subtitleTextColor: '#FFB121'
        },
        {
            icon: 'analytics',
            title: 'System Health',
            value: '99.8%',
            subtitle: 'Uptime and performance',
            bgColor: '#F0F9FF',
            subtitleBgColor: '#E6F3FF',
            subtitleTextColor: '#97B9FF'
        }
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                    Admin Dashboard
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                    System administration and oversight
                </Typography>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {adminStatsData.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <StatsCard {...stat} />
                    </Grid>
                ))}
            </Grid>

            {/* Navigation Tabs */}
            <Box sx={{ mb: 4 }}>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        mb: 3,
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        width: '100%',
                    }}
                >
                    <Button
                        onClick={() => setActiveTab('overview')}
                        sx={{
                            flex: 1,
                            borderRadius: 0,
                            py: 2,
                            px: 0,
                            backgroundColor: activeTab === 'overview' ? '#f5f5f5' : 'transparent',
                            color: '#17406D',
                            fontWeight: 500,
                            fontSize: '1.1rem',
                            boxShadow: 'none',
                            transition: 'background 0.2s',
                            '&:hover': {
                                backgroundColor: activeTab === 'overview' ? '#f5f5f5' : '#f9f9f9',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        System Overview
                    </Button>
                    <Button
                        onClick={() => setActiveTab('users')}
                        sx={{
                            flex: 1,
                            borderRadius: 0,
                            py: 2,
                            px: 0,
                            backgroundColor: activeTab === 'users' ? '#f5f5f5' : 'transparent',
                            color: '#17406D',
                            fontWeight: 500,
                            fontSize: '1.1rem',
                            boxShadow: 'none',
                            transition: 'background 0.2s',
                            '&:hover': {
                                backgroundColor: activeTab === 'users' ? '#f5f5f5' : '#f9f9f9',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        User Management
                    </Button>
                </Box>

                {activeTab === 'overview' && (
                    <>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                            System Overview
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                            Monitor system performance and key metrics.
                        </Typography>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                            System Performance
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Monitor server performance, database health, and system uptime.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                            Security Overview
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Track security events, user authentication, and system access logs.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                )}

                {activeTab === 'users' && (
                    <>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                            User Management
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                            Manage user accounts, permissions, and access controls.
                        </Typography>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                            User Accounts
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            View and manage all user accounts across the platform.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                            Role Management
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Configure user roles, permissions, and access levels.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Box>

            {/* Admin-specific sections */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Recent System Events
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Monitor recent system events, errors, and important notifications.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Backup & Recovery
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Manage system backups, recovery procedures, and data integrity.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard; 