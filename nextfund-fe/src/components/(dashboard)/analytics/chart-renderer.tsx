import { Box, Typography } from '@mui/material';
import React from 'react';
import { isProd } from '../../../utils/helpers';
import { InvestmentAllocationChart } from './charts/investment-allocation-chart';
import { PortfolioGrowthChart } from './charts/portfolio-growth-chart';
import { RiskDiversificationChart } from './charts/risk-diversification-chart';
import { ROIBarChart } from './charts/roi-bar-chart';

interface ChartRendererProps {
    chartIndex: number;
}

export const ChartRenderer: React.FC<ChartRendererProps> = ({ chartIndex }) => {
    if (isProd) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    flexDirection: 'column',
                    gap: 1,
                    minHeight: { xs: 250, sm: 300, md: 350 },
                }}
            >
                <Typography variant="body2" sx={{ color: '#9ca3af', textAlign: 'center' }}>
                    Real-time analytics data coming soon
                </Typography>
            </Box>
        );
    }

    switch (chartIndex) {
        case 0:
            return <PortfolioGrowthChart />;
        case 1:
            return <InvestmentAllocationChart />;
        case 2:
            return <ROIBarChart />;
        case 3:
            return <RiskDiversificationChart />;
        default:
            return null;
    }
};

