"use client";

import { DashboardHeader } from "@/components/(dashboard)/dashboard/header";
import FundingCard from "@/components/business/funding/card";
import SwitchTabs from '@/components/business/home/switch-tabs';
import TanTable from '@/components/General/TanTable';
import { useGetBusinessAnalyticsQuery, useGetDisbursementTimelineQuery, useGetInvestmentBreakdownQuery } from "@/queries/businessApi";
import { Box, CircularProgress, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import ProgressStage from "../components/business/funding/progress-stage";
import { downloadCsv, formatCurrency, formatDate, getDotColor, getLineColor, getStageStatus, isProd } from "../utils/helpers";

const tableColumns = [
    { accessorKey: 'investor', header: 'INVESTOR NAME' },
    { accessorKey: 'amount', header: 'AMOUNT INVESTED' },
    { accessorKey: 'date', header: 'DATE' },
    {
        id: 'status',
        header: 'STATUS',
        cell: ({ row }: any) => (
            <button
                className={`
                    text-xs px-2 py-1 rounded-lg ${row.original.status === 'RECEIVED' ? 'bg-green-50 text-green-500 border border-green-500' : 'bg-yellow-50 text-yellow-500 border border-yellow-500'}
                `}
                onClick={() => { }}
            >
                {row.original.status}
            </button>
        ),
    },
];

const FundingPage = () => {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);

    const [isDownloading, setIsDownloading] = useState(false);
    const { data: businessAnalytics } = useGetBusinessAnalyticsQuery();
    const { data: investmentBreakdown, isLoading: isLoadingBreakdown, error: breakdownError } = useGetInvestmentBreakdownQuery({ page, page_size: pageSize });
    const { data: disbursementTimeline, isLoading: isLoadingTimeline, error: timelineError } = useGetDisbursementTimelineQuery({ page: 1, page_size: 10 });

    const handleDownloadCSV = async () => {
        setIsDownloading(true);
        try {
            await downloadCsv('/business/funding/investment-breakdown?export=true', `investment-breakdown-${new Date().toISOString().split('T')[0]}.csv`);
            toast.success('CSV downloaded successfully');
        } catch (err) {
            console.error('CSV download error:', err);
            toast.error('Failed to download CSV');
        } finally {
            setIsDownloading(false);
        }
    };

    const tableData = useMemo(() => {
        if (!investmentBreakdown?.payload) return [];
        return investmentBreakdown.payload.map(item => ({
            investor: item.investor_name,
            amount: formatCurrency(item.amount),
            date: formatDate(item.date_invested),
            status: item.status.toUpperCase(),
        }));
    }, [investmentBreakdown]);

    const timelineStages = useMemo(() => {
        if (!disbursementTimeline?.payload || disbursementTimeline.payload.length === 0) {
            return null;
        }

        const timeline = disbursementTimeline.payload[0];
        const now = new Date();

        const initialStatus = getStageStatus(timeline.initial_tranche_date, undefined, true, now);
        const postLaunchStatus = getStageStatus(timeline.post_product_launch_date, timeline.initial_tranche_date, false, now);
        const q2Status = getStageStatus(timeline.q2_expansion_plan_date, timeline.post_product_launch_date, false, now);
        const revenueStatus = getStageStatus(timeline.after_revenue_target_date, timeline.q2_expansion_plan_date, false, now);

        return [
            {
                title: `Initial Tranche\n${formatCurrency(timeline.initial_tranche_amount)}`,
                dotColor: getDotColor(initialStatus),
                lineColor: getLineColor(initialStatus, timeline.post_product_launch_date, now),
                label: initialStatus === 'completed'
                    ? `Completed (${formatDate(timeline.initial_tranche_date)})`
                    : initialStatus === 'pending'
                        ? `Pending - ${formatDate(timeline.initial_tranche_date)}`
                        : `Locked - ${formatDate(timeline.initial_tranche_date)}`
            },
            {
                title: `Post Product Launch\n${formatCurrency(timeline.post_product_launch_amount)}`,
                dotColor: getDotColor(postLaunchStatus),
                lineColor: getLineColor(postLaunchStatus, timeline.q2_expansion_plan_date, now),
                label: postLaunchStatus === 'completed'
                    ? `Completed (${formatDate(timeline.post_product_launch_date)})`
                    : postLaunchStatus === 'pending'
                        ? `Pending - ${formatDate(timeline.post_product_launch_date)}`
                        : `Locked - ${formatDate(timeline.post_product_launch_date)}`
            },
            {
                title: `Q2 Expansion Plan\n${formatCurrency(timeline.q2_expansion_plan_amount)}`,
                dotColor: getDotColor(q2Status),
                lineColor: getLineColor(q2Status, timeline.after_revenue_target_date, now),
                label: q2Status === 'completed'
                    ? `Completed (${formatDate(timeline.q2_expansion_plan_date)})`
                    : q2Status === 'pending'
                        ? `Pending - ${formatDate(timeline.q2_expansion_plan_date)}`
                        : `Locked - ${formatDate(timeline.q2_expansion_plan_date)}`
            },
            {
                title: `After Revenue Target\n${formatCurrency(timeline.after_revenue_target_amount)}`,
                dotColor: getDotColor(revenueStatus),
                lineColor: '#a3a3a3',
                label: revenueStatus === 'completed'
                    ? `Completed (${formatDate(timeline.after_revenue_target_date)})`
                    : revenueStatus === 'pending'
                        ? `Pending - ${formatDate(timeline.after_revenue_target_date)}`
                        : `Locked - ${formatDate(timeline.after_revenue_target_date)}`
            },
        ];
    }, [disbursementTimeline]);

    const cardData = [
        { label: 'Total Amount Raised', value: `$${businessAnalytics?.payload.funding_raised || 0}` },
        { label: 'Target Raise', value: `$${businessAnalytics?.payload.target_amount || 0}` },
        { label: 'Campaign Deadline', value: businessAnalytics?.payload.campaign_deadline ? formatDate(businessAnalytics.payload.campaign_deadline) : 'Loading...' },
        { label: 'Next Milestone', value: businessAnalytics?.payload.campaign_deadline ? formatDate(businessAnalytics.payload.campaign_deadline) : 'Loading...', }, // text: `($100,000)`
    ];

    const fundUsageTab = {
        label: 'Fund Usage',
        value: 'usage',
        component: (
            <div>Fund Usage</div>
        ),
    };

    const tabs = [
        {
            label: 'Investment Breakdown',
            value: 'breakdown',
            component: isLoadingBreakdown ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <CircularProgress />
                </Box>
            ) : breakdownError ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6" color="error">Failed to load investment breakdown</Typography>
                    <Typography variant="body2" color="textSecondary">Please try again later</Typography>
                </Box>
            ) : (
                <TanTable
                    columnData={tableColumns}
                    data={tableData}
                    headerBtnLoading={isDownloading}
                    showHeader={{
                        title: "Investment Breakdown",
                        subTitle: "List of all investors and their investments",
                        btnTxt: "Download CSV"
                    }}
                    onClick={handleDownloadCSV}
                    rowBorderLine
                    colBorderLine
                />
            ),
        },
        {
            label: 'Disbursement Timeline',
            value: 'timeline',
            component: isLoadingTimeline ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <CircularProgress />
                </Box>
            ) : timelineError ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6" color="error">Failed to load disbursement timeline</Typography>
                    <Typography variant="body2" color="textSecondary">Please try again later</Typography>
                </Box>
            ) : !timelineStages ? (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '400px',
                    flexDirection: 'column',
                    gap: 2,
                    p: 4
                }}>
                    <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 600 }}>
                        No Disbursement Timeline Available
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', maxWidth: '500px' }}>
                        Your disbursement timeline will appear here once your funding milestones have been configured.
                        {/* Please contact support if you believe this is an error. */}
                    </Typography>
                </Box>
            ) : (
                <ProgressStage stages={timelineStages} />
            ),
        },
        ...(!isProd ? [fundUsageTab] : []),
    ];


    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <DashboardHeader screen={{ title: "Funding Page", subTitle: "Manage your funding options" }} />
            <FundingCard
                cardData={cardData}
            />

            {
                !isProd && (
                    <div className="mt-8">
                        <SwitchTabs
                            tabs={tabs}
                            initialTab={tabs[0].value}
                        />
                    </div>
                )
            }
        </Box>
    )
}

export default FundingPage;
