import { capitalizeWords, formatCurrency } from '@/utils/formatting';
import { Box, Typography } from '@mui/material';
import React from 'react';
import type { ApplicationOverviewProps } from './types';

export const ApplicationOverview: React.FC<ApplicationOverviewProps> = ({ data }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#333',
                    fontSize: '1.125rem'
                }}
            >
                Complete Application Overview
            </Typography>

            {/* Company */}
            <Box sx={{ mb: 3, borderBottom: '1px solid #e0e0e0', pb: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                >
                    Company
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {capitalizeWords(data.company.name)} - {capitalizeWords(data.company.industry)} - Founded {data.company.foundedYear}
                </Typography>
            </Box>

            {/* Stage */}
            <Box sx={{ mb: 3, borderBottom: '1px solid #e0e0e0', pb: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                >
                    Stage
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {capitalizeWords(data.company.stage)} - {data.company.employeeCount}
                </Typography>
            </Box>

            {/* Funding Type */}
            <Box sx={{ mb: 3, borderBottom: '1px solid #e0e0e0', pb: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                >
                    Funding Type
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {capitalizeWords(data.funding.type)}
                </Typography>
            </Box>

            {/* Amount Seeking */}
            <Box sx={{ mb: 3, borderBottom: '1px solid #e0e0e0', pb: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                >
                    Amount Seeking
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {formatCurrency(data.funding.amount)}
                </Typography>
            </Box>

            {/* Equity Offering */}
            <Box sx={{ mb: 3, borderBottom: '1px solid #e0e0e0', pb: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                >
                    Equity Offering
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {data.funding.equityOffering}%
                </Typography>
            </Box>

            {/* Use of Funds */}
            <Box sx={{ mb: 3, borderBottom: '1px solid #e0e0e0', pb: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                >
                    Use of Funds
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {data.useOfFunds && data.useOfFunds.length > 0
                        ? data.useOfFunds.slice(0, 3).join(', ')
                        : 'Not specified'}
                </Typography>
            </Box>

            {/* Investment Timeline */}
            <Box sx={{ mb: 3, borderBottom: '1px solid #e0e0e0', pb: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                >
                    Investment Timeline
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {data.funding.duration} - Close by {data.funding.closeDate}
                </Typography>
            </Box>

            {/* Investor Preferences */}
            <Box sx={{ mb: 4, borderBottom: '1px solid #e0e0e0', pb: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                >
                    Investor Preferences
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {formatCurrency(data.investorPreferences.minInvestment)} - {formatCurrency(data.investorPreferences.maxInvestment)} Investment - {data.investorPreferences.investorTypes.join(', ')}
                </Typography>
            </Box>
        </Box>
    );
};
