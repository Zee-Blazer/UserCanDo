import {
    Box,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useInvestorDashboard } from '../../../hooks/useInvestorDashboard';
import { useInvestorInvestments } from '../../../hooks/useInvestorInvestments';

interface Props {
    title?: string
}

export const PortfolioAllocation: React.FC<Props> = ({ title }) => {
    const { dashboardData } = useInvestorDashboard();
    const { investorInvestmentsData } = useInvestorInvestments();

    const preferredColors: Record<string, string> = {
        'Technology': '#3772FF',
        'Agriculture': '#10B981',
    };

    const colorPalette = [
        '#3772FF',
        '#10B981',
        '#F97316',
        '#FACC15',
        '#8B5CF6',
        '#EF4444',
        '#14B8A6',
        '#6366F1',
        '#0EA5E9',
        '#A855F7',
        '#EC4899',
    ];

    const createColorAssigner = () => {
        const assignments = new Map<string, string>();
        const usedColors = new Set<string>();

        const getNextColor = () => {
            const available = colorPalette.find(color => !usedColors.has(color));
            if (available) {
                usedColors.add(available);
                return available;
            }
           
            let hue = Math.floor(Math.random() * 360);
            let fallbackColor = `hsl(${hue}, 70%, 55%)`;
            while (usedColors.has(fallbackColor)) {
                hue = (hue + 37) % 360;
                fallbackColor = `hsl(${hue}, 70%, 55%)`;
            }
            usedColors.add(fallbackColor);
            return fallbackColor;
        };

        return (category: string) => {

            if (!category || !category.trim()) {

                return '#E5E7EB';
            }
            const normalized = category.trim();
            if (assignments.has(normalized)) {
                return assignments.get(normalized)!;
            }

            const preferred = preferredColors[normalized];
            if (preferred && !usedColors.has(preferred)) {
                assignments.set(normalized, preferred);
                usedColors.add(preferred);
                return preferred;
            }

            const color = getNextColor();
            assignments.set(normalized, color);
            return color;
        };
    };

    const assignColor = createColorAssigner();


    const data = React.useMemo(() => {
        // Priority 1: Use dashboard API portfolio allocation data
        const portfolioAllocation = dashboardData?.portfolio_allocation;
        if (portfolioAllocation?.breakdown && Array.isArray(portfolioAllocation.breakdown) && portfolioAllocation.breakdown.length > 0) {
            return portfolioAllocation.breakdown
                .filter(item => item.category && item.percentage !== null && item.percentage !== undefined)
                .map((item) => ({
                    name: item.category!,
                    value: item.percentage!,
                    color: assignColor(item.category!)
                }));
        }


        if (!investorInvestmentsData?.payload || !Array.isArray(investorInvestmentsData.payload) || investorInvestmentsData.payload.length === 0) {
            return [];
        }

        // Group investments by category and calculate total amounts
        const categoryTotals: Record<string, number> = {};
        let totalAmount = 0;

        investorInvestmentsData.payload.forEach(investment => {
            // Only use valid category and amount from API
            const category = (investment as any).investment_sector || (investment as any).category;
            const amount = investment.amount;

            // Only process if we have valid category and amount
            if (category && amount && typeof amount === 'number' && amount > 0) {
                categoryTotals[category] = (categoryTotals[category] || 0) + amount;
                totalAmount += amount;
            }
        });

        // Convert to chart data format (only if we have valid data)
        if (totalAmount === 0) {
            return []; 
        }

        const chartData = Object.entries(categoryTotals)
            .filter(([name]) => name) 
            .map(([name, amount]) => ({
                name: name,
                value: Math.round((amount / totalAmount) * 100),
                color: assignColor(name)
            }));

        return chartData; 
    }, [dashboardData, investorInvestmentsData]);

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: '10px',
                backgroundColor: '#EEF1F4',
                border: '1px solid #f0f0f0',
                height: { xs: '500px', sm: '400px' },
                transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                },
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                {title || 'Portfolio Allocation'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: { xs: 0.5, sm: 1, md: 0.75, lg: 0.2 }, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Breakdown of your investments by sector
            </Typography>

            {data.length > 0 ? (
                <Box sx={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            ) : (
                <Box sx={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        No portfolio data available
                    </Typography>
                </Box>
            )}

            {data.length > 0 && (
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    columnGap: { xs: 0.75, sm: 1, md: 1, lg: 2 },
                    rowGap: { xs: 0.5, sm: 0.5, md: 0.5, lg: 0.6 },
                    mt: { xs: 0.5, sm: 0.75, md: 0.5, lg: 0.2 },
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    {data.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 0.25, sm: 0.5, md: 0.5, lg: 0.75 },
                                flexBasis: { xs: '100%', sm: 'auto' },
                                minWidth: 0,
                                maxWidth: { xs: '100%', sm: 'auto' }
                            }}
                        >
                            <Box
                                sx={{
                                    width: { xs: 8, sm: 12 },
                                    height: { xs: 8, sm: 12 },
                                    borderRadius: '50%',
                                    backgroundColor: item.color,
                                    flexShrink: 0
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                                    color: '#666',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    minWidth: 0
                                }}
                                title={item.name}
                            >
                                {item.name} ({item.value}%)
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Paper>
    );
};
