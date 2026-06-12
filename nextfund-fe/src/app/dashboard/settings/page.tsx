"use client";

import {
    Box,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React from 'react';
import KYCSection from '../../../components/(dashboard)/settings/kyc';
import PersonalInformationSection from '../../../components/(dashboard)/settings/personal-info';
import SecuritySettingsSection from '../../../components/(dashboard)/settings/security';


const SettingsPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        color: '#000',
                        mb: 1,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                    }}
                >
                    Settings
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#666',
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                >
                    Manage your profile, documents, preferences & security
                </Typography>
            </Box>

            {/* Settings Content - Each section in its own bordered container */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <PersonalInformationSection />
                <KYCSection />
                <SecuritySettingsSection />
                {/* <PreferencesSection /> */}
            </Box>
        </Box>
    );
};

export default SettingsPage;