import { Box, Typography } from '@mui/material';
import React from 'react';
import { AuthFormInput, AuthFormSelect, AuthFormTextArea } from '../../../General/form/authFormInput';
import type { RegulatoryInformationSectionProps } from './types';
import { INTEREST_STRUCTURE_OPTIONS } from './types';

export const RegulatoryInformationSection: React.FC<RegulatoryInformationSectionProps> = ({
    regulatoryInfo,
    onRegulatoryChange
}) => {
    const handleAuthFormChange = (slug: string, value: string) => {
        onRegulatoryChange(slug as keyof typeof regulatoryInfo, value);
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                }}
            >
                Regulatory Information
            </Typography>

            {/* Interest Structure */}
            <Box sx={{ mb: 3 }}>
                <AuthFormSelect
                    label="Interest Structure"
                    value={regulatoryInfo.interestStructure}
                    slug="interestStructure"
                    handleChange={handleAuthFormChange}
                    options={INTEREST_STRUCTURE_OPTIONS}
                    required
                />
            </Box>

            {/* Registration Number */}
            <Box sx={{ mb: 3 }}>
                <AuthFormInput
                    label="Registration Number"
                    value={regulatoryInfo.registrationNumber}
                    slug="registrationNumber"
                    handleChange={handleAuthFormChange}
                    required
                />
            </Box>

            {/* Tax ID Number */}
            <Box sx={{ mb: 3 }}>
                <AuthFormInput
                    label="Tax ID Number"
                    value={regulatoryInfo.taxIdNumber}
                    slug="taxIdNumber"
                    handleChange={handleAuthFormChange}
                    required
                />
            </Box>

            {/* Registered Address */}
            <Box sx={{ mb: 3 }}>
                <AuthFormTextArea
                    label="Registered Address"
                    value={regulatoryInfo.registeredAddress}
                    slug="registeredAddress"
                    handleChange={handleAuthFormChange}
                    required
                />
            </Box>
        </Box>
    );
};
