import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import FormInput from '../../../General/form/formInput';
import type { BusinessFormData } from './types';

// Password validation function
const validatePasswordRequirement = (password: string, requirement: string): boolean => {
    switch (requirement) {
        case 'length':
            return password.length >= 8;
        case 'lowercase':
            return /(?=.*[a-z])/.test(password);
        case 'uppercase':
            return /(?=.*[A-Z])/.test(password);
        case 'number':
            return /(?=.*\d)/.test(password);
        case 'special':
            return /(?=.*[@$!%*?&#])/.test(password);
        default:
            return false;
    }
};

interface AuthCredentialsProps {
    formData: BusinessFormData;
    onInputChange: (field: string, value: string) => void;
    showPassword: boolean;
    showConfirmPassword: boolean;
    onTogglePasswordVisibility: () => void;
    onToggleConfirmPasswordVisibility: () => void;
    passwordError?: string;
    confirmPasswordError?: string;
}

export const AuthCredentials: React.FC<AuthCredentialsProps> = ({
    formData,
    onInputChange,
    showPassword,
    showConfirmPassword,
    onTogglePasswordVisibility,
    onToggleConfirmPasswordVisibility,
    passwordError,
    confirmPasswordError
}) => {
    const fieldContainerStyles = { mb: 2.5, width: '100%' };

    return (
        <>
            {/* Password */}
            <Box sx={fieldContainerStyles}>
                <FormInput
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('password', e.target.value)}
                    required
                    icon={showPassword ? <Visibility /> : <VisibilityOff />}
                    iconPosition="right"
                    iconClick={onTogglePasswordVisibility}
                    error={passwordError}
                />

                {/* Password Requirements */}
                <Box sx={{ mt: 1, pl: 1 }}>
                    <Typography variant="caption" sx={{ display: 'block', fontSize: '0.75rem', mb: 0.5, fontWeight: 500 }}>
                        Password must contain:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.7rem',
                                color: validatePasswordRequirement(formData.password, 'length') ? '#4CAF50' : '#666',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {validatePasswordRequirement(formData.password, 'length') ? '✓' : '○'} At least 8 characters
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.7rem',
                                color: validatePasswordRequirement(formData.password, 'lowercase') ? '#4CAF50' : '#666',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {validatePasswordRequirement(formData.password, 'lowercase') ? '✓' : '○'} One lowercase letter
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.7rem',
                                color: validatePasswordRequirement(formData.password, 'uppercase') ? '#4CAF50' : '#666',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {validatePasswordRequirement(formData.password, 'uppercase') ? '✓' : '○'} One uppercase letter
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.7rem',
                                color: validatePasswordRequirement(formData.password, 'number') ? '#4CAF50' : '#666',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {validatePasswordRequirement(formData.password, 'number') ? '✓' : '○'} One number
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.7rem',
                                color: validatePasswordRequirement(formData.password, 'special') ? '#4CAF50' : '#666',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {validatePasswordRequirement(formData.password, 'special') ? '✓' : '○'} One special character (@$!%*?&#)
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Confirm Password */}
            <Box sx={fieldContainerStyles}>
                <FormInput
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('confirmPassword', e.target.value)}
                    required
                    icon={showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    iconPosition="right"
                    iconClick={onToggleConfirmPasswordVisibility}
                    error={confirmPasswordError}
                />
            </Box>
        </>
    );
};
