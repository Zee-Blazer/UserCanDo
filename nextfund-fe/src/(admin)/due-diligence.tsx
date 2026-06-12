"use client";

import PaginationControls from "@/components/admin/home/PaginationControls";
import TanTable from "@/components/General/TanTable";
import { generateDueDiligencePDF } from "@/utils/pdfGenerator";
import { Box } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { useGetDueDiligenceRecordQuery } from "../queries/adminApi";
import { setActiveDueDiligenceDetails, setAllDueDiligenceData, setCurrentDueDiligenceIndex } from "../Redux/features/adminSlice";

const categoryOptions = ['Agriculture', 'Education', 'Entertainment', 'Finance', 'Healthcare', 'Manufacturing', 'Real Estate', 'Retail', 'Technology', 'Transportation'];
const statusOptions = ['Approved', 'Not Checked', 'Rejected'];

const AdminDueDiligence = () => {

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
    const [isRefreshing, setIsRefreshing] = useState(false);

    const {
        data: listingData,
        isLoading: isLoadingList,
        refetch: refreshListingData
    } = useGetDueDiligenceRecordQuery({
        page,
        page_size,
        ...(searchTerm && { search: searchTerm }),
        ...(category && { category }),
        ...(status && { approval_status: status.toLowerCase().replace(/ /g, '_') }),
        ...(dateRange.start_date && { start_date: dateRange.start_date }),
        ...(dateRange.end_date && { end_date: dateRange.end_date })
    });

    useEffect(() => {
        if (listingData?.page && listingData.page !== page) {
            setPagination(prev => ({ ...prev, pageIndex: listingData.page - 1 }));
        }
    }, [listingData?.page, page]);

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

    const mappedData = (listingData?.payload || []).map((item: any) => ({
        businessName: item.business_name,
        category: item.category,
        owner: item.owner,
        lastUpdated: new Date(item.updated_at).toDateString(),
        status: item.approval_status.toUpperCase().replace(/_/g, " "),
        listing_id: item.id,
        business_id: item.id,
        fullData: item,
    }));

    const filteredData = mappedData;

    const handleRefresh = async () => {
        setIsRefreshing(true);
        setCategory('');
        setStatus('');
        setSearchTerm('');
        setDateRange({});
        setPagination({ pageIndex: 0, pageSize: 10 });
        await refreshListingData();
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

    const handleDueDiligenceSelection = (fullData: any) => {
        const dueDiligenceIndex = listingData?.payload?.findIndex(
            (item: any) => item.id === fullData.id
        );
        if (listingData?.payload && dueDiligenceIndex !== -1) {
            dispatch(setAllDueDiligenceData(listingData.payload));
            dispatch(setCurrentDueDiligenceIndex(dueDiligenceIndex || 0));
        }
        dispatch(setActiveDueDiligenceDetails(fullData));
    };

    const handleDownloadPDF = () => {
        try {
            if (!filteredData || filteredData.length === 0) {
                toast.error('No data available to download');
                return;
            }

            generateDueDiligencePDF(filteredData);
            toast.success('PDF downloaded successfully');
        } catch (error) {
            toast.error('Failed to generate PDF. Please try again.');
        }
    };

    const columns = [
        { header: 'BUSINESS NAME', accessorKey: 'businessName' },
        { header: 'CATEGORY', accessorKey: 'category' },
        { header: 'OWNER', accessorKey: 'owner' },
        { header: 'LAST UPDATED', accessorKey: 'lastUpdated' },
        {
            id: 'status',
            header: 'STATUS',
            cell: ({ row }: any) => {
                const status = row.original.status;
                let colorClass = '';
                if (status.toUpperCase() === 'VERIFIED' || status.toUpperCase() === 'APPROVED') colorClass = 'border border-green-600 text-green-600';
                else if (status.toUpperCase() === 'IN PROGRESS' || status.toUpperCase() === 'NOT CHECKED') colorClass = 'border border-yellow-500 text-yellow-600';
                else if (status.toUpperCase() === 'MISSING DOCS' || status.toUpperCase() === 'REJECTED') colorClass = 'border border-red-600 text-red-600';
                else colorClass = 'border border-gray-400 text-gray-600';
                return (
                    <span
                        className={`px-2 py-1 rounded-lg text-xs ${colorClass}`}
                    >
                        {status.toUpperCase()}
                    </span>
                );
            }
        },
        {
            id: 'action',
            header: 'ACTION',
            cell: ({ row }: any) => (
                <Link
                    href="/admin/due-diligence/details"
                    className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-green-600 hover:underline transition"
                    onClick={() => handleDueDiligenceSelection(row.original.fullData)}
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
                loadingState={isLoadingList}
                onClick={handleDownloadPDF}
                showHeader={{
                    title: "Due Diligence",
                    subTitle: "View and manage due diligence records",
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
                        label: 'Category',
                        field: 'category',
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
                listingData={listingData}
                onPageChange={(newPageIndex) => setPagination(prev => ({ ...prev, pageIndex: newPageIndex }))}
            />
        </Box>
    );
}

export default AdminDueDiligence;
