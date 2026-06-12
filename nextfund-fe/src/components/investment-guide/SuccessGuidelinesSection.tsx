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

export const SuccessGuidelinesSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const featuredInvestments = {
        dos: [
            "Start with smaller investments while learning",
            "Diversify across opportunities, sectors, and geographies",
            "Follow experienced investors initially",
            "Conduct thorough due diligence",
            "Monitor investments actively",
            "Be patient with exit timelines"
        ],
        donts: [
            "Invest more than you can afford to lose",
            "Put all funds in single opportunity or country",
            "Ignore currency and political risks",
            "Expect quick exits or guaranteed returns",
            "Make decisions based on emotions",
            "Neglect ongoing portfolio monitoring"
        ]
    };

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
                            mb: 2,
                            color: '#043A66',
                        }}
                    >
                        Success Guidelines
                    </Typography>
                </Box>

                {/* Guidelines Cards Grid */}
                <Grid container spacing={{ xs: 3, lg: 4 }}>
                    {/* Do's Section */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                border: '2px solid #33CC33',
                                borderRadius: 6,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <CardContent
                                sx={{
                                    p: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                            >
                                {/* Do's Header */}
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    sx={{
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        mb: 4,
                                        color: '#33CC33',
                                    }}
                                >
                                    Do's
                                </Typography>

                                {/* Do's List */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    {featuredInvestments.dos.map((item, index) => (
                                        <Box key={index}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 1.5,
                                                    mb: index < featuredInvestments.dos.length - 1 ? 2 : 0,
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
                                                        lineHeight: 1.5,
                                                        color: '#374151',
                                                    }}
                                                >
                                                    {item}
                                                </Typography>
                                            </Box>
                                            {index < featuredInvestments.dos.length - 1 && (
                                                <Box
                                                    sx={{
                                                        height: '1px',
                                                        width: '100%',
                                                        backgroundColor: '#33CC3314',
                                                        mt: 2,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Don'ts Section */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                border: '2px solid #EB2F2F',
                                borderRadius: 6,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <CardContent
                                sx={{
                                    p: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                            >
                                {/* Don'ts Header */}
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    sx={{
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        mb: 4,
                                        color: '#EB2F2F',
                                    }}
                                >
                                    Don'ts
                                </Typography>

                                {/* Don'ts List */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    {featuredInvestments.donts.map((item, index) => (
                                        <Box key={index}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 1.5,
                                                    mb: index < featuredInvestments.donts.length - 1 ? 2 : 0,
                                                }}
                                            >
                                                <Image
                                                    src="/dont-danger.png"
                                                    alt="Don't"
                                                    width={20}
                                                    height={20}
                                                    style={{ marginTop: '2px', flexShrink: 0 }}
                                                />
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontSize: '1rem',
                                                        lineHeight: 1.5,
                                                        color: '#374151',
                                                    }}
                                                >
                                                    {item}
                                                </Typography>
                                            </Box>
                                            {index < featuredInvestments.donts.length - 1 && (
                                                <Box
                                                    sx={{
                                                        height: '1px',
                                                        width: '100%',
                                                        backgroundColor: '#EB2F2F14',
                                                        mt: 2,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
export default SuccessGuidelinesSection;