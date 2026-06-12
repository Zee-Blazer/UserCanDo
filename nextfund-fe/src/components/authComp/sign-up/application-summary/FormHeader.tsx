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
                    mb: 1,
                    p: 1,
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                }}
            >
                <ArrowBack />
            </IconButton>

            <Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: '#333',
                        fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );
};
