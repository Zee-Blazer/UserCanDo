import { Box, Typography } from '@mui/material';
import React from 'react';

interface TooltipPayload {
    payload: {
        name?: string;
        month?: string;
        value: number;
    };
    value: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
}

export const CustomBarTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <Box
                sx={{
                    backgroundColor: '#fff',
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <Typography variant="body2" sx={{ color: '#333', fontWeight: 600 }}>
                    {payload[0].payload.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#33CC33', fontWeight: 600 }}>
                    {payload[0].value}%
                </Typography>
            </Box>
        );
    }
    return null;
};

export const CustomLineTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <Box
                sx={{
                    backgroundColor: '#fff',
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <Typography variant="body2" sx={{ color: '#333', fontWeight: 600 }}>
                    {payload[0].payload.month}
                </Typography>
                <Typography variant="body2" sx={{ color: '#33CC33', fontWeight: 600 }}>
                    ${payload[0].value}k
                </Typography>
            </Box>
        );
    }
    return null;
};

