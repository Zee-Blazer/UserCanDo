import {
    Box,
    Card,
    CardContent,
    Typography,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import React, { useState } from 'react';

// Regional Office Component
export const RegionalOffice: React.FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{ mb: 6 }}>
            <Card
                sx={{
                    backgroundColor: '#F8F9FA',
                    border: '1px solid #E5E7EB',
                    borderRadius: 7,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: theme.shadows[4],
                    },
                }}
            >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        {/* Image at the top */}
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                                backgroundColor: '#E8F5E8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                            }}
                        >
                            <Image
                                src="/regional-location.png"
                                alt="Regional Office"
                                width={24}
                                height={24}
                            />
                        </Box>

                        {/* Text content below the image */}
                        <Box sx={{ alignSelf: 'flex-start', width: '100%' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '1.125rem',
                                    fontWeight: 700,
                                    color: '#043A66',
                                    mb: 2,
                                }}
                            >
                                Regional Office
                            </Typography>

                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: '0.875rem', color: '#043A66', mb: 1 }}
                                        >
                                            Nairobi, Kenya (Head quarters)
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: '0.875rem', color: '#043A66', mb: 1 }}
                                        >
                                            West lands, Nairobi, Kenya
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: '0.875rem', color: '#043A66' }}
                                        >
                                            Phone: +254 (0) 700 123 456
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: '0.875rem', color: '#043A66', mb: 1 }}
                                        >
                                            Monday - Friday: 8:00 AM - 6:00 PM
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: '0.875rem', color: '#043A66', mb: 1 }}
                                        >
                                            Saturday: 9:00 AM - 2:00 PM (Emergency)
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: '0.875rem', color: '#043A66' }}
                                        >
                                            Sunday: Closed
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};