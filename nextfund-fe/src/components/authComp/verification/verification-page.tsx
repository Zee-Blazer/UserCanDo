'use client';

import { CustomButton } from '@/components/General/ui';
import { Header } from '@/components/layout/header';
import { useLoginMutation, useVerifyMutation } from '@/queries/authApi';
import { loginCallback, verificationCallback } from '@/queries/callbacks/authCallback';
import { useAuthSelector } from '@/Redux/selectors';
import { LoginApiResponse } from '@/types/auth';
import {
    Box,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

interface VerificationPageProps {
    onVerify?: (code: string) => void;
    onResend?: () => void;
}

const VerificationPage: React.FC<VerificationPageProps> = ({
    onVerify,
    onResend
}) => {

    const { loginForm } = useAuthSelector();
    const [login, { isLoading: isSendingOtp }] = useLoginMutation();
    const [verify, { isLoading: isVerifying }] = useVerifyMutation();

    const dispatch = useDispatch();
    const router = useRouter();

    const [verificationCode, setVerificationCode] = useState('');
    const [resendMessage, setResendMessage] = useState<string | null>(null);
    const [resendError, setResendError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await verify({ token: verificationCode });
        if ('data' in result) {
            verificationCallback(result.data, dispatch, router);
        }
    };

    const handleResend = async () => {
        setResendMessage(null);
        setResendError(null);
        try {
            const result = await login(loginForm);
            if ('data' in result) {
                loginCallback(result.data as LoginApiResponse, dispatch, router);
                setResendMessage('Verification resent.');
                setTimeout(() => setResendMessage(null), 5000);
            } else if ('error' in result) {
                const errorData = result.error as any;
                setResendError(errorData.data?.message || errorData.message || 'Could not resend verification.');
                setTimeout(() => setResendError(null), 5000);
            }
        } catch (error: any) {
            setResendError('Could not resend verification.');
            setTimeout(() => setResendError(null), 5000);
        }
    };

    return (
        <>
            <Header />
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: '#043A66',
                    backgroundImage: 'url(/pattern.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: 2, sm: 3 },
                }}
            >
                <Paper
                    elevation={24}
                    sx={{
                        maxWidth: { xs: '100%', sm: 480, md: 720, lg: 550 },
                        width: '100%',
                        p: { xs: 3, sm: 4, md: 5 },
                        borderRadius: { xs: '16px', sm: '24px' },
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                                color: '#333',
                                fontSize: { xs: '1.75rem', sm: '2rem' }
                            }}
                        >
                            Verify identity
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                mb: 4,
                                lineHeight: 1.6,
                                color: '#666'
                            }}
                        >
                            Verify your account with the code sent to your phone or use Google authenticator.
                        </Typography>

                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    mb: 1.5,
                                    color: '#666',
                                    fontWeight: 500,
                                    fontSize: '0.95rem'
                                }}
                            >
                                Verification code <span style={{ color: '#ff4444' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                                placeholder="Enter verification code"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        backgroundColor: '#f8f9fa',
                                        border: 'none',
                                        height: '56px',
                                        fontSize: '1rem',
                                        '& fieldset': {
                                            border: '2px solid #e9ecef',
                                            borderRadius: '12px'
                                        },
                                        '&:hover fieldset': {
                                            border: '2px solid #dee2e6'
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: '2px solid #4CAF50'
                                        },
                                        '& input': {
                                            padding: '16px 14px',
                                            letterSpacing: '0.05em'
                                        }
                                    },
                                }}
                            />
                        </Box>

                        <CustomButton
                            variant="primary"
                            fullWidth
                            type="submit"
                            sx={{
                                borderRadius: '12px',
                                py: 2,
                                fontSize: '1rem',
                                fontWeight: 600,
                                mb: 3
                            }}
                            disabled={isVerifying || isSendingOtp}
                        >
                            {isVerifying
                                ? 'Verifying...'
                                : isSendingOtp
                                    ? 'Resending...'
                                    : 'Continue'}
                        </CustomButton>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ color: '#666' }}
                            >
                                Didn't receive the code?{' '}
                                <Box
                                    component="span"
                                    onClick={handleResend}
                                    sx={{
                                        color: '#4CAF50',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        fontWeight: 500,
                                        '&:hover': {
                                            color: '#45a049'
                                        }
                                    }}
                                >
                                    Resend
                                </Box>
                            </Typography>
                            {resendMessage && (
                                <Typography variant="body2" sx={{ color: '#4CAF50', mt: 2 }}>
                                    {resendMessage}
                                </Typography>
                            )}
                            {resendError && (
                                <Typography variant="body2" sx={{ color: '#f44336', mt: 2 }}>
                                    {resendError}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default VerificationPage;