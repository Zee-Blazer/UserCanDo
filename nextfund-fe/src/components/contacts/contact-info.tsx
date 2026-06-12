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
import React, { useState } from 'react';

// Contact Info Component
export const ContactInfo: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const contactCards = [
        {
            id: 1,
            title: 'General Inquiries',
            icon: '/g-message.png',
            email: 'hello@nexfund.com',
            phone: '+254 (0) 700 123 456',
            whatsapp: '+254 (0) 700 123 456',
        },
        {
            id: 2,
            title: 'Investment Support',
            icon: '/invest-support.png',
            email: 'investors@nexfund.com',
            phone: '+234 (0) 1234 5678',
            hours: 'Mon-Fri, 9 AM - 6 PM WAT/EAT',
        },
        {
            id: 3,
            title: 'Business Applications',
            icon: '/business-notes.png',
            email: 'companies@nexfund.com',
            phone: '+233 (0) 30 123 4567',
            whatsapp: '+233 (0) 30 123 4567',
        },
    ];

    return (
        <Box sx={{ mb: 6 }}>
            <Grid container spacing={3}>
                {contactCards.map((card) => (
                    <Grid size={{ xs: 12, md: 4 }} key={card.id}>
                        <Card
                            sx={{
                                height: '100%',
                                backgroundColor: '#F8F9FA',
                                border: '1px solid #E5E7EB',
                                borderRadius: 7,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: theme.shadows[4],
                                },
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
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
                                            src={card.icon}
                                            alt={card.title}
                                            width={24}
                                            height={24}
                                        />
                                    </Box>

                                    {/* Text content below the image */}
                                    <Box sx={{ alignSelf: 'flex-start' }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '1.125rem',
                                                fontWeight: 700,
                                                color: '#043A66',
                                                mb: 2,
                                            }}
                                        >
                                            {card.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{ fontSize: '0.875rem', color: '#043A66' }}
                                            >
                                                Email: {card.email}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ fontSize: '0.875rem', color: '#043A66' }}
                                            >
                                                Phone: {card.phone}
                                            </Typography>
                                            {card.whatsapp && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontSize: '0.875rem', color: '#043A66' }}
                                                >
                                                    WhatsApp: {card.whatsapp}
                                                </Typography>
                                            )}
                                            {card.hours && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontSize: '0.875rem', color: '#043A66' }}
                                                >
                                                    Hours: {card.hours}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};