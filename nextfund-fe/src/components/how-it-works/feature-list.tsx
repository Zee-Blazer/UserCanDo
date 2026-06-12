import { SecurityFeature, WhyChooseFeature } from '@/types/landing-page';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface FeatureListProps {
    features: SecurityFeature[] | WhyChooseFeature[];
    variant?: 'security' | 'why-choose';
}

export const FeatureList: React.FC<FeatureListProps> = ({ features, variant = 'security' }) => {
    const iconBgColor = variant === 'security' ? '#043A66' : '#33CC33';

    return (
        <Box sx={{ space: 2 }}>
            {features.map((feature: any, index) => (
                <Box key={feature.id} sx={{ mb: { xs: 2, md: 3 } }}>
                    {variant === 'security' ? (
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                                <Box
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        bgcolor: iconBgColor,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        mt: 0.5
                                    }}
                                >
                                    <Typography sx={{ color: 'white', fontSize: '0.75rem', fontWeight: 600 }}>
                                        ✓
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '1rem', md: '1.125rem' },
                                        fontWeight: 600,
                                        color: '#043A66',
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    color: '#043A66',
                                    lineHeight: 1.5,
                                    ml: 0,
                                    whiteSpace: 'pre-line',
                                }}
                            >
                                {feature.description}
                            </Typography>
                            {/* Add orange line under security descriptions */}
                            {variant === 'security' && feature.id !== "3" && (
                                <Box sx={{
                                    mt: 1.5,
                                    mb: 0.5,
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    ml: 0,
                                }}>
                                    <Box sx={{
                                        height: 2,
                                        width: '100%',
                                        maxWidth: 480,
                                        bgcolor: '#FFB121',
                                        borderRadius: 2,
                                    }} />
                                </Box>
                            )}
                        </Box>
                    ) : feature.icon ? (
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                                <Box sx={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image src={feature.icon} alt={feature.title + ' icon'} width={28} height={28} />
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '1rem', md: '1.125rem' },
                                        fontWeight: 600,
                                        color: '#043A66',
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    color: '#043A66',
                                    lineHeight: 1.5,
                                    ml: 0,
                                    whiteSpace: 'pre-line',
                                }}
                            >
                                {feature.description}
                            </Typography>
                            {/* Add green line under why-choose descriptions */}
                            {(feature.description === "Access to pre-screened, high-potential businesses\nacross various sectors." ||
                                feature.description === "Support from our team of investment professionals throughout\nthe process.") && (
                                    <Box sx={{
                                        mt: 1.5,
                                        mb: 0.5,
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        ml: 0,
                                    }}>
                                        <Box sx={{
                                            height: 2,
                                            width: '100%',
                                            maxWidth: 445,
                                            bgcolor: '#33CC33',
                                            borderRadius: 2,
                                        }} />
                                    </Box>
                                )}
                        </Box>
                    ) : null}
                </Box>
            ))}
        </Box>
    );
};