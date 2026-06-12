import {
    Box,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { KeyMetric } from '../../types/landing-page';

export const KeyMetricsSection: React.FC<{ metrics: KeyMetric[] }> = ({ metrics }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const hasMetrics = Array.isArray(metrics) && metrics.length > 0;

    return (
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
            {/* Top line */}
            <Box sx={{ height: 2, width: '100%', background: '#E0E0E0', borderRadius: 2, mb: { xs: 2, md: 3 } }} />
            <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    color: '#043A66'
                }}
            >
                Key Metrics
            </Typography>
            {hasMetrics ? (
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {metrics.map((metric, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 2, md: 3 },
                                    textAlign: 'left',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: { xs: '8px', md: '12px' },
                                    border: '1px solid #E0E0E0',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#043A66',
                                        boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)',
                                        transform: 'translateY(-4px)'
                                    }
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mb: { xs: 0.5, md: 1 },
                                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                                        color: '#043A66'
                                    }}
                                >
                                    {metric.label}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    fontWeight={600}
                                    sx={{
                                        fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                                        color: '#043A66'
                                    }}
                                >
                                    {metric.value}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: { xs: '0.85rem', md: '0.95rem' },
                        color: '#6A6A6A',
                        mb: { xs: 2, md: 3 }
                    }}
                >
                    Key metrics have not been provided for this listing yet.
                </Typography>
            )}
            {/* Bottom line */}
            <Box sx={{ height: 2, width: '100%', background: '#E0E0E0', borderRadius: 2, mt: { xs: 2, md: 3 } }} />
        </Box>
    );
};