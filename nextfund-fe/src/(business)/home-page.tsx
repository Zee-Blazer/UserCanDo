"use client";

import { DashboardHeader } from "@/components/(dashboard)/dashboard/header";
import { StatsCard } from "@/components/(dashboard)/dashboard/stat-card";
import DocumentChecklist from "@/components/business/home/document-checklist";
import FundingProgress from "@/components/business/home/funding-progress";
import SwitchTabs, { SwitchTabConfig } from "@/components/business/home/switch-tabs";
import NotificationAlert from "@/components/General/NotificationAlert";
import TanTable from "@/components/General/TanTable";
import { useGetBusinessDashboardQuery, useGetBusinessListingDocumentsQuery, useGetBusinessTeamMembersQuery } from "@/queries/businessApi";
import { useBusinessSelector } from "@/Redux/selectors";
import {
    Box,
    Grid
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAnyFalse, isProd } from "../utils/helpers";


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
                className="text-xs px-2 py-1 rounded bg-green-50 text-green-500 border border-green-500 font-neue-medium"
                onClick={() => { }}
            >
                Active
            </button>
        ),
    },
];

const docTableColumns = [
    { accessorKey: 'document', header: 'DOCUMENT' },
    { accessorKey: 'type', header: 'TYPE' },
    { accessorKey: 'size', header: 'SIZE' },
    { accessorKey: 'date', header: 'UPLOADED DATE' },
    {
        id: 'status',
        header: 'STATUS',
        cell: ({ row }: any) => (
            <button
                className="text-xs px-2 py-1 rounded bg-green-50 text-green-500 border border-green-500 font-neue-medium"
                onClick={() => { }}
            >
                Approved
            </button>
        ),
    },
];

const docTableData = [
    { document: 'Document 1', type: "PDF", size: '1MB', date: 'May 15, 2025' },
    { document: 'Document 2', type: "Word", size: '2MB', date: 'June 10, 2025' },
    { document: 'Document 3', type: "Excel", size: '3MB', date: 'July 20, 2025' },
];

const documentList = [
    { title: "Document Plan", description: "Required for all businesses", isCompleted: { status: true } },
    { title: "Financial Projections", description: "Detailed financial forecasts", isCompleted: { status: true } },
    { title: "Legal Agreements", description: "All necessary legal documents", isCompleted: { status: true } },
];

export default function BusinessHomePage() {

    const router = useRouter();
    const { businessUserProfile } = useBusinessSelector();
    const {
        data: businessDashboard,
        isFetching: isFetchingBusinessDashboard,
        refetch: refetchBusinessDashboard,
    } = useGetBusinessDashboardQuery();
    const {
        data: businessListingDocuments,
        isFetching: isFetchingListingDocuments,
        refetch: refetchBusinessListingDocuments,
    } = useGetBusinessListingDocumentsQuery(businessUserProfile?.business_id, {
        skip: !businessUserProfile?.business_id,
    });
    const {
        data: teamData,
        isFetching: isFetchingTeamData,
        refetch: refetchBusinessTeamMembers,
    } = useGetBusinessTeamMembersQuery(
        { ref_kind: 'business', ref_id: businessUserProfile?.business_id || '' },
        { skip: !businessUserProfile?.business_id }
    );

    const [showDocumentPrompt, setShowDocumentPrompt] = useState(false);
    const [showTeamPrompt, setShowTeamPrompt] = useState(false);

    // console.log("Business Details: ", businessUserProfile);
    // console.log("Business Dashboard Details: ", businessDashboard);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isAnyFalse(businessListingDocuments)) {
                setShowDocumentPrompt(true);
            }
            if (!teamData?.payload?.team || teamData.payload.team.length === 0) {
                setShowTeamPrompt(true);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [businessListingDocuments, teamData]);

    const fullname = `${businessUserProfile?.first_name} ${businessUserProfile?.last_name}`;

    const statsData = [
        {
            icon: 'wallet',
            title: 'Total Raised',
            value: `$${businessDashboard?.payload.total_raised || 0}`,
            subtitle: `From ${businessDashboard?.payload.investors_count || 0} investors`,
            bgColor: '#EEF2FF',
            subtitleBgColor: '#EEF1F4',
            subtitleTextColor: '#043A66'
        },
        {
            icon: 'chart-pie',
            title: 'Funding Goal',
            value: `${businessDashboard?.payload.funding_progress.percentage_raised || 0}%`,
            subtitle: `$${businessDashboard?.payload.funding_progress.amount_raised || 0} of $${businessDashboard?.payload.funding_progress.target_amount || 0} goal`,
            bgColor: '#F0FDF4',
            subtitleBgColor: '#E8F5E8',
            subtitleTextColor: '#33CC33'
        },
        {
            icon: 'ep-document',
            title: 'Interested Investors',
            value: `${businessDashboard?.payload.interested_investors || 0}`,
            subtitle: `${businessDashboard?.payload.due_diligence_investors || 0} in due diligence phase`,
            bgColor: '#FFFBEB',
            subtitleBgColor: '#FFF4E6',
            subtitleTextColor: '#FFB121'
        },
        {
            icon: 'arrow-increase',
            title: 'Monthly Growth',
            value: `${businessDashboard?.payload.monthly_growth || 0}%`,
            subtitle: 'Compared to last month',
            bgColor: '#F0F9FF',
            subtitleBgColor: '#E6F3FF',
            subtitleTextColor: '#97B9FF'
        }
    ];

    const progressList = [
        { label: "Target", value: `$${businessDashboard?.payload.funding_progress.target_amount || 0}` },
        { label: "Raised", value: `$${businessDashboard?.payload.funding_progress.amount_raised || 0}` },
        { label: "Remaining", value: `$${businessDashboard?.payload.funding_progress.remaining_amount || 0}` },
        { label: "Time Left", value: businessDashboard?.payload.funding_progress.time_left || "N/A" },
    ];

    const tabs: SwitchTabConfig[] = [
        {
            label: 'Investors',
            value: 'investors',
            component: (
                <>
                    <TanTable
                        columnData={tableColumns}
                        data={businessDashboard?.payload.current_investors || []}
                        showHeader={{ title: "Current Investors", subTitle: "List of all investors", btnTxt: "Export Data" }}
                        rowBorderLine
                        colBorderLine
                    />
                    <FundingProgress percent={businessDashboard?.payload.funding_progress.percentage_raised || 0} progressList={progressList} />
                </>
            ),
        },
        {
            label: 'Documents',
            value: 'documents',
            component: (
                <>
                    <TanTable
                        columnData={docTableColumns}
                        data={[docTableData]}
                        showHeader={{ title: "Investment Documents", subTitle: "List of all investment documents", btnTxt: "Upload Document" }}
                        rowBorderLine
                        colBorderLine
                    />
                    <DocumentChecklist
                        title="Document Checklist"
                        type="file"
                        subTitle="Ensure all required documents are uploaded"
                        documents={documentList}
                    />
                </>
            ),
        },
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <DashboardHeader
                userName={fullname}
                refreshDataFunc={() => {
                    requestAnimationFrame(() => {
                        refetchBusinessDashboard();
                        if (!businessUserProfile?.business_id) {
                            return;
                        }
                        refetchBusinessListingDocuments();
                        refetchBusinessTeamMembers();
                    });
                }}
                refreshLoading={isFetchingBusinessDashboard || isFetchingListingDocuments || isFetchingTeamData}
            />

            <NotificationAlert
                in={showDocumentPrompt}
                severity="warning"
                message="Please go to the Documents tab and upload all required documents to complete your business listing."
                buttonText="Go to Documents"
                onButtonClick={() => router.push('/business/documents')}
                onClose={() => setShowDocumentPrompt(false)}
            />

            <NotificationAlert
                in={showTeamPrompt}
                severity="info"
                message="Add team members to your profile to build investor trust. Go to Settings to manage your team."
                buttonText="Go to Settings"
                onButtonClick={() => router.push('/business/settings')}
                onClose={() => setShowTeamPrompt(false)}
            />

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {statsData.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <StatsCard {...stat} />
                    </Grid>
                ))}
            </Grid>

            {
                !isProd && (
                    <Box sx={{ mb: 4 }}>
                        <SwitchTabs tabs={tabs} initialTab="investors" />
                    </Box>
                )
            }

        </Box>
    )
}