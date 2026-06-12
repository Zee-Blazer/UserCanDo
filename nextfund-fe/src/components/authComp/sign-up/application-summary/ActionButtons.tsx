import { Box } from '@mui/material';
import React from 'react';
import { CustomButton } from '../../../General/ui';
import type { ActionButtonsProps } from './types';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    onEditApplication,
    onSubmitApplication,
    onSaveDraft,
    isSubmitting
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
                onClick={onEditApplication}
                sx={{ py: 2, fontSize: '1rem' }}
            >
                Edit Application
            </CustomButton>
            <CustomButton
                variant="primary"
                fullWidth
                onClick={onSubmitApplication}
                sx={{ py: 2, fontSize: '1rem' }}
                disabled={isSubmitting}
                isLoading={isSubmitting}
            >
                Submit Application
            </CustomButton>
            {/* <CustomButton
                variant="secondary"
                fullWidth
                onClick={onSaveDraft}
                sx={{ py: 2, fontSize: '1rem', border: '1px solid #6A6A6A' }}
            >
                Save as Draft
            </CustomButton> */}
        </Box>
    );
};
