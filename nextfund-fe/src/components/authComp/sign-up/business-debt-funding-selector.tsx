import { Box } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ActionButtons } from './business-debt-funding-selector/ActionButtons';
import { DebtOptionsGrid } from './business-debt-funding-selector/DebtOptionsGrid';
import { FormHeader } from './business-debt-funding-selector/FormHeader';

import { updateFundingStructureData } from '@/Redux/features/businessSlice';
import { useBusinessSelector } from '@/Redux/selectors';
import type { BusinessDebtFundingSelectorProps } from './business-debt-funding-selector/types';
import { INITIAL_DEBT_OPTIONS } from './business-debt-funding-selector/types';


export type { BusinessDebtFundingSelectorProps } from './business-debt-funding-selector/types';

export const BusinessDebtFundingSelector: React.FC<BusinessDebtFundingSelectorProps> = ({ onBack, onNext }) => {
    const dispatch = useDispatch();
    const { fundingStructureData: persistedData } = useBusinessSelector();

    const [selectedDebtType, setSelectedDebtType] = useState<string>('');

    // Load persisted debt type on component mount
    useEffect(() => {
        if (persistedData && persistedData.selected_debt_types && persistedData.selected_debt_types.length > 0) {
            setSelectedDebtType(persistedData.selected_debt_types[0]);
        } else {
            setSelectedDebtType('');
        }
    }, [persistedData?.selected_debt_types]);

    // Check if at least one option is selected
    const isFormValid = useMemo(() => {
        return selectedDebtType !== '';
    }, [selectedDebtType]);

    const handleOptionToggle = (optionId: string) => {
        // Single selection - only one option can be selected at a time
        const newSelection = optionId === selectedDebtType ? '' : optionId;
        setSelectedDebtType(newSelection);

        // Persist to Redux immediately
        if (newSelection) {
            dispatch(updateFundingStructureData({
                selected_debt_types: [newSelection]
            }));
        } else {
            dispatch(updateFundingStructureData({
                selected_debt_types: []
            }));
        }
    };

    const handleContinue = () => {
        if (!isFormValid) return;

        // Ensure Redux state is updated before proceeding
        dispatch(updateFundingStructureData({
            selected_debt_types: [selectedDebtType]
        }));

        onNext([selectedDebtType]);
    };

    // Create debt options array with selected state
    const debtOptions = INITIAL_DEBT_OPTIONS.map(option => ({
        ...option,
        selected: option.id === selectedDebtType
    }));

    return (
        <Box sx={{ width: '100%' }}>
            {/* Header Section */}
            <FormHeader
                onBack={onBack}
                title="Choose your preferred debt funding approach"
                subtitle="How do you want to structure your debt raise?"
            />

            {/* Debt Options Section */}
            <DebtOptionsGrid
                debtOptions={debtOptions}
                onOptionToggle={handleOptionToggle}
            />

            {/* Action Buttons */}
            <ActionButtons
                isFormValid={isFormValid}
                onContinue={handleContinue}
            />
        </Box>
    );
};