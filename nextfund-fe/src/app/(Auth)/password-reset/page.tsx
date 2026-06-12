'use client';

import React from 'react';
import PasswordResetPage from '../../../components/authComp/password-reset/password-reset';

const Login: React.FC = () => {
    return <PasswordResetPage
        onSubmit={(data) => console.log('Reset request:', data)}
    />
};

export default Login;