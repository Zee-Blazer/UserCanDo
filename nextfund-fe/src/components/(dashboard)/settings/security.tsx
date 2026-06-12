import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useGetInvestorSettingsQuery, useUpdateInvestorSettingsMutation } from '../../../queries/dashboardApi';

const SecuritySettingsSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { refetch } = useGetInvestorSettingsQuery();
    const [updateInvestorSettings, { isLoading: isUpdating }] = useUpdateInvestorSettingsMutation();

    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false
    });

    const handleOpenPasswordDialog = () => {
        setIsPasswordDialogOpen(true);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setErrors({});
        setShowPassword({ newPassword: false, confirmPassword: false });
    };

    const handleClosePasswordDialog = () => {
        setIsPasswordDialogOpen(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setErrors({});
        setShowPassword({ newPassword: false, confirmPassword: false });
    };

    const handleTogglePasswordVisibility = (field: 'newPassword' | 'confirmPassword') => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const validatePassword = () => {
        const newErrors: Record<string, string> = {};

        if (!passwordData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (passwordData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSavePassword = async () => {
        if (!validatePassword()) {
            return;
        }

        try {
            await updateInvestorSettings({
                password: passwordData.newPassword
            }).unwrap();

            toast.success('Password updated successfully');
            handleClosePasswordDialog();
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || '');
        }
    };

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    overflow: 'hidden'
                }}
            >
                {/* Section Header */}
                <Box
                    sx={{
                        p: { xs: 2, sm: 2.5, md: 3 },
                        borderBottom: '1px solid #f0f0f0',
                        backgroundColor: '#fafafa'
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 500,
                            fontSize: { xs: '1rem', sm: '1.125rem' },
                            color: '#333'
                        }}
                    >
                        Security Settings
                    </Typography>
                </Box>

                {/* Section Content */}
                <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#999',
                                        mb: 0.5,
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                    }}
                                >
                                    Password
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: { xs: '0.875rem', sm: '1rem' },
                                        color: '#333'
                                    }}
                                >
                                    ••••••••••
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 1.5 }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: isMobile ? 'flex-start' : 'flex-end',
                                height: '100%'
                            }}>
                                <Button
                                    variant="text"
                                    onClick={handleOpenPasswordDialog}
                                    sx={{
                                        textTransform: 'none',
                                        textDecoration: 'underline',
                                        color: '#333',
                                        p: 0,
                                        minWidth: 'auto',
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    Change
                                </Button>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 8, md: 6.5 }}>
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#999',
                                        mb: 0.5,
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                    }}
                                >
                                    2-Factor Authentication (2FA)
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: { xs: '0.875rem', sm: '1rem' },
                                        color: '#333'
                                    }}
                                >
                                    Disabled
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {/* Password Change Dialog */}
            <Dialog open={isPasswordDialogOpen} onClose={handleClosePasswordDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 600 }}>
                    Change Password
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                        <TextField
                            label="New Password"
                            type={showPassword.newPassword ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => handleTogglePasswordVisibility('newPassword')}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword.newPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            type={showPassword.confirmPassword ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => handleTogglePasswordVisibility('confirmPassword')}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword.confirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={handleClosePasswordDialog}
                        disabled={isUpdating}
                        sx={{ textTransform: 'none' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSavePassword}
                        disabled={isUpdating}
                        variant="contained"
                        sx={{ textTransform: 'none' }}
                    >
                        {isUpdating ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SecuritySettingsSection;