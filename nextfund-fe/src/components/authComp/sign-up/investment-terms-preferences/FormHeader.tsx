import React from 'react';
import {
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import type { FormHeaderProps } from './types';

export const FormHeader: React.FC<FormHeaderProps> = ({ onBack, title, subtitle }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <IconButton
                onClick={onBack}
                sx={{
                    p: 1,
                    mb: 1.5,
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                }}
            >
                <ArrowBack />
            </IconButton>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 0.5,
                    color: '#333',
                    fontSize: { xs: '1.5rem', sm: '2rem' }
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
