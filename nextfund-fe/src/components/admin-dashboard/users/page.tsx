'use client';

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
} from '@mui/material';
import React from 'react';

const AdminUsersPage = () => {
    // Mock user data
    const users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Investor',
            status: 'Active',
            lastLogin: '2024-01-15 10:30 AM'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@business.com',
            role: 'Business',
            status: 'Active',
            lastLogin: '2024-01-15 09:15 AM'
        },
        {
            id: 3,
            name: 'Bob Johnson',
            email: 'bob.johnson@example.com',
            role: 'Investor',
            status: 'Inactive',
            lastLogin: '2024-01-10 02:45 PM'
        },
        {
            id: 4,
            name: 'Alice Brown',
            email: 'alice.brown@enterprise.com',
            role: 'Business',
            status: 'Active',
            lastLogin: '2024-01-15 11:20 AM'
        },
    ];

    const getStatusColor = (status: string) => {
        return status === 'Active' ? 'success' : 'error';
    };

    const getRoleColor = (role: string) => {
        return role === 'Investor' ? 'primary' : 'secondary';
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                    User Management
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                    Manage user accounts, roles, and permissions
                </Typography>
            </Box>

            {/* User Statistics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Total Users
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#043A66' }}>
                                1,247
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Active Users
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#33CC33' }}>
                                1,189
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Investors
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#97B9FF' }}>
                                892
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Business Users
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFB121' }}>
                                355
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Users Table */}
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Recent Users
                    </Typography>
                    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Last Login</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.role}
                                                color={getRoleColor(user.role) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.status}
                                                color={getStatusColor(user.status) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{user.lastLogin}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AdminUsersPage;