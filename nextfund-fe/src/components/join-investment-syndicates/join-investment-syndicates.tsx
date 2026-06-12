'use client'
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CTASection } from '../../components/how-it-works/cta-section';
import { isProd } from '../../utils/helpers';

{/* NOT PROD READY */ }
const ACTIVE_SYNDICATES = !isProd ? [
    {
        id: 1,
        category: 'Technology Focus',
        title: 'AfriTech Growth Syndicate',
        leadBy: 'Led by Experienced Fund Manager',
        focus: 'Series A/B technology companies',
        trackRecord: '23 investments, 67% IRR',
        dealSize: '$500K - $2M',
        minInvestment: '$25,000',
        geography: 'Nigeria, Kenya, South Africa',
        buttonText: 'Request to join',
        href: '/sign-up',
        buttonAction: 'primary'
    },
    {
        id: 2,
        category: 'Impact Focus',
        title: 'East Africa Impact Fund',
        leadBy: 'Led by Impact Investor',
        focus: 'Fintech, agriculture, healthcare',
        trackRecord: '31 investments, 45% IRR',
        dealSize: '$250K - $1M',
        minInvestment: '$15,000',
        geography: 'Kenya, Tanzania, Uganda, Rwanda',
        buttonText: 'Learn more',
        href: '/investment-guide',
        buttonAction: 'secondary'
    },
    {
        id: 3,
        category: 'B2B Focus',
        title: 'West Africa Growth Collective',
        leadBy: 'Led by Serial Entrepreneur',
        focus: 'B2B SaaS, logistics, education',
        trackRecord: '18 investments, 52% IRR',
        dealSize: '$300K - $1.5M',
        minInvestment: '$20,000',
        geography: 'Nigeria, Ghana, Senegal',
        buttonText: 'Learn more',
        href: '/investment-guide',
        buttonAction: 'secondary'
    }
] : [];

{/* NOT PROD READY */ }
const HOW_TO_JOIN_STEPS = !isProd ? [
    {
        id: 1,
        title: 'Review Syndicate Performance',
        description: 'Analyze track records and investment focus.'
    },
    {
        id: 2,
        title: 'Express Interest',
        description: 'Submit application with investment capacity'
    },
    {
        id: 3,
        title: 'Get Approved',
        description: 'Lead investor reviews and approves members'
    },
    {
        id: 4,
        title: 'Receive Deal Flow',
        description: 'Access exclusive opportunities with detailed analysis'
    },
    {
        id: 5,
        title: 'Invest Selectively',
        description: 'Choose which deals align with your strategy'
    }
] : [];

{/* NOT PROD READY */ }
const BENEFITS = !isProd ? [
    'Access to larger deals typically reserved for institutions',
    'Shared due diligence from experienced lead investors',
    'Lower minimum investments through pooled resources',
    'Learning opportunities from seasoned African market',
    'Network effects connecting with like-minded investors',
    'Reduced administrative burden - lead handles negotiations'
] : [];

const getCategoryColor = (category: string) => {
    const colorMap = {
        'Technology Focus': '#043A66',
        'Impact Focus': '#043A66',
        'B2B Focus': '#043A66',
    };
    return colorMap[category as keyof typeof colorMap] || '#043A66';
};

export const JoinInvestmentSyndicates: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <Box
            component="section"
            sx={{
                backgroundColor: '#F8F9FA',
                minHeight: '100vh',
            }}
        >
            {/* Header Section */}
            <Box
                sx={{
                    backgroundColor: '#E8EDF5',
                    py: { xs: 6, md: 8, lg: 10 },
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
                            fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                            fontWeight: 700,
                            mb: 3,
                            color: '#043A66',
                        }}
                    >
                        Join Investment Syndicates
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.125rem', lg: '1.25rem' },
                            maxWidth: '800px',
                            mx: 'auto',
                            color: '#043A66',
                            lineHeight: 1.6,
                        }}
                    >
                        Co-invest alongside experienced lead investors, combining resources for larger deals and shared expertise.
                    </Typography>
                </Box>
            </Box>

            {/* What are Syndicates Section */}
            <Box
                sx={{
                    py: { xs: 6, md: 8, lg: 10 },
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1200px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3, lg: 4 },
                    }}
                >
                    <Card
                        sx={{
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                            borderRadius: 2,
                            boxShadow: theme.shadows[2],
                        }}
                    >
                        <CardContent
                            sx={{
                                p: { xs: 4, md: 6, lg: 8 },
                                textAlign: 'center',
                            }}
                        >
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    fontSize: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
                                    fontWeight: 700,
                                    mb: 4,
                                    color: '#043A66',
                                }}
                            >
                                What are Syndicates?
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.125rem', lg: '1.25rem' },
                                    maxWidth: '900px',
                                    mx: 'auto',
                                    color: '#043A66',
                                    lineHeight: 1.7,
                                }}
                            >
                                Syndicates allow you to co-invest alongside experienced lead investors, combining resources for
                                larger deals and shared expertise. Follow proven track records while learning from seasoned
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* Active Syndicates Section */}
            <Box
                sx={{
                    py: { xs: 6, md: 8, lg: 10 },
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1200px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3, lg: 4 },
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontSize: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
                            fontWeight: 700,
                            mb: 6,
                            color: '#043A66',
                            textAlign: 'center',
                        }}
                    >
                        Active Syndicates
                    </Typography>

                    <Grid container spacing={{ xs: 3, lg: 4 }}>
                        {ACTIVE_SYNDICATES.map((syndicate) => (
                            <Grid
                                size={{ xs: 12, md: 6, lg: 4 }}
                                key={syndicate.id}
                            >
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backgroundColor: 'white',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: 7,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: theme.shadows[8],
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            p: 3,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                        }}
                                    >
                                        {/* Category Badge */}
                                        <Box sx={{ mb: 2 }}>
                                            <Chip
                                                label={syndicate.category}
                                                size="small"
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor: getCategoryColor(syndicate.category),
                                                    fontSize: '0.75rem',
                                                    fontWeight: 500,
                                                }}
                                            />
                                        </Box>

                                        {/* Syndicate Details */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flexGrow: 1,
                                                gap: 2,
                                            }}
                                        >
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography
                                                    variant="h6"
                                                    component="h3"
                                                    sx={{
                                                        fontSize: '1.125rem',
                                                        fontWeight: 700,
                                                        mb: 1,
                                                        color: '#043A66',
                                                    }}
                                                >
                                                    {syndicate.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        mb: 2,
                                                        color: '#6A6A6A',
                                                        fontStyle: 'italic',
                                                    }}
                                                >
                                                    {syndicate.leadBy}
                                                </Typography>

                                                <Box sx={{ mb: 2 }}>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: '0.875rem',
                                                            mb: 1,
                                                            color: '#043A66',
                                                        }}
                                                    >
                                                        <strong>Focus:</strong> {syndicate.focus}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: '0.875rem',
                                                            mb: 1,
                                                            color: '#043A66',
                                                        }}
                                                    >
                                                        <strong>Track Record:</strong> {syndicate.trackRecord}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: '0.875rem',
                                                            mb: 1,
                                                            color: '#043A66',
                                                        }}
                                                    >
                                                        <strong>Typical Deal Size:</strong> {syndicate.dealSize}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: '0.875rem',
                                                            mb: 1,
                                                            color: '#043A66',
                                                        }}
                                                    >
                                                        <strong>Min Investment:</strong> {syndicate.minInvestment}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: '0.875rem',
                                                            color: '#043A66',
                                                        }}
                                                    >
                                                        <strong>Geography:</strong> {syndicate.geography}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* CTA Button with Link */}
                                            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-start' }}>
                                                <Link href={syndicate.href} passHref>
                                                    <Button
                                                        variant={syndicate.buttonAction === 'primary' ? 'contained' : 'contained'}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: '#33CC33',
                                                            color: 'white',
                                                            fontWeight: 500,
                                                            borderRadius: '9999px',
                                                            textTransform: 'none',
                                                            width: 'auto',
                                                            minWidth: '120px',
                                                            px: 3,
                                                            '&:hover': {
                                                                backgroundColor: '#28a428',
                                                            },
                                                        }}
                                                    >
                                                        {syndicate.buttonText}
                                                    </Button>
                                                </Link>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            {/* How to Join Section */}
            <Box
                sx={{
                    py: { xs: 6, md: 8, lg: 10 },
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1200px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3, lg: 4 },
                    }}
                >
                    <Card
                        sx={{
                            backgroundColor: '#33CC3314',
                            border: '1px solid #E5E7EB',
                            borderRadius: 2,
                            boxShadow: theme.shadows[2],
                        }}
                    >
                        <CardContent
                            sx={{
                                p: { xs: 4, md: 6, lg: 8 },
                            }}
                        >
                            <Grid container spacing={{ xs: 4, md: 6, lg: 8 }} alignItems="center">
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography
                                        variant="h3"
                                        component="h2"
                                        sx={{
                                            fontSize: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
                                            fontWeight: 700,
                                            mb: 4,
                                            color: '#043A66',
                                        }}
                                    >
                                        How to Join?
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {HOW_TO_JOIN_STEPS.map((step, index) => (
                                            <Box
                                                key={step.id}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 2,
                                                    pb: 2,
                                                    borderBottom: index < HOW_TO_JOIN_STEPS.length - 1 ? '1px solid #33CC33' : 'none', // Changed line color to #33CC33
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        minWidth: '24px',
                                                        height: '24px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '0.875rem',
                                                        fontWeight: 600,
                                                        mt: 0.5,
                                                        color: '#043A66', // Just text color, no background
                                                    }}
                                                >
                                                    {step.id}
                                                </Typography>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontSize: '1.125rem',
                                                            fontWeight: 600,
                                                            mb: 0.5,
                                                            color: '#043A66',
                                                        }}
                                                    >
                                                        {step.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: '0.875rem',
                                                            color: '#043A66',
                                                            opacity: 0.8,
                                                        }}
                                                    >
                                                        {step.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                        }}
                                    >
                                        <Image
                                            src="/investment-data.png"
                                            alt="Investment Data Illustration"
                                            width={isMobile ? 300 : 400}
                                            height={isMobile ? 250 : 350}
                                            style={{
                                                maxWidth: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* Benefits Section */}
            <Box
                sx={{
                    py: { xs: 6, md: 8, lg: 10 },
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1200px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3, lg: 4 },
                    }}
                >
                    <Card
                        sx={{
                            backgroundColor: '#CDDCFF33',
                            border: '1px solid #E5E7EB',
                            borderRadius: 2,
                            boxShadow: theme.shadows[2],
                        }}
                    >
                        <CardContent
                            sx={{
                                p: { xs: 4, md: 6, lg: 8 },
                            }}
                        >
                            <Grid container spacing={{ xs: 4, md: 6, lg: 8 }} alignItems="center">
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography
                                        variant="h3"
                                        component="h2"
                                        sx={{
                                            fontSize: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
                                            fontWeight: 700,
                                            mb: 4,
                                            color: '#043A66',
                                        }}
                                    >
                                        Benefits
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {BENEFITS.map((benefit, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 2,
                                                    pb: 2,
                                                    borderBottom: index < BENEFITS.length - 1 ? '1px solid #043A66' : 'none',
                                                }}
                                            >
                                                <Box sx={{ mt: 0.5 }}>
                                                    <Image
                                                        src="/tick-circle-blue.png"
                                                        alt="Check mark"
                                                        width={20}
                                                        height={20}
                                                    />
                                                </Box>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontSize: '1rem',
                                                        color: '#043A66',
                                                        lineHeight: 1.6,
                                                    }}
                                                >
                                                    {benefit}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                        }}
                                    >
                                        <Image
                                            src="/nature-benefit.png"
                                            alt="Nature Benefits Illustration"
                                            width={isMobile ? 300 : 400}
                                            height={isMobile ? 250 : 350}
                                            style={{
                                                maxWidth: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* CTA Section */}
            <CTASection />
        </Box>
    );
};