import { Box, Typography } from '@mui/material';
import React from 'react';
import { FORM_TOOLTIPS } from '../../../../constants/formTooltips';
import FormInput from '../../../General/form/formInput';
import MultiSelect from '../../../General/form/multiselect';
import FormSelect from '../../../General/form/select';
import { InfoTooltip } from '../../../General/ui';
import { CustomRadioButton } from './CustomRadioButton';
import type { TraditionalFields } from './types';
import {
    COLLATERAL_OPTIONS,
    INTENDED_USE_OPTIONS,
    INTEREST_STRUCTURE_OPTIONS,
    REPAYMENT_SCHEDULE_OPTIONS,
    SECURITY_TYPE_OPTIONS
} from './types';

interface TraditionalDebtFormProps {
    formData: TraditionalFields;
    onFieldChange: (field: keyof TraditionalFields, value: string) => void;
    errors: Record<string, string>;
}

export const TraditionalDebtForm: React.FC<TraditionalDebtFormProps> = ({
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

            {/* Ideal Interest Rate Range */}
            <Box>
                <FormInput
                    value={formData.idealInterestRateRange}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange('idealInterestRateRange', e.target.value)}
                    label="Ideal Interest Rate Range (%)"
                    placeholder="Enter ideal rate range (e.g., 6-10)"
                    error={errors.idealInterestRateRange}
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

            {/* Security Type */}
            <CustomRadioButton
                options={SECURITY_TYPE_OPTIONS}
                selectedValue={formData.securityType}
                onValueChange={(value) => onFieldChange('securityType', value)}
                label="Security Type"
                error={errors.securityType}
            />

            {/* Interest Structure */}
            <Box>
                <FormSelect
                    label="Interest Structure"
                    options={INTEREST_STRUCTURE_OPTIONS}
                    value={formData.interestStructure}
                    onSelect={(e: React.ChangeEvent<HTMLSelectElement>) => onFieldChange('interestStructure', (e.target as HTMLSelectElement).value)}
                    placeholder="Select interest structure"
                />
            </Box>

            {/* Preferred Repayment Schedule */}
            <CustomRadioButton
                options={REPAYMENT_SCHEDULE_OPTIONS}
                selectedValue={formData.preferredRepaymentSchedule}
                onValueChange={(value) => onFieldChange('preferredRepaymentSchedule', value)}
                label="Preferred Repayment Schedule"
                error={errors.preferredRepaymentSchedule}
            />

            {/* Collateral Available */}
            <CustomRadioButton
                options={COLLATERAL_OPTIONS}
                selectedValue={formData.collateralAvailable}
                onValueChange={(value) => onFieldChange('collateralAvailable', value)}
                label="Collateral Available"
                error={errors.collateralAvailable}
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
    );
};
