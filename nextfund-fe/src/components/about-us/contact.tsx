import {
    Box,
    Card,
    CardContent,
    Typography,
    useMediaQuery,
    useTheme,
    Grid,
} from '@mui/material';
import React from 'react';
import { CONTACT } from '@/constants/about-us-data';
import Image from 'next/image';


export const Contact: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

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
                <Card
                    sx={{
                        border: '#EEF1F4',
                        boxShadow: '2',
                        borderRadius: 7,
                    }}
                >
                    <CardContent
                        sx={{
                            p: { xs: 4, lg: 6 },
                        }}
                    >
                        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
                            {/* Text Content */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="h2"
                                    component="h2"
                                    sx={{
                                        fontSize: { xs: '2rem', lg: '2.5rem' },
                                        fontWeight: 700,
                                        mb: 4,
                                        color: '#043A66',
                                    }}
                                >
                                    {CONTACT.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: { xs: '1rem', md: '1.125rem' },
                                        lineHeight: 1.6,
                                        color: '#043A66',
                                    }}
                                >
                                    {CONTACT.description}
                                </Typography>
                            </Grid>

                            {/* Image Content */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: { xs: 'center', md: 'flex-end' },
                                        alignItems: 'center',
                                        height: '100%',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: { xs: '100%', sm: '400px', md: '450px' },
                                            height: { xs: '250px', sm: '300px', md: '350px' },
                                            maxWidth: '100%',
                                        }}
                                    >
                                        <Image
                                            src={CONTACT.image}
                                            alt="Contact us illustration"
                                            fill
                                            style={{
                                                objectFit: 'contain',
                                            }}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};