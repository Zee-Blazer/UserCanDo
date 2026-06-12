import React from 'react';
import { AdditionalFieldsData, BusinessFundingOptionsSelector } from '../../../../components/authComp/sign-up/business-funding-options-selector';

export const EquityOptionsStep: React.FC<{
    onBack: () => void;
    onNext: (selectedOption: string, additionalFields?: AdditionalFieldsData) => void;
}> = ({ onBack, onNext }) => {
    return <BusinessFundingOptionsSelector onBack={onBack} onNext={onNext} />;
};

export default EquityOptionsStep;


