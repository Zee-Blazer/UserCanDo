import React from 'react';
import { ComplianceVerificationForm } from '../../../../components/authComp/sign-up/compliance-verification-form';

export const ComplianceVerificationStep: React.FC<{
    onBack: () => void;
    onNext: (data: any) => void;
}> = ({ onBack, onNext }) => {
    return <ComplianceVerificationForm onBack={onBack} onNext={onNext} />;
};

export default ComplianceVerificationStep;


