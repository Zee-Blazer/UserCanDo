import {
    Box,
    Typography,
    LinearProgress,
} from '@mui/material';
import Grid from "@mui/material/Grid";
import React from "react";
import { Card } from './General/ui';


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
    <Box sx={{ width: '100%', mt: 1 }}>
        <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#E5E7EB',
                '& .MuiLinearProgress-bar': {
                    backgroundColor: '#043A66',
                    borderRadius: 4,
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
            backgroundColor: '#E8F4F8', 
            px: { xs: 2, sm: 3, lg: 4 },
        }}
    >
        <Box
            sx={{
                maxWidth: '1200px',
                mx: 'auto',
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

            <Grid container spacing={4}>
                {/* Key Growth Sectors - Left Column */}
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Card className="!bg-white !rounded-3xl p-8 h-fit !shadow-md">
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
                            Key Growth Sectors
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                            {sectors.map((s, idx) => (
                                <Box component="li" key={idx} sx={{ mb: 2.5 }}>
                                    <Typography
                                        sx={{
                                            fontSize: '0.95rem',
                                            color: '#043A66',
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        <Box component="span" sx={{ fontWeight: 600 }}>
                                            {s.label}:
                                        </Box>{' '}
                                        {s.value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Grid>

                {/* Right Column - Market Opportunities and Common Challenges */}
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Grid container spacing={4} direction="column">
                        {/* Market Opportunities */}
                        <Grid>
                            <Card className="!bg-white !rounded-3xl p-8 h-fit !shadow-md">
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
                                    Market Opportunities
                                </Typography>
                                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                    {opportunities.map((o, idx) => (
                                        <Box component="li" key={idx} sx={{ mb: 2.5 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    mb: 1,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.95rem',
                                                        color: '#6A6A6A',
                                                    }}
                                                >
                                                    {o.label}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.95rem',
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
                            <Card className="!bg-white !rounded-3xl p-8 h-fit !shadow-md">
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
                                    Common Challenges
                                </Typography>
                                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                    {challenges.map((c, idx) => (
                                        <Box component="li" key={idx} sx={{ mb: 1.5 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: '0.95rem',
                                                    color: '#043A66',
                                                    lineHeight: 1.6,
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