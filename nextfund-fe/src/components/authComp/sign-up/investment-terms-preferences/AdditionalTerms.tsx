import {
    Box,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import React from 'react';
import type { AdditionalTermsProps } from './types';

export const AdditionalTerms: React.FC<AdditionalTermsProps> = ({
    formData,
    onRadioChange,
    radioStyles
}) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: '#333',
                    fontSize: '1.125rem',
                }}
            >
                Additional Terms
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                {/* Investor Updates Frequency */}
                <FormLabel
                    component="legend"
                    sx={{
                        color: '#333',
                        fontWeight: 500,
                        fontSize: '1rem',
                    }}
                >
                    Investor Updates Frequency
                </FormLabel>
                <Box
                    sx={{
                        border: '1px solid #E0E0E0',
                        borderRadius: '10px',
                        p: 2,
                    }}
                >
                    <RadioGroup
                        row
                        value={formData.investorUpdatesFrequency}
                        onChange={onRadioChange('investorUpdatesFrequency')}
                    >
                        <FormControlLabel
                            value="monthly"
                            control={<Radio sx={radioStyles} />}
                            label={<span style={{ color: '#6A6A6A' }}>Monthly</span>}
                            sx={{ mr: 4 }}
                        />
                        <FormControlLabel
                            value="quarterly"
                            control={<Radio sx={radioStyles} />}
                            label={<span style={{ color: '#6A6A6A' }}>Quarterly</span>}
                        />
                    </RadioGroup>
                </Box>

            </Box>
        </Box>
    );
};
