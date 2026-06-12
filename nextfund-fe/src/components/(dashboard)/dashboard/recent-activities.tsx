import {
    Box,
    Button,
    Paper,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { useInvestorInvestments } from '../../../hooks/useInvestorInvestments';
import { useGetInvestorDueDiligenceSummaryQuery } from '../../../queries/businessApi';

export const RecentActivities: React.FC = () => {
    // Fetch due diligence summary data from API
    const { data: summaryData, isLoading: isLoadingSummary } = useGetInvestorDueDiligenceSummaryQuery({});
    // Keep investor investments for legacy/manual calculation fallback
    const { investorInvestmentsData } = useInvestorInvestments();
    const [viewAll, setViewAll] = useState(false);

    // Helper function to get time ago (for fallback data) - defined before use
    const getTimeAgo = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();

        if (isNaN(date.getTime())) {
            return 'Unknown';
        }

        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInWeeks = Math.floor(diffInDays / 7);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);

        if (diffInSeconds < 60) {
            return 'Just now';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
        } else if (diffInDays < 7) {
            return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
        } else if (diffInWeeks < 4) {
            return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
        } else if (diffInMonths < 12) {
            return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
        } else {
            return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
        }
    };

    const formatStatusLabel = (status: string | undefined | null) => {
        if (!status) return '';
        return status
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    // Memoize activities from API or fallback data
    const allActivities = React.useMemo(() => {
        const activities: Array<{ title: string; description: string; time: string }> = [];

        // Always use investor investments data to show all activities
        if (investorInvestmentsData?.payload && Array.isArray(investorInvestmentsData.payload) && investorInvestmentsData.payload.length > 0) {
            // Sort by updated_at or created_at (most recent first)
            const sortedInvestments = [...investorInvestmentsData.payload].sort((a, b) => {
                const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
                const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
                return dateB - dateA;
            });

            sortedInvestments.forEach((investment) => {
                const timeAgo = getTimeAgo(investment.updated_at || investment.created_at);
                const statusRaw = investment.status;
                const dueDiligenceRaw = (investment as any).due_diligence_status;
                const status = typeof statusRaw === 'string' ? statusRaw.toLowerCase() : '';
                const dueDiligence = typeof dueDiligenceRaw === 'string' ? dueDiligenceRaw.toLowerCase() : '';

                let title = '';
                let description = '';

                if (dueDiligence === 'pending') {
                    title = 'Due Diligence Pending';
                    description = investment.business_name ? `${investment.business_name} - Review process not started` : 'Review process not started';
                } else if (dueDiligence === 'in_progress') {
                    title = 'Due Diligence in Progress';
                    description = investment.business_name ? `Reviewing ${investment.business_name} documentation` : 'Reviewing documentation';
                } else if (dueDiligence === 'completed') {
                    title = 'Due Diligence Completed';
                    description = investment.business_name ? `${investment.business_name} review process finished` : 'Review process finished';
                } else if (dueDiligence === 'failed') {
                    title = 'Due Diligence Failed';
                    description = investment.business_name ? `${investment.business_name} review process failed` : 'Review process failed';
                } else if (status === 'pending') {
                    title = 'Investment Pending';
                    description = investment.business_name ? `${investment.business_name} investment is awaiting approval` : 'Investment is awaiting approval';
                } else if (status === 'approved') {
                    title = 'Investment Approved';
                    description = investment.business_name ? `${investment.business_name} investment has been approved` : 'Investment has been approved';
                } else {
                    title = 'Investment Updated';
                    description = investment.business_name ? `${investment.business_name} status changed to ${formatStatusLabel(status)}` : `Status changed to ${formatStatusLabel(status)}`;
                }

                activities.push({ title, description, time: timeAgo });
            });
        }

        // If no activities from investments, try to use latest activity from API summary
        if (activities.length === 0 && summaryData?.latest_activity && summaryData.latest_activity !== null) {
            const activity = summaryData.latest_activity;
            const normalizedStatus = typeof activity.status === 'string' ? activity.status.toLowerCase() : '';
            activities.push({
                title: activity.title || '',
                description: activity.business_name ? `${activity.business_name} - ${formatStatusLabel(normalizedStatus)}` : formatStatusLabel(normalizedStatus),
                time: activity.relative_time || ''
            });
        }

        return activities;
    }, [summaryData, investorInvestmentsData]);

    // Calculate counts from API or fallback to manual calculation
    const counts = React.useMemo(() => {
        // Use API summary if available
        if (summaryData?.counts) {
            return Object.entries(summaryData.counts).reduce((acc, [key, count]) => {
                const normalizedKey = key.toLowerCase();
                acc[normalizedKey] = count;
                return acc;
            }, {} as Record<string, number>);
        }

        // Fallback to manual calculation from investor investments
        if (investorInvestmentsData?.payload && Array.isArray(investorInvestmentsData.payload) && investorInvestmentsData.payload.length > 0) {
            const stats = {
                pending: 0,
                in_progress: 0,
                completed: 0,
                failed: 0
            };

            investorInvestmentsData.payload.forEach(inv => {
                const statusRaw = (inv as any).due_diligence_status;
                const status = typeof statusRaw === 'string' ? statusRaw.toLowerCase() : '';
                if (status === 'pending') {
                    stats.pending++;
                } else if (status === 'in_progress') {
                    stats.in_progress++;
                } else if (status === 'completed') {
                    stats.completed++;
                } else if (status === 'failed') {
                    stats.failed++;
                }
            });

            // Only return stats if at least one count is greater than 0
            if (stats.pending > 0 || stats.in_progress > 0 || stats.completed > 0 || stats.failed > 0) {
                return stats;
            }
        }

        return null;
    }, [summaryData, investorInvestmentsData]);

    // Show first 3 by default, all when viewAll is true
    const displayActivities = viewAll ? allActivities : allActivities.slice(0, 3);

    const getStatusColor = (status: string): string | undefined => {
        if (!status) return undefined;
        const normalized = typeof status === 'string' ? status.toLowerCase() : '';
        switch (normalized) {
            case 'pending':
                return '#FFB121';
            case 'in_progress':
                return '#3772FF';
            case 'completed':
                return '#10B981';
            case 'failed':
                return '#EF4444';
            default:
                return undefined;
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: '10px',
                backgroundColor: '#EEF1F4',
                border: '1px solid #f0f0f0',
                height: { xs: '500px', sm: '400px' },
                maxWidth: 600,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                },
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                        Due Diligence & Activities
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        Track investment reviews and updates
                    </Typography>
                </Box>
                {allActivities.length > 3 && (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setViewAll(!viewAll)}
                        sx={{
                            borderRadius: '20px',
                            borderColor: '#22C55E',
                            color: '#22C55E',
                            textTransform: 'none',
                            fontSize: '0.75rem'
                        }}
                    >
                        {viewAll ? 'Show less' : 'View all'}
                    </Button>
                )}
            </Box>

            {/* Due Diligence Summary */}
            {counts && (counts.pending > 0 || counts.in_progress > 0 || counts.completed > 0 || counts.failed > 0) && (
                <Box sx={{
                    mb: 2,
                    p: 1.5,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px solid #e9ecef',
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    gap: 0.5
                }}>
                    {Object.entries(counts).map(([statusKey, count]) => {
                        // Only show statuses with count > 0
                        if (count === 0) return null;
                        const normalizedStatus = statusKey.toLowerCase();
                        return (
                            <Box key={normalizedStatus} sx={{ textAlign: 'center', minWidth: '60px' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: getStatusColor(normalizedStatus) || '#666', fontSize: '1.25rem' }}>
                                    {count}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#666', textTransform: 'capitalize', fontSize: '0.7rem' }}>
                                    {normalizedStatus.replace('_', ' ')}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            )}

            <Box
                sx={{
                    maxHeight: viewAll ? 'none' : 'none',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    px: 1,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                }}
            >
                {displayActivities.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                            No activities available
                        </Typography>
                    </Box>
                ) : (
                    displayActivities.map((activity, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.5,
                                py: 1.5,
                                px: 2,
                                borderRadius: '10px',
                                backgroundColor: '#fff',
                                borderBottom: index !== displayActivities.length - 1 ? '1px solid #F0F0F0' : 'none',
                                width: '100%',
                                boxSizing: 'border-box',
                                minWidth: 0,
                            }}
                        >
                            <Box sx={{ flexShrink: 0, pt: 0.5 }}>
                                <Image src="/carbon-document.png" alt="Document" width={16} height={16} />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                                {activity.title && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#1a1a1a',
                                            mb: 0.2,
                                            wordBreak: 'break-word'
                                        }}
                                    >
                                        {activity.title}
                                    </Typography>
                                )}
                                {activity.description && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#666',
                                            fontSize: '0.85rem',
                                            wordBreak: 'break-word',
                                            overflowWrap: 'break-word'
                                        }}
                                    >
                                        {activity.description}
                                    </Typography>
                                )}
                            </Box>
                            {activity.time && (
                                <Box sx={{ flexShrink: 0, ml: 1, pt: 0.2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#17406D',
                                            fontSize: '0.85rem',
                                            whiteSpace: 'nowrap',
                                            textAlign: 'right'
                                        }}
                                    >
                                        {activity.time}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    ))
                )}
            </Box>
        </Paper>
    );
};
