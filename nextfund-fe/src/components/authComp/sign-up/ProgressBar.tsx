import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react';

interface ProgressBarProps {
    currentStep: string;
    userType: 'investor' | 'business';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, userType }) => {
    
    if (userType === 'investor') {
        return null;
    }

    // Define steps for business sign-up (removed Funding Type step)
    const businessSteps = [
        { key: 'form', label: 'Company Info', number: 1 },
        { key: 'options', label: 'Funding Options', number: 2 },
        { key: 'debt-details', label: 'Funding Options', number: 2 },
        { key: 'hybrid-funding', label: 'Funding Options', number: 2 },
        { key: 'company-metrics', label: 'Company Metrics', number: 3 },
        { key: 'use-of-funds', label: 'Use of Funds', number: 4 },
        { key: 'review-application', label: 'Review Application', number: 5 },
        { key: 'finalize-application', label: 'Finalize Application', number: 6 },
        { key: 'compliance-verification', label: 'Compliance Verification', number: 7 },
        { key: 'investment-terms-preferences', label: 'Investment Terms', number: 8 },
        { key: 'application-summary', label: 'Application Summary', number: 9 },
        { key: 'application-submitted-success', label: 'Success', number: 10 },
    ];

    const currentStepIndex = businessSteps.findIndex(step => step.key === currentStep);
    const currentStepNumber = currentStepIndex !== -1 ? businessSteps[currentStepIndex].number : 1;
    const totalSteps = 10;
    const progressPercentage = ((currentStepNumber - 1) / (totalSteps - 1)) * 100;

    return (
        <Box sx={{ mb: 4, px: { xs: 2, sm: 0 } }}>
            {/* Progress Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                    Step {currentStepNumber} of {totalSteps}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                    {Math.round(progressPercentage)}% Complete
                </Typography>
            </Box>

            {/* Progress Bar */}
            <Box sx={{ mb: 2 }}>
                <LinearProgress
                    variant="determinate"
                    value={progressPercentage}
                    sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            backgroundColor: '#4CAF50',
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default ProgressBar;
