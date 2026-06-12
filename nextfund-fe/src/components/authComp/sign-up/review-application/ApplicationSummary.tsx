import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import type { ReviewApplicationData } from './types';

interface ApplicationSummaryProps {
    data: ReviewApplicationData;
}

export const ApplicationSummary: React.FC<ApplicationSummaryProps> = ({ data }) => {
    return (
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#333',
                    fontSize: '1rem'
                }}
            >
                Application Summary
            </Typography>

            {/* Company Info */}
            <Box>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: '#333',
                        fontSize: '0.875rem'
                    }}
                >
                    Company
                </Typography>
                <Box sx={{ pb: 2 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.8rem' }}
                    >
                        <strong>{data.company.name || 'Name'}</strong> seeking{' '}
                        <strong>{data.company.amount || '$0'}</strong> in{' '}
                        <strong>{data.company.type || 'Type'}</strong> funding
                    </Typography>
                </Box>
                <Divider sx={{ borderColor: '#f0f0f0' }} />
            </Box>

            {/* Stage Info */}
            <Box sx={{ mt: 3 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: '#333',
                        fontSize: '0.875rem'
                    }}
                >
                    Stage
                </Typography>
                <Box sx={{ pb: 2 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.8rem' }}
                    >
                        <strong>{data.company.stage || 'Stage'}</strong> company in{' '}
                        <strong>{data.company.industry || 'Industry'}</strong>
                    </Typography>
                </Box>
                <Divider sx={{ borderColor: '#f0f0f0' }} />
            </Box>

            {/* Use of Funds */}
            <Box sx={{ mt: 3, mb: 4 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: '#333',
                        fontSize: '0.875rem'
                    }}
                >
                    Use of Funds
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.8rem' }}
                    >
                        {data.useOfFunds && data.useOfFunds.length > 0
                            ? data.useOfFunds.slice(0, 2).join(', ')
                            : 'Not specified'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
