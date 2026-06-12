import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react';
import type { FormHeaderProps } from './types';

export const FormHeader: React.FC<FormHeaderProps> = ({ onBack, title, subtitle }) => {
    const theme = useTheme();

    return (
        <Box sx={{ mb: 2 }}>
            {/* Back Arrow */}
            <IconButton
                onClick={onBack}
                sx={{
                    p: 1,
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                }}
            >
                <ArrowBack />
            </IconButton>

            {/* Header Text */}
            <Box sx={{ mt: 1 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: theme.palette.text.primary,
                        fontSize: { xs: '1.2rem', sm: '1.4rem' }
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );
};
