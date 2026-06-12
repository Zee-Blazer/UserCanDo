'use client';

import { ArrowBack, CheckCircle, Upload } from '@mui/icons-material';
import {
    Alert,
    Box,
    IconButton,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from "react-redux";
import { useRegisterInvestorMutation } from '../../../queries/authApi';
import { investorRegistrationCallback, investorRegistrationErrorCallback } from '../../../queries/callbacks/authCallback';
import { clearInvestorSignUpDetails } from '../../../Redux/features/investorSlice';
import { useInvestorSelector } from '../../../Redux/selectors';
import { CustomButton } from '../../General/ui';

interface DocumentUploadProps {
    onBack: () => void;
    onSkip: () => void;
    investorFormData?: any;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ onBack, onSkip, investorFormData }) => {
    const router = useRouter();
    // KYC Documents - These are verification documents (ID, Passport)
    // NOT the profile avatar. The avatar is uploaded separately in the sign-up form.
    const [documents, setDocuments] = useState({
        id_document: null as File | null, // KYC: National ID or Passport
    });
    const [isContinueLoading, setIsContinueLoading] = useState(false);
    const [isSkipLoading, setIsSkipLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();
    const { investorSignUpDetails } = useInvestorSelector();
    const [registerInvestor] = useRegisterInvestorMutation();


    const formData = useMemo(() => {
        // Check if investorSignUpDetails has the required fields (first_name and email)
        const hasValidPersistedData = investorSignUpDetails &&
            investorSignUpDetails.first_name &&
            investorSignUpDetails.first_name.trim() !== '' &&
            investorSignUpDetails.email &&
            investorSignUpDetails.email.trim() !== '';

        if (hasValidPersistedData) {
            return investorSignUpDetails;
        }

        // If investorFormData is provided, normalize it to match the expected format
        if (investorFormData) {
            // Handle both formats: firstName/lastName (from form) or first_name/last_name (from Redux)
            return {
                first_name: investorFormData.first_name || investorFormData.firstName || '',
                last_name: investorFormData.last_name || investorFormData.lastName || '',
                email: investorFormData.email || '',
                investor_type: investorFormData.investor_type || investorFormData.investorType || '',
                investment_experience: investorFormData.investment_experience || investorFormData.investmentExperience || '',
                password: investorFormData.password || '',
                avatar: investorFormData.avatar || ''
            };
        }

        return null;
    }, [investorSignUpDetails, investorFormData]);


    useEffect(() => {
        if (!formData || !formData.first_name || !formData.email) {
            setError('Missing registration data. Please go back and complete the form.');
        } else {
            setError(null);
        }
    }, [formData]);

    const handleFileUpload = (type: 'id_document', file: File | null) => {
        setDocuments(prev => ({ ...prev, [type]: file }));

        if (error) setError(null);
    };

    const handleContinue = async () => {
        setIsContinueLoading(true);
        setError(null);

        try {

            const uploadFormData = new FormData();


            // KYC Documents - These are verification documents (ID, Passport, etc.)
            // NOT the profile avatar. These are uploaded as separate File objects in FormData
            if (documents.id_document) {
                uploadFormData.append('id_document', documents.id_document, documents.id_document.name);
            }
            // if (documents.proof_of_address) {
            //     uploadFormData.append('proof_of_address', documents.proof_of_address, documents.proof_of_address.name);
            // }

            // Registration Payload - Contains user info and avatar (base64 string or URL)
            // Note: avatar is the profile picture uploaded in sign-up form, NOT the KYC documents above
            if (formData) {
                const payload: any = {
                    first_name: formData.first_name || '',
                    last_name: formData.last_name || '',
                    email: formData.email || '',
                    password: formData.password || '',
                    investor_type: formData.investor_type || '',
                    investment_experience: formData.investment_experience || '',
                };

                // Include avatar if it exists (can be base64 string or URL)
                // Read directly from Redux state to ensure we get the latest value
                // Check multiple sources in order of priority
                let avatarValue: string | null = null;

                // Priority 1: Check investorSignUpDetails directly from Redux (most up-to-date source)
                if (investorSignUpDetails?.avatar && typeof investorSignUpDetails.avatar === 'string' && investorSignUpDetails.avatar.trim() !== '') {
                    avatarValue = investorSignUpDetails.avatar.trim();
                }
                // Priority 2: Check formData (from useMemo)
                else if (formData?.avatar && typeof formData.avatar === 'string' && formData.avatar.trim() !== '') {
                    avatarValue = formData.avatar.trim();
                }
                // Priority 3: Check nested properties
                else if ((formData as any)?.avatar && typeof (formData as any).avatar === 'string' && (formData as any).avatar.trim() !== '') {
                    avatarValue = (formData as any).avatar.trim();
                }

                // Only include avatar if we found a valid value
                if (avatarValue) {
                    payload.avatar = avatarValue;
                }

                uploadFormData.append('payload', JSON.stringify(payload));
            }

            const result = await registerInvestor(uploadFormData);
            if ('data' in result) {

                await new Promise(resolve => setTimeout(resolve, 2000));

                investorRegistrationCallback(result.data, dispatch, () => {

                    dispatch(clearInvestorSignUpDetails());
                    router.push('/sign-in');
                });
            } else if ('error' in result) {
                investorRegistrationErrorCallback(result.error, (error: any) => {
                    const errorMessage = error?.data?.message || error?.message ||
                        (error?.data?.detail && typeof error.data.detail === 'string' ? error.data.detail : '') ||
                        'Registration failed. Please check your files and try again.';
                    setError(errorMessage);
                });
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsContinueLoading(false);
        }
    };

    const handleSkip = async () => {
        setIsSkipLoading(true);
        setError(null);

        try {

            const skipFormData = new FormData();
            if (formData) {
                // Registration Payload - Contains user info and avatar (base64 string or URL)
                // Note: avatar is the profile picture from sign-up form, NOT KYC documents
                const payload: any = {
                    first_name: formData.first_name || '',
                    last_name: formData.last_name || '',
                    email: formData.email || '',
                    password: formData.password || '',
                    investor_type: formData.investor_type || '',
                    investment_experience: formData.investment_experience || '',
                };

                // Include avatar if it exists (can be base64 string or URL)
                // Read directly from Redux state to ensure we get the latest value
                // Check multiple sources in order of priority
                let avatarValue: string | null = null;

                // Priority 1: Check investorSignUpDetails directly from Redux (most up-to-date source)
                if (investorSignUpDetails?.avatar && typeof investorSignUpDetails.avatar === 'string' && investorSignUpDetails.avatar.trim() !== '') {
                    avatarValue = investorSignUpDetails.avatar.trim();
                }
                // Priority 2: Check formData (from useMemo)
                else if (formData?.avatar && typeof formData.avatar === 'string' && formData.avatar.trim() !== '') {
                    avatarValue = formData.avatar.trim();
                }
                // Priority 3: Check nested properties
                else if ((formData as any)?.avatar && typeof (formData as any).avatar === 'string' && (formData as any).avatar.trim() !== '') {
                    avatarValue = (formData as any).avatar.trim();
                }

                // Only include avatar if we found a valid value
                if (avatarValue) {
                    payload.avatar = avatarValue;
                }

                skipFormData.append('payload', JSON.stringify(payload));
            }

            const result = await registerInvestor(skipFormData);
            if ('data' in result) {

                await new Promise(resolve => setTimeout(resolve, 2000));

                investorRegistrationCallback(result.data, dispatch, () => {
                    dispatch(clearInvestorSignUpDetails());
                    router.push('/sign-in');
                });
            } else if ('error' in result) {
                investorRegistrationErrorCallback(result.error, (error: any) => {
                    const errorMessage = error?.data?.message || error?.message ||
                        (error?.data?.detail && typeof error.data.detail === 'string' ? error.data.detail : '') ||
                        'Registration failed. Please try again.';
                    setError(errorMessage);
                });
            }
        } catch (error: any) {
            console.error('Registration error:', error);
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
            input.accept = '.jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf';
            input.onchange = (e) => {
                const selectedFile = (e.target as HTMLInputElement).files?.[0] || null;
                if (selectedFile) {

                    if (selectedFile.size > 5 * 1024 * 1024) {
                        setError('File size must be less than 5MB');
                        return;
                    }


                    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
                    if (!allowedTypes.includes(selectedFile.type)) {
                        setError('Please upload only JPG, PNG, or PDF files');
                        return;
                    }


                    if (error) setError(null);
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <IconButton
                    onClick={onBack}
                    disabled={isContinueLoading || isSkipLoading}
                    sx={{
                        color: '#666',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                            color: '#333'
                        },
                        '&:disabled': {
                            color: '#ccc'
                        }
                    }}
                >
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                    Document Requirements Checklist
                </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, ml: 6 }}>
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
                    Note: All documents must be less than 5MB in size and in JPG, PNG, or PDF format.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <CustomButton
                    variant="primary"
                    fullWidth
                    onClick={handleContinue}
                    disabled={isContinueLoading || isSkipLoading}
                    isLoading={isContinueLoading}
                >
                    Continue
                </CustomButton>
                <CustomButton
                    variant="outline"
                    fullWidth
                    onClick={handleSkip}
                    disabled={isContinueLoading || isSkipLoading}
                    isLoading={isSkipLoading}
                >
                    Skip
                </CustomButton>
            </Box>
        </Box>
    );
};
