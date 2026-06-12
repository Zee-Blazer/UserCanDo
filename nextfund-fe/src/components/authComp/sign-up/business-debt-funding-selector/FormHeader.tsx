import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import type { FormHeaderProps } from './types';

export const FormHeader: React.FC<FormHeaderProps> = ({ onBack, title, subtitle }) => {
    return (
        <>
            {/* Header with back arrow */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton
                    onClick={onBack}
                    sx={{
                        mr: 2,
                        p: 1,
                        '&:hover': {
                            backgroundColor: '#f5f5f5'
                        }
                    }}
                >
                    <ArrowBack sx={{ fontSize: '1.5rem', color: '#666' }} />
                </IconButton>
            </Box>

            {/* Title and subtitle */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: '#333',
                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: '#666'
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </>
    );
};
