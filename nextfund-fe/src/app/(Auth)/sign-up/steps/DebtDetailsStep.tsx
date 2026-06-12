import React from 'react';
import { BusinessDebtDetailsForm } from '../../../../components/authComp/sign-up/business-debt-details-form';

export const DebtDetailsStep: React.FC<{
    onBack: () => void;
    onNext: (data: any) => void;
    selectedFundingType: string;
}> = ({ onBack, onNext, selectedFundingType }) => {
    return (
        <BusinessDebtDetailsForm onBack={onBack} onNext={onNext} selectedFundingType={selectedFundingType} />
    );
};

export default DebtDetailsStep;


