import React from 'react';
import { UseOfFundsForm } from '../../../../components/authComp/sign-up/use-of-funds-form';

export const UseOfFundsStep: React.FC<{
    onBack: () => void;
    onNext: (data: any) => void;
}> = ({ onBack, onNext }) => {
    return <UseOfFundsForm onBack={onBack} onNext={onNext} />;
};

export default UseOfFundsStep;


