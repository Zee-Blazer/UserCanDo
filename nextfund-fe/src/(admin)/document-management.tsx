"use client";

import TanTable from "@/components/General/TanTable";
import { Box } from '@mui/material';
import Link from 'next/link';
import { useState } from "react";

const columns = [
    { header: 'UPLOADED BY', accessorKey: 'uploadedBy' },
    { header: 'DOCUMENT TYPE', accessorKey: 'documentType' },
    { header: 'BUSINESS/INVESTOR', accessorKey: 'businessOrInvestor' },
    { header: 'LAST MODIFIED', accessorKey: 'lastModified' },
    {
        id: 'status',
        header: 'STATUS',
        cell: ({ row }: any) => {
            const status = row.original.status;
            const colorClass =
                status === 'VERIFIED' ? 'border border-green-600 text-green-600'
                    : status === 'PENDING' ? 'border border-yellow-500 text-yellow-600'
                        : status === 'NEEDS UPDATE' ? 'border border-red-600 text-red-600'
                            : 'border border-gray-400 text-gray-600';
            return (
                <span
                    className={`px-2 py-1 rounded-lg text-xs ${colorClass}`}
                >
                    {status}
                </span>
            );
        }
    },
    {
        id: 'action',
        header: 'ACTION',
        cell: ({ row }: any) => (
            <Link
                href="/admin/document-management/details"
                className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-green-600 hover:underline transition"
            >
                View more
            </Link>
        ),
    },
];

const initialData = [
    { uploadedBy: 'John Doe', documentType: 'Certificate', businessOrInvestor: 'Acme Corp', lastModified: '2025-07-30', status: 'VERIFIED' },
    { uploadedBy: 'Jane Smith', documentType: 'License', businessOrInvestor: 'Beta LLC', lastModified: '2025-07-28', status: 'PENDING' },
    { uploadedBy: 'Samuel Lee', documentType: 'KYC Form', businessOrInvestor: 'Gamma Investments', lastModified: '2025-07-25', status: 'NEEDS UPDATE' },
    { uploadedBy: 'Alice Brown', documentType: 'Audit Report', businessOrInvestor: 'Delta Ventures', lastModified: '2025-07-22', status: 'VERIFIED' },
    { uploadedBy: 'Bob White', documentType: 'Tax Doc', businessOrInvestor: 'Epsilon Group', lastModified: '2025-07-20', status: 'PENDING' },
    { uploadedBy: 'Cynthia Green', documentType: 'Certificate', businessOrInvestor: 'Zeta Capital', lastModified: '2025-07-18', status: 'VERIFIED' },
    { uploadedBy: 'David Black', documentType: 'License', businessOrInvestor: 'Eta Holdings', lastModified: '2025-07-15', status: 'NEEDS UPDATE' },
    { uploadedBy: 'Ella Blue', documentType: 'KYC Form', businessOrInvestor: 'Theta Partners', lastModified: '2025-07-12', status: 'PENDING' },
    { uploadedBy: 'Frank Red', documentType: 'Audit Report', businessOrInvestor: 'Iota Solutions', lastModified: '2025-07-10', status: 'VERIFIED' },
    { uploadedBy: 'Grace Yellow', documentType: 'Tax Doc', businessOrInvestor: 'Kappa Advisors', lastModified: '2025-07-08', status: 'PENDING' },
    { uploadedBy: 'Henry Purple', documentType: 'Certificate', businessOrInvestor: 'Lambda Inc', lastModified: '2025-07-05', status: 'VERIFIED' },
];

const categoryOptions = ['Certificate', 'License', 'KYC Form', 'Audit Report', 'Tax Doc'];
const statusOptions = ['VERIFIED', 'PENDING', 'NEEDS UPDATE'];

const AdminDocumentManagement = () => {
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

    const filteredData = initialData.filter(user => {
        const categoryMatch = category ? user.documentType === category : true;
        const statusMatch = status ? user.status === status : true;
        return categoryMatch && statusMatch;
    });

    const handleRefresh = () => {
        setCategory('');
        setStatus('');
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <TanTable
                columnData={columns}
                data={filteredData}
                showHeader={{
                    title: "Document Management",
                    subTitle: "View and manage document management records",
                    search: true,
                    btnTxt: "Download",
                    noColor: true,
                }}
                colBorderLine
                rowBorderLine
                showDateFilter
                selectFilters={[
                    {
                        label: 'Status',
                        field: 'status',
                        options: statusOptions,
                        value: status,
                        onChange: setStatus,
                    },
                    {
                        label: 'User Types',
                        field: 'documentType',
                        options: categoryOptions,
                        value: category,
                        onChange: setCategory,
                    },
                ]}
                onRefresh={handleRefresh}
            />
        </Box>
    );
}

export default AdminDocumentManagement;
