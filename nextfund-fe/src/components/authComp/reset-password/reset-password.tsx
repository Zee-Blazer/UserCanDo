import { CustomButton } from '@/components/General/ui';
import { Header } from '@/components/layout/header';
import { Box, Paper, TextField, Typography } from '@mui/material';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from 'react';
import { useResetPasswordMutation } from '../../../queries/authApi';
import { resetPasswordCallback } from '../../../queries/callbacks/authCallback';

const ResetPassword: React.FC = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const router = useRouter();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    const [
        resetPassword,
        { isLoading: isResettingPassword }
    ] = useResetPasswordMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);
        if (!password || !confirmPassword) {
            setValidationError('Both password fields are required.');
            return;
        }
        if (password.length < 4) {
            setValidationError('Password must be at least 6 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setValidationError('Passwords do not match.');
            return;
        }
        resetPassword({ token: token ?? "", new_password: password })
            .unwrap()
            .then((res) => {
                resetPasswordCallback(res, router);
            })
            .catch((error) => {
                console.error("Error resetting password:", error);
            });
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
                            Reset Password
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
                            Secure your account by setting a new password
                        </Typography>

                        {validationError && (
                            <Typography variant="body2" sx={{ color: '#f44336', mb: 2 }}>
                                {validationError}
                            </Typography>
                        )}
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
                                Password <span style={{ color: '#ff4444' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter new password"
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
                                Confirm Password <span style={{ color: '#ff4444' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm new password"
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
                            disabled={isResettingPassword}
                        >
                            {isResettingPassword ? 'Resetting...' : 'Reset Password'}
                        </CustomButton>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default ResetPassword;
