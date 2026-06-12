import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FORM_TOOLTIPS } from '../../../../constants/formTooltips';
import { AuthFormInput } from '../../../General/form/authFormInput';
import { InfoTooltip } from '../../../General/ui';
import type { KeyMetricsSectionProps } from './types';

export const KeyMetricsSection: React.FC<KeyMetricsSectionProps> = ({
    formData,
    onFieldChange
}) => {
    const theme = useTheme();

    const handleFieldChange = (slug: string, value: string) => {
        if (slug === 'monthlyGrowthRate') {

            const numericValue = value.replace(/[^0-9.]/g, '');
            const parts = numericValue.split('.');
            const cleanValue = parts.length > 2
                ? parts[0] + '.' + parts.slice(1).join('')
                : numericValue;

            const finalValue = parseFloat(cleanValue) > 100 ? '100' : cleanValue;
            onFieldChange(slug, finalValue);
        } else if (slug === 'numberOfCustomers' || slug === 'teamSize') {

            const numericValue = value.replace(/[^0-9]/g, '');
            onFieldChange(slug, numericValue);
        } else {
            onFieldChange(slug, value);
        }
    };

    return (
        <>
            {/* Section Title */}
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 1.5,
                    color: theme.palette.text.primary,
                    fontSize: '1rem'
                }}
            >
                Key Metrics
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" component="span" sx={{ mr: 0.5, fontSize: '0.875rem', color: '#666' }}>
                        Monthly Revenue ($) <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.monthlyRevenue.title}
                        description={FORM_TOOLTIPS.monthlyRevenue.description}
                        placement="right"
                    />
                </Box>
                <AuthFormInput
                    label=""
                    value={
                        formData.monthlyRevenue
                            ? Number(formData.monthlyRevenue.replace(/[^0-9.]/g, "")).toLocaleString()
                            : ""
                    }
                    slug="monthlyRevenue"
                    handleChange={handleFieldChange}
                    required
                    placeholder="e.g., $25,000"
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" component="span" sx={{ mr: 0.5, fontSize: '0.875rem', color: '#666' }}>
                        Monthly Growth Rate (%) <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.monthlyGrowthRate.title}
                        description={FORM_TOOLTIPS.monthlyGrowthRate.description}
                        placement="right"
                    />
                </Box>
                <AuthFormInput
                    label=""
                    value={formData.monthlyGrowthRate}
                    slug="monthlyGrowthRate"
                    handleChange={handleFieldChange}
                    required
                    placeholder="e.g., 15%"
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" component="span" sx={{ mr: 0.5, fontSize: '0.875rem', color: '#666' }}>
                        Approximate Number of Customers <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.numberOfCustomers.title}
                        description={FORM_TOOLTIPS.numberOfCustomers.description}
                        placement="right"
                    />
                </Box>
                <AuthFormInput
                    label=""
                    value={
                        formData.numberOfCustomers
                            ? Number(formData.numberOfCustomers.replace(/[^0-9]/g, "")).toLocaleString()
                            : ""
                    }
                    slug="numberOfCustomers"
                    handleChange={handleFieldChange}
                    required
                    placeholder="e.g., 300 or 5,000"
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" component="span" sx={{ mr: 0.5, fontSize: '0.875rem', color: '#666' }}>
                        Team Size <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.teamSize.title}
                        description={FORM_TOOLTIPS.teamSize.description}
                        placement="right"
                    />
                </Box>
                <AuthFormInput
                    label=""
                    value={
                        formData.teamSize
                            ? Number(formData.teamSize.replace(/[^0-9]/g, "")).toLocaleString()
                            : ""
                    }
                    slug="teamSize"
                    handleChange={handleFieldChange}
                    required
                    placeholder="e.g., 8 or 10"
                />
            </Box>
        </>
    );
};
