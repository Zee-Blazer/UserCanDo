import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../../constants';
import { StepCard } from './step-card';

export const InvestorsSection: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#043A6614', py: { xs: 6, md: 8, lg: 10 } }}>
            <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 2.5, md: 3 } }}>
                <Box sx={{ mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' },
                            fontWeight: 700,
                            color: '#043A66',
                            mb: 2
                        }}
                    >
                        For Investors
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            color: '#043A66',
                            maxWidth: 600
                        }}
                    >
                        Our platform makes it easy to discover, evaluate, and invest in vetted businesses with growth potential.
                    </Typography>
                </Box>

                <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
                    {HOW_IT_WORKS_STEPS.map((step) => (
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={step.id}>
                            <StepCard step={step} variant="investor" />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};
