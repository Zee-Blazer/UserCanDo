import { Box, Typography } from '@mui/material';
import React from 'react';
import { StyledRadioButton } from './StyledRadioButton';
import type { HybridFundingData } from './types';

interface ConversionOptionsProps {
    formData: HybridFundingData;
    onConversionOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ConversionOptions: React.FC<ConversionOptionsProps> = ({
    formData,
    onConversionOptionChange
}) => {
    // Only show for Traditional Debt
    if (!formData.debtComponent.enabled || formData.debtComponent.type !== 'Traditional Debt') {
        return null;
    }

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="body1"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }}
            >
                Conversion Options
            </Typography>
            <Box
                sx={{
                    p: { xs: 2, sm: 2.5 },
                    border: '1px solid #e0e0e0',
                    borderRadius: { xs: '12px', sm: '16px' },
                    backgroundColor: 'white',
                }}
            >
                <Box sx={{ p: 1 }}>
                    <Box sx={{ display: 'block' }}>
                        <Box sx={{ borderBottom: '1px solid #e0e0e0', pb: 1, mb: 1 }}>
                            <StyledRadioButton
                                value="allowDebtToEquityConversion"
                                selectedValue={formData.conversionOptions.selectedOption || ''}
                                onChange={(value) => onConversionOptionChange({ target: { value } } as any)}
                                label="Allow debt-to-equity conversion"
                            />
                        </Box>
                        <Box sx={{ borderBottom: '1px solid #e0e0e0', pb: 1, mb: 1 }}>
                            <StyledRadioButton
                                value="performanceBasedTriggers"
                                selectedValue={formData.conversionOptions.selectedOption || ''}
                                onChange={(value) => onConversionOptionChange({ target: { value } } as any)}
                                label="Performance-based conversion triggers"
                            />
                        </Box>
                        <Box sx={{ pb: 1 }}>
                            <StyledRadioButton
                                value="timeBasedOptions"
                                selectedValue={formData.conversionOptions.selectedOption || ''}
                                onChange={(value) => onConversionOptionChange({ target: { value } } as any)}
                                label="Time-based conversion options"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
