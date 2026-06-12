import { CloudUpload, Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { Camera } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRegisterInvestorMutation } from '../../../queries/authApi';
import { setInvestorSignUpDetails } from '../../../Redux/features/investorSlice';
import { useInvestorSelector } from '../../../Redux/selectors';
import FormInput from '../../General/form/formInput';
import FormSelect from '../../General/form/select';
import { CustomButton } from '../../General/ui';

export const SignUpForm: React.FC<{
    userType: 'investor' | 'business';
    onNext: (formData?: any) => void;
}> = ({ userType, onNext }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { investorSignUpDetails } = useInvestorSelector();
    const [registerInvestor, { isLoading: isCreatingInvestorAccount }] = useRegisterInvestorMutation();
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        investorType: '',
        investmentExperience: '',
        password: '',
        confirmPassword: '',
    });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [avatarInputMode, setAvatarInputMode] = useState<'upload' | 'url'>('upload');
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load persisted data when component mounts or when investorSignUpDetails changes
    useEffect(() => {
        if (userType === 'investor' && investorSignUpDetails) {
            const hasPersistedData = Object.values(investorSignUpDetails).some(val => val && val.trim() !== '');
            if (hasPersistedData) {
                setFormData({
                    firstName: investorSignUpDetails.first_name || '',
                    lastName: investorSignUpDetails.last_name || '',
                    email: investorSignUpDetails.email || '',
                    investorType: investorSignUpDetails.investor_type || '',
                    investmentExperience: investorSignUpDetails.investment_experience || '',
                    password: investorSignUpDetails.password || '',
                    confirmPassword: investorSignUpDetails.password || '',
                });
                // Restore avatar preview if it exists (can be base64 string or URL)
                const savedAvatar = (investorSignUpDetails as any).avatar;
                if (savedAvatar && savedAvatar.trim() !== '') {
                    // Check if it's a data URL (base64) or HTTP/HTTPS URL
                    if (savedAvatar.startsWith('data:image') ||
                        savedAvatar.startsWith('http://') ||
                        savedAvatar.startsWith('https://')) {
                        setAvatarPreview(savedAvatar);
                        // If it's a URL, also set the URL input mode and value
                        if (savedAvatar.startsWith('http://') || savedAvatar.startsWith('https://')) {
                            setAvatarUrl(savedAvatar);
                            setAvatarInputMode('url');
                        } else {
                            setAvatarInputMode('upload');
                        }
                    }
                }
            }
        }
    }, [investorSignUpDetails, userType]);

    // Cleanup avatar preview URL on unmount
    useEffect(() => {
        return () => {
            if (avatarPreview && avatarPreview.startsWith('blob:')) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): string[] => {
        const errors = [];
        if (password.length < 8) errors.push('Password must be at least 8 characters long');
        if (!/(?=.*[a-z])/.test(password)) errors.push('Password must contain at least one lowercase letter');
        if (!/(?=.*[A-Z])/.test(password)) errors.push('Password must contain at least one uppercase letter');
        if (!/(?=.*\d)/.test(password)) errors.push('Password must contain at least one number');
        if (!/(?=.*[@$!%*?&#])/.test(password)) errors.push('Password must contain at least one special character (@$!%*?&#)');
        return errors;
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));


        if (error) setError(null);


        if (validationErrors[field]) {
            setValidationErrors(prev => ({ ...prev, [field]: '' }));
        }


        const newValidationErrors = { ...validationErrors };

        switch (field) {
            case 'email':
                if (value && !validateEmail(value)) {
                    newValidationErrors.email = 'Please enter a valid email address';
                } else {
                    delete newValidationErrors.email;
                }
                break;
            case 'password':
                const passwordErrors = validatePassword(value);
                if (passwordErrors.length > 0) {
                    newValidationErrors.password = passwordErrors[0];
                } else {
                    delete newValidationErrors.password;
                }
                // Check confirm password match if it exists
                if (formData.confirmPassword && value !== formData.confirmPassword) {
                    newValidationErrors.confirmPassword = 'Passwords do not match';
                } else if (formData.confirmPassword) {
                    delete newValidationErrors.confirmPassword;
                }
                break;
            case 'confirmPassword':
                if (value && value !== formData.password) {
                    newValidationErrors.confirmPassword = 'Passwords do not match';
                } else {
                    delete newValidationErrors.confirmPassword;
                }
                break;
            case 'firstName':
            case 'lastName':
                if (value && value.trim().length < 2) {
                    newValidationErrors[field] = `${field === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters long`;
                } else {
                    delete newValidationErrors[field];
                }
                break;
        }

        setValidationErrors({ ...newValidationErrors });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Avatar image must be less than 5MB');
                return;
            }
            setAvatarFile(file);
            setAvatarUrl(''); // Clear URL when file is selected
            // Create preview
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
            if (error) setError(null);
        }
    };

    const handleAvatarUrlChange = (url: string) => {
        setAvatarUrl(url);
        if (url.trim()) {
            // Validate URL format
            try {
                const urlObj = new URL(url);
                // Check if it's a valid image URL
                if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
                    setAvatarPreview(url);
                    setAvatarFile(null); // Clear file when URL is set
                    if (error) setError(null);
                } else {
                    setError('Please enter a valid HTTP or HTTPS URL');
                }
            } catch (error) {
                // If URL parsing fails, it might be a data URL
                if (url.startsWith('data:image/')) {
                    setAvatarPreview(url);
                    setAvatarFile(null);
                    if (error) setError(null);
                } else {
                    setError('Please enter a valid image URL');
                }
            }
        } else {
            setAvatarPreview(null);
        }
    };

    const handleRemoveAvatar = () => {
        if (avatarPreview && avatarPreview.startsWith('blob:')) {
            URL.revokeObjectURL(avatarPreview);
        }
        setAvatarFile(null);
        setAvatarPreview(null);
        setAvatarUrl('');
        if (avatarInputRef.current) {
            avatarInputRef.current.value = '';
        }
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields before submission
        const newValidationErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) {
            newValidationErrors.firstName = 'First name is required';
        } else if (formData.firstName.trim().length < 2) {
            newValidationErrors.firstName = 'First name must be at least 2 characters long';
        }

        if (!formData.lastName.trim()) {
            newValidationErrors.lastName = 'Last name is required';
        } else if (formData.lastName.trim().length < 2) {
            newValidationErrors.lastName = 'Last name must be at least 2 characters long';
        }

        if (!formData.email.trim()) {
            newValidationErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newValidationErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newValidationErrors.password = 'Password is required';
        } else {
            const passwordErrors = validatePassword(formData.password);
            if (passwordErrors.length > 0) {
                newValidationErrors.password = passwordErrors[0];
            }
        }

        if (!formData.confirmPassword) {
            newValidationErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newValidationErrors.confirmPassword = 'Passwords do not match';
        }

        if (userType === 'investor' && !formData.investorType.trim()) {
            newValidationErrors.investorType = 'Please select investor type';
        }

        if (userType === 'investor' && !formData.investmentExperience.trim()) {
            newValidationErrors.investmentExperience = 'Please select your investment experience';
        }

        if (Object.keys(newValidationErrors).length > 0) {
            setValidationErrors(newValidationErrors);
            setError('Please fix the errors above before continuing');
            return;
        }

        setError(null);

        const finalizeSubmission = () => setIsSubmitting(false);
        const finalizeSubmissionWithDelay = () => setTimeout(finalizeSubmission, 700);
        const processResult = (result: unknown) => {
            if (result && typeof (result as Promise<unknown>).finally === 'function') {
                (result as Promise<unknown>).finally(finalizeSubmission);
            } else {
                finalizeSubmissionWithDelay();
            }
        };

        setIsSubmitting(true);
        setTimeout(async () => {
            let shouldFinalize = true;
            try {
                if (userType === 'investor') {
                    // Handle avatar: either file (convert to base64) or URL (use directly)
                    let avatarValue = '';
                    if (avatarFile) {
                        // User uploaded a file - convert to base64
                        try {
                            avatarValue = await convertFileToBase64(avatarFile);
                        } catch (error) {
                            setError('Failed to process avatar image. Please try again.');
                            finalizeSubmission();
                            return;
                        }
                    } else if (avatarUrl && avatarUrl.trim() !== '') {
                        // User entered a URL - use it directly
                        avatarValue = avatarUrl.trim();
                    } else if (avatarPreview && avatarPreview.startsWith('data:image')) {
                        // Fallback: if preview is a data URL, use it
                        avatarValue = avatarPreview;
                    }

                    // Build signUpDetails object - always include all fields
                    const signUpDetails: any = {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        email: formData.email,
                        investor_type: formData.investorType,
                        investment_experience: formData.investmentExperience,
                        password: formData.password,
                    };

                    // Always include avatar field - set to empty string if no value
                    // This ensures the field exists in Redux state
                    if (avatarValue && avatarValue.trim() !== '') {
                        signUpDetails.avatar = avatarValue.trim();
                    } else {
                        signUpDetails.avatar = ''; // Set to empty string to preserve field
                    }

                    dispatch(setInvestorSignUpDetails(signUpDetails));

                    const result = onNext(formData) as unknown;
                    shouldFinalize = false;
                    processResult(result);
                } else {
                    const result = onNext() as unknown;
                    shouldFinalize = false;
                    processResult(result);
                }
            } catch (submissionError) {
                finalizeSubmission();
                throw submissionError;
            } finally {
                if (shouldFinalize) {
                    finalizeSubmissionWithDelay();
                }
            }
        }, 350);
    };

    const isFormComplete = Object.values({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        ...(userType === 'investor' ? {
            investorType: formData.investorType,
            investmentExperience: formData.investmentExperience
        } : {})
    }).every((val) => val && val.trim() !== '');


    const hasValidationErrors = Object.keys(validationErrors).length > 0;
    const isSubmitDisabled = !isFormComplete || hasValidationErrors || isCreatingInvestorAccount || isSubmitting;

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Grid container spacing={2}>
                {/* Avatar Upload - Only for investors */}
                {userType === 'investor' && (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#666' }}>
                                Profile Picture (Optional)
                            </Typography>
                            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                <Avatar
                                    src={avatarPreview || undefined}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        border: '2px solid #e0e0e0',
                                        cursor: avatarInputMode === 'upload' ? 'pointer' : 'default',
                                        bgcolor: avatarPreview ? 'transparent' : '#f5f5f5',
                                    }}
                                    onClick={() => {
                                        if (avatarInputMode === 'upload') {
                                            avatarInputRef.current?.click();
                                        }
                                    }}
                                >
                                    {!avatarPreview && (
                                        <CloudUpload sx={{ fontSize: 40, color: '#999' }} />
                                    )}
                                </Avatar>
                                {avatarPreview && (
                                    <IconButton
                                        onClick={handleRemoveAvatar}
                                        sx={{
                                            position: 'absolute',
                                            top: -8,
                                            right: -8,
                                            bgcolor: 'error.main',
                                            color: 'white',
                                            width: 28,
                                            height: 28,
                                            '&:hover': {
                                                bgcolor: 'error.dark',
                                            },
                                        }}
                                        size="small"
                                    >
                                        ×
                                    </IconButton>
                                )}
                                <input
                                    ref={avatarInputRef}
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    style={{ display: 'none' }}
                                    onChange={handleAvatarChange}
                                />
                                {/* Camera button at bottom-right of avatar */}
                                {avatarInputMode === 'upload' && (
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            avatarInputRef.current?.click();
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            bottom: -4,
                                            right: -4,
                                            bgcolor: '#22c55e',
                                            color: 'white',
                                            width: 36,
                                            height: 36,
                                            border: '3px solid white',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                            '&:hover': {
                                                bgcolor: '#16a34a',
                                            },
                                        }}
                                        size="small"
                                    >
                                        <Camera size={18} />
                                    </IconButton>
                                )}
                            </Box>

                            {/* Toggle between Upload and URL */}
                            <Box sx={{ display: 'flex', gap: 1, mb: 1, mt: 1 }}>
                                <Typography
                                    onClick={() => setAvatarInputMode('upload')}
                                    sx={{
                                        cursor: 'pointer',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 1,
                                        bgcolor: avatarInputMode === 'upload' ? 'primary.main' : 'transparent',
                                        color: avatarInputMode === 'upload' ? 'white' : 'text.secondary',
                                        fontSize: '0.875rem',
                                        fontWeight: avatarInputMode === 'upload' ? 600 : 400,
                                        '&:hover': {
                                            bgcolor: avatarInputMode === 'upload' ? 'primary.dark' : 'action.hover',
                                        },
                                    }}
                                >
                                    Upload
                                </Typography>
                                <Typography
                                    onClick={() => setAvatarInputMode('url')}
                                    sx={{
                                        cursor: 'pointer',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 1,
                                        bgcolor: avatarInputMode === 'url' ? 'primary.main' : 'transparent',
                                        color: avatarInputMode === 'url' ? 'white' : 'text.secondary',
                                        fontSize: '0.875rem',
                                        fontWeight: avatarInputMode === 'url' ? 600 : 400,
                                        '&:hover': {
                                            bgcolor: avatarInputMode === 'url' ? 'primary.dark' : 'action.hover',
                                        },
                                    }}
                                >
                                    URL
                                </Typography>
                            </Box>

                            {avatarInputMode === 'upload' ? (
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                    Click to upload (Max 5MB, JPG/PNG)
                                </Typography>
                            ) : (
                                <Box sx={{ width: '100%', maxWidth: '400px', mt: 1 }}>
                                    <TextField
                                        type="url"
                                        placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                                        value={avatarUrl}
                                        onChange={(e) => handleAvatarUrlChange(e.target.value)}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    />
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', display: 'block', mt: 0.5 }}>
                                        Enter a valid image URL (HTTP/HTTPS or data URL)
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                )}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormInput
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('firstName', e.target.value)}
                        required
                        className='border-2 border-gray-100'
                        error={validationErrors.firstName}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormInput
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('lastName', e.target.value)}
                        required
                        className='border-2 border-gray-100'
                        error={validationErrors.lastName}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <FormInput
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                        required
                        className='border-2 border-gray-100'
                        error={validationErrors.email}
                    />
                </Grid>

                {/* Show Investor Type and Experience fields only for investors */}
                {userType === 'investor' && (
                    <>
                        <Grid size={{ xs: 12 }}>
                            <FormSelect
                                label="Investor Type"
                                value={formData.investorType}
                                onSelect={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('investorType', e.target.value)}
                                required
                                placeholder="Select investor type"
                                options={['Individual', 'Investment Firm']}
                                error={validationErrors.investorType}
                                className="border-2 border-gray-100"
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormSelect
                                label="Investment Experience"
                                value={formData.investmentExperience}
                                onSelect={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('investmentExperience', e.target.value)}
                                required
                                placeholder="Select your investment experience"
                                options={['None', '1 - 3 years', '4 - 7 years', '8 - 15 years', '15+ years']}
                                error={validationErrors.investmentExperience}
                                className="border-2 border-gray-100"
                            />
                        </Grid>
                    </>
                )}

                <Grid size={{ xs: 12 }}>
                    <FormInput
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
                        required
                        className='border-2 border-gray-100'
                        error={validationErrors.password}
                        icon={showPassword ? <Visibility /> : <VisibilityOff />}
                        iconPosition="right"
                        iconClick={() => setShowPassword(!showPassword)}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <FormInput
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('confirmPassword', e.target.value)}
                        required
                        className='border-2 border-gray-100'
                        error={validationErrors.confirmPassword}
                        icon={showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        iconPosition="right"
                        iconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
                <CustomButton
                    variant="primary"
                    fullWidth
                    type="submit"
                    sx={{ fontSize: '0.95rem', py: 1, borderRadius: '16px' }}
                    disabled={isSubmitDisabled}
                    isLoading={isCreatingInvestorAccount || isSubmitting}
                >
                    Create account
                </CustomButton>
            </Box>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Box component="span" sx={{ display: 'inline-block', borderRadius: '16px', px: 2, py: 0.5, background: 'transparent' }}>
                        <Link href="/sign-in" style={{ color: '#4CAF50', cursor: 'pointer', textDecoration: 'underline', fontWeight: 500, borderRadius: '16px' }}>
                            Log in
                        </Link>
                    </Box>
                </Typography>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                </Typography>
            </Box>
        </Box>
    );
};
