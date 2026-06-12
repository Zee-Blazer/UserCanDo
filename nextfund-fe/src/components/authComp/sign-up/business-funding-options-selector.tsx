import { Box } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { CustomButton } from '../../../components/General/ui';

import { AdditionalFields } from './business-funding-options-selector/AdditionalFields';
import { FormHeader } from './business-funding-options-selector/FormHeader';
import { FundingOptionsSelector } from './business-funding-options-selector/FundingOptionsSelector';

import { useDispatch } from 'react-redux';
import { updateFundingStructureData } from '../../../Redux/features/businessSlice';
import { useBusinessSelector } from '../../../Redux/selectors';
import {
    DEFAULT_FUNDING_OPTIONS,
    type AdditionalFieldsData,
    type BusinessFundingOptionsSelectorProps,
    type FundingOption
} from './business-funding-options-selector/types';


export type {
    AdditionalFieldsData,
    BusinessFundingOptionsSelectorProps,
    FundingOption
} from './business-funding-options-selector/types';

// Updated to handle both selectedOptions and additionalFields
export const BusinessFundingOptionsSelector: React.FC<BusinessFundingOptionsSelectorProps> = ({ onBack, onNext }) => {
    const dispatch = useDispatch();
    const { fundingStructureData: persistedData } = useBusinessSelector();

    const [fundingOptions, setFundingOptions] = useState<FundingOption[]>(DEFAULT_FUNDING_OPTIONS);

    const [additionalFields, setAdditionalFields] = useState<AdditionalFieldsData>({
        fundingAmount: '',
        currentValuation: '',
        percentageEquity: '',
        intendedUse: ''
    });

    // Load persisted data on component mount
    useEffect(() => {
        if (persistedData && Object.keys(persistedData).length > 0 && persistedData.funding_type === 'equity') {
            setAdditionalFields({
                fundingAmount: persistedData.funding_amount_seeking || '',
                currentValuation: persistedData.current_valuation || '',
                percentageEquity: persistedData.percentage_equity_offering || '',
                intendedUse: persistedData.intended_use_of_funds || ''
            });

            // Update funding options selection if available
            if (persistedData.instrument_type) {
                const optionId = persistedData.instrument_type; // Now it's a single string, not comma-separated
                setFundingOptions(prev =>
                    prev.map(option => ({
                        ...option,
                        selected: option.id === optionId
                    }))
                );
            }
        }
    }, [persistedData]);

    // Helper function to parse numeric value from formatted string
    const parseNumericValue = (value: string): number => {
        return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    };

    // Helper function to validate valuation
    const validateValuation = (fundingAmount: string, currentValuation: string): boolean => {
        const funding = parseNumericValue(fundingAmount);
        const valuation = parseNumericValue(currentValuation);

        if (funding === 0 || valuation === 0) return true; // Allow empty values
        return valuation >= funding;
    };

    // Check if form is valid
    const isFormValid = useMemo(() => {
        const hasSelectedOption = fundingOptions.some(option => option.selected);
        const hasRequiredFields = additionalFields.fundingAmount.trim() !== '' &&
            additionalFields.currentValuation.trim() !== '' &&
            additionalFields.percentageEquity.trim() !== '' &&
            additionalFields.intendedUse !== '';

        const isValuationValid = validateValuation(additionalFields.fundingAmount, additionalFields.currentValuation);

        return hasSelectedOption && hasRequiredFields && isValuationValid;
    }, [fundingOptions, additionalFields]);

    const handleOptionToggle = (optionId: string) => {

        // Radio button behavior: only one option can be selected
        const updatedOptions = fundingOptions.map(option =>
            option.id === optionId
                ? { ...option, selected: true }
                : { ...option, selected: false }
        );
        setFundingOptions(updatedOptions);

        // Persist to Redux immediately
        const selectedOptionId = updatedOptions.find(option => option.selected)?.id || '';
        const reduxData = {
            funding_type: 'equity',
            instrument_type: selectedOptionId,
            funding_amount_seeking: additionalFields.fundingAmount,
            current_valuation: additionalFields.currentValuation,
            percentage_equity_offering: additionalFields.percentageEquity,
            intended_use_of_funds: additionalFields.intendedUse,
            interest_rate: persistedData?.interest_rate || '',
            maturity_period: persistedData?.maturity_period || '',
            conversion_discount: persistedData?.conversion_discount || '',
            valuation_cap: persistedData?.valuation_cap || '',
            ideal_interest_range: persistedData?.ideal_interest_range || '',
            security_type: persistedData?.security_type || '',
            interest_structure: persistedData?.interest_structure || '',
            repayment_schedule: persistedData?.repayment_schedule || '',
            collateral_available: persistedData?.collateral_available || '',
            hybrid_equity_type: persistedData?.hybrid_equity_type || '',
            hybrid_debt_type: persistedData?.hybrid_debt_type || '',
            hybrid_equity_percentage: persistedData?.hybrid_equity_percentage || '',
            hybrid_debt_percentage: persistedData?.hybrid_debt_percentage || '',
        };
        dispatch(updateFundingStructureData(reduxData));
    };

    const handleFieldChange = (field: keyof AdditionalFieldsData, value: string) => {
        const updatedFields = {
            ...additionalFields,
            [field]: value
        };
        setAdditionalFields(updatedFields);

        // Persist to Redux immediately
        const selectedOptionId = fundingOptions.find(option => option.selected)?.id || '';
        const reduxData = {
            funding_type: 'equity',
            instrument_type: selectedOptionId,
            funding_amount_seeking: field === 'fundingAmount' ? value : updatedFields.fundingAmount,
            current_valuation: field === 'currentValuation' ? value : updatedFields.currentValuation,
            percentage_equity_offering: field === 'percentageEquity' ? value : updatedFields.percentageEquity,
            intended_use_of_funds: field === 'intendedUse' ? value : updatedFields.intendedUse,
            interest_rate: persistedData?.interest_rate || '',
            maturity_period: persistedData?.maturity_period || '',
            conversion_discount: persistedData?.conversion_discount || '',
            valuation_cap: persistedData?.valuation_cap || '',
            ideal_interest_range: persistedData?.ideal_interest_range || '',
            security_type: persistedData?.security_type || '',
            interest_structure: persistedData?.interest_structure || '',
            repayment_schedule: persistedData?.repayment_schedule || '',
            collateral_available: persistedData?.collateral_available || '',
            hybrid_equity_type: persistedData?.hybrid_equity_type || '',
            hybrid_debt_type: persistedData?.hybrid_debt_type || '',
            hybrid_equity_percentage: persistedData?.hybrid_equity_percentage || '',
            hybrid_debt_percentage: persistedData?.hybrid_debt_percentage || '',
        };
        dispatch(updateFundingStructureData(reduxData));
    };

    const handleContinue = () => {
        if (!isFormValid) return;

        const selectedOption = fundingOptions
            .find(option => option.selected)
            ?.id || '';

        // Pass the selected option and additional fields
        (onNext as any)(selectedOption, additionalFields);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <FormHeader
                onBack={onBack}
                title="Choose your preferred equity funding approach"
                subtitle="How do you want to structure your equity raise?"
            />

            <FundingOptionsSelector
                fundingOptions={fundingOptions}
                onOptionToggle={handleOptionToggle}
            />

            <AdditionalFields
                formData={additionalFields}
                onFieldChange={handleFieldChange}
            />

            {/* Continue Button */}
            <Box sx={{ mt: { xs: 3, sm: 4 } }}>
                <CustomButton
                    variant="primary"
                    fullWidth
                    onClick={handleContinue}
                    disabled={!isFormValid}
                    sx={{
                        fontSize: { xs: '0.9rem', sm: '0.95rem' },
                        py: { xs: 1.5, sm: 1.75 },
                        borderRadius: { xs: '12px', sm: '16px' },
                        fontWeight: 600,
                        backgroundColor: isFormValid ? '#4CAF50' : '#ccc',
                        '&:hover': {
                            backgroundColor: isFormValid ? '#45a049' : '#ccc',
                        },
                    }}
                >
                    Continue
                </CustomButton>
            </Box>
        </Box>
    );
};