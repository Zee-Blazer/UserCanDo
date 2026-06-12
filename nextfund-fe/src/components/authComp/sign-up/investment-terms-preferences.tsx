import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { ActionButtons } from './investment-terms-preferences/ActionButtons';
// import { AdditionalTerms } from './investment-terms-preferences/AdditionalTerms';
import { FormHeader } from './investment-terms-preferences/FormHeader';
import { InvestmentTimeline } from './investment-terms-preferences/InvestmentTimeline';
import { InvestorPreferences } from './investment-terms-preferences/InvestorPreferences';


import { useDispatch } from 'react-redux';
import { updateInvestmentPreferencesData } from '../../../Redux/features/businessSlice';
import { useBusinessSelector } from '../../../Redux/selectors';
import type {
    InvestmentTermsData,
    InvestmentTermsPreferencesProps
} from './investment-terms-preferences/types';


export type {
    InvestmentTermsData,
    InvestmentTermsPreferencesProps
} from './investment-terms-preferences/types';

// Helper function to parse numeric value from formatted string
const parseNumericValue = (value: string): number => {
    return parseFloat(value.replace(/[^0-9]/g, '')) || 0;
};

// Helper function to validate maximum investment
const validateMaximumInvestment = (minimumInvestment: string, maximumInvestment: string): boolean => {
    const minimum = parseNumericValue(minimumInvestment);
    const maximum = parseNumericValue(maximumInvestment);

    if (minimum === 0 || maximum === 0) return true; // Allow empty values
    return maximum >= minimum;
};

export const InvestmentTermsPreferences: React.FC<InvestmentTermsPreferencesProps> = ({
    onBack,
    onBackToEdit,
    onContinue,
    data,
    onDataChange
}) => {
    const dispatch = useDispatch();
    const { investmentPreferencesData: persistedData } = useBusinessSelector();
    const hasInitialized = useRef(false);

    const [formData, setFormData] = useState<InvestmentTermsData>(data || {
        minimumInvestment: '',
        maximumInvestment: '',
        maximumInvestors: '',
        geographicPreference: '',
        fundingRoundDuration: '',
        expectedCloseDate: '',
        dueDiligenceTimeline: '',
        investorTypePreference: '',
        investorUpdatesFrequency: '',
    });

    // Validation state
    const isMaximumInvestmentValid = validateMaximumInvestment(formData.minimumInvestment, formData.maximumInvestment);
    const showMaximumInvestmentError = formData.maximumInvestment.trim() !== '' && !isMaximumInvestmentValid;


    useEffect(() => {
        if (!hasInitialized.current) {

            if (!data && persistedData && Object.keys(persistedData).length > 0) {
                const loadedData = {
                    minimumInvestment: (persistedData.minimum_investment && persistedData.minimum_investment > 0) ? persistedData.minimum_investment.toString() : '',
                    maximumInvestment: (persistedData.maximum_investment && persistedData.maximum_investment > 0) ? persistedData.maximum_investment.toString() : '',
                    maximumInvestors: (persistedData.maximum_number_of_investors && persistedData.maximum_number_of_investors > 0) ? persistedData.maximum_number_of_investors.toString() : '',
                    geographicPreference: persistedData.geographic_preference || '',
                    fundingRoundDuration: persistedData.funding_round_duration || '',
                    expectedCloseDate: persistedData.expected_close_date || '',
                    dueDiligenceTimeline: persistedData.due_diligence_timeline || '',
                    investorTypePreference: persistedData.investor_type_preference || '',
                    investorUpdatesFrequency: (['monthly', 'quarterly'].includes(persistedData.investor_updates_frequency) ? persistedData.investor_updates_frequency : '') as 'monthly' | 'quarterly' | '',
                };
                setFormData(loadedData);
                if (onDataChange) onDataChange(loadedData);
            }
            hasInitialized.current = true;
        }
    }, [data]);

    const handleInputChange = (field: keyof InvestmentTermsData, value: string) => {
        const isNumericField = field === 'minimumInvestment' || field === 'maximumInvestment' || field === 'maximumInvestors';
        const isTimelineField = field === 'fundingRoundDuration' || field === 'dueDiligenceTimeline';

        let normalizedValue = value;

        if (isNumericField) {
            // For investment amounts and investor count - only numbers
            normalizedValue = value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '');
        } else if (isTimelineField) {
            // For timeline fields - only numbers (weeks/months)
            normalizedValue = value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '');
        }

        const newData = { ...formData, [field]: normalizedValue };
        setFormData(newData);
        onDataChange(newData);


        const getNumericValue = (value: string) => {
            return value && value.trim() !== '' ? parseInt(value) : 0;
        };

        const reduxData = {
            minimum_investment: parseInt(field === 'minimumInvestment' ? normalizedValue : newData.minimumInvestment || '0') || 0,
            maximum_investment: parseInt(field === 'maximumInvestment' ? normalizedValue : newData.maximumInvestment || '0') || 0,
            maximum_number_of_investors: parseInt(field === 'maximumInvestors' ? normalizedValue : newData.maximumInvestors || '0') || 0,
            geographic_preference: field === 'geographicPreference' ? value : newData.geographicPreference,
            funding_round_duration: field === 'fundingRoundDuration' ? normalizedValue : newData.fundingRoundDuration,
            expected_close_date: field === 'expectedCloseDate' ? value : newData.expectedCloseDate,
            due_diligence_timeline: field === 'dueDiligenceTimeline' ? normalizedValue : newData.dueDiligenceTimeline,
            investor_type_preference: field === 'investorTypePreference' ? value : newData.investorTypePreference,
            investor_updates_frequency: field === 'investorUpdatesFrequency' ? value : newData.investorUpdatesFrequency,
        };
        dispatch(updateInvestmentPreferencesData(reduxData));
    };

    const handleAuthFormChange = (slug: string, inputValue: string) => {
        handleInputChange(slug as keyof InvestmentTermsData, inputValue);
    };

    const handleKeyPress = (field: keyof InvestmentTermsData) => (event: React.KeyboardEvent<HTMLInputElement>) => {

        const numericFields = ['minimumInvestment', 'maximumInvestment', 'maximumInvestors', 'fundingRoundDuration', 'dueDiligenceTimeline'];

        if (numericFields.includes(field)) {

            if (!/[0-9]/.test(event.key) &&
                event.key !== 'Backspace' &&
                event.key !== 'Delete' &&
                event.key !== 'Tab' &&
                event.key !== 'ArrowLeft' &&
                event.key !== 'ArrowRight') {
                event.preventDefault();
            }
        }
    };

    const handleRadioChange = (field: keyof InvestmentTermsData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(field, event.target.value);
    };

    const investorTypeOptions = [
        'Individual Investors',
        'Institutional Investors',
        'Venture Capital Firms',
        'Angel Investors',
        'Family Offices',
        'Strategic Investors',
        'No Preference'
    ];


    // Radio button styles
    const radioStyles = {
        color: '#6A6A6A',
        '&.Mui-checked': {
            color: '#6A6A6A'
        }
    };

    return (
        <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
            {/* Header Section */}
            <FormHeader
                onBack={onBack}
                title="Investment Terms & Preferences"
                subtitle="Congratulations! Your application has been pre-qualified. Now let's set your investor preferences to complete your listing."
            />

            {/* Investor Preferences Section */}
            <InvestorPreferences
                formData={formData}
                onAuthFormChange={handleAuthFormChange}
                onKeyPress={handleKeyPress}
                showMaximumInvestmentError={showMaximumInvestmentError}
            />

            {/* Investment Timeline Section */}
            <InvestmentTimeline
                formData={formData}
                onAuthFormChange={handleAuthFormChange}
                investorTypeOptions={investorTypeOptions}
                onKeyPress={handleKeyPress}
            />

            {/* Additional Terms Section - Commented out */}
            {/* <AdditionalTerms
                formData={formData}
                onRadioChange={handleRadioChange}
                radioStyles={radioStyles}
            /> */}

            {/* Action Buttons Section */}
            <ActionButtons
                onBackToEdit={onBackToEdit}
                onContinue={onContinue}
            />
        </Box>
    );
};