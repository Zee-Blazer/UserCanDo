import { Box, Grid, LinearProgress, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { BusinessListingDetailsResponse } from '../../types/queries-type';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const REVENUE_DATA = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Revenue',
            data: [2500, 1500, 1000, 1500, 500, 2500, 500, 2000, 2200, 1800, 3400, 2000],
            backgroundColor: '#043A66',
            borderRadius: 6,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
        },
        {
            label: 'Background',
            data: [1000, 2000, 2500, 2000, 3000, 1000, 3000, 1500, 1300, 1700, 100, 1500], // Remaining to max
            backgroundColor: '#E0E0E0',
            borderRadius: 6,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
        },
    ],
};

const REVENUE_OPTIONS = {
    responsive: true,
    plugins: {
        legend: { display: false },
        title: { display: false },
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { font: { size: 14 } },
            stacked: true,
        },
        y: {
            grid: { color: '#E0E0E0' },
            beginAtZero: true,
            ticks: { font: { size: 14 }, stepSize: 500 },
            stacked: true,
        },
    },
};

const CURRENT_FINANCIALS = [
    { label: 'Annual Revenue (2022)', value: '$450,000' },
    { label: 'Monthly Recurring Revenue', value: '$45,000' },
    { label: 'Gross Margin', value: '68%' },
    { label: 'Customer Acquisition Cost', value: '$120' },
];

const PROJECTIONS = [
    { label: 'Year 1 Revenue', value: '$750,000' },
    { label: 'Year 3 Revenue', value: '$2.5M' },
    { label: 'Year 5 Revenue', value: '$6.8M' },
    { label: 'Projected EBITDA (Year 5)', value: '$2.2M' },
    { label: 'Expected Exit Multiple', value: '5-7x Revenue' },
];

const USE_OF_FUNDS = [
    { label: 'Market Expansion (Nigeria, Ghana)', value: 40 },
    { label: 'Product Development', value: 40 },
    { label: 'Team Expansion', value: 40 },
    { label: 'Working Capital', value: 40 },
];

interface FinanceTabContentProps {
    investment?: any;
    listingDetailsData?: BusinessListingDetailsResponse;
}

export const FinanceTabContent: React.FC<FinanceTabContentProps> = ({ investment, listingDetailsData }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Revenue series data - use API data if available
    const revenueSeriesData = listingDetailsData?.financials?.revenue_series || REVENUE_DATA.datasets[0].data;
    const chartData = (() => {
        const revenueSeries = listingDetailsData?.financials?.revenue_series;
        if (revenueSeries && Array.isArray(revenueSeries) && revenueSeries.length > 0) {
            return {
                labels: revenueSeries.map(item => item.label),
                datasets: [
                    {
                        label: 'Revenue',
                        data: revenueSeries.map(item => item.value),
                        backgroundColor: '#043A66',
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.7,
                    },
                    {
                        label: 'Background',
                        data: revenueSeries.map(item => {
                            const maxValue = Math.max(...revenueSeries.map(i => i.value));
                            return maxValue - item.value;
                        }),
                        backgroundColor: '#E0E0E0',
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.7,
                    },
                ],
            };
        }
        return REVENUE_DATA;
    })();

    // Use API data if available, otherwise fall back to mock data
    const currentFinancials = (() => {
        // Priority 1: Use new endpoint current_financials
        const currentFinancialsData = listingDetailsData?.financials?.current_financials;
        if (currentFinancialsData &&
            typeof currentFinancialsData === 'object' &&
            currentFinancialsData !== null) {
            try {
                const entries = Object.entries(currentFinancialsData);
                if (entries.length > 0) {
                    return entries.map(([key, value]) => ({
                        label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        value: typeof value === 'number' ? `$${value.toLocaleString()}` : String(value)
                    }));
                }
            } catch (error) {
                // If Object.entries fails, fall through to next priority
            }
        }

        // Priority 2: Use investment company_metrics_and_financial_information
        if (investment?.company_metrics_and_financial_information) {
            return (() => {
                return [
                    {
                        label: 'Monthly Revenue',
                        value: `$${(() => {
                            const revenue = investment.company_metrics_and_financial_information.monthly_revenue || '0';
                            const parsed = parseInt(revenue) || 0;
                            return parsed.toLocaleString();
                        })()}`
                    },
                    {
                        label: 'Gross Margin',
                        value: `${(() => {
                            const margin = investment.company_metrics_and_financial_information.gross_margin;
                            if (margin === null || margin === undefined || margin === '') return '0';
                            const parsed = typeof margin === 'number' ? margin : parseFloat(margin);
                            return isNaN(parsed) ? '0' : parsed;
                        })()}%`
                    },
                    {
                        label: 'Monthly Growth Rate',
                        value: `${(() => {
                            const growth = investment.company_metrics_and_financial_information.monthly_growth_rate;
                            if (growth === null || growth === undefined || growth === '') return '0';
                            const parsed = typeof growth === 'number' ? growth : parseFloat(growth);
                            return isNaN(parsed) ? '0' : parsed;
                        })()}%`
                    },
                    {
                        label: 'Burn Rate',
                        value: `$${(() => {
                            const burnRate = investment.company_metrics_and_financial_information.burn_rate || '0';
                            const parsed = parseInt(burnRate) || 0;
                            return parsed.toLocaleString();
                        })()}/month`
                    },
                    { label: 'Team Size', value: `${investment.company_metrics_and_financial_information.team_size || '0'} employees` },
                ];
            })();
        }

        // Priority 3: Fallback to static data
        return CURRENT_FINANCIALS;
    })();

    const projections = (() => {
        // Priority 1: Use new endpoint projections
        const projectionsData = listingDetailsData?.financials?.projections;
        if (projectionsData &&
            typeof projectionsData === 'object' &&
            projectionsData !== null) {
            try {
                const entries = Object.entries(projectionsData);
                if (entries.length > 0) {
                    return entries.map(([key, value]) => ({
                        label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        value: typeof value === 'number' ? `$${value.toLocaleString()}` : String(value)
                    }));
                }
            } catch (error) {
                // If Object.entries fails, fall through to fallback
            }
        }

        // Priority 2: Fallback to static data
        return PROJECTIONS;
    })();

    let useOfFunds = USE_OF_FUNDS;

    const useOfFundsData = listingDetailsData?.financials?.use_of_funds;
    if (useOfFundsData) {
        try {
            const parsed = typeof useOfFundsData === 'string' ? JSON.parse(useOfFundsData) : useOfFundsData;
            if (typeof parsed === 'object' && parsed !== null) {
                useOfFunds = Object.entries(parsed)
                    .filter(([key, value]) => value && key !== 'funds_deployment_timeline' && key !== 'expected_funding_completion' && key !== 'key_milestone_to_achieve_with_funding')
                    .map(([key, value]) => {
                        const numValue = parseInt(value as string);
                        return {
                            label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                            value: isNaN(numValue) ? 0 : numValue
                        };
                    });
            }
        } catch (e) {
            // If parsing fails, use fallback
        }
    }
    if (useOfFunds === USE_OF_FUNDS && investment?.use_of_funds &&
        typeof investment.use_of_funds === 'object' &&
        investment.use_of_funds !== null) {
        try {
            const entries = Object.entries(investment.use_of_funds);
            if (entries.length > 0) {
                useOfFunds = entries
                    .filter(([key, value]) => value && key !== 'funds_deployment_timeline' && key !== 'expected_funding_completion' && key !== 'key_milestone_to_achieve_with_funding')
                    .map(([key, value]) => {
                        const numValue = parseInt(value as string);
                        return {
                            label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                            value: isNaN(numValue) ? 0 : numValue
                        };
                    });
            }
        } catch (error) {
            // If Object.entries fails, keep the fallback
        }
    }

    return (
        <Box>
            {/* Financial Performance */}
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 1, fontSize: { xs: '1.25rem', md: '2rem' }, color: '#043A66' }}>
                    Financial Performance
                </Typography>
                <Typography variant="body1" sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: '0.95rem', md: '1.1rem' }, color: '#043A66' }}>
                    Key financial metrics and projections
                </Typography>
                {/* Revenue Growth Chart */}
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2, fontSize: { xs: '1.1rem', md: '1.25rem' }, color: '#043A66' }}>
                        Revenue Growth
                    </Typography>
                    <Paper elevation={0} sx={{ p: { xs: 1, md: 2 }, borderRadius: '20px', background: '#fafbfc' }}>
                        <Bar data={chartData} options={REVENUE_OPTIONS} height={isMobile ? 180 : 120} />
                    </Paper>
                </Box>
                <Box sx={{ borderBottom: '1px solid #e0e0e0', mb: { xs: 3, md: 4 } }} />
                {/* Current Financials & Projections */}
                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: '20px', border: '1px solid #e0e0e0', height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)', borderColor: '#043A66' } }}>
                            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2, fontSize: { xs: '1.1rem', md: '1.25rem' }, color: '#043A66' }}>
                                Current Financials
                            </Typography>
                            {currentFinancials.map((item, idx) => (
                                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, color: '#6A6A6A' }}>{item.label}</Typography>
                                    <Typography variant="body2" fontWeight={700} sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, color: '#043A66' }}>{item.value}</Typography>
                                </Box>
                            ))}
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: '20px', border: '1px solid #e0e0e0', height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)', borderColor: '#043A66' } }}>
                            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2, fontSize: { xs: '1.1rem', md: '1.25rem' }, color: '#043A66' }}>
                                Projections (5-year)
                            </Typography>
                            {projections.map((item, idx) => (
                                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, color: '#6A6A6A' }}>{item.label}</Typography>
                                    <Typography variant="body2" fontWeight={700} sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, color: '#043A66' }}>{item.value}</Typography>
                                </Box>
                            ))}
                        </Paper>
                    </Grid>
                </Grid>
                <Box sx={{ borderBottom: '1px solid #e0e0e0', mb: { xs: 3, md: 4 } }} />
                {/* Use of Funds */}
                <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.1rem' }, color: '#043A66' }}>
                        Use of Funds
                    </Typography>
                    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: '20px', border: '1px solid #e0e0e0', background: '#fafbfc', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)', borderColor: '#043A66' } }}>
                        <Grid container spacing={{ xs: 2, md: 3 }}>

                            {useOfFunds.map((item, idx) => (
                                <Grid size={{ xs: 12 }} key={idx}>
                                    <Box sx={{ mb: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, color: '#6A6A6A' }}>{item.label}</Typography>
                                            <Typography variant="body2" fontWeight={700} sx={{ color: '#043A66', fontSize: { xs: '0.95rem', md: '1rem' } }}>{item.value}%</Typography>
                                        </Box>
                                        <LinearProgress variant="determinate" value={item.value} sx={{ height: 14, borderRadius: 2, background: '#e0e0e0', '& .MuiLinearProgress-bar': { backgroundColor: '#043A66' } }} />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default FinanceTabContent; 