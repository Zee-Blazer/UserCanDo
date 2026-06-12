import { Box, Typography } from '@mui/material';
import React from 'react';
import type { WhatHappensNextProps } from './types';

export const WhatHappensNext: React.FC<WhatHappensNextProps> = ({ steps }) => {
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
                What Happens Next
            </Typography>

            {steps.map((step, index) => (
                <Box key={index} sx={{ mb: index === steps.length - 1 ? 4 : 3 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                    >
                        {step.title}
                    </Typography>
                    <Box sx={{ ml: 2 }}>
                        {step.items.map((item, itemIndex) => (
                            <Typography
                                key={itemIndex}
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: itemIndex === step.items.length - 1 ? 0 : 0.5 }}
                            >
                                • {item}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};
