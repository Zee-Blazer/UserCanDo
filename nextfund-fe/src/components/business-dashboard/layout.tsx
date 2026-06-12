"use client";

import React from 'react';
import DashboardLayout from '../../app/dashboard/layout';

interface BusinessDashboardLayoutProps {
    children: React.ReactNode;
}

const BusinessDashboardLayoutWrapper = ({ children }: BusinessDashboardLayoutProps) => {
    const handleBusinessLogout = () => {
        // Business-specific logout logic
        console.log('Business user logging out...');
        // Add your logout logic here
    };

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
};

export default BusinessDashboardLayoutWrapper; 