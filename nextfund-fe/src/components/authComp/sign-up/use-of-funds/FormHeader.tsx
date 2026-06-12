import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

interface FormHeaderProps {
    onBack: () => void;
    title: string;
    subtitle?: string;
    helperText?: string;
    helperTextColor?: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ onBack, title, subtitle, helperText, helperTextColor }) => {
    return (
        <>
            <Box sx={{ mb: 2 }}>
                <IconButton
                    onClick={onBack}
                    sx={{
                        p: 1,
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                    }}
                >
                    <ArrowBack />
                </IconButton>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: '#333',
                        fontSize: { xs: '1.2rem', sm: '1.4rem' }
                    }}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            fontSize: { xs: '0.8rem', sm: '0.85rem' },
                            mb: helperText ? 0.5 : 0
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}
                {helperText && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: helperTextColor || '#666',
                            fontSize: '0.875rem',
                            fontStyle: 'italic',
                            fontWeight: helperTextColor ? 500 : 400,
                            mt: subtitle ? 0.5 : 0.5
                        }}
                    >
                        {helperText}
                    </Typography>
                )}
            </Box>
        </>
    );
};
