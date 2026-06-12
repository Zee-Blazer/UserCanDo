import { Box } from '@mui/material';
import React from 'react';
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { ROI_DATA } from '../../../../constants/chart-data';
import { CustomBarTooltip } from '../chart-tooltips';

export const ROIBarChart: React.FC = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                pt: { xs: 2, sm: 3, md: 4 },
            }}
        >
            <ResponsiveContainer width="100%" height="100%" minHeight={320}>
                <BarChart
                    data={ROI_DATA}
                    margin={{ top: 10, right: 10, left: 0, bottom: 50 }}
                >
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        tick={{ fill: '#666', fontSize: 11 }}
                        interval={0}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#666', fontSize: 12 }}
                        domain={[0, 60]}
                        ticks={[0, 15, 30, 45, 60]}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Bar
                        dataKey="value"
                        fill="#33CC33"
                        radius={[8, 8, 0, 0]}
                        barSize={40}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

