import { Box } from '@mui/material';
import React from 'react';
import { CustomButton } from '../../../General/ui';
import type { ActionButtonsProps } from './types';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    onBackToEdit,
    onContinue
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' }
            }}
        >
            <CustomButton
                variant="outline"
                fullWidth
                onClick={onBackToEdit}
                sx={{ py: 2, fontSize: '1rem' }}
            >
                Back to Edit Application
            </CustomButton>
            <CustomButton
                variant="primary"
                fullWidth
                onClick={onContinue}
                sx={{ py: 2, fontSize: '1rem' }}
            >
                Continue to Final Summary
            </CustomButton>
        </Box>
    );
};
