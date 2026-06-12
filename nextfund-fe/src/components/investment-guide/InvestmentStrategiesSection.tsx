'use client'
import {
    Box,
    Card,
    CardContent,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import React from 'react';

const allocations = [
    {
        percent: "20 - 30%",
        label: "Asset-backed debts",
        desc: "(stable income)",
        bgColor: "#E8F5E8",
        textColor: "#33CC33",
        borderColor: "#33CC33"
    },
    {
        percent: "40-50%",
        label: "Growth-stage equity",
        desc: "(moderate risk/return)",
        bgColor: "#E8F0FF",
        textColor: "#1D5EFF",
        borderColor: "#1D5EFF"
    },
    {
        percent: "20-30%",
        label: "Early-stage equity",
        desc: "(high risk/return)",
        bgColor: "#F3E8FF",
        textColor: "#A020F0",
        borderColor: "#A020F0"
    },
    {
        percent: "5-10%",
        label: "Special situations",
        desc: "(turnarounds, distressed)",
        bgColor: "#FFF9E6",
        textColor: "#FFD600",
        borderColor: "#FFD600"
    },
];

const syndicateItems = [
    "Follow experienced lead investors",
    "Co-invest alongside institutional investors",
    "Leverage collective due diligence",
    "Benefit from shared expertise",
];

const sectorItems = [
    "Specialize in 1-2 sectors you understand",
    "Build deeper expertise and network",
    "Better able to spot opportunities and risks",
    "Can provide value-add beyond capital",
];

export const InvestmentStrategiesSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
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
                            mb: 4,
                            color: '#043A66',
                        }}
                    >
                        Investment Strategies
                    </Typography>

                    {/* The Portfolio Approach Subheading */}
                    <Typography
                        variant="h4"
                        component="h3"
                        sx={{
                            fontSize: { xs: '1.5rem', lg: '2rem' },
                            fontWeight: 600,
                            mb: 6,
                            color: '#043A66',
                        }}
                    >
                        The Portfolio Approach
                    </Typography>
                </Box>

                {/* Portfolio Allocation Cards */}
                <Grid container spacing={{ xs: 3, lg: 4 }} sx={{ mb: 8 }}>
                    {allocations.map((allocation, idx) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 3 }}
                            key={idx}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: allocation.bgColor,
                                    border: `2px solid ${allocation.borderColor}`,
                                    borderRadius: 4,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: theme.shadows[4],
                                    },
                                }}
                            >
                                <CardContent
                                    sx={{
                                        p: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        height: '100%',
                                        gap: 2,
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            color: allocation.textColor,
                                        }}
                                    >
                                        {allocation.percent}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                color: allocation.borderColor,
                                            }}
                                        >
                                            {allocation.label}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.875rem',
                                            color: allocation.borderColor,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {allocation.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Strategy Cards - Single Card with Grid Layout */}
                <Card
                    sx={{
                        backgroundColor: '#F9FBFC',
                        border: '1px solid #E5E7EB',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: theme.shadows[4],
                        },
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Grid container spacing={{ xs: 4, lg: 6 }}>
                            {/* The Syndicate Strategy */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        mb: 3,
                                        color: '#043A66',
                                    }}
                                >
                                    The Syndicate Strategy
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {syndicateItems.map((item, idx) => (
                                        <Box key={idx}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 2,
                                                    pb: 2,
                                                }}
                                            >
                                                <Image
                                                    src="/circle-tick-green.png"
                                                    alt="checkmark"
                                                    width={20}
                                                    height={20}
                                                    style={{ marginTop: '2px', flexShrink: 0 }}
                                                />
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontSize: '1rem',
                                                        lineHeight: 1.6,
                                                        color: '#043A66',
                                                    }}
                                                >
                                                    {item}
                                                </Typography>
                                            </Box>
                                            {idx < syndicateItems.length - 1 && (
                                                <Box
                                                    sx={{
                                                        height: '1px',
                                                        backgroundColor: '#EEF1F4',
                                                        width: '100%',
                                                        mb: 2,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>

                            {/* The Sector Focus Strategy */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        mb: 3,
                                        color: '#043A66',
                                    }}
                                >
                                    The Sector Focus Strategy
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {sectorItems.map((item, idx) => (
                                        <Box key={idx}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 2,
                                                    pb: 2,
                                                }}
                                            >
                                                <Image
                                                    src="/circle-tick-green.png"
                                                    alt="checkmark"
                                                    width={20}
                                                    height={20}
                                                    style={{ marginTop: '2px', flexShrink: 0 }}
                                                />
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontSize: '1rem',
                                                        lineHeight: 1.6,
                                                        color: '#043A66',
                                                    }}
                                                >
                                                    {item}
                                                </Typography>
                                            </Box>
                                            {idx < sectorItems.length - 1 && (
                                                <Box
                                                    sx={{
                                                        height: '1px',
                                                        backgroundColor: '#EEF1F4',
                                                        width: '100%',
                                                        mb: 2,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};