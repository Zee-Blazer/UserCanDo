import {
    Box,
    Typography,
} from '@mui/material';
import React from 'react';
import MultiSelect from '../../../General/form/multiselect';
import type { InvestmentTimelineProps } from './types';

export const InvestmentTimeline: React.FC<InvestmentTimelineProps> = ({
    formData,
    onAuthFormChange,
    investorTypeOptions,
    onKeyPress
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
                Investment Timeline
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Commented out timeline fields - keeping only Investor Type Preference */}
                {/* <AuthFormInput
                    label="Funding Round Duration (Months)"
                    value={formData.fundingRoundDuration}
                    slug="fundingRoundDuration"
                    handleChange={onAuthFormChange}
                    type="number"
                    placeholder="e.g., 3, 6"
                />

                <AuthFormInput
                    label="Expected Close Date"
                    value={formData.expectedCloseDate}
                    slug="expectedCloseDate"
                    handleChange={onAuthFormChange}
                    type="date"
                />

                <AuthFormInput
                    label="Due Diligence Timeline (Weeks)"
                    value={formData.dueDiligenceTimeline}
                    slug="dueDiligenceTimeline"
                    handleChange={onAuthFormChange}
                    type="number"
                    placeholder="e.g., 2, 4"
                /> */}

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
                        Investor Type Preference
                    </Typography>
                    <MultiSelect
                        options={investorTypeOptions}
                        selectedOptions={formData.investorTypePreference ? formData.investorTypePreference.split(',').filter(item => item.trim() !== '') : []}
                        placeholder="Select investor type preferences"
                        onChange={(selected) => {
                            const value = selected.join(',');
                            onAuthFormChange('investorTypePreference', value);
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};
