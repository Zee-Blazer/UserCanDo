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
import React from 'react';

const construction = [
    { label: "Geographic Diversification", value: "Spread across 3+ countries" },
    { label: "Sector Diversification", value: "Invest in different industries" },
    { label: "Stage Diversification", value: "Mix early and growth-stage companies" },
    { label: "Instrument Diversification", value: "Combine equity, debt, and hybrid instruments" },
];

const redFlags = [
    "Businesses with unclear revenue models",
    "Management teams with no track record",
    "Companies in heavily regulated sectors without proper licences",
    "Opportunities requiring large follow-on investments",
    "Businesses dependent on single customers or suppliers",
];

export const RiskManagementSection: React.FC = () => {
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
                {/* Background Container with Title Inside */}
                <Box
                    sx={{
                        backgroundColor: '#FFF7E6',
                        borderRadius: '24px',
                        p: { xs: 3, sm: 4, lg: 6 },
                    }}
                >
                    {/* Section Header - Inside the background */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontSize: { xs: '2rem', lg: '2.5rem' },
                                fontWeight: 700,
                                color: '#043A66',
                            }}
                        >
                            Risk Management
                        </Typography>
                    </Box>

                    {/* Cards Grid - Equal widths */}
                    <Grid container spacing={{ xs: 3, lg: 4 }} justifyContent="center">
                        {/* Portfolio Construction Card */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: 'white',
                                    borderRadius: '24px',
                                    border: 'none',
                                    boxShadow: 'none',
                                }}
                            >
                                <CardContent
                                    sx={{
                                        p: { xs: 1.5, sm: 2, lg: 2.5 },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        component="h3"
                                        sx={{
                                            fontSize: { xs: '1.25rem', lg: '1.5rem' },
                                            fontWeight: 700,
                                            mb: 3,
                                            color: '#043A66',
                                        }}
                                    >
                                        Portfolio Construction
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                        }}
                                    >
                                        {construction.map((item, idx) => (
                                            <Typography
                                                key={idx}
                                                variant="body1"
                                                sx={{
                                                    fontSize: '1rem',
                                                    lineHeight: 1.6,
                                                    color: '#043A66',
                                                }}
                                            >
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: '#043A66',
                                                    }}
                                                >
                                                    {item.label}:
                                                </Box>{' '}
                                                {item.value}
                                            </Typography>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Red Flags Card */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: 'white',
                                    borderRadius: '24px',
                                    border: 'none',
                                    boxShadow: 'none',
                                }}
                            >
                                <CardContent
                                    sx={{
                                        p: { xs: 1.5, sm: 2, lg: 2.5 },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        component="h3"
                                        sx={{
                                            fontSize: { xs: '1.25rem', lg: '1.5rem' },
                                            fontWeight: 700,
                                            mb: 3,
                                            color: '#043A66',
                                        }}
                                    >
                                        Red Flags to Avoid
                                    </Typography>

                                    <Box
                                        component="ul"
                                        sx={{
                                            listStyle: 'disc',
                                            listStylePosition: 'outside',
                                            m: 0,
                                            pl: 2,
                                            pr: 0,
                                            py: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1.5,
                                        }}
                                    >
                                        {redFlags.map((flag, idx) => (
                                            <Typography
                                                key={idx}
                                                component="li"
                                                variant="body1"
                                                sx={{
                                                    fontSize: '1rem',
                                                    lineHeight: 1.6,
                                                    color: '#043A66',
                                                }}
                                            >
                                                {flag}
                                            </Typography>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};