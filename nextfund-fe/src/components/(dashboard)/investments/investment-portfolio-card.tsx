import { AccessTime } from '@mui/icons-material';
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
import { InvestmentStatusChip } from './investment-status';

type InvestmentStatus = 'ACTIVE' | 'IN PROGRESS' | 'EXITED';

interface InvestmentPortfolioCardProps {
    investment: Investment;
    status: InvestmentStatus;
    amountInvested?: number;
    investedDate?: string;
    dueDiligenceStatus?: string;
}

export const InvestmentPortfolioCard: React.FC<InvestmentPortfolioCardProps> = ({
    investment,
    status,
    amountInvested,
    investedDate,
    dueDiligenceStatus
}) => {
    const router = useRouter();

    // Fixed getCategoryIcon function to use proper icon paths
    const getCategoryIcon = (category: Investment['category']): string => {
        const iconMap: Record<string, string> = {
            FINTECH: '/coins-s.png',
            AGRICULTURE: '/plant-s.png',
            HEALTHCARE: '/health.png',
            'REAL ESTATE': '/house.png',
            LOGISTICS: '/coins-s.png',
            ENERGY: '/plant-s.png',
        };
        return iconMap[category as keyof typeof iconMap] || '/coins-s.png';
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
                return undefined; // No fallback - return undefined if status is unknown
        }
    };

    // Normalize Expected ROI to remove decimal points if present and ensure "%" is always present
    const expectedROIText = React.useMemo(() => {
        const raw = (investment as any)?.expectedROI;
        if (typeof raw === 'number') {
            return `${Math.round(raw)}%`;
        }
        if (typeof raw === 'string' && raw.trim()) {
            // Replace any numeric with its rounded integer (handles single values like "18.5%" and ranges like "12.5-18.9%")
            let formatted = raw.replace(/\d+(?:\.\d+)?/g, (n) => String(Math.round(parseFloat(n))));
            // Ensure "%" is appended if missing
            if (!formatted.endsWith('%')) {
                formatted = `${formatted}%`;
            }
            return formatted;
        }
        // Return "0%" if no data
        return '0%';
    }, [investment]);

    return (
        <Paper
            elevation={1}
            sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: '16px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #f0f0f0',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                },
            }}
        >
            {/* Header with category and status */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 1.5, sm: 2 } }}>
                <Chip
                    label={investment.category}
                    size="small"
                    sx={{
                        color: '#043A66',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #F5F5F5',
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        fontWeight: 500,
                        '& .MuiChip-label': {
                            px: { xs: 0.5, sm: 1 },
                        },
                    }}
                    icon={
                        <Image
                            src={getCategoryIcon(investment.category)}
                            alt={investment.category}
                            width={10}
                            height={10}
                            style={{ marginLeft: '4px' }}
                        />
                    }
                />
                <InvestmentStatusChip status={status} />
            </Box>

            {/* Investment title and location */}
            <Typography
                variant="h6"
                component="h3"
                sx={{
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    fontWeight: 700,
                    mb: 0.5,
                    color: '#1E1E1E',
                }}
            >
                {investment.title}
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
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

            {/* Invested date */}
            {investedDate && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        mb: 1,
                    }}
                >
                    <AccessTime sx={{ fontSize: { xs: '14px', sm: '16px' }, color: '#6A6A6A' }} />
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            color: '#6A6A6A',
                        }}
                    >
                        Invested on {investedDate}
                    </Typography>
                </Box>
            )}

            {/* Due Diligence Status */}
            {dueDiligenceStatus && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        mb: { xs: 1.5, sm: 2 },
                    }}
                >
                    <Image
                        src="/carbon-document.png"
                        alt="Document"
                        width={14}
                        height={14}
                    />
                    {dueDiligenceStatus && getDueDiligenceLabel(dueDiligenceStatus) && (
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                color: getDueDiligenceColor(dueDiligenceStatus) || '#666',
                                fontWeight: 500,
                            }}
                        >
                            Due Diligence: {getDueDiligenceLabel(dueDiligenceStatus)}
                        </Typography>
                    )}
                </Box>
            )}

            {/* Performance section */}
            <Box sx={{ mb: { xs: 2, sm: 3 }, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' }, color: '#666' }}
                    >
                        Performance
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
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
                        height: { xs: 6, sm: 8 },
                        borderRadius: 4,
                        backgroundColor: '#043A6614',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#043A66',
                            borderRadius: 4,
                        },
                    }}
                />
            </Box>

            {/* Amount and ROI grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: { xs: 1.5, sm: 2 },
                    pt: 2,
                    borderTop: '1px solid #f0f0f0',
                    mb: { xs: 2, sm: 3 },
                }}
            >
                <Box>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
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
                            color: '#1E1E1E',
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        }}
                    >
                        {formatCurrency(amountInvested || 0)}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
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
                            color: '#1E1E1E',
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        }}
                    >
                        {expectedROIText || '0%'}
                    </Typography>
                </Box>
            </Box>

            {/* View details button */}
            <CustomButton
                variant="outline"
                fullWidth
                onClick={() => router.push(`/dashboard/opportunities/${investment.id}?source=investments`)}
                sx={{
                    border: '2px solid #33CC33',
                    color: '#33CC33',
                    borderRadius: '12px',
                    background: '#fff',
                    fontWeight: 500,
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    py: { xs: 1, sm: 1.5 },
                    '&:hover': {
                        background: '#f8fff8',
                        borderColor: '#33CC33',
                    },
                }}
            >
                View details
            </CustomButton>
        </Paper>
    );
};