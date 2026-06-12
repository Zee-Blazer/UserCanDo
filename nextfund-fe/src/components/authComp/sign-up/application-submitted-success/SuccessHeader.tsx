import CheckIcon from '@mui/icons-material/Check';
import { Box, Typography } from '@mui/material';
import React from 'react';
import type { SuccessHeaderProps } from './types';

export const SuccessHeader: React.FC<SuccessHeaderProps> = ({ title, subtitle }) => {
    return (
        <Box sx={{ textAlign: 'left', mb: 4 }}>
            <CheckIcon
                sx={{
                    fontSize: '4rem',
                    color: '#33CC33',
                    mb: 2
                }}
            />
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: '#333',
                    fontSize: { xs: '1.5rem', sm: '2rem', lg: '1.3rem' }
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
            >
                {subtitle}
            </Typography>
        </Box>
    );
};
