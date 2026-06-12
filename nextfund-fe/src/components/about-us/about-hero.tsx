
import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { ABOUT_HERO } from '@/constants/about-us-data';

export const AboutHero: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, lg: 12 },
                backgroundColor: '#043A6614',
            }}
        >
            <Box
                sx={{
                    maxWidth: '1200px',
                    mx: 'auto',
                    px: { xs: 2, sm: 3, lg: 4 },
                }}
            >
                <Box sx={{ textAlign: 'center', maxWidth: '900px', mx: 'auto' }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem', lg: '2.5rem' },
                            fontWeight: 700,
                            mb: 4,
                            color: '#043A66',
                            lineHeight: 1.2,
                        }}
                    >
                        {ABOUT_HERO.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            lineHeight: 1.6,
                            color: '#043A66',
                            maxWidth: '800px',
                            mx: 'auto',
                        }}
                    >
                        {ABOUT_HERO.description}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};