
import {
    Box,
    Card,
    CardContent,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { LEADERSHIP } from '@/constants/about-us-data';

export const LeadershipTeam: React.FC = () => {
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
                <Card
                    sx={{
                        backgroundColor: '#F5F8FF',
                        border: 'none',
                        boxShadow: 'none',
                        borderRadius: 7,
                    }}
                >
                    <CardContent
                        sx={{
                            p: { xs: 4, lg: 6 },
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
                            }}
                        >
                            {LEADERSHIP.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                lineHeight: 1.6,
                                color: '#043A66',
                            }}
                        >
                            {LEADERSHIP.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};