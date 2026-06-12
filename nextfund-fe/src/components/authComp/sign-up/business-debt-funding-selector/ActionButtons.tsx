import { Box } from '@mui/material';
import React from 'react';
import { CustomButton } from '../../../General/ui';
import type { ActionButtonsProps } from './types';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    isFormValid,
    onContinue
}) => {
    return (
        <Box sx={{ mt: 4 }}>
            <CustomButton
                variant="primary"
                fullWidth
                onClick={onContinue}
                disabled={!isFormValid}
                sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    py: { xs: 1.5, sm: 2 },
                    borderRadius: '12px',
                    backgroundColor: isFormValid ? '#33CC33' : '#e0e0e0',
                    color: isFormValid ? '#fff' : '#999',
                    cursor: isFormValid ? 'pointer' : 'not-allowed',
                    '&:hover': {
                        backgroundColor: isFormValid ? '#45a049' : '#e0e0e0'
                    },
                    '&:disabled': {
                        backgroundColor: '#e0e0e0',
                        color: '#999'
                    }
                }}
            >
                Continue
            </CustomButton>
        </Box>
    );
};
