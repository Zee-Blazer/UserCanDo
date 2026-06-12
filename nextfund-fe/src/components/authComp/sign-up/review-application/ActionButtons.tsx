import { Box } from '@mui/material';
import React from 'react';
import { CustomButton } from '../../../General/ui';

interface ActionButtonsProps {
    onSaveDraft: () => void;
    onContinue: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onSaveDraft, onContinue }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                mt: { xs: 2, sm: 3 }
            }}
        >
            {/* <CustomButton
                variant="outline"
                fullWidth
                onClick={onSaveDraft}
                sx={{
                    py: 1.5,
                    fontSize: '0.875rem'
                }}
            >
                Save as Draft
            </CustomButton> */}
            <CustomButton
                variant="primary"
                fullWidth
                onClick={onContinue}
                sx={{
                    py: 1.5,
                    fontSize: '0.875rem'
                }}
            >
                Continue to Documents
            </CustomButton>
        </Box>
    );
};
