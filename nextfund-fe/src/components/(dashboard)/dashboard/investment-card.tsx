import {
    Box,
    Chip,
    LinearProgress,
    Paper,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { getCountryByCode } from '../../../constants/countries';
import { Investment } from '../../../types/landing-page';
import { CustomButton } from '../../General/ui';


export const InvestmentCard: React.FC<{
    investment: Investment;
    isRecommended?: boolean;
    amountInvested?: number;
    dueDiligenceStatus?: string;
    investedDate?: string;
}> = ({ investment, isRecommended = false, amountInvested, dueDiligenceStatus, investedDate }) => {
    const router = useRouter();


    const expectedROIText = React.useMemo(() => {
        const raw: any = (investment as any)?.expectedROI;
        if (typeof raw === 'number') {
            return `${Math.round(raw)}%`;
        }
        if (typeof raw === 'string' && raw.trim()) {
            return raw.replace(/\d+(?:\.\d+)?/g, (n) => String(Math.round(parseFloat(n))));
        }
        // Return "0%" if no data
        return '0%';
    }, [investment]);

    const handleViewOpportunity = () => {

        const listingId = investment.listing_id || investment.id;
        if (!listingId || listingId === 'undefined') {
            return;
        }

        const sourceParam = isRecommended ? 'opportunities' : 'investments';
        router.push(`/dashboard/opportunities/${listingId}?source=${sourceParam}`);
    };
    const getCategoryIcon = (category: Investment['category']): string => {
        const iconMap = {
            FINTECH: 'coins-s',
            AGRICULTURE: 'plant-s',
            HEALTHCARE: 'health',
            'REAL ESTATE': 'house',
            LOGISTICS: 'coins-s',
            ENERGY: 'plant-s',
            'Technology': 'coins-s',
            'Agriculture': 'plant-s',
            'Healthcare': 'health',
            'Real Estate': 'house',
            'Logistics': 'coins-s',
            'Energy': 'plant-s',
            'Manufacturing': 'coins-s',
            'Hospitality': 'house',
        };
        return iconMap[category] || 'coins-s';
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getDueDiligenceLabel = (status: string): string | undefined => {
        if (!status) return undefined;
        switch (status.toLowerCase()) {
            case 'pending':
                return 'Pending';
            case 'in_progress':
                return 'In Progress';
            case 'completed':
                return 'Completed';
            case 'failed':
                return 'Failed';
            default:
                return undefined; // No fallback - return undefined if status is unknown
        }
    };

    const getDueDiligenceColor = (status: string): string | undefined => {
        if (!status) return undefined;
        switch (status.toLowerCase()) {
            case 'pending':
                return '#FFB121';
            case 'in_progress':
                return '#3772FF';
            case 'completed':
                return '#10B981';
            case 'failed':
                return '#EF4444';
            default:
                return undefined;
        }
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
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                },
            }}
        >
            <Box sx={{ mb: 2 }}>
                <Chip
                    icon={
                        <Image
                            src={`/${getCategoryIcon(investment.category)}.png`}
                            alt={investment.category}
                            width={16}
                            height={16}
                        />
                    }
                    label={investment.category}
                    size="small"
                    sx={{
                        color: '#043A66',
                        backgroundColor: 'transparent',
                        border: '1px solid #E5E7EB',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                    }}
                />
                {investment.isSharesCompliant && (
                    <Chip
                        label="Sharia-compliant"
                        size="small"
                        variant="outlined"
                        sx={{
                            fontSize: '10px',
                            ml: 1,
                            color: '#043A66',
                            borderColor: '#E5E7EB',
                        }}
                    />
                )}
            </Box>

            <Typography
                variant="h6"
                component="h3"
                sx={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    mb: 1,
                    color: '#043A66',
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
                    const location = investment.headquarters || investment.location;
                    if (!location) return 'Unknown Location';
                    if (/^[A-Z]{2,3}$/.test(location)) {
                        const country = getCountryByCode(location);
                        return country?.name || location;
                    }
                    return location;
                })()}
            </Typography>

            {!isRecommended && investedDate && (
                <Box sx={{ mb: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '0.875rem',
                            mb: 0.5,
                            color: '#6A6A6A',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <Image src="/clock.png" alt="Clock" width={16} height={16} />
                        Invested on {investedDate}
                    </Typography>
                    {/* Due Diligence Status */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Image src="/carbon-document.png" alt="Document" width={14} height={14} />
                        {dueDiligenceStatus && getDueDiligenceLabel(dueDiligenceStatus) && (
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    color: getDueDiligenceColor(dueDiligenceStatus) || '#666',
                                    fontWeight: 500
                                }}
                            >
                                Due Diligence: {getDueDiligenceLabel(dueDiligenceStatus)}
                            </Typography>
                        )}
                    </Box>
                </Box>
            )}

            <Typography
                variant="body2"
                sx={{
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    color: '#043A66',
                    mb: 3,
                    flexGrow: 1,
                }}
            >
                {investment.description}
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '0.875rem', color: '#6A6A6A' }}
                    >
                        Performance
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
                        Amount Invested
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            color: '#043A66',
                        }}
                    >
                        {formatCurrency(amountInvested || 0)}
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
                        }}
                    >
                        {expectedROIText || '0%'}
                    </Typography>
                </Box>
            </Box>

            {isRecommended && typeof investment.closingDays === 'number' && (
                <Box sx={{ width: '100%', mb: 2 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '0.95rem',
                            color: '#33CC33',
                            textAlign: 'center',
                            py: 1.5,
                            px: 2,
                            backgroundColor: '#33CC3314',
                            border: '2px solid #33CC33',
                            borderRadius: '12px',
                            width: '100%',
                            fontWeight: 600,
                        }}
                    >
                        Closing in {investment.closingDays} days
                    </Typography>
                </Box>
            )}

            <CustomButton
                variant={isRecommended ? 'primary' : 'primary'}
                fullWidth
                onClick={handleViewOpportunity}
                sx={
                    isRecommended ? {
                        background: '#33CC33',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        width: '100%',
                        '&:hover': {
                            background: '#28a428',
                        },
                    } : {
                        border: '2px solid #33CC33',
                        color: '#33CC33',
                        borderRadius: '12px',
                        background: '#fff',
                        fontWeight: 500,
                        fontSize: '1rem',
                        width: '100%',
                        '&:hover': {
                            background: '#f6fef9',
                            borderColor: '#33CC33',
                        },
                    }
                }
            >
                {isRecommended ? 'View opportunity' : 'View details'}
            </CustomButton>
        </Paper>
    );
};