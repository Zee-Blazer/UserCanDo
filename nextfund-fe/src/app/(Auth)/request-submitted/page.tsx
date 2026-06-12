'use client';

import React from 'react';
import RequestSubmittedPage from '../../../components/authComp/request-submitted/request-submitted';

const Login: React.FC = () => {
    return <RequestSubmittedPage
        email="user@example.com"
        onContinue={() => console.log('Navigate to next step')}
    />
};

export default Login;