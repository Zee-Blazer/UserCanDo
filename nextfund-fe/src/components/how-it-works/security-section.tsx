import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { SECURITY_FEATURES } from '../../constants';
import { FeatureList } from './feature-list';

export const SecuritySection: React.FC = () => {
    return (
        <Box sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 2, sm: 2.5, md: 3 },
            bgcolor: '#FFB1211A',
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
                        Security & Due Diligence
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            color: '#043A66',
                            mb: { xs: 3, md: 4 },
                            lineHeight: 1.6
                        }}
                    >
                        At Nexfund, we take security and due diligence seriously. We thoroughly vet all
                        businesses listed on our platform to ensure quality investment opportunities.
                    </Typography>

                    <FeatureList features={SECURITY_FEATURES} variant="security" />
                </Grid>

                <Grid size={{ xs: 12, lg: 5 }} >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: { xs: 250, md: 350, lg: 400 },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            src="/safety.png"
                            alt="Security and safety illustration"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
