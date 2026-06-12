import {
    Box,
    Typography,
} from '@mui/material';
import React from 'react';
import { AuthFormInput } from '../../../General/form/authFormInput';
import MultiSelect from '../../../General/form/multiselect';
import type { InvestorPreferencesProps } from './types';

const GEOGRAPHIC_OPTIONS = [
    'North America',
    'South America',
    'Europe',
    'Asia',
    'Africa',
    'Oceania',
    'Global'
];

export const InvestorPreferences: React.FC<InvestorPreferencesProps> = ({
    formData,
    onAuthFormChange,
    onKeyPress,
    showMaximumInvestmentError = false
}) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: '#333',
                    fontSize: '1.125rem'
                }}
            >
                Investor Preferences
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <AuthFormInput
                    label="Minimum Investment ($)"
                    value={formData.minimumInvestment ? Number(formData.minimumInvestment).toLocaleString() : ''}
                    slug="minimumInvestment"
                    handleChange={onAuthFormChange}
                    onKeyPress={onKeyPress?.('minimumInvestment')}
                />

                <Box>
                    <AuthFormInput
                        label="Maximum Investment ($)"
                        value={formData.maximumInvestment ? Number(formData.maximumInvestment).toLocaleString() : ''}
                        slug="maximumInvestment"
                        handleChange={onAuthFormChange}
                        onKeyPress={onKeyPress?.('maximumInvestment')}
                    />
                    {showMaximumInvestmentError && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#d32f2f',
                                fontSize: '0.75rem',
                                mt: 0.5,
                                ml: 1
                            }}
                        >
                            Maximum investment must be greater than or equal to minimum investment
                        </Typography>
                    )}
                </Box>

                <AuthFormInput
                    label="Maximum Number of Investors"
                    value={formData.maximumInvestors ? Number(formData.maximumInvestors).toLocaleString() : ''}
                    slug="maximumInvestors"
                    handleChange={onAuthFormChange}
                    onKeyPress={onKeyPress?.('maximumInvestors')}
                />

                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 1,
                            fontWeight: 500,
                            color: '#666',
                            fontSize: '0.875rem'
                        }}
                    >
                        Geographic Preference
                    </Typography>
                    <MultiSelect
                        options={GEOGRAPHIC_OPTIONS}
                        selectedOptions={formData.geographicPreference ? formData.geographicPreference.split(',').filter(item => item.trim() !== '') : []}
                        placeholder="Select geographic preferences"
                        onChange={(selected) => {
                            const value = selected.join(',');
                            onAuthFormChange('geographicPreference', value);
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};
