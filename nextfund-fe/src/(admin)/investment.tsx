
"use client";

import PaginationControls from "@/components/admin/home/PaginationControls";
import TanTable from "@/components/General/TanTable";
import { generateInvestmentsPDF } from "@/utils/pdfGenerator";
import { Box } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { useGetInvestmentsRecordQuery } from "../queries/adminApi";
import { setActiveInvestmentData, setAllInvestmentsData, setCurrentInvestmentIndex } from "../Redux/features/adminSlice";
import { isProd } from "../utils/helpers";

const categoryOptions = ['Agriculture', 'Education', 'Entertainment', 'Finance', 'Healthcare', 'Manufacturing', 'Real Estate', 'Retail', 'Technology', 'Transportation'];

const statusDisplayOptions = ['Pending', 'Completed', 'In Review', 'Suspended'];
const statusQueryValues = ['pending', 'completed', 'in_review', 'suspended'];

const AdminInvestment = () => {

    const dispatch = useDispatch();

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const page = pagination.pageIndex + 1;
    const page_size = pagination.pageSize;
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const {
        data: investmentsData,
        error,
        isLoading: isLoadingInvestments,
        refetch: refreshInvestmentsData
    } = useGetInvestmentsRecordQuery({
        page,
        page_size,
        ...(searchTerm && { search: searchTerm }),
        ...(category && { category }),
        ...(status && { status: statusQueryValues[statusDisplayOptions.indexOf(status)] })
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm !== '') {
                setPagination(prev => ({ ...prev, pageIndex: 0 }));
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    useEffect(() => {
        if (status) {
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    }, [status]);

    useEffect(() => {
        if (category) {
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    }, [category]);

    const handleRowClick = (data: any) => {
        const investmentIndex = investmentsData?.payload?.findIndex(
            (item: any) => item.id === data.id
        );
        if (investmentsData?.payload && investmentIndex !== -1) {
            dispatch(setAllInvestmentsData(investmentsData.payload));
            dispatch(setCurrentInvestmentIndex(investmentIndex || 0));
        }
        dispatch(setActiveInvestmentData(data));
    };

    const mappedData = (investmentsData?.payload || []).map((item: any) => ({
        investor: item.investor,
        businessName: item.business_name,
        amountInvested: `$${item.amount.toLocaleString()}`,
        date: new Date(item.created_at).toDateString(),
        status: item.status.toUpperCase().replace(/_/g, " "),
        fullData: item,
    }));

    const filteredData = mappedData;

    const handleRefresh = async () => {
        setIsRefreshing(true);
        setCategory('');
        setStatus('');
        setSearchTerm('');
        setPagination({ pageIndex: 0, pageSize: 10 });
        await refreshInvestmentsData();
        setIsRefreshing(false);
    };

    const handleSearch = (searchValue: string) => {
        setSearchTerm(searchValue);
    };

    const handleDownloadPDF = () => {
        try {
            if (!filteredData || filteredData.length === 0) {
                toast.error('No data available to download');
                return;
            }

            generateInvestmentsPDF(filteredData);
            toast.success('PDF downloaded successfully');
        } catch (error) {
            console.error('PDF generation error:', error);
            toast.error('Failed to generate PDF. Please try again.');
        }
    };

    const columns = [
        { header: 'INVESTOR', accessorKey: 'investor' },
        { header: 'BUSINESS NAME', accessorKey: 'businessName' },
        { header: 'AMOUNT', accessorKey: 'amountInvested' },
        { header: 'DATE', accessorKey: 'date' },
        {
            id: 'status',
            header: 'STATUS',
            cell: ({ row }: any) => {
                const status = row.original.status;
                const colorClass =
                    status.toLowerCase() === 'completed'
                        ? 'border border-green-600 text-green-600'
                        : status.toLowerCase() === 'pending'
                            ? 'border border-yellow-500 text-yellow-600'
                            : status.toLowerCase() === 'in review'
                                ? 'border border-blue-500 text-blue-600'
                                : status.toLowerCase() === "suspended"
                                    ? 'border border-red-500 text-red-600'
                                    : '';
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
            cell: ({ row }: any) => {
                return (
                    <Link
                        href="/admin/investments/details"
                        className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-green-600 hover:underline transition"
                        onClick={() => handleRowClick(row.original.fullData)}
                    >
                        View more
                    </Link>
                );
            },
        },
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <TanTable
                columnData={columns}
                data={filteredData}
                loadingState={isLoadingInvestments}
                onClick={handleDownloadPDF}
                showHeader={{
                    title: "Investment",
                    subTitle: "View and manage investments",
                    search: {
                        value: searchTerm,
                        onChange: handleSearch
                    },
                    btnTxt: "Download",
                    noColor: true,
                }}
                colBorderLine
                rowBorderLine
                selectFilters={[
                    ...(!isProd ? [{
                        label: 'Category',
                        field: 'category',
                        options: categoryOptions,
                        value: category,
                        onChange: setCategory,
                    }] : []),
                    {
                        label: 'Status',
                        field: 'status',
                        options: statusDisplayOptions,
                        value: status,
                        onChange: setStatus,
                    },
                ]}
                onRefresh={handleRefresh}
                refreshStatus={isRefreshing}
                hidePaging={true}
                length={page_size}
            />

            <PaginationControls
                page={page}
                pageSize={page_size}
                listingData={investmentsData}
                onPageChange={(newPageIndex) => setPagination(prev => ({ ...prev, pageIndex: newPageIndex }))}
            />
        </Box>
    );
}

export default AdminInvestment;
