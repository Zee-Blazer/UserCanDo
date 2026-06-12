import {
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';

const PreferencesSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Get user data from Redux store
    const { loginData } = useSelector((state: RootState) => state.auth);

    const [notifications, setNotifications] = useState({
        investment: true,
        updates: true,
        portfolio: true
    });

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
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
                    Preferences
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
                                Preferred Currency
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                    color: '#333'
                                }}
                            >
                                {loginData?.role === 'retail_investor' ? 'USD' : 'NGN'}
                            </Typography>
                        </Box>
                    </Grid>


                    <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#999',
                                    mb: 1,
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                }}
                            >
                                Notification Settings
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={notifications.investment}
                                            onChange={() => handleNotificationChange('investment')}
                                            size="small"
                                            sx={{
                                                color: '#ccc',
                                                '&.Mui-checked': {
                                                    color: '#1976d2',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: { xs: 18, sm: 20 }
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                color: '#333'
                                            }}
                                        >
                                            Email me about new investment opportunities
                                        </Typography>
                                    }
                                    sx={{ m: 0 }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={notifications.updates}
                                            onChange={() => handleNotificationChange('updates')}
                                            size="small"
                                            sx={{
                                                color: '#ccc',
                                                '&.Mui-checked': {
                                                    color: '#1976d2',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: { xs: 18, sm: 20 }
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                color: '#333'
                                            }}
                                        >
                                            Alerts for updates on investments
                                        </Typography>
                                    }
                                    sx={{ m: 0 }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={notifications.portfolio}
                                            onChange={() => handleNotificationChange('portfolio')}
                                            size="small"
                                            sx={{
                                                color: '#ccc',
                                                '&.Mui-checked': {
                                                    color: '#1976d2',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: { xs: 18, sm: 20 }
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                color: '#333'
                                            }}
                                        >
                                            Monthly portfolio summary
                                        </Typography>
                                    }
                                    sx={{ m: 0 }}
                                />


                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default PreferencesSection;