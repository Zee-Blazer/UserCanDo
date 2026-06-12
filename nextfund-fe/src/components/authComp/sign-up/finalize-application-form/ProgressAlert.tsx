import { Alert, Box } from '@mui/material';
import React from 'react';
import type { ProgressAlertProps } from './types';

export const ProgressAlert: React.FC<ProgressAlertProps> = ({
    requiredDocumentsUploaded,
    totalRequiredDocuments,
    canProceed
}) => {
    if (requiredDocumentsUploaded === 0) {
        return null;
    }

    return (
        <Box sx={{ mb: 3 }}>
            <Alert
                severity={canProceed ? "success" : "info"}
                sx={{ borderRadius: '8px', fontSize: '14px' }}
            >
                {canProceed ? (
                    "KYC verification documents uploaded! You can proceed or add more documents."
                ) : (
                    `You've uploaded ${requiredDocumentsUploaded} of ${totalRequiredDocuments} required documents. Upload at least ${totalRequiredDocuments - requiredDocumentsUploaded} more to complete your KYC verification.`
                )}
            </Alert>


        </Box>
    );
};
