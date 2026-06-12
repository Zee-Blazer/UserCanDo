import {
    Box,
    Typography,
    LinearProgress,
    Card,
} from '@mui/material';
import Grid from "@mui/material/Grid";
import React from "react";

const sectors = [
    { label: "Fintech", value: "Digital payments, mobile banking, insurance" },
    { label: "Agriculture", value: "Agtech, supply chain, food processing" },
    { label: "Healthcare", value: "Telemedicine, medical devices, pharmaceuticals" },
    { label: "Education", value: "Edtech, vocational training, online learning" },
    { label: "Energy", value: "Solar, mini-grids, energy storage" },
    { label: "Logistics", value: "Last-mile delivery, freight, warehousing" },
];

const opportunities = [
    { label: "Population Growth", value: "1.4B people", progress: 85 },
    { label: "Economic Growth", value: "$3T by 2030", progress: 70 },
    { label: "Youth Demographics", value: "65% under 25", progress: 65 },
    { label: "Urbanization Rate", value: "4% annually", progress: 40 },
];

const challenges = [
    "Currency volatility and inflation",
    "Regulatory complexity across markets",
    "Infrastructure limitations",
    "Limited exit opportunities",
    "Political and economic instability",
];

const ProgressIndicator: React.FC<{ progress: number }> = ({ progress }) => (
    <Box sx={{ width: '100%', mt: 0.5 }}>
        <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#E5E7EB',
                '& .MuiLinearProgress-bar': {
                    backgroundColor: '#043A66',
                    borderRadius: 3,
                },
            }}
        />
    </Box>
);

const AfricanMarketInsightsSection: React.FC = () => (
    <Box
        component="section"
        sx={{
            py: { xs: 8, lg: 12 },
            backgroundColor: '',
            px: { xs: 2, sm: 3, lg: 4 },
        }}
    >
        <Box
            sx={{
                maxWidth: '1250px',
                mx: 'auto',
                backgroundColor: '#EEF1F4',
                borderRadius: 3,
                p: { xs: 6, lg: 8 },
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Section Header */}
            <Typography
                variant="h3"
                component="h2"
                sx={{
                    fontSize: { xs: '2rem', lg: '2.5rem' },
                    fontWeight: 700,
                    mb: 6,
                    color: '#043A66',
                    textAlign: 'center',
                }}
            >
                African Market Insights
            </Typography>

            <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'stretch' }}>
                {/* Key Growth Sectors - Left Column */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Card
                        sx={{
                            backgroundColor: '#F8FAFC',
                            borderRadius: 4,
                            px: { xs: 3, sm: 4, lg: 2 },
                            py: 3,
                            height: { xs: 'auto', lg: '514px' },
                            minHeight: { xs: '400px', lg: '514px' },
                            border: 'none',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
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
                                textAlign: 'center',
                            }}
                        >
                            Key Growth Sectors
                        </Typography>
                        <Box component="div" sx={{ mt: 2 }}>
                            {sectors.map((s, idx) => (
                                <Box key={idx} sx={{ mb: 2.5 }}>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: '0.9rem', lg: '1rem' },
                                            color: '#043A66',
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        <Box component="span" sx={{ fontWeight: 700 }}>
                                            {s.label}:
                                        </Box>{' '}
                                        <Box component="span" sx={{ fontWeight: 400 }}>
                                            {s.value}
                                        </Box>
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Grid>

                {/* Right Column - Market Opportunities and Common Challenges */}
                <Grid size={{ xs: 12, lg: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid container spacing={3} direction="column" sx={{ width: '100%', maxWidth: { xs: '100%', lg: '400px' } }}>
                        {/* Market Opportunities */}
                        <Grid>
                            <Card
                                sx={{
                                    backgroundColor: '#F8FAFC',
                                    borderRadius: 4,
                                    px: { xs: 3, sm: 4, lg: 3 },
                                    py: 3,
                                    height: { xs: 'auto', lg: '250px' },
                                    minHeight: { xs: '250px', lg: '250px' },
                                    border: 'none',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    sx={{
                                        fontSize: { xs: '1.25rem', lg: '1.5rem' },
                                        fontWeight: 700,
                                        mb: 2.5,
                                        color: '#043A66',
                                        textAlign: 'left',
                                    }}
                                >
                                    Market Opportunities
                                </Typography>
                                <Box component="div">
                                    {opportunities.map((o, idx) => (
                                        <Box key={idx} sx={{ mb: 1.5 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    mb: 0.5,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.9rem',
                                                        color: '#6B7280',
                                                        fontWeight: 400,
                                                    }}
                                                >
                                                    {o.label}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.9rem',
                                                        fontWeight: 600,
                                                        color: '#043A66',
                                                    }}
                                                >
                                                    {o.value}
                                                </Typography>
                                            </Box>
                                            <ProgressIndicator progress={o.progress} />
                                        </Box>
                                    ))}
                                </Box>
                            </Card>
                        </Grid>

                        {/* Common Challenges */}
                        <Grid>
                            <Card
                                sx={{
                                    backgroundColor: '#F8FAFC',
                                    borderRadius: 4,
                                    px: { xs: 3, sm: 4, lg: 3 },
                                    py: 3,
                                    height: { xs: 'auto', lg: '240px' },
                                    minHeight: { xs: '240px', lg: '240px' },
                                    border: 'none',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    sx={{
                                        fontSize: { xs: '1.25rem', lg: '1.5rem' },
                                        fontWeight: 700,
                                        mb: 2.5,
                                        color: '#043A66',
                                        textAlign: 'left',
                                    }}
                                >
                                    Common Challenges
                                </Typography>
                                <Box component="div" sx={{ textAlign: 'left' }}>
                                    {challenges.map((c, idx) => (
                                        <Box key={idx} sx={{ mb: 1.2 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: '0.9rem',
                                                    color: '#043A66',
                                                    lineHeight: 1.5,
                                                    fontWeight: 400,
                                                }}
                                            >
                                                {c}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </Box>
);

export default AfricanMarketInsightsSection;