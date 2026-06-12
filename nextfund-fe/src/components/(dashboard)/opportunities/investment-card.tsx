'use client';

import {
    Box,
    Button,
    Chip,
    LinearProgress,
    Paper,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCountryByCode } from '../../../constants/countries';
import { Investment } from '../../../types/landing-page';

interface InvestmentCardProps {
    investment: Investment;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment }) => {
    const router = useRouter();

    const getCategoryIcon = (category: Investment['category']) => {
        const iconMap = {
            FINTECH: '/coins-s.png',
            AGRICULTURE: '/plant-s.png',
            HEALTHCARE: '/health.png',
            'REAL ESTATE': '/house.png',
            LOGISTICS: '/coins-s.png',
            ENERGY: '/plant-s.png',
            'Technology': '/coins-s.png',
            'Agriculture': '/plant-s.png',
            'Healthcare': '/health.png',
            'Real Estate': '/house.png',
            'Logistics': '/coins-s.png',
            'Energy': '/plant-s.png',
            'Manufacturing': '/coins-s.png',
            'Hospitality': '/house.png',
        };
        return iconMap[category];
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleViewOpportunity = () => {
        router.push(`/dashboard/opportunities/${investment.id}`);
    };

    const formatCategory = (category: string) => {
        // Handle both old format (FINTECH) and new format (Technology)
        if (category.includes('_')) {
            return category.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
        }
        return category; // Return as is for new format
    };

    const formatCountryDisplay = (location: string | undefined) => {
        // Helper to check if a value is a valid location (not invalid placeholder text)
        const isValidLocation = (value: string | undefined | null): boolean => {
            if (!value) return false;
            const trimmed = value.trim().toLowerCase();
            const invalidValues = ['none', 'null', 'n/a', 'na', 'growth', 'funding', 'lorem ipsum', 'unknown', 'not provided', 'not specified'];
            return !invalidValues.includes(trimmed) && trimmed.length > 0;
        };

        // Helper to convert country code to country name
        const formatCountryName = (loc: string | undefined): string => {
            if (!loc) return 'Unknown Location';
            const trimmed = String(loc).trim();
            if (!trimmed) return 'Unknown Location';
            // Check if it's a country code (2-3 letters, case-insensitive)
            const upperTrimmed = trimmed.toUpperCase();
            if (/^[A-Z]{2,3}$/.test(upperTrimmed)) {
                const country = getCountryByCode(upperTrimmed);
                return country?.name || trimmed;
            }
            return trimmed;
        };

        if (!location) return 'Unknown Location';
        const formatted = formatCountryName(location);
        return isValidLocation(formatted) ? formatted : 'Unknown Location';
    };

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                borderRadius: '16px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                border: '1px solid #F3F4F6',
                '&:hover': {
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                    borderColor: '#E5E7EB',
                },
            }}
        >
            {/* Category Badge */}
            <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {investment.category && (
                    <Chip
                        component="div"
                        icon={
                            getCategoryIcon(investment.category) ? (
                                <Image
                                    src={getCategoryIcon(investment.category)!}
                                    alt={investment.category}
                                    width={16}
                                    height={16}
                                />
                            ) : undefined
                        }
                        label={formatCategory(investment.category)}
                        size="small"
                        sx={{
                            color: '#043A66',
                            backgroundColor: 'transparent',
                            border: '1px solid #E5E7EB',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            '& .MuiChip-icon': {
                                marginLeft: '8px',
                            },
                        }}
                    />
                )}
                {investment.isSharesCompliant && (
                    <Chip
                        label="Sharia-compliant"
                        size="small"
                        variant="outlined"
                        sx={{
                            fontSize: '10px',
                            color: '#043A66',
                            borderColor: '#E5E7EB',
                        }}
                    />
                )}
            </Box>

            {/* Title and Location */}
            <Typography
                variant="h6"
                component="h3"
                sx={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    mb: 1,
                    color: '#043A66',
                    lineHeight: 1.3,
                }}
            >
                {investment.title}
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    fontSize: '0.875rem',
                    mb: 1,
                    color: '#6A6A6A',
                }}
            >
                {(() => {
                    // Helper to check if a value is a valid location (not invalid placeholder text)
                    const isValidLocation = (value: string | undefined | null): boolean => {
                        if (!value) return false;
                        const trimmed = value.trim().toLowerCase();
                        const invalidValues = ['none', 'null', 'n/a', 'na', 'growth', 'funding', 'lorem ipsum', 'unknown', 'not provided', 'not specified'];
                        return !invalidValues.includes(trimmed) && trimmed.length > 0;
                    };

                    // Prioritize location over headquarters, but only if location is valid
                    const location = investment.location;
                    const headquarters = investment.headquarters;
                    
                    if (isValidLocation(location)) {
                        return formatCountryDisplay(location);
                    }
                    if (isValidLocation(headquarters)) {
                        return formatCountryDisplay(headquarters);
                    }
                    return 'Unknown Location';
                })()}
            </Typography>

            {/* Description */}
            <Typography
                variant="body2"
                sx={{
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    color: '#043A66',
                    mb: 3,
                    flexGrow: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
            >
                {investment.description}
            </Typography>

            {/* Funding Progress */}
            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '0.875rem', color: '#6A6A6A' }}
                    >
                        Funding progress
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: '#043A66',
                        }}
                    >
                        {investment.fundingProgress}%
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={investment.fundingProgress}
                    sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#E5E7EB',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#043A66',
                            borderRadius: 4,
                        },
                    }}
                />
            </Box>

            {/* Investment Metrics */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    pt: 2,
                    borderTop: '1px solid #F3F4F6',
                    mb: 3,
                }}
            >
                <Box>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            mb: 0.5,
                            color: '#6A6A6A',
                            display: 'block',
                        }}
                    >
                        Target Amount
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            color: '#043A66',
                            fontSize: '0.875rem',
                        }}
                    >
                        {formatCurrency(investment.targetAmount)}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            mb: 0.5,
                            color: '#6A6A6A',
                            display: 'block',
                        }}
                    >
                        Expected ROI
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            color: '#043A66',
                            fontSize: '0.875rem',
                        }}
                    >
                        {investment.expectedROI}
                    </Typography>
                </Box>
            </Box>

            {/* CTA Button */}
            <Button
                variant="contained"
                size="small"
                fullWidth
                onClick={handleViewOpportunity}
                sx={{
                    backgroundColor: '#33CC33',
                    color: 'white',
                    fontWeight: 500,
                    borderRadius: '9999px',
                    textTransform: 'none',
                    py: 1.5,
                    '&:hover': {
                        backgroundColor: '#28a428',
                    },
                }}
            >
                View opportunity
            </Button>
        </Paper>
    );
};