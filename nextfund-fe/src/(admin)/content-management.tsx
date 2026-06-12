
"use client";

import TanTable from "@/components/General/TanTable";
import { Box } from '@mui/material';
import Link from 'next/link';
import { useState } from "react";

const columns = [
    { header: 'BUSINESS NAME', accessorKey: 'businessName' },
    { header: 'CATEGORY', accessorKey: 'category' },
    {
        header: 'FEATURED', accessorKey: 'featured', cell: ({ row }: any) => (
            <span className={`px-2 py-1 rounded text-xs ${row.original.featured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {row.original.featured ? 'Yes' : 'No'}
            </span>
        )
    },
    { header: 'LAST MODIFIED', accessorKey: 'lastModified' },
    {
        id: 'status',
        header: 'STATUS',
        cell: ({ row }: any) => {
            const status = row.original.status;
            const colorClass =
                status === 'LIVE' ? 'border border-green-600 text-green-600'
                    : status === 'DRAFT' ? 'border border-gray-400 text-[#9CA3AF]'
                        : status === 'UNDER REVIEW' ? 'border border-yellow-500 text-yellow-600'
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
                href="/admin/content-management/details"
                className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-green-600 hover:underline transition"
            >
                View more
            </Link>
        ),
    },
];

const initialData = [
    { businessName: 'Acme Corp', category: 'Fintech', featured: true, lastModified: '2025-07-30', status: 'LIVE' },
    { businessName: 'Beta LLC', category: 'E-commerce', featured: false, lastModified: '2025-07-28', status: 'DRAFT' },
    { businessName: 'Gamma Investments', category: 'Investment', featured: true, lastModified: '2025-07-25', status: 'UNDER REVIEW' },
    { businessName: 'Delta Ventures', category: 'Finance', featured: false, lastModified: '2025-07-22', status: 'LIVE' },
    { businessName: 'Epsilon Group', category: 'Tech', featured: false, lastModified: '2025-07-20', status: 'DRAFT' },
    { businessName: 'Zeta Capital', category: 'Investment', featured: true, lastModified: '2025-07-18', status: 'LIVE' },
    { businessName: 'Eta Holdings', category: 'Fintech', featured: false, lastModified: '2025-07-15', status: 'UNDER REVIEW' },
    { businessName: 'Theta Partners', category: 'E-commerce', featured: true, lastModified: '2025-07-12', status: 'DRAFT' },
    { businessName: 'Iota Solutions', category: 'Tech', featured: false, lastModified: '2025-07-10', status: 'LIVE' },
    { businessName: 'Kappa Advisors', category: 'Finance', featured: true, lastModified: '2025-07-08', status: 'UNDER REVIEW' },
    { businessName: 'Lambda Inc', category: 'Fintech', featured: false, lastModified: '2025-07-05', status: 'LIVE' },
];

const categoryOptions = ['Fintech', 'E-commerce', 'Investment', 'Finance', 'Tech'];
const statusOptions = ['LIVE', 'DRAFT', 'UNDER REVIEW'];

const AdminContentManagement = () => {
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

    const filteredData = initialData.filter(user => {
        const categoryMatch = category ? user.category === category : true;
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
                    title: "Content Management",
                    subTitle: "View and manage content management records",
                    search: true,
                    btnTxt: "Download",
                    noColor: true,
                }}
                colBorderLine
                rowBorderLine
                showDateFilter
                selectFilters={[
                    {
                        label: 'Category',
                        field: 'category',
                        options: categoryOptions,
                        value: category,
                        onChange: setCategory,
                    },
                    {
                        label: 'Status',
                        field: 'status',
                        options: statusOptions,
                        value: status,
                        onChange: setStatus,
                    },
                ]}
                onRefresh={handleRefresh}
            />
        </Box>
    );
}

export default AdminContentManagement;
