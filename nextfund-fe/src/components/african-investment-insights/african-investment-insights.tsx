'use client'
import {
    Box,
    Card,
    Chip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import React from 'react';
import { CTASection } from '../../components/how-it-works';


const FEATURED_ARTICLES = [
    {
        id: 1,
        title: 'The State of African Tech Investment in 2025',
        description: 'African tech continues its remarkable growth trajectory, with $6.2 billion raised in 2024, marking a 34% increase from the previous year. Nigeria, Kenya, and South Africa led the charge...',
        category: 'Market Insights',
        date: 'January 15, 2025',
        readTime: '8 min read',
        image: '/market-img.png',
        featured: true
    },
    {
        id: 2,
        title: 'The State of African Tech Investment in 2025',
        description: 'African tech continues its remarkable growth trajectory, with $6.2 billion raised in 2024, marking a 34% increase from the...',
        category: 'Market Insights',
        date: 'January 15, 2025',
        readTime: '8 min read',
        image: '/chuttersnap.png',
        featured: false
    },
    {
        id: 3,
        title: 'The State of African Tech Investment in 2025',
        description: 'African tech continues its remarkable growth trajectory, with $6.2 billion raised in 2024, marking a 34% increase from the...',
        category: 'Market Insights',
        date: 'January 15, 2025',
        readTime: '8 min read',
        image: '/chuttersnap.png',
        featured: false
    }
];

const BROWSE_CATEGORIES = [
    {
        id: 1,
        title: 'Market Analysis',
        articles: 23
    },
    {
        id: 2,
        title: 'Investment Strategies',
        articles: 23
    },
    {
        id: 3,
        title: 'Success Stories',
        articles: 15
    },
    {
        id: 4,
        title: 'Sector Deep Dives',
        articles: 12
    },
    {
        id: 5,
        title: 'Regulatory Updates',
        articles: 12
    }
];

export const AfricanInvestmentInsights: React.FC = () => {
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
                        African Investment Insights
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
                        Expert analysis, market trends, and success stories from African markets.
                    </Typography>
                </Box>
            </Box>

            {/* Featured Articles Section */}
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
                            Featured Articles
                        </Typography>
                    </Box>

                    {/* Articles Grid */}
                    <Grid container spacing={{ xs: 3, lg: 4 }}>
                        {/* Featured Article - Large */}
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    height: { xs: 350, md: 500 },
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
                                    src={FEATURED_ARTICLES[0].image}
                                    alt={FEATURED_ARTICLES[0].title}
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
                                            label={FEATURED_ARTICLES[0].category}
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
                                            label={FEATURED_ARTICLES[0].date}
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
                                            label={FEATURED_ARTICLES[0].readTime}
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
                                        {FEATURED_ARTICLES[0].title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontSize: '0.85rem',
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {FEATURED_ARTICLES[0].description}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Side Articles */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                                {FEATURED_ARTICLES.slice(1).map((article) => (
                                    <Box
                                        key={article.id}
                                        sx={{
                                            position: 'relative',
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                            transition: 'all 0.3s ease',
                                            flex: 1,
                                            height: { xs: 200, md: 240 },
                                            width: '100%',
                                            maxWidth: { xs: '100%', md: '90%' },
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: theme.shadows[8],
                                            },
                                        }}
                                    >
                                        <Image
                                            src={article.image}
                                            alt={article.title}
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
                                                p: 3,
                                                color: 'white',
                                            }}
                                        >
                                            {/* Tags */}
                                            <Box sx={{ mb: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                <Chip
                                                    label={article.category}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                        color: '#043A66',
                                                        fontSize: '0.65rem',
                                                        fontWeight: 600,
                                                        border: '2px solid #33CC33',
                                                    }}
                                                />
                                                <Chip
                                                    label={article.date}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                        color: '#043A66',
                                                        fontSize: '0.65rem',
                                                        fontWeight: 600,
                                                        border: '2px solid #33CC33',
                                                    }}
                                                />
                                                <Chip
                                                    label={article.readTime}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                        color: '#043A66',
                                                        fontSize: '0.65rem',
                                                        fontWeight: 600,
                                                        border: '2px solid #33CC33',
                                                    }}
                                                />
                                            </Box>
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                sx={{
                                                    fontSize: '0.95rem',
                                                    fontWeight: 700,
                                                    mb: 1,
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {article.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {article.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* Browse Category Section */}
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
                            Browse Category
                        </Typography>
                    </Box>

                    {/* Category Cards Grid */}
                    <Grid container spacing={{ xs: 3, lg: 4 }} justifyContent="center">
                        {BROWSE_CATEGORIES.map((category) => (
                            <Grid
                                size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
                                key={category.id}
                            >
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'white',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: 2,
                                        p: 3,
                                        textAlign: 'center',
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
                                            fontWeight: 700,
                                            mb: 1,
                                            color: '#043A66',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {category.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: '#6A6A6A',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {category.articles} articles
                                    </Typography>
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