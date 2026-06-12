'use client';

import { CheckCircle, Upload } from '@mui/icons-material';
import {
    Alert,
    Box,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../../components/General/ui';
import { useRegisterInvestorMutation } from '../../../queries/authApi';
import { investorRegistrationCallback, investorRegistrationErrorCallback } from '../../../queries/callbacks/authCallback';

interface DocumentUploadProps {
    onBack: () => void;
    onSkip: () => void;
    investorFormData?: any;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ onBack, onSkip, investorFormData }) => {
    const [registerInvestor] = useRegisterInvestorMutation();
    const dispatch = useDispatch();
    const router = useRouter();
    const [documents, setDocuments] = useState({
        id_document: null as File | null,
        proof_of_address: null as File | null,
    });
    const [isContinueLoading, setIsContinueLoading] = useState(false);
    const [isSkipLoading, setIsSkipLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = (type: 'id_document' | 'proof_of_address', file: File | null) => {
        setDocuments(prev => ({ ...prev, [type]: file }));
        // Clear error when user uploads a file
        if (error) setError(null);
    };

    const handleContinue = async () => {
        setIsContinueLoading(true);
        setError(null);

        try {
            const finalFormData = {
                ...investorFormData,
                id_document: documents.id_document,
                // proof_of_address: documents.proof_of_address
            };

            const result = await registerInvestor(finalFormData);

            if ('data' in result) {
                investorRegistrationCallback(result.data, dispatch, (res: any) => {
                    router.push('/sign-in');
                });
            } else if ('error' in result) {
                investorRegistrationErrorCallback(result.error, (error: any) => {
                    setError(error.data?.message || error.message || 'Registration failed. Check file size and try again.');
                });
            }
        } catch (error: any) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsContinueLoading(false);
        }
    };

    const handleSkip = async () => {
        setIsSkipLoading(true);
        setError(null);

        try {
            const finalFormData = {
                ...investorFormData,
                id_document: null,
                // proof_of_address: null
            };

            const result = await registerInvestor(finalFormData);

            if ('data' in result) {
                investorRegistrationCallback(result.data, dispatch, (res: any) => {
                    router.push('/sign-in');
                });
            } else if ('error' in result) {
                investorRegistrationErrorCallback(result.error, (error: any) => {
                    setError(error.data?.message || error.message || 'Registration failed. Check file size and try again.');
                });
            }
        } catch (error: any) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSkipLoading(false);
        }
    };

    const FileUploadBox: React.FC<{
        title: string;
        subtitle: string;
        file: File | null;
        onFileChange: (file: File | null) => void;
    }> = ({ title, subtitle, file, onFileChange }) => {

        const handleFileSelect = () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.jpg,.jpeg,.png,.pdf';
            input.onchange = (e) => {
                const selectedFile = (e.target as HTMLInputElement).files?.[0] || null;
                if (selectedFile && selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
                    setError('File size must be less than 5MB');
                    return;
                }
                onFileChange(selectedFile);
            };
            input.click();
        };

        return (
            <Box
                sx={{
                    border: '2px dashed #e0e0e0',
                    borderRadius: '12px',
                    p: 3,
                    mb: 3,
                    backgroundColor: '#fafafa',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        borderColor: '#4CAF50',
                        backgroundColor: '#f1f8e9',
                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '8px',
                            backgroundColor: file ? '#4CAF50' : '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {file ? (
                            <CheckCircle sx={{ color: 'white', fontSize: '1.5rem' }} />
                        ) : (
                            <Upload sx={{ color: '#999', fontSize: '1.5rem' }} />
                        )}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 0.25, fontSize: '1rem' }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                            {subtitle}
                        </Typography>
                        {file && (
                            <Typography variant="caption" color="primary" sx={{ fontSize: '0.75rem' }}>
                                {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                            </Typography>
                        )}
                    </Box>
                    <CustomButton
                        variant={file ? 'primary' : 'outline'}
                        onClick={handleFileSelect}
                    >
                        {file ? 'Change' : 'Upload'}
                    </CustomButton>
                </Box>
            </Box>
        );
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
                Document Requirements Checklist
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Please, ensure you have the following documents ready to upload:
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <FileUploadBox
                title="National ID or Passport"
                subtitle="Front and back sides clearly visible"
                file={documents.id_document}
                onFileChange={(file) => handleFileUpload('id_document', file)}
            />

            {/* <FileUploadBox
                title="Proof of Address"
                subtitle="Front and back sides clearly visible"
                file={documents.proof_of_address}
                onFileChange={(file) => handleFileUpload('proof_of_address', file)}
            /> */}

            <Box sx={{ p: 1.5, backgroundColor: '#f0f4ff', borderRadius: '8px', mb: 3, border: '1px solid #e3f2fd' }}>
                <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 500, fontSize: '0.85rem' }}>
                    Note: All documents must be less than 1MB in size and in JPG, PNG, or PDF format.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <CustomButton
                    variant="primary"
                    fullWidth
                    onClick={handleContinue}
                    disabled={isContinueLoading || isSkipLoading}
                >
                    {isContinueLoading ? 'Creating account...' : 'Continue'}
                </CustomButton>
                <CustomButton
                    variant="outline"
                    fullWidth
                    onClick={handleSkip}
                    disabled={isContinueLoading || isSkipLoading}
                >
                    {isSkipLoading ? 'Creating account...' : 'Skip'}
                </CustomButton>
            </Box>
        </Box>
    );
};

export default DocumentUpload;
