import { Box } from '@mui/material';
import React from 'react';
import type { ActionButtonsProps } from './types';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    canProceedWithoutOptional,
    // onSubmitWithoutOptional, // Commented out
    onSubmitWithOptional
}) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            {/* Commented out - Complete Application Without Additional Docs button */}
            {/* {canProceedWithoutOptional && (
                <Box
                    component="button"
                    onClick={onSubmitWithoutOptional}
                    sx={{
                        flex: 1,
                        p: '12px 24px',
                        border: '2px solid #28a745',
                        borderRadius: '8px',
                        backgroundColor: 'transparent',
                        color: '#28a745',
                        fontSize: '16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: '#28a745',
                            color: '#fff'
                        }
                    }}
                >
                    Complete Application Without Additional Docs
                </Box>
            )} */}

            <Box
                component="button"
                onClick={onSubmitWithOptional}
                disabled={!canProceedWithoutOptional}
                sx={{
                    flex: 1,
                    p: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: canProceedWithoutOptional ? '#28a745' : '#ccc',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: canProceedWithoutOptional ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: canProceedWithoutOptional ? '#218838' : '#ccc'
                    }
                }}
            >
                Upload Documents & Continue
            </Box>
        </Box>
    );
};
