import { Box } from '@mui/material';
import React from 'react';
import type { InfoCardProps } from './types';

export const InfoCard: React.FC<InfoCardProps> = ({ children }) => {
    return (
        <Box
            sx={{
                backgroundColor: '#f8f9fa',
                p: 2.5,
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                mb: 2
            }}
        >
            {children}
        </Box>
    );
};
