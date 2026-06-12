import { Box, Typography } from '@mui/material';
import React from 'react';
import type { ContactInformationProps } from './types';

export const ContactInformation: React.FC<ContactInformationProps> = ({
    email,
    helpLink
}) => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Questions? Email:{' '}
                <Box
                    component="a"
                    href={`mailto:${email}`}
                    sx={{
                        color: '#4CAF50',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    {email}
                </Box>
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Need Help?{' '}
                <Box
                    component="a"
                    href={helpLink}
                    sx={{
                        color: '#4CAF50',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    Schedule a call with our team
                </Box>
            </Typography>
        </Box>
    );
};
