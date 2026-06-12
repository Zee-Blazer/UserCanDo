'use client';

import React from 'react';
import VerificationPage from '../../../components/authComp/verification/verification-page';

const Verification: React.FC = () => {
    return <VerificationPage
        onVerify={(code) => console.log('Verify:', code)}
        onResend={() => console.log('Resend code')}
    />
};

export default Verification;