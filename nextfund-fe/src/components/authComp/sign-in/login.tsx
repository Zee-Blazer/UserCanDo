
"use client";

import { CustomButton } from '@/components/General/ui';
import { Header } from '@/components/layout/header';
import { useForgotPasswordMutation, useLoginMutation } from '@/queries/authApi';
import { forgotPasswordCallback, loginCallback } from '@/queries/callbacks/authCallback';
import { setLoginForm } from '@/Redux/features/authSlice';
import { useAuthSelector } from '@/Redux/selectors';
import { LoginApiResponse } from '@/types/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Alert,
    Box,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

interface LoginPageProps {
    isAdmin?: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ isAdmin = false }) => {

    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const [
        forgotPassword, { isLoading: isSubmitting, error: submitError }
    ] = useForgotPasswordMutation();
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loginForm } = useAuthSelector();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear general error when user starts typing
        if (error) setError(null);

        // Clear field-specific validation error
        if (validationErrors[field]) {
            setValidationErrors(prev => ({ ...prev, [field]: '' }));
        }

        // Real-time validation
        const newValidationErrors = { ...validationErrors };

        if (field === 'email' && value && !validateEmail(value)) {
            newValidationErrors.email = 'Please enter a valid email address';
        } else if (field === 'email') {
            delete newValidationErrors.email;
        }

        setValidationErrors(newValidationErrors);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields before submission
        const newValidationErrors: Record<string, string> = {};

        if (!formData.email.trim()) {
            newValidationErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newValidationErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password.trim()) {
            newValidationErrors.password = 'Password is required';
        }

        if (Object.keys(newValidationErrors).length > 0) {
            setValidationErrors(newValidationErrors);
            setError('Please fix the errors above before continuing');
            return;
        }

        setError(null);
        dispatch(setLoginForm(formData));
        setIsLoading(true);
        try {
            const result = await login(formData);

            if ('data' in result) {
                const changePassword = loginCallback(result.data as LoginApiResponse, dispatch, router);

                if (changePassword) {
                    forgotPassword({ email: formData.email })
                        .unwrap()
                        .then((res) => {
                            forgotPasswordCallback(res, router);
                        })
                        .catch((error) => {
                        });
                }


                await new Promise(resolve => setTimeout(resolve, 2000));
            } else if ('error' in result) {
                const errorData = result.error as any;
                setError(errorData.data?.message || errorData.message || "Login failed. Server can't be reached.");
            }
        } catch (error: any) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Check if all required fields are filled
    const isFormComplete = formData.email.trim() !== '' && formData.password.trim() !== '';
    const hasValidationErrors = Object.keys(validationErrors).length > 0;
    const isSubmitDisabled = !isFormComplete || hasValidationErrors || isLoading;

    const getTitle = () => isAdmin ? 'Admin Login' : 'Log in';
    const getSubtitle = () => isAdmin
        ? 'We will send you a verification code.'
        : 'Enter your email and password to access your Nexfund account';

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
                        maxWidth: { xs: '100%', sm: 480 },
                        width: '100%',
                        p: { xs: 3, sm: 4, md: 5 },
                        borderRadius: { xs: '16px', sm: '24px' },
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#4CAF50' }}>
                            {getTitle()}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            {getSubtitle()}
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" sx={{ mb: 1, color: '#666', fontWeight: 500 }}>
                                Email Address <span style={{ color: '#ff4444' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                                error={!!validationErrors.email}
                                helperText={validationErrors.email}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: '#f9f9f9',
                                        border: 'none',
                                        '& fieldset': { border: 'none' },
                                        '&:hover fieldset': { border: 'none' },
                                        '&.Mui-focused fieldset': { border: '2px solid #4CAF50' },
                                        '&.Mui-error fieldset': { border: '2px solid #f44336' },
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1, color: '#666', fontWeight: 500 }}>
                                Password <span style={{ color: '#ff4444' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                required
                                error={!!validationErrors.password}
                                helperText={validationErrors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: '#f9f9f9',
                                        border: 'none',
                                        '& fieldset': { border: 'none' },
                                        '&:hover fieldset': { border: 'none' },
                                        '&.Mui-focused fieldset': { border: '2px solid #4CAF50' },
                                        '&.Mui-error fieldset': { border: '2px solid #f44336' },
                                    },
                                }}
                            />
                        </Box>

                        <p
                            className='justify-self-end -mt-2.5 mb-6 underline cursor-pointer text-xs'
                        >
                            <Link href="/forgot-password">Forgot password</Link>
                        </p>

                        <CustomButton
                            variant="primary"
                            fullWidth
                            type="submit"
                            sx={{ borderRadius: '5px' }}
                            disabled={isSubmitDisabled}
                            isLoading={isLoading}
                        >
                            Log in
                        </CustomButton>

                        {/* Conditional rendering based on isAdmin prop */}
                        {isAdmin ? (
                            <Box sx={{ mt: 3, textAlign: 'center' }}>
                                <Link href="/forgot-password" style={{ color: '#999', textDecoration: 'underline', fontSize: '14px' }}>
                                    Forgot password?
                                </Link>
                            </Box>
                        ) : (
                            <Box sx={{ mt: 3, textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Don't have an account?{' '}
                                    <Box component="span" sx={{ display: 'inline-block', borderRadius: '16px', px: 2, py: 0.5, background: 'transparent' }}>
                                        <Link href="/sign-up" style={{ color: '#4CAF50', cursor: 'pointer', textDecoration: 'underline', fontWeight: 500, borderRadius: '16px' }}>
                                            Sign up
                                        </Link>
                                    </Box>
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default LoginPage;