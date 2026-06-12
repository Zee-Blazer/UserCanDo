import { Box, Typography } from '@mui/material';
import React from 'react';

interface AfterApprovalSectionProps {
    afterApprovalSteps: string[];
}

export const AfterApprovalSection: React.FC<AfterApprovalSectionProps> = ({ afterApprovalSteps }) => {
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
                What Happens After Approval
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {afterApprovalSteps.map((step, index) => (
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
                                fontSize: '0.8rem',
                                fontWeight: 400
                            }}
                        >
                            {step}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
