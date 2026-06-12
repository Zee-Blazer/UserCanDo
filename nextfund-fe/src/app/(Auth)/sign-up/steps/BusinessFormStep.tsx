import React from 'react';
import { BusinessSignUpForm } from '../../../../components/authComp/sign-up/business-sign-up-form';

export const BusinessFormStep: React.FC<{
    onNext: (formData: any) => void;
}> = ({ onNext }) => {
    return <BusinessSignUpForm onNext={onNext} />;
};

export default BusinessFormStep;


