import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ActionButtons } from './business-funding-type-selector/ActionButtons';
import { FormHeader } from './business-funding-type-selector/FormHeader';
import { FundingOptionsGrid } from './business-funding-type-selector/FundingOptionsGrid';


import { useDispatch } from 'react-redux';
import { updateFundingStructureData } from '../../../Redux/features/businessSlice';
import { useBusinessSelector } from '../../../Redux/selectors';
import type { BusinessFundingTypeSelectorProps } from './business-funding-type-selector/types';
import { FUNDING_OPTIONS } from './business-funding-type-selector/types';

export type { BusinessFundingTypeSelectorProps } from './business-funding-type-selector/types';

export const BusinessFundingTypeSelector: React.FC<BusinessFundingTypeSelectorProps> = ({ onBack, onNext }) => {
    const dispatch = useDispatch();
    const { fundingStructureData: persistedData } = useBusinessSelector();
    const [selectedFunding, setSelectedFunding] = useState<string>('');

    // Load persisted data on component mount
    useEffect(() => {
        if (persistedData && persistedData.funding_type) {
            // Handle both single string and comma-separated string
            const fundingType = persistedData.funding_type.split(',')[0];
            setSelectedFunding(fundingType);
        }
    }, [persistedData]);

    const handleFundingToggle = (fundingId: string) => {
        // Single selection - only one option can be selected at a time
        const newSelection = fundingId === selectedFunding ? '' : fundingId;
        setSelectedFunding(newSelection);

        // Persist to Redux immediately
        if (newSelection) {
            const reduxData = {
                funding_type: newSelection,
                instrument_type: persistedData?.instrument_type || '',
                funding_amount_seeking: persistedData?.funding_amount_seeking || '',
                current_valuation: persistedData?.current_valuation || '',
                percentage_equity_offering: persistedData?.percentage_equity_offering || '',
                intended_use_of_funds: persistedData?.intended_use_of_funds || '',
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
        }
    };

    const handleContinue = () => {
        if (selectedFunding) {
            onNext([selectedFunding]);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
            {/* Header Section */}
            <FormHeader
                onBack={onBack}
                title="What type of funding are you seeking?"
                subtitle="Select the funding structure that best fits your business needs."
            />

            {/* Funding Options Section */}
            <FundingOptionsGrid
                fundingOptions={FUNDING_OPTIONS}
                selectedFunding={selectedFunding}
                onFundingToggle={handleFundingToggle}
            />

            {/* Action Buttons */}
            <ActionButtons
                selectedFunding={selectedFunding}
                onContinue={handleContinue}
            />
        </Box>
    );
};