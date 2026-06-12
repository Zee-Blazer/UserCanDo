import { Box, Typography } from '@mui/material';
import React from 'react';
import { DocumentUploadCard } from './DocumentUploadCard';
import type { DocumentSectionProps } from './types';

export const DocumentSection: React.FC<DocumentSectionProps> = ({
    title,
    documents,
    onFileUpload,
    onFileDelete,
    isOptional = false,
    uploadingFiles
}) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: '#1a1a1a',
                    fontSize: '18px'
                }}
            >
                {title}
            </Typography>

            {documents.map((document) => (
                <DocumentUploadCard
                    key={document.id}
                    document={document}
                    onFileUpload={onFileUpload}
                    onFileDelete={onFileDelete}
                    isOptional={isOptional}
                    uploadingFiles={uploadingFiles}
                />
            ))}
        </Box>
    );
};
