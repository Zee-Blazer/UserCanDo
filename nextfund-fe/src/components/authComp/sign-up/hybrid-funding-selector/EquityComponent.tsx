import { Check } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { StyledRadioButton } from './StyledRadioButton';
import type { HybridFundingData } from './types';

interface EquityComponentProps {
    formData: HybridFundingData;
    onComponentToggle: (component: 'equity' | 'debt') => void;
    onInputChange: (section: 'equityComponent' | 'debtComponent' | 'conversionOptions', field: string, value: string | boolean) => void;
    onEquityScheduleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EquityComponent: React.FC<EquityComponentProps> = ({
    formData,
    onComponentToggle,
    onInputChange,
    onEquityScheduleChange
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                p: { xs: 2, sm: 2.5 },
                mb: { xs: 1.5, sm: 2 },
                border: '1px solid #e0e0e0',
                borderRadius: '16px',
                backgroundColor: formData.equityComponent.enabled ? '#f8f9ff' : 'white',
                borderColor: formData.equityComponent.enabled ? '#4CAF50' : '#e0e0e0',
            }}
        >
            {/* Custom checkbox */}
            <Box
                onClick={() => onComponentToggle('equity')}
                sx={{
                    position: 'absolute',
                    top: { xs: 16, sm: 20 },
                    right: { xs: 16, sm: 20 },
                    width: { xs: 24, sm: 28 },
                    height: { xs: 24, sm: 28 },
                    borderRadius: '50%',
                    backgroundColor: formData.equityComponent.enabled ? '#4CAF50' : '#6A6A6A26',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '1px solid rgba(106, 106, 106, 0.15)',
                }}
            >
                {formData.equityComponent.enabled && (
                    <Check
                        sx={{
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            color: 'white',
                            fontWeight: 600,
                        }}
                    />
                )}
            </Box>

            <Typography variant="body1" sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                color: formData.equityComponent.enabled ? '#4CAF50' : '#666'
            }}>
                Equity Component
            </Typography>

            {formData.equityComponent.enabled && (
                <>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                        Preferred Repayment Schedule
                    </Typography>
                    <Box sx={{ mb: 2, p: 1, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <StyledRadioButton
                                value="SAFE"
                                selectedValue={formData.equityComponent.repaymentSchedule}
                                onChange={(value) => onEquityScheduleChange({ target: { value } } as any)}
                                label="SAFE"
                            />
                            <StyledRadioButton
                                value="Priced Round"
                                selectedValue={formData.equityComponent.repaymentSchedule}
                                onChange={(value) => onEquityScheduleChange({ target: { value } } as any)}
                                label="Priced Round"
                            />
                            <StyledRadioButton
                                value="Revenue Share"
                                selectedValue={formData.equityComponent.repaymentSchedule}
                                onChange={(value) => onEquityScheduleChange({ target: { value } } as any)}
                                label="Revenue Share"
                            />
                        </Box>
                    </Box>

                    <TextField
                        label={
                            <span>
                                Equity Percentage <span style={{ color: '#B3261E' }}>*</span>
                            </span>
                        }
                        placeholder="Enter percentage (e.g., 15)"
                        value={formData.equityComponent.equityPercentage}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9.]/g, '');
                            if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
                                onInputChange('equityComponent', 'equityPercentage', value);
                            }
                        }}
                        fullWidth
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                '& fieldset': {
                                    borderColor: '#4CAF50',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#4CAF50',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4CAF50',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#666',
                                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                '&.Mui-focused': {
                                    color: '#4CAF50',
                                },
                            },
                        }}
                    />
                </>
            )}
        </Box>
    );
};
