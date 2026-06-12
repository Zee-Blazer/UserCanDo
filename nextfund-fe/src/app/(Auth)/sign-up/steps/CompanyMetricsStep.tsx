import React from 'react';
import { CompanyMetricsForm } from '../../../../components/authComp/sign-up/company-metrics0form';

export const CompanyMetricsStep: React.FC<{
    onBack: () => void;
    onNext: (data: any) => void;
}> = ({ onBack, onNext }) => {
    return (
        <CompanyMetricsForm onBack={onBack} onNext={onNext} />
    );
};

export default CompanyMetricsStep;


