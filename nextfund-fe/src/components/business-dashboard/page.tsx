'use client';

import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { DiscoverMore } from '../(dashboard)/dashboard/discover-more';
import { InvestmentCard } from '../(dashboard)/dashboard/investment-card';
import { PortfolioAllocation } from '../(dashboard)/dashboard/portfolio-allocation';
import { RecentActivities } from '../(dashboard)/dashboard/recent-activities';
import { StatsCard } from '../(dashboard)/dashboard/stat-card';
import { INVESTMENTS } from '../../constants';

export const BusinessDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'portfolio' | 'deal-flow'>('portfolio');

    const businessStatsData = [
        {
            icon: 'wallet',
            title: 'Total Portfolio Value',
            value: '$2.4M',
            subtitle: 'Across 12 active investments',
            bgColor: '#EEF2FF',
            subtitleBgColor: '#EEF1F4',
            subtitleTextColor: '#043A66'
        },
        {
            icon: 'chart-pie',
            title: 'Portfolio Returns',
            value: '24.8%',
            subtitle: 'Average ROI across portfolio',
            bgColor: '#F0FDF4',
            subtitleBgColor: '#E8F5E8',
            subtitleTextColor: '#33CC33'
        },
        {
            icon: 'ep-document',
            title: 'Active Deals',
            value: '8',
            subtitle: 'Opportunities in pipeline',
            bgColor: '#FFFBEB',
            subtitleBgColor: '#FFF4E6',
            subtitleTextColor: '#FFB121'
        },
        {
            icon: 'arrow-increase',
            title: 'Portfolio Growth',
            value: '+18.2%',
            subtitle: 'Year-to-date increase',
            bgColor: '#F0F9FF',
            subtitleBgColor: '#E6F3FF',
            subtitleTextColor: '#97B9FF'
        }
    ];

    const portfolioInvestments = INVESTMENTS.slice(0, 3);
    const dealFlowOpportunities = INVESTMENTS.slice(0, 3);

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                    Business Dashboard
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                    Manage your investment portfolio and deal flow
                </Typography>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {businessStatsData.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <StatsCard {...stat} />
                    </Grid>
                ))}
            </Grid>

            {/* Navigation Tabs */}
            <Box sx={{ mb: 4 }}>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        mb: 3,
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        width: '100%',
                    }}
                >
                    <Button
                        onClick={() => setActiveTab('portfolio')}
                        sx={{
                            flex: 1,
                            borderRadius: 0,
                            py: 2,
                            px: 0,
                            backgroundColor: activeTab === 'portfolio' ? '#f5f5f5' : 'transparent',
                            color: '#17406D',
                            fontWeight: 500,
                            fontSize: '1.1rem',
                            boxShadow: 'none',
                            transition: 'background 0.2s',
                            '&:hover': {
                                backgroundColor: activeTab === 'portfolio' ? '#f5f5f5' : '#f9f9f9',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        Portfolio Management
                    </Button>
                    <Button
                        onClick={() => setActiveTab('deal-flow')}
                        sx={{
                            flex: 1,
                            borderRadius: 0,
                            py: 2,
                            px: 0,
                            backgroundColor: activeTab === 'deal-flow' ? '#f5f5f5' : 'transparent',
                            color: '#17406D',
                            fontWeight: 500,
                            fontSize: '1.1rem',
                            boxShadow: 'none',
                            transition: 'background 0.2s',
                            '&:hover': {
                                backgroundColor: activeTab === 'deal-flow' ? '#f5f5f5' : '#f9f9f9',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        Deal Flow
                    </Button>
                </Box>

                {activeTab === 'portfolio' && (
                    <>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                            Portfolio Investments
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                            Manage your current investment portfolio and track performance.
                        </Typography>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {portfolioInvestments.map((investment) => (
                                <Grid size={{ xs: 12, md: 4 }} key={investment.id}>
                                    <InvestmentCard investment={investment} />
                                </Grid>
                            ))}
                            <Grid size={{ xs: 12, md: 4 }}>
                                <DiscoverMore />
                            </Grid>
                        </Grid>
                    </>
                )}

                {activeTab === 'deal-flow' && (
                    <>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                            Deal Flow Pipeline
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                            Track potential investment opportunities and their progress.
                        </Typography>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {dealFlowOpportunities.map((investment) => (
                                <Grid size={{ xs: 12, md: 4 }} key={investment.id}>
                                    <InvestmentCard investment={investment} isRecommended />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Box>

            {/* Business-specific sections */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Compliance Overview
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Track regulatory compliance and documentation status for all investments.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Risk Management
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Monitor risk metrics and portfolio diversification across all investments.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Bottom Section */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <PortfolioAllocation />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <RecentActivities />
                </Grid>
            </Grid>
        </Box>
    );
};

export default BusinessDashboard; 