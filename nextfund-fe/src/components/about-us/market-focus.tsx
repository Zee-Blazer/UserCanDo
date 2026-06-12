
import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { MARKET_FOCUS } from '@/constants/about-us-data';

export const MarketFocus: React.FC = () => {
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
                        mb: 4,
                        color: '#043A66',
                        textAlign: 'center',
                    }}
                >
                    Market Focus
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: '#043A66',
                        textAlign: 'center',
                        mb: 8,
                        maxWidth: '800px',
                        mx: 'auto',
                    }}
                >
                    Nexfund operates across key African markets with particular expertise in:
                </Typography>

                <Grid container spacing={{ xs: 3, lg: 4 }}>
                    {MARKET_FOCUS.map((focus) => (
                        <Grid size={{ xs: 12, md: 6 }} key={focus.id}>
                            <Box>
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    sx={{
                                        fontSize: { xs: '1.125rem', lg: '1.25rem' },
                                        fontWeight: 600,
                                        color: '#043A66',
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: '-8px',
                                            left: 0,
                                            width: '100%',
                                            height: '1px',
                                            backgroundColor: '#043A66',
                                        },
                                        pb: 2,
                                    }}
                                >
                                    {focus.sector}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};