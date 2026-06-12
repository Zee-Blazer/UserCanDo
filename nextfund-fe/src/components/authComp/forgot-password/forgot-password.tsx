import { CustomButton } from '@/components/General/ui';
import { Header } from '@/components/layout/header';
import { useForgotPasswordMutation } from '@/queries/authApi';
import { forgotPasswordCallback } from '@/queries/callbacks/authCallback';
import {
    Box,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ForgotPassword = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');

    const [
        forgotPassword, { isLoading: isSubmitting, error: submitError }
    ] = useForgotPasswordMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await forgotPassword({ email }).unwrap();

            await new Promise(resolve => setTimeout(resolve, 2000));
            forgotPasswordCallback(res, router);
        } catch (error) {

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
                            Enter your email address to receive a password reset link.
                        </Typography>

                        {submitError && (
                            <Typography variant="body2" sx={{ color: '#f44336', mb: 2, textAlign: 'center' }}>
                                {'data' in submitError
                                    ? (typeof submitError.data === 'string'
                                        ? submitError.data
                                        : (submitError.data && typeof submitError.data === 'object' && 'message' in submitError.data
                                            ? String((submitError.data as any).message)
                                            : 'Something went wrong.'))
                                    : ('message' in submitError ? String((submitError as any).message) : 'Something went wrong.')}
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
                                Email Address <span style={{ color: '#ff4444' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email address"
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
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                        >
                            Reset Password
                        </CustomButton>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default ForgotPassword;
