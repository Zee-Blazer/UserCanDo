import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export const HeroSection: React.FC = () => {
    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 2.5, md: 3 }, py: { xs: 6, md: 10, lg: 12 } }}>
            <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6, lg: 8 } }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                        fontWeight: 700,
                        color: '#043A66',
                        mb: { xs: 2, md: 3 }
                    }}
                >
                    How Nexfund Works
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: '1rem', md: '1.125rem', lg: '1.25rem' },
                        color: '#043A66',
                        maxWidth: 800,
                        mx: 'auto',
                        lineHeight: 1.6
                    }}
                >
                    Nexfund makes investing in high-potential businesses simple, transparent, and secure. Learn
                    more about our process below.
                </Typography>
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: 200, sm: 300, md: 400, lg: 500 },
                    borderRadius: { xs: 4, md: 5, lg: 10 },
                    overflow: 'hidden',
                    mb: { xs: 6, md: 10 }
                }}
            >
                <Image
                    src="/how-it-works.png"
                    alt="Modern buildings representing business growth"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </Box>
        </Box>
    );
};
