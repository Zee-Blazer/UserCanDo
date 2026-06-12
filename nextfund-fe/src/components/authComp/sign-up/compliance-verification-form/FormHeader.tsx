import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import type { FormHeaderProps } from './types';

export const FormHeader: React.FC<FormHeaderProps> = ({ onBack, title, subtitle }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Box mb={1}>
                <IconButton
                    onClick={onBack}
                    sx={{
                        p: 1,
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                    }}
                >
                    <ArrowBack />
                </IconButton>
            </Box>
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: '#333',
                        fontSize: { xs: '1.2rem', sm: '1.4rem' },
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );
};
