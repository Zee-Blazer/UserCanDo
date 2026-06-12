import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { VALUES } from '@/constants/about-us-data';

export const OurValues: React.FC = () => {
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
                <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                        fontSize: { xs: '2rem', lg: '2.5rem' },
                        fontWeight: 700,
                        mb: 8,
                        color: '#043A66',
                        textAlign: 'center',
                    }}
                >
                    Our Values
                </Typography>

                <Grid container spacing={{ xs: 6, lg: 8 }}>
                    {VALUES.slice(0, 4).map((value) => (
                        <Grid size={{ xs: 12, md: 6 }} key={value.id}>
                            <Box>
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    sx={{
                                        fontSize: { xs: '1.25rem', lg: '1.5rem' },
                                        fontWeight: 700,
                                        mb: 2,
                                        color: '#043A66',
                                    }}
                                >
                                    {value.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1rem',
                                        lineHeight: 1.6,
                                        color: '#043A66',
                                        mt: 3,
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: '-8px',
                                            left: 0,
                                            width: '100%',
                                            height: '2px',
                                            backgroundColor: '#043A66',
                                        },
                                    }}
                                >
                                    {value.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}

                    {/* Integrity - Centered */}
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mt: 4 }}>
                            <Typography
                                variant="h4"
                                component="h3"
                                sx={{
                                    fontSize: { xs: '1.25rem', lg: '1.5rem' },
                                    fontWeight: 700,
                                    mb: 2,
                                    color: '#043A66',
                                    textAlign: 'center',
                                }}
                            >
                                {VALUES[4].title}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '1rem',
                                    lineHeight: 1.6,
                                    color: '#043A66',
                                    position: 'relative',
                                    display: 'inline-block',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-8px',
                                        left: 0,
                                        width: '100%',
                                        height: '2px',
                                        backgroundColor: '#043A66',
                                    },
                                }}
                            >
                                {VALUES[4].description}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};