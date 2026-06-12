import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

interface FormHeaderProps {
    onBack: () => void;
    title: string;
    subtitle: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ onBack, title, subtitle }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <IconButton
                onClick={onBack}
                sx={{
                    p: 1,
                    mb: 2,
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                }}
            >
                <ArrowBack />
            </IconButton>
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
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
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );
};
