import { Box, Typography } from '@mui/material';
import React from 'react';
import { FORM_TOOLTIPS } from '../../../../constants/formTooltips';
import FormInput from '../../../General/form/formInput';
import MultiSelect from '../../../General/form/multiselect';
import { InfoTooltip } from '../../../General/ui';
import type { ConvertibleFields } from './types';
import { INTENDED_USE_OPTIONS } from './types';

interface ConvertibleNoteFormProps {
    formData: ConvertibleFields;
    onFieldChange: (field: keyof ConvertibleFields, value: string) => void;
    errors: Record<string, string>;
}

export const ConvertibleNoteForm: React.FC<ConvertibleNoteFormProps> = ({
    formData,
    onFieldChange,
    errors
}) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, sm: 3 }
        }}>
            {/* Funding Amount */}
            <Box>
                <FormInput
                    value={formData.fundingAmount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange('fundingAmount', e.target.value)}
                    label="Funding Amount Seeking ($)"
                    placeholder="Enter funding amount (e.g., 100000)"
                    error={errors.fundingAmount}
                    required
                />
            </Box>

            {/* Interest Rate */}
            <Box>
                <FormInput
                    value={formData.interestRate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange('interestRate', e.target.value)}
                    label="Interest Rate (%)"
                    placeholder="Enter interest rate (e.g., 8.5)"
                    error={errors.interestRate}
                    required
                />
            </Box>

            {/* Maturity Period */}
            <Box>
                <FormInput
                    value={formData.maturityPeriod}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange('maturityPeriod', e.target.value)}
                    label="Maturity Period (Months)"
                    placeholder="Enter maturity period (e.g., 24)"
                    error={errors.maturityPeriod}
                    required
                />
            </Box>

            {/* Conversion Discount */}
            <Box>
                <FormInput
                    value={formData.conversionDiscount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange('conversionDiscount', e.target.value)}
                    label="Conversion Discount (%)"
                    placeholder="Enter conversion discount (e.g., 20)"
                    error={errors.conversionDiscount}
                />
            </Box>

            {/* Valuation Cap */}
            <Box>
                <FormInput
                    value={formData.valuationCap}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange('valuationCap', e.target.value)}
                    label="Valuation Cap ($)"
                    placeholder="Enter valuation cap (e.g., 5000000)"
                    error={errors.valuationCap}
                />
            </Box>

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
    );
};
