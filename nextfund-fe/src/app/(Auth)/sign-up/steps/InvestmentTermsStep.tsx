import React from 'react';
import { InvestmentTermsPreferences } from '../../../../components/authComp/sign-up/investment-terms-preferences';

export const InvestmentTermsStep: React.FC<{
    onBack: () => void;
    onBackToEdit: () => void;
    onContinue: () => void;
    data?: any;
    onDataChange: (data: any) => void;
}> = ({ onBack, onBackToEdit, onContinue, data, onDataChange }) => {
    return (
        <InvestmentTermsPreferences
            onBack={onBack}
            onBackToEdit={onBackToEdit}
            onContinue={onContinue}
            data={data}
            onDataChange={onDataChange}
        />
    );
};

export default InvestmentTermsStep;


