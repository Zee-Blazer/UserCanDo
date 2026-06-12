import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import React from 'react';
import { WHAT_WE_DO } from '@/constants/about-us-data';

export const WhatWeDo: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, lg: 12 },
                backgroundColor: 'white',
                px: { xs: 2, sm: 3, lg: 4 },
            }}
        >
            <Box
                sx={{
                    maxWidth: '1200px',
                    mx: 'auto',
                    backgroundColor: '#33CC3314',
                    borderRadius: 7,
                    p: { xs: 4, md: 6, lg: 8 },
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
            >
                <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                        fontSize: { xs: '2.5rem', lg: '3rem' },
                        fontWeight: 700,
                        mb: 6,
                        color: '#043A66',
                        textAlign: 'left',
                    }}
                >
                    {WHAT_WE_DO.title}
                </Typography>

                <Grid container spacing={{ xs: 2, lg: 4 }} alignItems="stretch">
                    {/* Content Section */}
                    <Grid size={{ xs: 12, lg: 6 }}>
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {/* For Investors */}
                            <Box sx={{ mb: 1 }}>
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    sx={{
                                        fontSize: { xs: '1.5rem', lg: '1.75rem' },
                                        fontWeight: 700,
                                        color: '#043A66',
                                    }}
                                >
                                    {WHAT_WE_DO.forInvestors.title}
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                                    {WHAT_WE_DO.forInvestors.items.map((item, index) => (
                                        <Box
                                            component="li"
                                            key={index}
                                            sx={{
                                                mb: 1.2,
                                                position: 'relative',
                                                pl: 2,
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                '&::before': {
                                                    content: '"•"',
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    color: '#043A66',
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem',
                                                    lineHeight: 1.5,
                                                },
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: { xs: '0.95rem', lg: '1rem' },
                                                    lineHeight: 1.5,
                                                    color: '#043A66',
                                                    fontWeight: 400,
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                            {/* Separator Line */}
                            <Box
                                sx={{
                                    width: '90%',
                                    height: '2px',
                                    backgroundColor: '#33CC33',
                                    mb: 1,
                                    mt: 0.5,
                                }}
                            />

                            {/* For Investees */}
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    sx={{
                                        fontSize: { xs: '1.5rem', lg: '1.75rem' },
                                        fontWeight: 700,
                                        mb: 2,
                                        color: '#043A66',
                                    }}
                                >
                                    {WHAT_WE_DO.forInvestees.title}
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                                    {WHAT_WE_DO.forInvestees.items.map((item, index) => (
                                        <Box
                                            component="li"
                                            key={index}
                                            sx={{
                                                mb: 1.2,
                                                position: 'relative',
                                                pl: 2,
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                '&::before': {
                                                    content: '"•"',
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    color: '#043A66',
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem',
                                                    lineHeight: 1.5,
                                                },
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: { xs: '0.95rem', lg: '1rem' },
                                                    lineHeight: 1.5,
                                                    color: '#043A66',
                                                    fontWeight: 400,
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Image Section */}
                    <Grid size={{ xs: 12, lg: 6 }}>
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: { xs: 'center', lg: 'flex-start' },
                                minHeight: { xs: '300px', lg: '500px' },
                                mt: { lg: -12 },
                            }}
                        >
                            <Image
                                src={WHAT_WE_DO.image}
                                alt="What We Do"
                                width={1400}
                                height={900}
                                style={{
                                    width: '110%',
                                    height: 'auto',
                                    maxWidth: '110%',
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};