import { Box } from '@mui/material';
import React from 'react';
import { CustomButton } from '../../../General/ui';
import type { ActionButtonsProps } from './types';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    selectedFunding,
    onContinue
}) => {
    const isDisabled = !selectedFunding;

    return (
        <Box sx={{ width: '100%' }}>
            <CustomButton
                variant="primary"
                fullWidth
                onClick={onContinue}
                disabled={isDisabled}
                sx={{
                    fontSize: { xs: '0.9rem', sm: '0.95rem' },
                    py: { xs: 1.5, sm: 1.75 },
                    borderRadius: { xs: '12px', sm: '16px' },
                    fontWeight: 600,
                    backgroundColor: isDisabled ? '#ccc' : '#4CAF50',
                    '&:hover': {
                        backgroundColor: isDisabled ? '#ccc' : '#45a049',
                    },
                }}
            >
                Continue
            </CustomButton>
        </Box>
    );
};
