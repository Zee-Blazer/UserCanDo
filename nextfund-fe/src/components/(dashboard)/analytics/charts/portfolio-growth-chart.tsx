import React from 'react';
import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { PORTFOLIO_GROWTH_DATA } from '../../../../constants/chart-data';
import { CustomLineTooltip } from '../chart-tooltips';

export const PortfolioGrowthChart: React.FC = () => {
    return (
        <ResponsiveContainer width="100%" height="100%" minHeight={320}>
            <LineChart
                data={PORTFOLIO_GROWTH_DATA}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
                <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#33CC33" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#33CC33" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 12 }}
                    style={{ fontSize: '12px' }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 12 }}
                    domain={[0, 80]}
                    ticks={[0, 20, 40, 60, 80]}
                    tickFormatter={(value) => `$${value}k`}
                />
                <Tooltip content={<CustomLineTooltip />} />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#33CC33"
                    strokeWidth={3}
                    dot={{ fill: '#33CC33', r: 5, strokeWidth: 0 }}
                    activeDot={{ r: 7 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

