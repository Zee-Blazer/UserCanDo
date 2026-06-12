import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { MISSION } from '@/constants/about-us-data';

export const Mission: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, lg: 12 },
                px: { xs: 2, sm: 3, lg: 4 },
            }}
        >
            <Box
                sx={{
                    maxWidth: '1000px',
                    mx: 'auto',
                    backgroundColor: 'white',
                    borderRadius: 7,
                    p: { xs: 4, md: 6, lg: 8 },
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
            >
                <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
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
                        {MISSION.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            lineHeight: 1.6,
                            color: '#043A66',
                        }}
                    >
                        {MISSION.description}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};