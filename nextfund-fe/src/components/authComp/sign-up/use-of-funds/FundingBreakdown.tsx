import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import { FORM_TOOLTIPS } from '../../../../constants/formTooltips';
import { InfoTooltip } from '../../../General/ui';

interface FundingBreakdownData {
    productDevelopment: number;
    marketingSales: number;
    teamExpansion: number;
    technologyInfrastructure: number;
    workingCapital: number;
    marketExpansion: number;
    other: number;
}

interface FundingBreakdownProps {
    data: FundingBreakdownData;
    onPercentageChange: (field: keyof FundingBreakdownData, value: string) => void;
    selectedCategories?: string[];
}

const fundingCategories = [
    { field: 'productDevelopment' as keyof FundingBreakdownData, label: 'Product Development' },
    { field: 'marketingSales' as keyof FundingBreakdownData, label: 'Marketing & Sales' },
    { field: 'teamExpansion' as keyof FundingBreakdownData, label: 'Team Expansion' },
    { field: 'technologyInfrastructure' as keyof FundingBreakdownData, label: 'Technology & Infrastructure' },
    { field: 'workingCapital' as keyof FundingBreakdownData, label: 'Working Capital' },
    { field: 'marketExpansion' as keyof FundingBreakdownData, label: 'Market Expansion' },
    { field: 'other' as keyof FundingBreakdownData, label: 'Other' }
];

export const FundingBreakdown: React.FC<FundingBreakdownProps> = ({ data, onPercentageChange, selectedCategories }) => {
    // Filter categories based on selectedCategories prop
    // Always include "Other" as an optional field for flexibility
    const categoriesToShow = selectedCategories && selectedCategories.length > 0
        ? [
            ...fundingCategories.filter(category =>
                selectedCategories.includes(category.label) && category.label !== 'Other'
            ),
            fundingCategories.find(category => category.label === 'Other')!
        ]
        : fundingCategories;
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: selectedCategories && selectedCategories.length > 0 ? 0.5 : 3,
                    color: '#333',
                    fontSize: '1.125rem',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                Funding Breakdown
                <InfoTooltip
                    title={FORM_TOOLTIPS.useOfFunds.title}
                    description={FORM_TOOLTIPS.useOfFunds.description}
                    placement="right"
                />
            </Typography>

            {selectedCategories && selectedCategories.length > 0 && (
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#33CC33',
                            fontSize: '0.875rem',
                            fontWeight: 500
                        }}
                    >
                        Showing only your selected categories: <strong>{selectedCategories.filter(c => c !== 'Other').join(', ')}</strong>
                        {!selectedCategories.includes('Other') && <span style={{ color: '#666', fontWeight: 400 }}> (+ Other for additional uses)</span>}
                    </Typography>
                </Box>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {categoriesToShow.map(({ field, label }) => {
                    const isOtherField = label === 'Other';
                    const isSelectedCategory = !selectedCategories || selectedCategories.length === 0 || selectedCategories.includes(label);

                    return (
                        <Box key={field}>
                            <Typography
                                variant="body2"
                                sx={{
                                    mb: 1,
                                    fontWeight: 500,
                                    color: '#666',
                                    fontSize: '0.875rem'
                                }}
                            >
                                {label}
                                {isOtherField && selectedCategories && selectedCategories.length > 0 && !isSelectedCategory && (
                                    <span style={{ color: '#999', fontWeight: 400, fontStyle: 'italic' }}> (Optional)</span>
                                )}
                            </Typography>
                            <TextField
                                fullWidth
                                type="text"
                                value={data[field] || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Only allow numbers and empty string
                                    if (value === '' || /^\d+$/.test(value)) {
                                        // Limit to 3 digits (0-100)
                                        if (value === '' || parseInt(value) <= 100) {
                                            onPercentageChange(field, value);
                                        }
                                    }
                                }}
                                onKeyDown={(e) => {
                                    // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
                                    if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
                                        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                                        (e.keyCode === 65 && e.ctrlKey === true) ||
                                        (e.keyCode === 67 && e.ctrlKey === true) ||
                                        (e.keyCode === 86 && e.ctrlKey === true) ||
                                        (e.keyCode === 88 && e.ctrlKey === true)) {
                                        return;
                                    }
                                    // Ensure that it is a number and stop the keypress
                                    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                        e.preventDefault();
                                    }
                                }}
                                placeholder="0"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: isOtherField && !isSelectedCategory ? '#fafafa' : 'transparent',
                                        '& fieldset': {
                                            borderColor: '#e0e0e0',
                                            borderStyle: isOtherField && !isSelectedCategory ? 'dashed' : 'solid'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#ddd'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#4CAF50',
                                            borderStyle: 'solid'
                                        }
                                    }
                                }}
                            />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};
