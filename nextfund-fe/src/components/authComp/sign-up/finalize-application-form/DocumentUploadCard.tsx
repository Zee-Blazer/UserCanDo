import { InfoTooltip } from '@/components/General/ui';
import { FORM_TOOLTIPS } from '@/constants/formTooltips';
import { Delete } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import React from 'react';
import type { DocumentUploadCardProps } from './types';

export const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({
    document,
    onFileUpload,
    onFileDelete,
    isOptional = false,
    uploadingFiles
}) => {
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getTooltipForDocument = (documentId: string) => {
        const tooltipMap: Record<string, { title: string; description: string }> = {
            'businessPlan': FORM_TOOLTIPS.businessPlan,
            'financialStatements': FORM_TOOLTIPS.financialStatementsDoc,
            'financialProjections': FORM_TOOLTIPS.financialProjections,
            'pitchDeck': FORM_TOOLTIPS.pitchDeck,
            'incorporation': FORM_TOOLTIPS.certificateOfIncorporation,
            'taxId': FORM_TOOLTIPS.taxIdDocument,
            'directorId': {
                title: "Director's ID Document",
                description: "A government-issued identification document (passport, driver's license, or national ID) of the company director or authorized representative."
            },
            'marketResearch': FORM_TOOLTIPS.marketResearch,
            'productDemo': FORM_TOOLTIPS.productDemo,
            'customerReferences': FORM_TOOLTIPS.customerReferences,
            'legalAgreements': FORM_TOOLTIPS.legalAgreements,
        };
        return tooltipMap[documentId] || { title: document.title, description: "Upload this document to support your application." };
    };

    const isUploading = uploadingFiles?.has(document.id) || false;
    const tooltip = getTooltipForDocument(document.id);

    return (
        <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 500,
                        color: '#666',
                        fontSize: '14px'
                    }}
                >
                    {document.title}
                </Typography>
                <InfoTooltip
                    title={tooltip.title}
                    description={tooltip.description}
                    placement="right"
                />
            </Box>

            {document.uploadedFile ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '14px'
                    }}
                >
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', fontSize: '14px' }}>
                            {document.uploadedFile.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#666', fontSize: '12px' }}>
                            {formatFileSize(document.uploadedFile.size)}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={() => onFileDelete(document.id, isOptional)}
                        size="small"
                        sx={{ color: '#f44336' }}
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </Box>
            ) : isUploading ? (
                <Box
                    sx={{
                        border: '1px solid #33CC33',
                        borderRadius: '8px',
                        p: '12px 16px',
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
                            fontSize: '14px',
                            fontWeight: 500
                        }}
                    >
                        Uploading...
                    </Typography>
                </Box>
            ) : (
                <Box
                    onClick={() => onFileUpload(document.id, isOptional)}
                    sx={{
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        p: '12px 16px',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            borderColor: '#33CC33',
                            backgroundColor: '#33CC3314'
                        }
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#000000',
                            fontSize: '14px',
                            textDecoration: 'underline',
                            fontWeight: 500
                        }}
                    >
                        Upload file
                    </Typography>
                </Box>
            )}
        </Box>
    );
};
