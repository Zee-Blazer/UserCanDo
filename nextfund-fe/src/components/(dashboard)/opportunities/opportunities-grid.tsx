'use client';

import { Search } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { COLORS } from '../../../constants/colors';
import { Investment } from '../../../types/landing-page';
import { InvestmentCard } from './investment-card';


interface OpportunitiesGridProps {
    investments: Investment[];
}

export const OpportunitiesGrid: React.FC<OpportunitiesGridProps> = ({ investments }) => {
    if (investments.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    px: 4,
                    textAlign: 'center',
                }}
            >
                {/* Magnifying Glass Icon with Sidebar Active Background */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: COLORS.primaryLight,
                        mb: 3,
                    }}
                >
                    <Search
                        sx={{
                            fontSize: '2rem',
                            color: '#00c853'
                        }}
                    />
                </Box>

                {/* Main Heading */}
                <Typography
                    variant="h6"
                    sx={{
                        color: '#1F2937',
                        mb: 2,
                        fontWeight: 600,
                        fontSize: '1.25rem',
                    }}
                >
                    No investment opportunities available right now.
                </Typography>

                {/* Descriptive Text */}
                <Typography
                    variant="body2"
                    sx={{
                        color: '#6B7280',
                        maxWidth: '400px',
                        lineHeight: 1.5,
                        fontSize: '0.875rem',
                        mb: 3,
                    }}
                >
                    We're currently reviewing new businesses. Check back soon to explore verified opportunities.
                </Typography>

                {/* Action Buttons */}
                {/* <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        component="button"
                        sx={{
                            backgroundColor: '#33CC33',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            px: 3,
                            py: 1.5,
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            minWidth: '120px',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: '#28a428',
                            },
                        }}
                        onClick={() => window.location.reload()}
                    >
                        Refresh
                    </Box>
                    <Box
                        component="button"
                        sx={{
                            backgroundColor: 'white',
                            color: '#374151',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            px: 3,
                            py: 1.5,
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            minWidth: '120px',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: '#f9fafb',
                                borderColor: '#9ca3af',
                            },
                        }}
                    >
                        Notify Me
                    </Box>
                </Box> */}
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={3}>
                {investments.map((investment, index) => (
                    <Grid
                        size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
                        key={investment.id || `investment-${index}`}
                    >
                        <InvestmentCard investment={investment} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default OpportunitiesGrid;