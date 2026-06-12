"use client";

import { useEffect, useState } from "react";

import TanTable from "@/components/General/TanTable";
import { Box } from '@mui/material';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";

import PaginationControls from "@/components/admin/home/PaginationControls";
import { setActiveUsersData, setAllUsersData, setCurrentUserIndex } from "@/Redux/features/adminSlice";
import { generateUserManagementPDF } from "@/utils/pdfGenerator";
import { useGetAllUsersQuery } from "../queries/adminApi";

import Link from 'next/link';

const categoryOptions = ['Business', 'Investor'];
const statusOptions = ['Active', 'Pending', "Suspended"];

const UserManagement = () => {

    const router = useRouter();
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

    const { data: usersData, isLoading: loadingUsers, refetch: refetchUsersData } = useGetAllUsersQuery({
        page,
        page_size,
        ...(searchTerm && { search: searchTerm }),
        ...(category && { category }),
        ...(status && { status }),
        ...(dateRange.start_date && { start_date: dateRange.start_date }),
        ...(dateRange.end_date && { end_date: dateRange.end_date })
    });

    useEffect(() => {
        if (usersData?.page && usersData.page !== page) {
            setPagination(prev => ({ ...prev, pageIndex: usersData.page! - 1 }));
        }
    }, [usersData?.page, page]);

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

    const usersTableData = usersData?.payload?.map(user => ({
        name: user.name || "...",
        email: user.email || "...",
        category: user.category || "...",
        status: user.status.toUpperCase() || "...",
        user_id: user.user_id || "...",
    })) || [];

    const filteredData = usersTableData;

    const columns = [
        { header: 'NAME', accessorKey: 'name' },
        { header: 'CATEGORY', accessorKey: 'category' },
        { header: 'EMAIL', accessorKey: 'email' },
        {
            id: 'status',
            header: 'STATUS',
            cell: ({ row }: any) => (
                <span
                    className={`
                        px-2 py-1 rounded text-xs
                        ${row.original.status.toLowerCase() === 'verified' || row.original.status.toLowerCase() === 'active'
                            ? 'border border-green-600 text-green-600'
                            : row.original.status.toLowerCase() === 'pending'
                                ? 'border border-yellow-500 text-yellow-600'
                                : 'border border-red-600 text-red-600'
                        }
                    `}
                >
                    {row.original.status}
                </span>
            )
        },
        {
            id: 'action',
            header: 'ACTION',
            cell: ({ row }: any) => {
                const cat = row.original.category?.toLowerCase();
                let href = "/admin/user-management/details";
                if (cat === "investor") href = "/admin/user-management/investor";
                else if (cat === "business") href = "/admin/user-management/business";
                return (
                    <Link
                        href={href}
                        className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-green-600 hover:underline transition"
                        onClick={() => {
                            const user = usersData?.payload?.find(
                                user => user.user_id === row.original.user_id
                            );
                            if (user && usersData?.payload) {
                                const userIndex = usersData.payload.findIndex(
                                    u => u.user_id === user.user_id
                                );
                                dispatch(setAllUsersData(usersData.payload));
                                dispatch(setCurrentUserIndex(userIndex));
                                dispatch(setActiveUsersData(user));
                            }
                        }}
                    >
                        View more
                    </Link>
                );
            },
        },
    ];

    const handleRefresh = async () => {
        setIsRefreshing(true);
        setCategory('');
        setStatus('');
        setSearchTerm('');
        setDateRange({});
        setPagination({ pageIndex: 0, pageSize: 10 });
        await refetchUsersData();
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

            generateUserManagementPDF(filteredData);
            toast.success('PDF downloaded successfully');
        } catch (error) {
            console.error('PDF generation error:', error);
            toast.error('Failed to generate PDF. Please try again.');
        }
    };

    // const handleAddUser = () => {
    //     router.push("/admin/user-management/add-user");
    // };

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <TanTable
                columnData={columns}
                data={filteredData}
                showHeader={{
                    title: "User Management",
                    subTitle: "View and manage all users",
                    search: {
                        value: searchTerm,
                        onChange: handleSearch
                    },
                    btnTxt: "Download",
                    // addUser: { label: "Add User", onClick: handleAddUser },
                    noColor: true,
                }}
                loadingState={loadingUsers}
                onClick={handleDownloadPDF}
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
                listingData={usersData}
                onPageChange={(newPageIndex) => setPagination(prev => ({ ...prev, pageIndex: newPageIndex }))}
            />
        </Box>
    );
}

export default UserManagement;
