import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import type { FormHeaderProps } from './types';

export const FormHeader: React.FC<FormHeaderProps> = ({ onBack, title, subtitle }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <IconButton
                onClick={onBack}
                sx={{
                    mb: 2,
                    p: 1,
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                }}
            >
                <ArrowBack />
            </IconButton>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: '#1a1a1a',
                    fontSize: '28px',
                    lineHeight: '32px'
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: '#666',
                    fontSize: '16px',
                    lineHeight: '20px'
                }}
            >
                {subtitle}
            </Typography>
        </Box>
    );
};
