'use client'
import {
    Box,
    Button,
    Card,
    Chip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CTASection } from '../../components/how-it-works';
import { isProd } from '../../utils/helpers';

{/* NOT PROD READY */ }
const UPCOMING_WEBINARS = !isProd ? [
    {
        id: 1,
        title: 'Due Diligence for African Investments',
        time: 'Time: 2:00 PM GMT',
        topics: 'Topics: Financial analysis, red flags, regulatory checks, reference verification.',
        access: 'Free for Nexfund users',
        date: 'January 15, 2025',
        duration: '90 minutes',
        category: 'Masterclass',
        image: '/market-img.png',
    },
    {
        id: 2,
        title: 'Due Diligence for African Investments',
        time: 'Time: 2:00 PM GMT',
        topics: 'Topics: Financial analysis, red flags, regulatory checks, reference verification.',
        access: 'Free for Nexfund users',
        date: 'January 15, 2025',
        duration: '90 minutes',
        category: 'Masterclass',
        image: '/market-img.png',
    }
] : [];

{/* NOT PROD READY */ }
const LIBRARY_SECTIONS = !isProd ? [
    {
        id: 1,
        title: 'Beginner Series',
        items: [
            'Introduction to African Markets (45 min)',
            'Understanding Investment Types (30 min)',
            'Currency and Political Risk (40 min)',
            'Tax Implications (35 min)'
        ]
    },
    {
        id: 2,
        title: 'Advanced Series',
        items: [
            'Private Market Valuation (60 min)',
            'Exit Strategy Planning (50 min)',
            'ESG Investing in Africa (45 min)',
            'Syndicate Leadership (55 min)'
        ]
    },
    {
        id: 3,
        title: 'Sector Spotlights',
        items: [
            'African Agriculture (40 min)',
            'Fintech Landscape (45 min)',
            'Healthcare Innovation (50 min)',
            'Energy Transition (45 min)'
        ]
    },
    {
        id: 4,
        title: 'Expert Interviews',
        items: [
            'Fund Manager Insights (35 min)',
            'Founder Stories (40 min)',
            'Market Analysis (30 min)',
            'Success Cases (25 min)'
        ]
    }
] : [];

export const InvestmentWebinars: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {/* Hero Section */}
            <Box
                component="section"
                sx={{
                    py: { xs: 8, lg: 12 },
                    backgroundColor: '#E5E7EB',
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1200px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3, lg: 4 },
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontSize: { xs: '2.5rem', lg: '3rem' },
                            fontWeight: 700,
                            mb: 3,
                            color: '#043A66',
                        }}
                    >
                        Investment Webinars
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1rem',
                            maxWidth: '600px',
                            mx: 'auto',
                            color: '#043A66',
                        }}
                    >
                        Learn from experts, ask questions, and connect with fellow investors in our live sessions.
                    </Typography>
                </Box>
            </Box>

            {/* Upcoming Webinars Section */}
            <Box
                component="section"
                sx={{
                    py: { xs: 8, lg: 12 },
                    backgroundColor: 'white',
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1200px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3, lg: 4 },
                    }}
                >
                    {/* Section Header */}
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontSize: { xs: '2rem', lg: '2.5rem' },
                                fontWeight: 700,
                                mb: 2,
                                color: '#043A66',
                            }}
                        >
                            Upcoming Webinars
                        </Typography>
                    </Box>

                    {/* Webinars Grid */}
                    <Grid container spacing={{ xs: 3, lg: 4 }} justifyContent="center">
                        {UPCOMING_WEBINARS.map((webinar) => (
                            <Grid
                                size={{ xs: 12, md: 6 }}
                                key={webinar.id}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        height: { xs: 400, md: 450 },
                                        width: '100%',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: theme.shadows[12],
                                        },
                                    }}
                                >
                                    <Image
                                        src={webinar.image}
                                        alt={webinar.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    {/* Overlay */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)',
                                        }}
                                    />
                                    {/* Content Overlay */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            p: 4,
                                            color: 'white',
                                        }}
                                    >
                                        {/* Tags */}
                                        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            <Chip
                                                label={webinar.category}
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                    color: '#043A66',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 600,
                                                    border: '2px solid #33CC33',
                                                }}
                                            />
                                            <Chip
                                                label={webinar.date}
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                    color: '#043A66',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 600,
                                                    border: '2px solid #33CC33',
                                                }}
                                            />
                                            <Chip
                                                label={webinar.duration}
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                    color: '#043A66',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 600,
                                                    border: '2px solid #33CC33',
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            variant="h4"
                                            component="h3"
                                            sx={{
                                                fontSize: { xs: '1.2rem', md: '1.4rem' },
                                                fontWeight: 700,
                                                mb: 2,
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {webinar.title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: '0.85rem',
                                                lineHeight: 1.5,
                                                mb: 1,
                                            }}
                                        >
                                            {webinar.time}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: '0.85rem',
                                                lineHeight: 1.5,
                                                mb: 1,
                                            }}
                                        >
                                            {webinar.topics}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: '0.85rem',
                                                lineHeight: 1.5,
                                                mb: 3,
                                            }}
                                        >
                                            {webinar.access}
                                        </Typography>
                                        <Link href="/sign-up">
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#33CC33',
                                                    color: 'white',
                                                    fontWeight: 500,
                                                    borderRadius: '9999px',
                                                    textTransform: 'none',
                                                    px: 4,
                                                    py: 1,
                                                    '&:hover': {
                                                        backgroundColor: '#28a428',
                                                    },
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Register Now
                                            </Button>
                                        </Link>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            {/* On-Demand Library Section */}
            <Box
                component="section"
                sx={{
                    py: { xs: 4, lg: 6 },
                    backgroundColor: '#E5E7EB',
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1100px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3, lg: 4 },
                    }}
                >
                    {/* Section Header */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontSize: { xs: '1.75rem', lg: '2rem' },
                                fontWeight: 600,
                                mb: 1,
                                color: '#043A66',
                            }}
                        >
                            On-Demand Library
                        </Typography>
                    </Box>

                    {/* Library Grid */}
                    <Grid container spacing={{ xs: 2, lg: 3 }}>
                        {LIBRARY_SECTIONS.map((section) => (
                            <Grid
                                size={{ xs: 12, sm: 6, md: 3 }}
                                key={section.id}
                            >
                                <Card
                                    sx={{
                                        height: '100%',
                                        backgroundColor: 'white',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: 7,
                                        p: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: theme.shadows[8],
                                            transform: 'translateY(-4px)',
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{
                                            fontSize: '0.95rem',
                                            fontWeight: 600,
                                            mb: 2,
                                            color: '#043A66',
                                        }}
                                    >
                                        {section.title}
                                    </Typography>
                                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                        {section.items.map((item, index) => (
                                            <Box
                                                component="li"
                                                key={index}
                                                sx={{
                                                    mb: 1,
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    '&:before': {
                                                        content: '"•"',
                                                        color: '#043A66',
                                                        fontSize: '0.75rem',
                                                        marginRight: '6px',
                                                        marginTop: '2px',
                                                    },
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        lineHeight: 1.4,
                                                        color: '#043A66',
                                                        fontWeight: 400,
                                                    }}
                                                >
                                                    {item}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            {/* CTA Section */}
            <CTASection />
        </>
    );
};