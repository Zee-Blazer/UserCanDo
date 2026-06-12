import MultiSelect from '@/components/General/form/multiselect';
import { CustomButton, InfoTooltip } from '@/components/General/ui';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ConversionOptions } from './hybrid-funding-selector/ConversionOptions';
import { DebtComponent } from './hybrid-funding-selector/DebtComponent';
import { EquityComponent } from './hybrid-funding-selector/EquityComponent';
import { FormHeader } from './hybrid-funding-selector/FormHeader';
import { SplitConfiguration } from './hybrid-funding-selector/SplitConfiguration';

import { FORM_TOOLTIPS } from '@/constants/formTooltips';
import { updateFundingStructureData } from '@/Redux/features/businessSlice';
import { useBusinessSelector } from '@/Redux/selectors';
import { useDispatch } from 'react-redux';
import type { HybridFundingData } from './hybrid-funding-selector/types';
import { INTENDED_USE_OPTIONS } from './hybrid-funding-selector/types';

export type { HybridFundingData } from './hybrid-funding-selector/types';

export const HybridFundingSelector: React.FC<{
    onBack: () => void;
    onNext: (data: HybridFundingData) => void;
    selectedFundingType?: string;
}> = ({ onBack, onNext, selectedFundingType = 'hybrid' }) => {
    const dispatch = useDispatch();
    const { fundingStructureData: persistedData } = useBusinessSelector();

    // Only show this component for hybrid funding
    if (selectedFundingType !== 'hybrid') {
        return null;
    }

    const [formData, setFormData] = useState<HybridFundingData>({
        equityPortion: 70,
        equityComponent: {
            repaymentSchedule: 'SAFE',
            equityPercentage: '',
            enabled: false,
        },
        debtComponent: {
            type: 'Convertible Note',
            interestRate: '',
            maturityPeriod: '',
            repaymentTerm: '',
            conversionDiscount: '',
            valuationCap: '',
            enabled: false,
        },
        conversionOptions: {
            allowDebtToEquityConversion: false,
            performanceBasedTriggers: false,
            timeBasedOptions: false,
        },
        intendedUse: '',
    });

    // Load persisted data on component mount
    useEffect(() => {
        if (persistedData && Object.keys(persistedData).length > 0 && persistedData.funding_type === 'hybrid') {
            setFormData({
                equityPortion: parseFloat(persistedData.hybrid_equity_percentage) || 70,
                equityComponent: {
                    repaymentSchedule: (persistedData.hybrid_equity_type as any) || 'SAFE',
                    equityPercentage: persistedData.percentage_equity_offering || '',
                    enabled: persistedData.hybrid_equity_enabled || false,
                },
                debtComponent: {
                    type: (persistedData.hybrid_debt_type as any) || 'Convertible Note',
                    interestRate: persistedData.interest_rate || '',
                    maturityPeriod: persistedData.maturity_period || '',
                    repaymentTerm: persistedData.repayment_term || '',
                    conversionDiscount: persistedData.conversion_discount || '',
                    valuationCap: persistedData.valuation_cap || '',
                    enabled: persistedData.hybrid_debt_enabled || false,
                },
                conversionOptions: {
                    allowDebtToEquityConversion: false,
                    performanceBasedTriggers: false,
                    timeBasedOptions: false,
                },
                intendedUse: persistedData.intended_use_of_funds || '',
            });
        }
    }, [persistedData]);

    const isFormValid = () => {
        const { equityComponent, debtComponent } = formData;

        // Check if at least one component is enabled
        if (!equityComponent.enabled && !debtComponent.enabled) {
            return false;
        }

        // Check equity component if enabled - only require fields with asterisks (*)
        if (equityComponent.enabled) {
            // Equity Percentage is required (has asterisk *)
            if (!equityComponent.equityPercentage.trim()) {
                return false;
            }

        }


        if (debtComponent.enabled) {
            // Interest Rate is required (has asterisk *)
            if (!debtComponent.interestRate.trim()) {
                return false;
            }


            if (debtComponent.type === 'Convertible Note') {
                // Only Maturity Period is required (has asterisk *)
                // conversionDiscount and valuationCap are optional (no asterisks)
                if (!debtComponent.maturityPeriod?.trim()) {
                    return false;
                }
            } else if (debtComponent.type === 'Traditional Debt') {
                // Only Repayment Term is required (has asterisk *)
                // security and repaymentSchedule are optional (no asterisks)
                if (!debtComponent.repaymentTerm?.trim()) {
                    return false;
                }
            }
        }

        return true;
    };

    const handleEquityPortionChange = (_event: Event, newValue: number | number[]) => {
        setFormData(prev => ({
            ...prev,
            equityPortion: newValue as number,
        }));

        // Persist to Redux
        dispatch(updateFundingStructureData({
            hybrid_equity_percentage: (newValue as number).toString(),
        }));
    };

    const handleEquityScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            equityComponent: {
                ...prev.equityComponent,
                repaymentSchedule: event.target.value as 'SAFE' | 'Priced Round' | 'Revenue Share',
            },
        }));

        // Persist to Redux
        dispatch(updateFundingStructureData({
            hybrid_equity_type: event.target.value,
        }));
    };

    const handleDebtTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            debtComponent: {
                ...prev.debtComponent,
                type: event.target.value as 'Convertible Note' | 'Traditional Debt',
                maturityPeriod: '',
                repaymentTerm: '',
                conversionDiscount: '',
                valuationCap: '',
                security: undefined,
                repaymentSchedule: undefined,
            },
        }));

        // Persist to Redux
        dispatch(updateFundingStructureData({
            hybrid_debt_type: event.target.value,
        }));
    };

    const handleDebtSecurityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            debtComponent: {
                ...prev.debtComponent,
                security: event.target.value as 'Secured' | 'Unsecured',
            },
        }));
    };

    const handleDebtRepaymentScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            debtComponent: {
                ...prev.debtComponent,
                repaymentSchedule: event.target.value as 'Monthly' | 'Quarterly' | 'Annually',
            },
        }));
    };

    const handleInputChange = (section: 'equityComponent' | 'debtComponent' | 'conversionOptions', field: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));

        // Persist relevant changes to Redux
        if (section === 'equityComponent') {
            if (field === 'equityPercentage') {
                dispatch(updateFundingStructureData({
                    percentage_equity_offering: value as string,
                }));
            }
        } else if (section === 'debtComponent') {
            const reduxUpdates: any = {};
            if (field === 'interestRate') {
                reduxUpdates.interest_rate = value as string;
            } else if (field === 'maturityPeriod') {
                reduxUpdates.maturity_period = value as string;
            } else if (field === 'repaymentTerm') {
                reduxUpdates.repayment_term = value as string;
            } else if (field === 'conversionDiscount') {
                reduxUpdates.conversion_discount = value as string;
            } else if (field === 'valuationCap') {
                reduxUpdates.valuation_cap = value as string;
            }

            if (Object.keys(reduxUpdates).length > 0) {
                dispatch(updateFundingStructureData(reduxUpdates));
            }
        }
    };

    const handleComponentToggle = (component: 'equity' | 'debt') => {
        if (component === 'equity') {
            const newEquityEnabled = !formData.equityComponent.enabled;
            setFormData(prev => ({
                ...prev,
                equityComponent: {
                    ...prev.equityComponent,
                    enabled: newEquityEnabled,
                },
                debtComponent: {
                    ...prev.debtComponent,
                    enabled: false,
                },
            }));

            // Persist to Redux immediately
            dispatch(updateFundingStructureData({
                hybrid_equity_enabled: newEquityEnabled,
                hybrid_debt_enabled: false,
            }));
        } else {
            const newDebtEnabled = !formData.debtComponent.enabled;
            setFormData(prev => ({
                ...prev,
                debtComponent: {
                    ...prev.debtComponent,
                    enabled: newDebtEnabled,
                },
                equityComponent: {
                    ...prev.equityComponent,
                    enabled: false,
                },
            }));

            // Persist to Redux immediately
            dispatch(updateFundingStructureData({
                hybrid_equity_enabled: false,
                hybrid_debt_enabled: newDebtEnabled,
            }));
        }
    };

    const handleConversionOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as 'allowDebtToEquityConversion' | 'performanceBasedTriggers' | 'timeBasedOptions';
        setFormData(prev => ({
            ...prev,
            conversionOptions: {
                allowDebtToEquityConversion: value === 'allowDebtToEquityConversion',
                performanceBasedTriggers: value === 'performanceBasedTriggers',
                timeBasedOptions: value === 'timeBasedOptions',
                selectedOption: value,
            },
        }));
    };

    const handleContinue = () => {
        if (isFormValid()) {
            // Persist all form data to Redux before proceeding
            dispatch(updateFundingStructureData({
                funding_type: 'hybrid',
                hybrid_equity_percentage: formData.equityPortion.toString(),
                hybrid_equity_type: formData.equityComponent.repaymentSchedule,
                percentage_equity_offering: formData.equityComponent.equityPercentage,
                hybrid_equity_enabled: formData.equityComponent.enabled,
                hybrid_debt_type: formData.debtComponent.type,
                interest_rate: formData.debtComponent.interestRate,
                maturity_period: formData.debtComponent.maturityPeriod || '',
                repayment_term: formData.debtComponent.repaymentTerm || '',
                conversion_discount: formData.debtComponent.conversionDiscount || '',
                valuation_cap: formData.debtComponent.valuationCap || '',
                hybrid_debt_enabled: formData.debtComponent.enabled,
                intended_use_of_funds: formData.intendedUse,
            }));

            onNext(formData);
        }
    };



    return (
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
            <FormHeader
                onBack={onBack}
                title="Choose your preferred hybrid funding approach"
                subtitle="How do you want to balance your equity and debt components?"
            />

            <SplitConfiguration
                equityPortion={formData.equityPortion}
                onEquityPortionChange={handleEquityPortionChange}
            />

            <EquityComponent
                formData={formData}
                onComponentToggle={handleComponentToggle}
                onInputChange={handleInputChange}
                onEquityScheduleChange={handleEquityScheduleChange}
            />

            <DebtComponent
                formData={formData}
                onComponentToggle={handleComponentToggle}
                onInputChange={handleInputChange}
                onDebtTypeChange={handleDebtTypeChange}
                onDebtSecurityChange={handleDebtSecurityChange}
                onDebtRepaymentScheduleChange={handleDebtRepaymentScheduleChange}
            />
            <ConversionOptions
                formData={formData}
                onConversionOptionChange={handleConversionOptionChange}
            />

            {/* Intended Use of Funds */}
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
                    Intended Use of Funds
                </Typography>
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
                        Select how you plan to use the funds
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
                            setFormData(prev => ({ ...prev, intendedUse: value }));

                            // Persist to Redux
                            dispatch(updateFundingStructureData({
                                intended_use_of_funds: value,
                            }));
                        }}
                    />
                </Box>
            </Box>

            {/* Continue button */}
            <Box sx={{ width: '100%' }}>
                <CustomButton
                    variant="primary"
                    fullWidth
                    onClick={handleContinue}
                    disabled={!isFormValid()}
                    sx={{
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        py: { xs: 1.5, sm: 2 },
                        borderRadius: { xs: '12px', sm: '16px' },
                        fontWeight: 600,
                        backgroundColor: !isFormValid() ? '#ccc' : '#33CC33',
                        '&:hover': {
                            backgroundColor: !isFormValid() ? '#ccc' : '#33CC33',
                        },
                        '&:disabled': {
                            backgroundColor: '#ccc',
                            color: '#999',
                        },
                    }}
                >
                    Continue
                </CustomButton>
            </Box>
        </Box >
    );
};