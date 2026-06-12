"use client";

import React from 'react';
import DashboardLayout from '../../app/dashboard/layout';

interface AdminDashboardLayoutProps {
    children: React.ReactNode;
}

const AdminDashboardLayoutWrapper = ({ children }: AdminDashboardLayoutProps) => {
    const handleAdminLogout = () => {
        // Admin-specific logout logic
        console.log('Admin user logging out...');
        // Add your logout logic here
    };

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
};

export default AdminDashboardLayoutWrapper; 