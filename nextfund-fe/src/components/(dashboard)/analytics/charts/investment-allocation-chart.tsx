import { Box } from '@mui/material';
import React from 'react';
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
} from 'recharts';
import { ALLOCATION_DATA } from '../../../../constants/chart-data';
import { renderCustomLabel, renderLabelLine } from '../chart-helpers';

export const InvestmentAllocationChart: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: { xs: 280, sm: 320, md: 360 },
                width: '100%',
                position: 'relative',
                overflow: 'visible',
                py: { xs: 1, sm: 1.5, md: 2 },
            }}
        >
            <ResponsiveContainer width="100%" height="100%" minHeight={280}>
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <Pie
                        data={ALLOCATION_DATA}
                        cx="50%"
                        cy="50%"
                        labelLine={renderLabelLine}
                        label={renderCustomLabel}
                        outerRadius={85}
                        innerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={2}
                    >
                        {ALLOCATION_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

