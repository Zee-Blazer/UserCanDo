import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

interface NextStepsProps {
    steps: string[];
}

export const NextSteps: React.FC<NextStepsProps> = ({ steps }) => {
    return (
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: '#333',
                    fontSize: '1rem'
                }}
            >
                Next Steps
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {steps.map((step, index) => (
                    <Box key={index}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                fontSize: '0.8rem',
                                lineHeight: 1.5,
                                mb: 2
                            }}
                        >
                            {step}
                        </Typography>
                        {index < steps.length - 1 && (
                            <Divider sx={{ borderColor: '#f0f0f0', my: 2 }} />
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
