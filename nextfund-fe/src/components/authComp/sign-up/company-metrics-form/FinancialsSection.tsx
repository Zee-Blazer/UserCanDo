import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FORM_TOOLTIPS } from '../../../../constants/formTooltips';
import { AuthFormInput } from '../../../General/form/authFormInput';
import { InfoTooltip } from '../../../General/ui';
import type { FinancialsSectionProps } from './types';

export const FinancialsSection: React.FC<FinancialsSectionProps> = ({
    formData,
    onFieldChange
}) => {
    const theme = useTheme();

    const handleFieldChange = (slug: string, value: string) => {
        if (slug === "burnRate" || slug === "grossMargin" || slug === "monthsOfRunway") {
            const numericValue = value.replace(/[^0-9]/g, "");
            if (slug === "grossMargin" && numericValue && parseInt(numericValue) > 100) {
                return;
            }
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
                Financials
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" component="span" sx={{ mr: 0.5, fontSize: '0.875rem', color: '#666' }}>
                        Gross Margin (%) <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.grossMargin.title}
                        description={FORM_TOOLTIPS.grossMargin.description}
                        placement="right"
                    />
                </Box>
                <AuthFormInput
                    label=""
                    value={formData.grossMargin}
                    slug="grossMargin"
                    handleChange={handleFieldChange}
                    required
                    placeholder="e.g., 75%"
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" component="span" sx={{ mr: 0.5, fontSize: '0.875rem', color: '#666' }}>
                        Burn Rate ($/month)
                    </Typography>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.burnRate.title}
                        description={FORM_TOOLTIPS.burnRate.description}
                        placement="right"
                    />
                </Box>
                <AuthFormInput
                    label=""
                    value={
                        formData.burnRate
                            ? Number(formData.burnRate).toLocaleString()
                            : ""
                    }
                    slug="burnRate"
                    handleChange={handleFieldChange}
                    placeholder="e.g., $50,000/month"
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" component="span" sx={{ mr: 0.5, fontSize: '0.875rem', color: '#666' }}>
                        Months of Runway (months)
                    </Typography>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.monthsOfRunway.title}
                        description={FORM_TOOLTIPS.monthsOfRunway.description}
                        placement="right"
                    />
                </Box>
                <AuthFormInput
                    label=""
                    value={formData.monthsOfRunway}
                    slug="monthsOfRunway"
                    handleChange={handleFieldChange}
                    placeholder="e.g., 18 months"
                />
            </Box>
        </>
    );
};
