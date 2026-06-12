import { Box } from '@mui/material';
import React from 'react';
import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    ResponsiveContainer,
} from 'recharts';
import { RISK_DIVERSIFICATION_DATA } from '../../../../constants/chart-data';

export const RiskDiversificationChart: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: { xs: 280, sm: 320, md: 360 },
                width: '100%',
            }}
        >
            <ResponsiveContainer width="100%" height="100%" minHeight={320}>
                <RadarChart data={RISK_DIVERSIFICATION_DATA}>
                    <PolarGrid stroke="#E0E0E0" />
                    <PolarAngleAxis
                        dataKey="metric"
                        tick={{ fill: '#666', fontSize: 12 }}
                    />
                    <Radar
                        name="Value"
                        dataKey="value"
                        stroke="#33CC33"
                        fill="#33CC33"
                        fillOpacity={0.6}
                        strokeWidth={2}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </Box>
    );
};

