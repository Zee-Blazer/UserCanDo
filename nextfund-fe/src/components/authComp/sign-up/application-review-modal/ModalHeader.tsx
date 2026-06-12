import { Close } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

interface ModalHeaderProps {
    onClose: () => void;
    title: string;
    subtitle: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose, title, subtitle }) => {
    return (
        <>
            {/* Close Button */}
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    color: '#666',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                }}
            >
                <Close />
            </IconButton>

            {/* Header */}
            <Box sx={{ mb: 4, pr: 5 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: '#333',
                        fontSize: { xs: '1.3rem', sm: '1.5rem' }
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        color: '#666'
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </>
    );
};
