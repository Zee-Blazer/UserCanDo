import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { WHY_CHOOSE_FEATURES } from '../../constants';
import { FeatureList } from './feature-list';

export const WhyChooseSection: React.FC = () => {
    return (
        <Box sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 2, sm: 2.5, md: 3 },
            bgcolor: '#33CC3314',
            py: { xs: 6, md: 8 },
            borderRadius: { xs: 3, md: 6 },
            boxShadow: 2,
            mt: { xs: 6, md: 8 },
            mb: { xs: 6, md: 8 },
        }}>
            <Grid container spacing={{ xs: 4, md: 6, lg: 8 }} alignItems="center">
                <Grid size={{ xs: 12, lg: 7 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' },
                            fontWeight: 700,
                            color: '#043A66',
                            mb: { xs: 2, md: 3 }
                        }}
                    >
                        Why Choose Nexfund?
                    </Typography>
                    <FeatureList features={WHY_CHOOSE_FEATURES} variant="why-choose" />
                </Grid>

                <Grid size={{ xs: 12, lg: 5 }} >
                    <Box sx={{ position: 'relative', width: '100%', height: { xs: 250, md: 350, lg: 400 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            src="/Growing-cuate.png"
                            alt="Growth chart illustration"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};