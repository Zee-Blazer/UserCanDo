import { HowItWorksStep } from '@/types/landing-page';
import {
    Box,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface StepCardProps {
    step: HowItWorksStep;
    variant?: 'investor' | 'business';
    iconBgColor?: string;
    iconBorderRadius?: number | string;
}

export const StepCard: React.FC<StepCardProps> = ({ step, variant = 'investor', iconBgColor, iconBorderRadius }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 3, md: 4 },
                height: '100%',
                borderRadius: { xs: 2, md: 3 },
                bgcolor: 'white',
                border: '1px solid #E5E7EB',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }
            }}
        >
            {/* Icon */}
            <Box
                sx={{
                    width: { xs: 50, md: 60 },
                    height: { xs: 50, md: 60 },
                    bgcolor: iconBgColor || (variant === 'investor' ? '#E8F5E8' : '#FFF0E6'),
                    borderRadius: iconBorderRadius !== undefined ? iconBorderRadius : '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: { xs: 2, md: 3 }
                }}
            >
                <Image
                    src={step.icon}
                    alt={`${step.title} icon`}
                    width={isMobile ? 24 : 28}
                    height={isMobile ? 24 : 28}
                />
            </Box>

            {/* Content */}
            <Typography
                variant="h6"
                sx={{
                    fontSize: { xs: '1.125rem', md: '1.25rem' },
                    fontWeight: 600,
                    color: '#043A66',
                    mb: { xs: 1.5, md: 2 }
                }}
            >
                {step.title}
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    color: '#043A66',
                    lineHeight: 1.6
                }}
            >
                {step.description}
            </Typography>
        </Paper>
    );
};