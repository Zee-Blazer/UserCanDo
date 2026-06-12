import { Box, Typography } from '@mui/material';
import React from 'react';
import type { FinalStepsProps } from './types';

export const FinalSteps: React.FC<FinalStepsProps> = ({ finalSteps }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: '#333',
                    fontSize: '1.125rem'
                }}
            >
                Final Steps
            </Typography>

            {finalSteps.map((step, index) => (
                <Box
                    key={index}
                    sx={{
                        borderBottom: '1px solid #e0e0e0',
                        pb: 2,
                        mb: 2
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: '#333', mb: 0.5 }}
                    >
                        {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {step.description}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};
