import { Box } from '@mui/material';
import React from 'react';
import { CustomButton } from '../../../General/ui';

interface ActionButtonsProps {
    onEditApplication: () => void;
    onTrackStatus: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
    onEditApplication, 
    onTrackStatus 
}) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, mb: 3 }}>
            <CustomButton
                variant="outline"
                fullWidth
                onClick={onEditApplication}
                sx={{
                    py: 2.5,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: '2px solid #4CAF50',
                    color: '#4CAF50',
                    '&:hover': {
                        backgroundColor: 'rgba(76, 175, 80, 0.04)'
                    }
                }}
            >
                Edit Application
            </CustomButton>

            <CustomButton
                variant="primary"
                fullWidth
                onClick={onTrackStatus}
                sx={{
                    py: 2.5,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    backgroundColor: '#4CAF50',
                    '&:hover': {
                        backgroundColor: '#45a049'
                    }
                }}
            >
                Continue
            </CustomButton>
        </Box>
    );
};
