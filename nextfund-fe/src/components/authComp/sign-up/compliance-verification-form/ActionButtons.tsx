import { Box } from '@mui/material';
import React from 'react';
import { CustomButton } from '../../../General/ui';
import type { ActionButtonsProps } from './types';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    onBack,
    isFormValid,
    onSubmit
}) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <CustomButton
                variant="outline"
                fullWidth
                onClick={onBack}
                sx={{ py: 2, fontSize: '1.1rem', order: { xs: 2, sm: 1 } }}
            >
                Back to Documents
            </CustomButton>

            <CustomButton
                variant="primary"
                fullWidth
                onClick={onSubmit}
                disabled={!isFormValid}
                sx={{ py: 2, fontSize: '1.1rem', order: { xs: 1, sm: 2 } }}
            >
                Submit for Review
            </CustomButton>
        </Box>
    );
};
