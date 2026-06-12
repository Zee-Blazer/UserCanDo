import React from 'react';
import { FinalizeApplicationForm } from '../../../../components/authComp/sign-up/finalize-application-form';

export const FinalizeApplicationStep: React.FC<{
    onBack: () => void;
    onNext: (documents: Record<string, any>) => void;
}> = ({ onBack, onNext }) => {
    return <FinalizeApplicationForm onBack={onBack} onNext={onNext} />;
};

export default FinalizeApplicationStep;


