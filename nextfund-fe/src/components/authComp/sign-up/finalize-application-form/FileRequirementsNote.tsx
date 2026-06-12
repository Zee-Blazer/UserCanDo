import { Box, Typography } from '@mui/material';
import React from 'react';

export const FileRequirementsNote: React.FC = () => {
    return (
        <Box
            sx={{
                p: 2,
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                mb: 4
            }}
        >
            <Typography variant="body2" sx={{ color: '#666', fontSize: '14px' }}>
                Note: All documents must be less than 10MB and in PDF, DOC, or XLSX format.
            </Typography>
        </Box>
    );
};
