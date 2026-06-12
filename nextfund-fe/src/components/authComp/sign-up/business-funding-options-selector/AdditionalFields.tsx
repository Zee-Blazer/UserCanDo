import { Box, Typography } from '@mui/material';
import React from 'react';
import { FORM_TOOLTIPS } from '../../../../constants/formTooltips';
import MultiSelect from '../../../General/form/multiselect';
import { InfoTooltip } from '../../../General/ui';
import { CustomTextField } from './CustomTextField';
import type { AdditionalFieldsData } from './types';
import { INTENDED_USE_OPTIONS } from './types';

interface AdditionalFieldsProps {
    formData: AdditionalFieldsData;
    onFieldChange: (field: keyof AdditionalFieldsData, value: string) => void;
}


const parseNumericValue = (value: string): number => {
    return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
};


const validateValuation = (fundingAmount: string, currentValuation: string): boolean => {
    const funding = parseNumericValue(fundingAmount);
    const valuation = parseNumericValue(currentValuation);

    if (funding === 0 || valuation === 0) return true; 
    return valuation >= funding;
};

export const AdditionalFields: React.FC<AdditionalFieldsProps> = ({
    formData,
    onFieldChange
}) => {
    // Validation state
    const isValuationValid = validateValuation(formData.fundingAmount, formData.currentValuation);
    const showValuationError = formData.currentValuation.trim() !== '' && !isValuationValid;

    return (
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: { xs: 2, sm: 3 },
                    color: '#333',
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                }}
            >
                Additional Fields:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
                {/* Funding Amount Seeking */}
                <CustomTextField
                    label="Funding Amount Seeking ($)"
                    value={
                        formData.fundingAmount
                            ? Number(formData.fundingAmount.replace(/[^0-9.]/g, "")).toLocaleString()
                            : ""
                    }
                    onChange={(value) => {
                        // Clean the value by removing commas and other formatting before storing
                        const cleanValue = value.replace(/[^0-9.]/g, '');
                        onFieldChange('fundingAmount', cleanValue);
                    }}
                    placeholder="Enter funding amount (e.g., $100,000)"
                    tooltipComponent={
                        <InfoTooltip
                            title={FORM_TOOLTIPS.fundingAmount.title}
                            description={FORM_TOOLTIPS.fundingAmount.description}
                            placement="right"
                        />
                    }
                />

                {/* Current Valuation */}
                <Box>
                    <CustomTextField
                        label="Current Valuation ($)"
                        value={
                            formData.currentValuation
                                ? Number(formData.currentValuation.replace(/[^0-9.]/g, "")).toLocaleString()
                                : ""
                        }
                        onChange={(value) => onFieldChange('currentValuation', value)}
                        placeholder="Enter current valuation (e.g., $1,000,000)"
                        tooltipComponent={
                            <InfoTooltip
                                title={FORM_TOOLTIPS.currentValuation.title}
                                description={FORM_TOOLTIPS.currentValuation.description}
                                placement="right"
                            />
                        }
                    />
                    {showValuationError && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#d32f2f',
                                fontSize: '0.75rem',
                                mt: 0.5,
                                ml: 1
                            }}
                        >
                            Current valuation must be greater than or equal to funding amount seeking
                        </Typography>
                    )}
                </Box>

                {/* Percentage Equity Offering */}
                <CustomTextField
                    label="Percentage Equity Offering (%)"
                    value={formData.percentageEquity}
                    onChange={(value) => {

                        const numericValue = value.replace(/[^0-9.]/g, '');

                        const parts = numericValue.split('.');
                        const cleanValue = parts.length > 2
                            ? parts[0] + '.' + parts.slice(1).join('')
                            : numericValue;
                        const finalValue = parseFloat(cleanValue) > 100 ? '100' : cleanValue;
                        onFieldChange('percentageEquity', finalValue);
                    }}
                    placeholder="Enter equity percentage (e.g., 10)"
                    tooltipComponent={
                        <InfoTooltip
                            title={FORM_TOOLTIPS.equityOffering.title}
                            description={FORM_TOOLTIPS.equityOffering.description}
                            placement="right"
                        />
                    }
                />

                {/* Intended Use of Funds */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 1,
                            color: '#666',
                            fontWeight: 500,
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        Intended Use of Funds
                        <InfoTooltip
                            title={FORM_TOOLTIPS.useOfFunds.title}
                            description={FORM_TOOLTIPS.useOfFunds.description}
                            placement="right"
                        />
                    </Typography>
                    <MultiSelect
                        options={INTENDED_USE_OPTIONS.map(option => option.label)}
                        selectedOptions={formData.intendedUse ? formData.intendedUse.split(',').filter(item => item.trim() !== '') : []}
                        placeholder="Select intended use of funds"
                        onChange={(selected) => {
                            const value = selected.join(',');
                            onFieldChange('intendedUse', value);
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};
