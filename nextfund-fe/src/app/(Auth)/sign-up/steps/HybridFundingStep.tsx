import React from 'react';
import { HybridFundingSelector } from '../../../../components/authComp/sign-up/hybrid-funding-selector';

export const HybridFundingStep: React.FC<{
    onBack: () => void;
    onNext: (data: any) => void;
    selectedFundingType: string;
}> = ({ onBack, onNext, selectedFundingType }) => {
    return (
        <HybridFundingSelector onBack={onBack} onNext={onNext} selectedFundingType={selectedFundingType} />
    );
};

export default HybridFundingStep;


