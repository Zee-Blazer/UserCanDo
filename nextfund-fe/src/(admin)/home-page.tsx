"use client";

import { Box } from '@mui/material';
import { Banknote, BriefcaseBusiness, Logs, NotebookPen, Users } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { DashboardHeader } from "../components/(dashboard)/dashboard/header";
import AdminCards, { AdminCardItem } from '../components/admin/home/cards';
import FundingProgress from '../components/business/home/funding-progress';
import TanTable from '../components/General/TanTable';
import { useAdminDashboardDetailsQuery } from '../queries/adminApi';
import { useAdminSelector } from '../Redux/selectors';

const progressList = [
    { label: "Target", value: "$250,000" },
    { label: "Raised", value: "$150,000" },
    { label: "Raised", value: "$100,000" },
    { label: "Raised", value: "21 days" },
];

const AdminHome = () => {

    const { adminUserProfile } = useAdminSelector();
    const [dateRange, setDateRange] = useState<{
        start_date?: string;
        end_date?: string;
    }>({});

    const {
        data: adminDashboardData,
        refetch: refetchAdminDashboardData,
        isFetching: isFetchingAdminDashboardData
    } = useAdminDashboardDetailsQuery(dateRange);


    const refreshData = () => {
        setDateRange({});
        refetchAdminDashboardData();
    };

    const resetDateFilters = () => {
        setDateRange({});
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

    const handleExportData = () => {
        toast.error('Unable to export data at this time');
    }; const cards: AdminCardItem[] = [
        {
            title: 'Investors',
            text: adminDashboardData ? adminDashboardData.payload.investors.toString() : '0',
            icon: <Users size={16} />,
            color: '#2563EB',
            bgColor: '#2563EB14',
        },
        {
            title: 'Businesses',
            text: adminDashboardData ? adminDashboardData.payload.businesses.toString() : '0',
            icon: <BriefcaseBusiness size={16} />,
            color: '#10B981',
            bgColor: '#10B98114',
        },
        {
            title: 'Funds Raised',
            text: adminDashboardData ? `$${adminDashboardData.payload.funding_raised.toLocaleString()}` : '$0',
            icon: <Banknote size={16} />,
            color: '#F59E0B',
            bgColor: '#F59E0B14',
        },
        {
            title: 'Active Listings',
            text: adminDashboardData ? adminDashboardData.payload.active_listings.toString() : '0',
            icon: <Logs size={16} />,
            color: '#7C3AED',
            bgColor: '#7C3AED14',
        },
        {
            title: 'Ongoing Due Diligence',
            text: adminDashboardData ? adminDashboardData.payload.due_diligence_listings.toString() : '0',
            icon: <NotebookPen size={16} />,
            color: '#F97316',
            bgColor: '#F9731614',
        },
    ];

    const investorsListData = adminDashboardData ? adminDashboardData.payload.last_three_investors : [];

    const tableColumns = [
        { accessorKey: 'investor', header: 'Investor' },
        { accessorKey: 'company', header: 'Company' },
        { accessorKey: 'amount', header: 'Amount' },
        { accessorKey: 'date', header: 'Date' },
        {
            id: 'status',
            header: 'Status',
            cell: ({ row }: any) => (
                <button
                    className="text-xs px-2 py-1 rounded bg-green-50 text-green-500 border border-green-500 "
                    onClick={() => { }}
                >
                    Active
                </button>
            ),
        },
    ];

    const tableData = (investorsListData || []).map((it: any) => ({
        investor: it?.user.full_name || 'N/A',
        company: it?.company || it?.business_name || it?.company_name || 'N/A',
        amount: typeof it?.amount === 'number' ? `$${it.amount.toLocaleString()}` : (it?.amount_display || it?.amount || 'N/A'),
        date: it?.date || new Date(it?.created_at).toDateString() || 'N/A',
    }));

    const tabs = [
        {
            label: 'Investors',
            value: 'investors',
            component: (
                <>
                    <TanTable
                        columnData={tableColumns}
                        data={tableData}
                        showHeader={{ title: "Current Investors", subTitle: "List of all investors", btnTxt: "Export Data" }}
                        onClick={handleExportData}
                        rowBorderLine
                        colBorderLine
                    />
                    <FundingProgress percent={60} progressList={progressList} />
                </>
            )
        },
        {
            label: 'Documents',
            value: 'documents',
            component: (
                <div>Documents</div>
            )
        },
        {
            label: 'Messages',
            value: 'messages',
            component: (
                <div>Messages</div>
            )
        },
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <DashboardHeader
                userName={adminUserProfile ? `${adminUserProfile.first_name} ${adminUserProfile.last_name}` : 'Admin User'}
                refreshLoading={isFetchingAdminDashboardData}
                refreshDataFunc={refreshData}
                onDateRangeChange={handleDateRangeChange}
                onResetDates={resetDateFilters}
            />
            <AdminCards cards={cards} />
            <div className="mt-8">
                {/* <SwitchTabs
                    tabs={tabs}
                /> */}
                <TanTable
                    columnData={tableColumns}
                    data={tableData}
                    showHeader={{ title: "Current Investors", subTitle: "List of all investors", }}
                    onClick={handleExportData}
                    rowBorderLine
                    colBorderLine
                />
            </div>
        </Box>
    );
}

export default AdminHome;
