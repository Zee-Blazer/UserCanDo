import React from 'react';
import { SignUpForm } from '../../../../components/authComp/sign-up/sign-up-form';

export const InvestorFormStep: React.FC<{
    onNext: (formData?: any) => void;
    userType: 'investor' | 'business';
}> = ({ onNext, userType }) => {
    return <SignUpForm userType={userType} onNext={onNext} />;
};

export default InvestorFormStep;


