import { Box, Typography } from '@mui/material';
import React from 'react';

interface TotalPercentageDisplayProps {
    totalPercentage: number;
    isValid: boolean;
}

export const TotalPercentageDisplay: React.FC<TotalPercentageDisplayProps> = ({ 
    totalPercentage, 
    isValid 
}) => {
    return (
        <Box
            sx={{
                p: 2,
                backgroundColor: isValid ? '#e8f5e9' : '#fff3e0',
                borderRadius: '8px',
                mb: 3
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    fontWeight: 600,
                    color: isValid ? '#2e7d32' : '#e65100',
                    textAlign: 'center'
                }}
            >
                Total: {totalPercentage}%
                {!isValid && totalPercentage !== 0 && (
                    <Typography
                        component="span"
                        sx={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: 400,
                            mt: 0.5
                        }}
                    >
                        (Must equal 100%)
                    </Typography>
                )}
            </Typography>
        </Box>
    );
};
