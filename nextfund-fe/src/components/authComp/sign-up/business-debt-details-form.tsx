import { Box } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../General/ui';

import { ConvertibleNoteForm } from './business-debt-details-form/ConvertibleNoteForm';
import { DebtOptionsSelector } from './business-debt-details-form/DebtOptionsSelector';
import { FormHeader } from './business-debt-details-form/FormHeader';
import { TraditionalDebtForm } from './business-debt-details-form/TraditionalDebtForm';

import { useBusinessSelector } from '../../../Redux/selectors';

import { updateFundingStructureData } from '../../../Redux/features/businessSlice';
import type {
    BusinessDebtDetailsFormProps,
    ConvertibleFields,
    DebtFundingOption,
    TraditionalFields
} from './business-debt-details-form/types';

export type {
    BusinessDebtDetailsFormProps,
    ConvertibleFields,
    DebtFundingOption,
    TraditionalFields
} from './business-debt-details-form/types';

export const BusinessDebtDetailsForm: React.FC<BusinessDebtDetailsFormProps> = ({
    onBack = () => { },
    onNext = () => { },
    selectedDebtTypes = [],
    selectedFundingType = 'debt'
}) => {
    const dispatch = useDispatch();
    const { fundingStructureData: persistedData } = useBusinessSelector();

    // Only show this component for debt funding
    if (selectedFundingType !== 'debt') {
        return null;
    }

    // Initialize debt options with selected types marked
    const [debtOptions, setDebtOptions] = useState<DebtFundingOption[]>([
        {
            id: 'convertible',
            title: 'Convertible Note',
            description: [
                'Debt that converts to equity at future funding',
                'Includes interest rate and maturity date',
                'Often includes discount and valuation cap'
            ],
            selected: false
        },
        {
            id: 'traditional',
            title: 'Traditional Debt',
            description: [
                'Repayment only (no equity conversion)',
                'Fixed repayment terms',
                'Retain full company ownership'
            ],
            selected: false
        }
    ]);

    // Determine which form to show based on selected option
    const [activeForm, setActiveForm] = useState<string>('convertible');

    // Convertible Note Fields
    const [convertibleFields, setConvertibleFields] = useState<ConvertibleFields>({
        fundingAmount: '',
        interestRate: '',
        maturityPeriod: '',
        conversionDiscount: '',
        valuationCap: '',
        intendedUse: ''
    });

    // Traditional Debt Fields
    const [traditionalFields, setTraditionalFields] = useState<TraditionalFields>({
        fundingAmount: '',
        idealInterestRateRange: '',
        maturityPeriod: '',
        securityType: '',
        interestStructure: '',
        preferredRepaymentSchedule: '',
        collateralAvailable: '',
        intendedUse: ''
    });

    // Load persisted data on component mount
    useEffect(() => {
        if (persistedData && Object.keys(persistedData).length > 0) {
            // Load debt options from Redux state
            if (persistedData.selected_debt_types && persistedData.selected_debt_types.length > 0) {
                const selectedType = persistedData.selected_debt_types[0];
                setDebtOptions(prev =>
                    prev.map(option => ({
                        ...option,
                        selected: option.id === selectedType
                    }))
                );
                setActiveForm(selectedType);
            }

            // Helper function to format currency values with commas
            const formatCurrency = (value: string) => {
                if (!value) return '';
                const numValue = parseFloat(value.replace(/,/g, ''));
                return isNaN(numValue) ? value : numValue.toLocaleString();
            };

            // Load form data based on instrument type
            if (persistedData.instrument_type === 'convertible') {
                setConvertibleFields({
                    fundingAmount: formatCurrency(persistedData.funding_amount_seeking || ''),
                    interestRate: persistedData.interest_rate || '',
                    maturityPeriod: persistedData.maturity_period || '',
                    conversionDiscount: persistedData.conversion_discount || '',
                    valuationCap: formatCurrency(persistedData.valuation_cap || ''),
                    intendedUse: persistedData.intended_use_of_funds || ''
                });
            } else if (persistedData.instrument_type === 'traditional') {
                setTraditionalFields({
                    fundingAmount: formatCurrency(persistedData.funding_amount_seeking || ''),
                    idealInterestRateRange: persistedData.ideal_interest_range || '',
                    maturityPeriod: persistedData.maturity_period || '',
                    securityType: persistedData.security_type || '',
                    interestStructure: persistedData.interest_structure || '',
                    preferredRepaymentSchedule: persistedData.repayment_schedule || '',
                    collateralAvailable: persistedData.collateral_available || '',
                    intendedUse: persistedData.intended_use_of_funds || ''
                });
            }
        }
    }, [persistedData]);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleOptionToggle = (optionId: string) => {
        setDebtOptions(prev =>
            prev.map(option =>
                option.id === optionId
                    ? { ...option, selected: true }
                    : { ...option, selected: false }
            )
        );

        setActiveForm(optionId);

        // Persist to Redux immediately
        dispatch(updateFundingStructureData({
            selected_debt_types: [optionId],
            instrument_type: optionId
        }));
    };

    const handleConvertibleFieldChange = (field: keyof ConvertibleFields, value: string) => {
        let normalizedValue = value;

        // Apply specific formatting and validation based on field type
        if (field === 'fundingAmount' || field === 'valuationCap') {
            // Remove non-numeric characters except commas
            normalizedValue = value.replace(/[^0-9,]/g, '');
            // Remove leading zeros
            normalizedValue = normalizedValue.replace(/^0+(?=\d)/, '');
            // Add commas for thousands separator
            if (normalizedValue && !normalizedValue.includes(',')) {
                const numberValue = normalizedValue.replace(/,/g, '');
                if (!isNaN(Number(numberValue))) {
                    normalizedValue = Number(numberValue).toLocaleString();
                }
            }
        } else if (field === 'interestRate' || field === 'conversionDiscount') {
            // Percentage fields - only allow 0-100
            normalizedValue = value.replace(/[^0-9.]/g, '').replace(/^0+(?=\d)/, '');
            const numValue = parseFloat(normalizedValue);
            if (!isNaN(numValue) && numValue > 100) {
                normalizedValue = '100';
            }
        } else if (field === 'maturityPeriod') {
            // Numeric field (months)
            normalizedValue = value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '');
        } else {
            // Text fields - no formatting needed
            normalizedValue = value;
        }

        const updatedFields = {
            ...convertibleFields,
            [field]: normalizedValue
        };
        setConvertibleFields(updatedFields);

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }

        // Helper function to convert formatted value to raw value for Redux storage
        const getRawValue = (value: string) => {
            if (field === 'fundingAmount' || field === 'valuationCap') {
                return value.replace(/,/g, ''); // Remove commas for storage
            }
            return value;
        };

        // Persist to Redux immediately
        const reduxData = {
            funding_type: 'debt',
            instrument_type: 'convertible',
            funding_amount_seeking: field === 'fundingAmount' ? getRawValue(normalizedValue) : getRawValue(updatedFields.fundingAmount),
            interest_rate: field === 'interestRate' ? normalizedValue : updatedFields.interestRate,
            maturity_period: field === 'maturityPeriod' ? normalizedValue : updatedFields.maturityPeriod,
            conversion_discount: field === 'conversionDiscount' ? normalizedValue : updatedFields.conversionDiscount,
            valuation_cap: field === 'valuationCap' ? getRawValue(normalizedValue) : getRawValue(updatedFields.valuationCap),
            intended_use_of_funds: field === 'intendedUse' ? normalizedValue : updatedFields.intendedUse,
            current_valuation: persistedData?.current_valuation || '',
            percentage_equity_offering: persistedData?.percentage_equity_offering || '',
            ideal_interest_range: persistedData?.ideal_interest_range || '',
            security_type: persistedData?.security_type || '',
            interest_structure: persistedData?.interest_structure || '',
            repayment_schedule: persistedData?.repayment_schedule || '',
            collateral_available: persistedData?.collateral_available || '',
            hybrid_equity_type: persistedData?.hybrid_equity_type || '',
            hybrid_debt_type: persistedData?.hybrid_debt_type || '',
            hybrid_equity_percentage: persistedData?.hybrid_equity_percentage || '',
            hybrid_debt_percentage: persistedData?.hybrid_debt_percentage || '',
            selected_debt_types: persistedData?.selected_debt_types || ['convertible'],
        };
        dispatch(updateFundingStructureData(reduxData));
    };

    const handleTraditionalFieldChange = (field: keyof TraditionalFields, value: string) => {
        let normalizedValue = value;

        // Apply specific formatting and validation based on field type
        if (field === 'fundingAmount') {
            // Remove non-numeric characters except commas
            normalizedValue = value.replace(/[^0-9,]/g, '');
            // Remove leading zeros
            normalizedValue = normalizedValue.replace(/^0+(?=\d)/, '');
            // Add commas for thousands separator
            if (normalizedValue && !normalizedValue.includes(',')) {
                const numberValue = normalizedValue.replace(/,/g, '');
                if (!isNaN(Number(numberValue))) {
                    normalizedValue = Number(numberValue).toLocaleString();
                }
            }
        } else if (field === 'idealInterestRateRange') {
            // Percentage field - only allow 0-100
            normalizedValue = value.replace(/[^0-9.-]/g, '').replace(/^0+(?=\d)/, '');
            // Extract the maximum value from range (e.g., "5-10" -> "10")
            const parts = normalizedValue.split('-');
            if (parts.length === 2) {
                const maxValue = parseFloat(parts[1]);
                if (!isNaN(maxValue) && maxValue > 100) {
                    normalizedValue = parts[0] + '-100';
                }
            } else {
                const numValue = parseFloat(normalizedValue);
                if (!isNaN(numValue) && numValue > 100) {
                    normalizedValue = '100';
                }
            }
        } else if (field === 'maturityPeriod') {
            // Numeric field (months)
            normalizedValue = value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '');
        } else {
            // Text fields - no formatting needed
            normalizedValue = value;
        }

        const updatedFields = {
            ...traditionalFields,
            [field]: normalizedValue
        };
        setTraditionalFields(updatedFields);

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }

        // Helper function to convert formatted value to raw value for Redux storage
        const getRawValue = (value: string) => {
            if (field === 'fundingAmount') {
                return value.replace(/,/g, ''); // Remove commas for storage
            }
            return value;
        };

        // Persist to Redux immediately
        const reduxData = {
            funding_type: 'debt',
            instrument_type: 'traditional',
            funding_amount_seeking: field === 'fundingAmount' ? getRawValue(normalizedValue) : getRawValue(updatedFields.fundingAmount),
            ideal_interest_range: field === 'idealInterestRateRange' ? normalizedValue : updatedFields.idealInterestRateRange,
            maturity_period: field === 'maturityPeriod' ? normalizedValue : updatedFields.maturityPeriod,
            security_type: field === 'securityType' ? normalizedValue : updatedFields.securityType,
            interest_structure: field === 'interestStructure' ? normalizedValue : updatedFields.interestStructure,
            repayment_schedule: field === 'preferredRepaymentSchedule' ? normalizedValue : updatedFields.preferredRepaymentSchedule,
            collateral_available: field === 'collateralAvailable' ? normalizedValue : updatedFields.collateralAvailable,
            intended_use_of_funds: field === 'intendedUse' ? normalizedValue : updatedFields.intendedUse,
            current_valuation: persistedData?.current_valuation || '',
            percentage_equity_offering: persistedData?.percentage_equity_offering || '',
            interest_rate: persistedData?.interest_rate || '',
            conversion_discount: persistedData?.conversion_discount || '',
            valuation_cap: persistedData?.valuation_cap || '',
            hybrid_equity_type: persistedData?.hybrid_equity_type || '',
            hybrid_debt_type: persistedData?.hybrid_debt_type || '',
            hybrid_equity_percentage: persistedData?.hybrid_equity_percentage || '',
            hybrid_debt_percentage: persistedData?.hybrid_debt_percentage || '',
            selected_debt_types: persistedData?.selected_debt_types || ['traditional'],
        };
        dispatch(updateFundingStructureData(reduxData));
    };

    const validateConvertibleForm = (): Record<string, string> => {
        const newErrors: Record<string, string> = {};

        if (!convertibleFields.fundingAmount.trim()) {
            newErrors.fundingAmount = 'Funding amount is required';
        } else {
            const amount = Number(convertibleFields.fundingAmount.replace(/,/g, ''));
            if (isNaN(amount) || amount <= 0) {
                newErrors.fundingAmount = 'Please enter a valid funding amount';
            }
        }

        if (!convertibleFields.interestRate.trim()) {
            newErrors.interestRate = 'Interest rate is required';
        } else {
            const rate = Number(convertibleFields.interestRate);
            if (isNaN(rate) || rate < 0 || rate > 100) {
                newErrors.interestRate = 'Please enter a valid interest rate (0-100%)';
            }
        }

        if (!convertibleFields.maturityPeriod.trim()) {
            newErrors.maturityPeriod = 'Maturity period is required';
        }

        if (convertibleFields.conversionDiscount) {
            const discount = Number(convertibleFields.conversionDiscount);
            if (isNaN(discount) || discount < 0 || discount > 100) {
                newErrors.conversionDiscount = 'Please enter a valid conversion discount (0-100%)';
            }
        }

        if (convertibleFields.valuationCap) {
            const cap = Number(convertibleFields.valuationCap.replace(/,/g, ''));
            if (isNaN(cap) || cap <= 0) {
                newErrors.valuationCap = 'Please enter a valid valuation cap';
            }
        }

        return newErrors;
    };

    const validateTraditionalForm = (): Record<string, string> => {
        const newErrors: Record<string, string> = {};

        // Only validate the required fields (those with asterisks *)
        if (!traditionalFields.fundingAmount.trim()) {
            newErrors.fundingAmount = 'Funding amount is required';
        } else {
            const amount = Number(traditionalFields.fundingAmount.replace(/,/g, ''));
            if (isNaN(amount) || amount <= 0) {
                newErrors.fundingAmount = 'Please enter a valid funding amount';
            }
        }

        if (!traditionalFields.idealInterestRateRange.trim()) {
            newErrors.idealInterestRateRange = 'Ideal interest rate range is required';
        }

        if (!traditionalFields.maturityPeriod.trim()) {
            newErrors.maturityPeriod = 'Maturity period is required';
        }

        return newErrors;
    };

    // Check if form is valid for continue button
    const isFormValid = useMemo(() => {
        const hasSelectedType = debtOptions.some(option => option.selected);
        if (!hasSelectedType) return false;

        if (activeForm === 'convertible') {
            return convertibleFields.fundingAmount.trim() &&
                convertibleFields.interestRate.trim() &&
                convertibleFields.maturityPeriod.trim() &&
                convertibleFields.intendedUse !== '';
        } else {

            return traditionalFields.fundingAmount.trim() &&
                traditionalFields.idealInterestRateRange.trim() &&
                traditionalFields.maturityPeriod.trim();
        }
    }, [debtOptions, activeForm, convertibleFields, traditionalFields]);

    const handleContinue = async () => {
        setIsSubmitting(true);

        const hasSelectedType = debtOptions.some(option => option.selected);
        if (!hasSelectedType) {
            setErrors({ debtType: 'Please select at least one debt funding approach' });
            setIsSubmitting(false);
            return;
        }

        const validationErrors = activeForm === 'convertible'
            ? validateConvertibleForm()
            : validateTraditionalForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const formData = {
                selectedType: activeForm,
                ...(activeForm === 'convertible' ? convertibleFields : traditionalFields)
            };

            await new Promise(resolve => setTimeout(resolve, 2000));
            onNext(formData);
        } catch (error) {
            console.error('Error submitting debt details:', error);
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <FormHeader
                onBack={onBack}
                title="Choose your preferred debt funding approach"
                subtitle="How do you want to structure your debt raise?"
                error={errors.general || errors.debtType}
            />

            <DebtOptionsSelector
                debtOptions={debtOptions}
                onOptionToggle={handleOptionToggle}
            />

            {/* Form Fields based on selected option */}
            {debtOptions.some(option => option.selected) && (
                <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                    {activeForm === 'convertible' ? (
                        <ConvertibleNoteForm
                            formData={convertibleFields}
                            onFieldChange={handleConvertibleFieldChange}
                            errors={errors}
                        />
                    ) : (
                        <TraditionalDebtForm
                            formData={traditionalFields}
                            onFieldChange={handleTraditionalFieldChange}
                            errors={errors}
                        />
                    )}
                </Box>
            )}
            {/* Continue Button */}
            <CustomButton
                variant="primary"
                fullWidth
                onClick={handleContinue}
                disabled={!isFormValid}
                isLoading={isSubmitting}
                sx={{
                    py: { xs: 1.8, sm: 2 },
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    fontWeight: 600,
                }}
            >
                Continue
            </CustomButton>
        </Box>
    );
};