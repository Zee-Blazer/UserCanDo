import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import type { FormHeaderProps } from './types';

export const FormHeader: React.FC<FormHeaderProps> = ({ onBack, title, subtitle }) => {

    return (
        <>
            {/* Header with back button */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 3, sm: 4 } }}>
                <IconButton
                    onClick={onBack}
                    sx={{
                        mr: { xs: 1, sm: 2 },
                        p: { xs: 0.5, sm: 1 },
                        '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.04)',
                        },
                    }}
                >
                    <ArrowBack sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' }, color: '#666' }} />
                </IconButton>
            </Box>

            {/* Title and subtitle */}
            <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        mb: { xs: 1, sm: 1.5 },
                        color: '#333',
                        fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.75rem' },
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#666',
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                        lineHeight: 1.4,
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </>
    );
};
