import React from 'react';
import { CustomButton } from '../../../General/ui';
import type { ActionButtonsProps } from './types';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    isFormValid,
    onSubmit
}) => {
    return (
        <CustomButton
            variant="primary"
            fullWidth
            onClick={onSubmit}
            disabled={!isFormValid}
            sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
                py: { xs: 1.5, sm: 2 },
                borderRadius: '12px',
                backgroundColor: isFormValid ? '#33CC33' : '#E0E0E0',
                color: isFormValid ? '#FFFFFF' : '#9E9E9E',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                '&:hover': {
                    backgroundColor: isFormValid ? '#45a049' : '#E0E0E0'
                },
                '&.Mui-disabled': {
                    backgroundColor: '#E0E0E0',
                    color: '#9E9E9E'
                }
            }}
        >
            Continue
        </CustomButton>
    );
};
