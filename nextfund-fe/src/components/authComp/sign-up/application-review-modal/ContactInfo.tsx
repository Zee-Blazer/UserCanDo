import { Box, Typography } from '@mui/material';
import React from 'react';

interface ContactInfoProps {
    email: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ email }) => {
    return (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography
                variant="body2"
                sx={{
                    color: '#666',
                    fontSize: '0.75rem',
                    fontWeight: 400
                }}
            >
                Questions? Email:{' '}
                <Typography
                    component="span"
                    sx={{
                        color: '#4CAF50',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        '&:hover': { textDecoration: 'underline' }
                    }}
                    onClick={() => window.open(`mailto:${email}`)}
                >
                    {email}
                </Typography>
            </Typography>
        </Box>
    );
};
