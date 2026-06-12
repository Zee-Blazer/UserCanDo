'use client';

import React, { useState } from 'react';
import { UserTypeSelector } from '../../../components/authComp/user-selector/user-selector';

const Login: React.FC = () => {
    const [selectedType, setSelectedType] = useState<'investor' | 'business'>('investor');

    const handleTypeChange = (type: 'investor' | 'business') => {
        setSelectedType(type);
        // Add any additional logic here when the type changes
        console.log('Selected type:', type);
    };

    return (
        <UserTypeSelector
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
        />
    );
};

export default Login;