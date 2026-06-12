
"use client";

import PaginationControls from "@/components/admin/home/PaginationControls";
import TanTable from "@/components/General/TanTable";
import { generateFundManagementPDF } from "@/utils/pdfGenerator";
import { Box } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { useGetFundingRecordQuery } from "../queries/adminApi";
import { setActiveFundingData } from "../Redux/features/adminSlice";

const categoryOptions = ['Bank Transfer', 'Credit Card', 'Wire', 'Cryptocurrency'];
const statusOptions = ['Pending', 'Disbursed', 'Awaiting KYC', 'Flagged'];

const AdminFundManagement = () => {

    const dispatch = useDispatch();

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const page = pagination.pageIndex + 1;
    const page_size = pagination.pageSize;
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [dateRange, setDateRange] = useState<{
        start_date?: string;
        end_date?: string;
    }>({});

    const { data, isLoading, refetch: refetchFundingRecords } = useGetFundingRecordQuery({
        page,
        page_size,
        ...(searchTerm && { search: searchTerm }),
        ...(category && { payment_method: category.toLowerCase().replace(/ /g, '_') }),
        ...(status && { status: status.toLowerCase() }),
        ...(dateRange.start_date && { start_date: dateRange.start_date }),
        ...(dateRange.end_date && { end_date: dateRange.end_date })
    });

    useEffect(() => {
        if (data?.page && data.page !== page) {
            setPagination(prev => ({ ...prev, pageIndex: data.page - 1 }));
        }
    }, [data?.page, page]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm !== '') {
                setPagination(prev => ({ ...prev, pageIndex: 0 }));
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);


    useEffect(() => {
        if (category) {
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    }, [category]);

    useEffect(() => {
        if (status) {
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    }, [status]);

    useEffect(() => {
        if (dateRange.start_date || dateRange.end_date) {
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    }, [dateRange]);

    const [isRefreshing, setIsRefreshing] = useState(false);

    const tableData = data?.payload?.map(item => ({
        investor: item.investor,
        businessName: item.business,
        amount: `$${item.amount.toLocaleString()}`,
        paymentMethod: item.payment_method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        status: item.funding_status.toUpperCase(),
        id: item.id,
        kyc_verified: item.kyc_verified,
        currency: item.currency,
        created_at: item.created_at,
        updated_at: item.updated_at
    })) || [];

    const filteredData = tableData;

    const handleRefresh = async () => {
        setIsRefreshing(true);
        setCategory('');
        setStatus('');
        setSearchTerm('');
        setDateRange({});
        setPagination({ pageIndex: 0, pageSize: 10 });
        await refetchFundingRecords();
        setIsRefreshing(false);
    };

    const handleSearch = (searchValue: string) => {
        setSearchTerm(searchValue);
    };

    const handleCategoryChange = (selectedCategory: string) => {
        setCategory(selectedCategory);
    };

    const handleStatusChange = (selectedStatus: string) => {
        setStatus(selectedStatus);
    };

    const handleDateRangeChange = (startDate: string | null, endDate: string | null) => {
        const newDateRange: { start_date?: string; end_date?: string } = {};

        if (startDate) {
            newDateRange.start_date = startDate;
        }

        if (endDate) {
            newDateRange.end_date = endDate;
        }

        setDateRange(newDateRange);
    };

    const handleDownloadPDF = () => {
        try {
            if (!filteredData || filteredData.length === 0) {
                toast.error('No data available to download');
                return;
            }

            generateFundManagementPDF(filteredData);
            toast.success('PDF downloaded successfully');
        } catch (error) {
            console.error('PDF generation error:', error);
            toast.error('Failed to generate PDF. Please try again.');
        }
    };

    const columns = [
        { header: 'INVESTOR', accessorKey: 'investor' },
        { header: 'BUSINESS NAME', accessorKey: 'businessName' },
        { header: 'AMOUNT', accessorKey: 'amount' },
        { header: 'PAYMENT METHOD', accessorKey: 'paymentMethod' },
        {
            id: 'status',
            header: 'STATUS',
            cell: ({ row }: any) => {
                const status = row.original.status;
                const colorClass =
                    status === 'DISBURSED' ? 'border border-green-600 text-green-600'
                        : status === 'PENDING' ? 'border border-yellow-500 text-yellow-600'
                            : status === 'AWAITING KYC' ? 'border border-gray-400 text-gray-600'
                                : status === 'FLAGGED' ? 'border border-red-600 text-red-600'
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
                    href="/admin/fund-management/details"
                    className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-green-600 hover:underline transition"
                    onClick={() => dispatch(setActiveFundingData(row.original))}
                >
                    View more
                </Link>
            ),
        },
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <TanTable
                columnData={columns}
                data={filteredData}
                loadingState={isLoading}
                onClick={handleDownloadPDF}
                showHeader={{
                    title: "Fund Management",
                    subTitle: "View and manage fund management records",
                    search: {
                        value: searchTerm,
                        onChange: handleSearch
                    },
                    btnTxt: "Download",
                    noColor: true,
                }}
                colBorderLine
                rowBorderLine
                showDateFilter
                selectFilters={[
                    {
                        label: 'Payment Method',
                        field: 'paymentMethod',
                        options: categoryOptions,
                        value: category,
                        onChange: handleCategoryChange,
                    },
                    {
                        label: 'Status',
                        field: 'status',
                        options: statusOptions,
                        value: status,
                        onChange: handleStatusChange,
                    },
                ]}
                onDateRangeChange={handleDateRangeChange}
                onRefresh={handleRefresh}
                refreshStatus={isRefreshing}
                hidePaging={true}
                length={page_size}
            />

            <PaginationControls
                page={page}
                pageSize={page_size}
                listingData={data}
                onPageChange={(newPageIndex) => setPagination(prev => ({ ...prev, pageIndex: newPageIndex }))}
            />
        </Box>
    );
}

export default AdminFundManagement;
