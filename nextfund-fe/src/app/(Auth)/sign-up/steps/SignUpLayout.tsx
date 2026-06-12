"use client";
import { Box, Paper } from '@mui/material';
import React, { useEffect, useRef } from 'react';

interface SignUpLayoutProps {
    userType: 'investor' | 'business';
    currentStep: string;
    children: React.ReactNode;
}

const isBusinessFlowStep = (step: string) => (
    step === 'form' ||
    step === 'funding' ||
    step === 'options' ||
    step === 'debt-details' ||
    step === 'hybrid-funding' ||
    step === 'company-metrics' ||
    step === 'use-of-funds' ||
    step === 'review-application' ||
    step === 'finalize-application' ||
    step === 'compliance-verification' ||
    step === 'investment-terms-preferences' ||
    step === 'application-summary' ||
    step === 'application-submitted-success'
);

const getMaxWidth = (step: string) => {
    if (isBusinessFlowStep(step)) {
        return { xs: '100%', sm: 650, md: 750 } as const;
    }
    return { xs: '100%', sm: 600, md: 700 } as const;
};

export const SignUpLayout: React.FC<SignUpLayoutProps> = ({ userType, currentStep, children }) => {
    const useNaturalFlow = true;
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
       
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
        
        containerRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, [userType, currentStep]);

    return (
        <Box
            sx={{
                backgroundColor: '#043A66',
                backgroundImage: 'url(/pattern.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: 'auto',
                display: 'block',
                p: { xs: 2, sm: 3 },
                pt: { xs: 4, sm: 5, md: 6 },
                height: 'auto',
                backgroundAttachment: 'scroll',
            }}
            ref={containerRef}
        >
            <Paper
                elevation={24}
                sx={{
                    p: { xs: 3, sm: 4, md: 5 },
                    borderRadius: { xs: '16px', sm: '24px' },
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    ...(useNaturalFlow ? {
                        maxWidth: { xs: '100%', sm: '85%', md: '70%', lg: '60%' },
                        width: '100%',
                        mx: 'auto',
                        height: 'auto',
                        minHeight: 'auto',
                        maxHeight: 'none',
                        overflow: 'visible',
                        position: 'relative',
                        display: 'block',
                    } : {
                        maxWidth: getMaxWidth(currentStep),
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }),
                }}
            >
                {children}
            </Paper>
        </Box>
    );
};

export default SignUpLayout;


