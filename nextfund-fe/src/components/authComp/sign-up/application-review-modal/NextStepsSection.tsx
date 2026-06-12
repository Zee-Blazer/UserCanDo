import { Box, Typography } from '@mui/material';
import React from 'react';

interface NextStep {
    title: string;
    description: string;
}

interface NextStepsSectionProps {
    nextSteps: NextStep[];
}

export const NextStepsSection: React.FC<NextStepsSectionProps> = ({ nextSteps }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: '#333',
                    fontSize: { xs: '0.95rem', sm: '1rem' }
                }}
            >
                Next Steps
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {nextSteps.map((step, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: '#F8F9FA',
                            borderRadius: '12px',
                            p: 3,
                            border: '1px solid #E9ECEF'
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#333',
                                fontSize: '0.85rem',
                                fontWeight: 400,
                                lineHeight: 1.5
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{
                                    fontWeight: 700,
                                    color: '#333'
                                }}
                            >
                                {step.title}
                            </Typography>{' '}
                            {step.description}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
