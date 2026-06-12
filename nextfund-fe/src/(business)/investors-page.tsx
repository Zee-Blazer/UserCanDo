"use client";

import TanTable from '@/components/General/TanTable';
import { useGetInvestorsQuery } from '@/queries/businessApi';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const InvestorsPage = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    const { data, isLoading } = useGetInvestorsQuery({
        search,
        page: currentPage,
        page_size: pageSize,
    });

    // console.log(data);

    const tableColumns = [
        { accessorKey: 'investor_name', header: 'Investor Name' },
        { accessorKey: 'email', header: 'Email' },
        {
            accessorKey: 'expressed_interest_at',
            header: 'Expressed Interest',
            cell: ({ row }: any) => (
                <span>
                    {new Date(row.original.expressed_interest_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </span>
            )
        },
        {
            id: 'nda',
            header: 'NDA Status',
            cell: ({ row }: any) => (
                <p
                    className={`
                        py-1.5 px-2.5 border rounded-lg text-xs w-auto inline-block
                        ${row.original.nda_signed ?
                            "text-[#33CC33] border-[#33CC33]" :
                            'text-[#1E1E1E] border-[#E0E0E0]'}
                    `}
                >
                    {row.original.nda_signed ? 'Signed' : 'Not Signed'}
                </p>
            )
        },
        {
            id: 'action',
            header: 'Action',
            cell: ({ row }: any) => (
                <button
                    className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-green-600 hover:underline transition"
                    onClick={() => router.push(`/business/investors/details?id=${row.original.interest_id}`)}
                >
                    View
                </button>
            ),
        },
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <TanTable
                columnData={tableColumns}
                data={data?.payload || []}
                showHeader={{
                    title: "Current Investors",
                    subTitle: "List of all investors",
                    search: true
                }}
                rowBorderLine
                colBorderLine
                length={pageSize}
                loadingState={isLoading}
            />
        </Box>
    );
}

export default InvestorsPage;
