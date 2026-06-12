import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import type { DocumentUploadSectionProps } from './types';
import { DOCUMENT_UPLOAD_ITEMS } from './types';

export const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
    documents,
    onFileUpload,
    onFileDelete,
    uploadingFiles
}) => {
    const handleFileInputChange = (field: keyof typeof documents) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onFileUpload(field, file);
    };

    const isUploading = (field: keyof typeof documents) => {
        return uploadingFiles?.has(field) || false;
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: '#000',
                    fontSize: '1.125rem'
                }}
            >
                Document Upload <span style={{ color: '#787486', fontWeight: 400 }}>(Optional)</span>
            </Typography>

            {DOCUMENT_UPLOAD_ITEMS.map((item) => (
                <Box key={item.key} sx={{ mb: 3 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 2,
                            color: '#666',
                            fontSize: '0.95rem',
                            fontWeight: 400
                        }}
                    >
                        {item.label}
                    </Typography>

                    {isUploading(item.key) ? (
                        <Box
                            sx={{
                                border: '1px solid #33CC33',
                                borderRadius: '8px',
                                p: 3,
                                backgroundColor: '#33CC3308',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                animation: 'pulse 2s infinite',
                                '@keyframes pulse': {
                                    '0%': {
                                        backgroundColor: '#33CC3308',
                                        borderColor: '#33CC33'
                                    },
                                    '50%': {
                                        backgroundColor: '#33CC3314',
                                        borderColor: '#33CC33'
                                    },
                                    '100%': {
                                        backgroundColor: '#33CC3308',
                                        borderColor: '#33CC33'
                                    }
                                }
                            }}
                        >
                            <CircularProgress size={20} sx={{ color: '#33CC33' }} />
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#33CC33',
                                    fontSize: '0.875rem',
                                    fontWeight: 500
                                }}
                            >
                                Uploading...
                            </Typography>
                        </Box>
                    ) : documents[item.key] ? (
                        <Box
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                p: 3,
                                backgroundColor: '#f8f9fa',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#333',
                                        fontSize: '0.875rem',
                                        fontWeight: 500
                                    }}
                                >
                                    {documents[item.key]?.name || 'File uploaded'}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: '#666',
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    ✓ Uploaded
                                </Typography>
                            </Box>
                            <Box
                                onClick={() => onFileDelete(item.key)}
                                sx={{
                                    cursor: 'pointer',
                                    p: 1,
                                    borderRadius: '4px',
                                    color: '#f44336',
                                    '&:hover': {
                                        backgroundColor: '#ffebee'
                                    },
                                    fontSize: '0.875rem',
                                    fontWeight: 500
                                }}
                            >
                                Remove
                            </Box>
                        </Box>
                    ) : (
                        <>
                            <input
                                type="file"
                                id={item.id}
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange(item.key)}
                                accept=".pdf,.doc,.docx"
                            />
                            <label htmlFor={item.id}>
                                <Box
                                    sx={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        p: 3,
                                        backgroundColor: '#fafafa',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            borderColor: '#d0d0d0'
                                        }
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#666',
                                            textDecoration: 'underline',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        Upload file
                                    </Typography>
                                </Box>
                            </label>
                        </>
                    )}
                </Box>
            ))}
        </Box>
    );
};
