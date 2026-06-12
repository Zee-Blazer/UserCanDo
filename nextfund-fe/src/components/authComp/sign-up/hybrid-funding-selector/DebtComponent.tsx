import { Check } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { StyledRadioButton } from './StyledRadioButton';
import type { HybridFundingData } from './types';

// Utility functions for number formatting
const formatNumberWithCommas = (value: string): string => {
    // Remove all non-numeric characters except decimal points
    const numericValue = value.replace(/[^\d.]/g, '');

    // Split by decimal point
    const parts = numericValue.split('.');

    // Add commas to the integer part
    if (parts[0]) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Rejoin with decimal point if it exists
    return parts.join('.');
};

const parseFormattedNumber = (formattedValue: string): string => {
    // Remove commas and return the numeric value
    return formattedValue.replace(/,/g, '');
};

interface DebtComponentProps {
    formData: HybridFundingData;
    onComponentToggle: (component: 'equity' | 'debt') => void;
    onInputChange: (section: 'equityComponent' | 'debtComponent' | 'conversionOptions', field: string, value: string | boolean) => void;
    onDebtTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDebtSecurityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDebtRepaymentScheduleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DebtComponent: React.FC<DebtComponentProps> = ({
    formData,
    onComponentToggle,
    onInputChange,
    onDebtTypeChange,
    onDebtSecurityChange,
    onDebtRepaymentScheduleChange
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                p: { xs: 2, sm: 2.5 },
                mb: { xs: 1.5, sm: 2 },
                border: '1px solid #e0e0e0',
                borderRadius: '16px',
                backgroundColor: formData.debtComponent.enabled ? '#f8f9ff' : 'white',
                borderColor: formData.debtComponent.enabled ? '#4CAF50' : '#e0e0e0',
            }}
        >
            {/* Custom checkbox */}
            <Box
                onClick={() => onComponentToggle('debt')}
                sx={{
                    position: 'absolute',
                    top: { xs: 16, sm: 20 },
                    right: { xs: 16, sm: 20 },
                    width: { xs: 24, sm: 28 },
                    height: { xs: 24, sm: 28 },
                    borderRadius: '50%',
                    backgroundColor: formData.debtComponent.enabled ? '#4CAF50' : '#6A6A6A26',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '1px solid rgba(106, 106, 106, 0.15)',
                }}
            >
                {formData.debtComponent.enabled && (
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
                color: formData.debtComponent.enabled ? '#4CAF50' : '#666'
            }}>
                Debt Component
            </Typography>

            {formData.debtComponent.enabled && (
                <>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                        Type
                    </Typography>
                    <Box sx={{ mb: 2, p: 1, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <StyledRadioButton
                                value="Convertible Note"
                                selectedValue={formData.debtComponent.type}
                                onChange={(value) => onDebtTypeChange({ target: { value } } as any)}
                                label="Convertible Note"
                            />
                            <StyledRadioButton
                                value="Traditional Debt"
                                selectedValue={formData.debtComponent.type}
                                onChange={(value) => onDebtTypeChange({ target: { value } } as any)}
                                label="Traditional Debt"
                            />
                        </Box>
                    </Box>

                    <TextField
                        label={
                            <span>
                                Interest Rate (%) <span style={{ color: '#B3261E' }}>*</span>
                            </span>
                        }
                        placeholder="Enter interest rate (e.g., 8.5)"
                        value={formData.debtComponent.interestRate}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9.]/g, '');
                            if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
                                onInputChange('debtComponent', 'interestRate', value);
                            }
                        }}
                        fullWidth
                        size="small"
                        sx={{
                            mb: 2,
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

                    {formData.debtComponent.type === 'Convertible Note' && (
                        <>
                            <TextField
                                label={
                                    <span>
                                        Maturity Period (Months) <span style={{ color: '#B3261E' }}>*</span>
                                    </span>
                                }
                                placeholder="Enter months (e.g., 24)"
                                value={formData.debtComponent.maturityPeriod}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    onInputChange('debtComponent', 'maturityPeriod', value);
                                }}
                                fullWidth
                                size="small"
                                sx={{
                                    mb: 2,
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
                            <TextField
                                label="Conversion Discount (%)"
                                placeholder="Enter discount (e.g., 20)"
                                value={formData.debtComponent.conversionDiscount}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9.]/g, '');
                                    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
                                        onInputChange('debtComponent', 'conversionDiscount', value);
                                    }
                                }}
                                fullWidth
                                size="small"
                                sx={{
                                    mb: 2,
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
                            <TextField
                                label="Valuation Cap ($)"
                                placeholder="Enter valuation cap (e.g., 5,000,000)"
                                value={formData.debtComponent.valuationCap ? formatNumberWithCommas(formData.debtComponent.valuationCap) : ''}
                                onChange={(e) => {
                                    const rawValue = parseFormattedNumber(e.target.value);
                                    const numericValue = rawValue.replace(/[^0-9.]/g, '');
                                    onInputChange('debtComponent', 'valuationCap', numericValue);
                                }}
                                fullWidth
                                size="small"
                                sx={{
                                    mb: 2,
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

                    {formData.debtComponent.type === 'Traditional Debt' && (
                        <>
                            <TextField
                                label={
                                    <span>
                                        Repayment Term (Months) <span style={{ color: '#B3261E' }}>*</span>
                                    </span>
                                }
                                placeholder="Enter months (e.g., 36)"
                                value={formData.debtComponent.repaymentTerm || ''}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    onInputChange('debtComponent', 'repaymentTerm', value);
                                }}
                                fullWidth
                                size="small"
                                sx={{
                                    mb: 2,
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

                            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                                Security
                            </Typography>
                            <Box sx={{ mb: 2, p: 1, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <StyledRadioButton
                                        value="Secured"
                                        selectedValue={formData.debtComponent.security || ''}
                                        onChange={(value) => onDebtSecurityChange({ target: { value } } as any)}
                                        label="Secured"
                                    />
                                    <StyledRadioButton
                                        value="Unsecured"
                                        selectedValue={formData.debtComponent.security || ''}
                                        onChange={(value) => onDebtSecurityChange({ target: { value } } as any)}
                                        label="Unsecured"
                                    />
                                </Box>
                            </Box>

                            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                                Repayment Schedule
                            </Typography>
                            <Box sx={{ mb: 2, p: 1, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <StyledRadioButton
                                        value="Monthly"
                                        selectedValue={formData.debtComponent.repaymentSchedule || ''}
                                        onChange={(value) => onDebtRepaymentScheduleChange({ target: { value } } as any)}
                                        label="Monthly"
                                    />
                                    <StyledRadioButton
                                        value="Quarterly"
                                        selectedValue={formData.debtComponent.repaymentSchedule || ''}
                                        onChange={(value) => onDebtRepaymentScheduleChange({ target: { value } } as any)}
                                        label="Quarterly"
                                    />
                                    <StyledRadioButton
                                        value="Annually"
                                        selectedValue={formData.debtComponent.repaymentSchedule || ''}
                                        onChange={(value) => onDebtRepaymentScheduleChange({ target: { value } } as any)}
                                        label="Annually"
                                    />
                                </Box>
                            </Box>
                        </>
                    )}
                </>
            )}
        </Box>
    );
};
