import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { AuthCredentials } from './business-sign-up-form/AuthCredentials';
import { CompanyInformation } from './business-sign-up-form/CompanyInformation';
import { FormActions } from './business-sign-up-form/FormActions';
import { PersonalInformation } from './business-sign-up-form/PersonalInformation';

import { setBusinessFormData } from '../../../Redux/features/businessSlice';
import { useBusinessSelector } from '../../../Redux/selectors';
import type { BusinessFormData } from './business-sign-up-form/types';


export const BusinessSignUpForm: React.FC<{
    onNext: (formData: BusinessFormData) => void;
}> = ({ onNext }) => {
    const dispatch = useDispatch();
    const { businessFormData: persistedFormData, isAccountCreated, businessUserProfile } = useBusinessSelector();

    const [formData, setFormData] = useState<BusinessFormData>({
        companyName: '',
        industry: '',
        yearFounded: '',
        country: '',
        countryName: '',
        headquarters: '',
        companySize: '',
        currentStage: '',
        briefDescription: '',
        marketOpportunityDescription: '',
        competitive_advantage_description: '',
        websiteUrl: '',
        firstName: '',
        lastName: '',
        linkedinProfile: '',
        emailAddress: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        avatar: '',
    });

    // Load persisted data on component mount only
    useEffect(() => {
        if (persistedFormData && Object.keys(persistedFormData).length > 0) {
            // Map the persisted data to form data, handling field name differences
            const persistedData = persistedFormData as any;
            const mappedFormData = {
                ...persistedFormData,

                country: persistedData.country || persistedData.country_location || '',
                countryName: persistedData.countryName || persistedData.country_name || persistedData.country_location || '',
                headquarters: persistedData.headquarters || '',
                industry: persistedData.industry || persistedData.industry_sector || '',
                yearFounded: persistedData.yearFounded || persistedData.year_founded || '',
                companySize: persistedData.companySize || persistedData.company_size || '',
                currentStage: persistedData.currentStage || persistedData.current_stage || '',
                briefDescription: persistedData.briefDescription || persistedData.description || '',
                websiteUrl: persistedData.websiteUrl || persistedData.website_url || '',
                firstName: persistedData.firstName || persistedData.first_name || '',
                lastName: persistedData.lastName || persistedData.last_name || '',
                linkedinProfile: persistedData.linkedinProfile || persistedData.linked_in_profile || '',
                emailAddress: persistedData.emailAddress || persistedData.email || '',
                phoneNumber: persistedData.phoneNumber || persistedData.phone_number || '',
                avatar: persistedData.avatar || '',
            };
            setFormData(mappedFormData);
        }
    }, []); // Empty dependency array - only run on mount


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toastShownRef = useRef(false);

    // If account is already created or business profile exists, only require basic info to proceed
    const hasBusinessProfile = !!(businessUserProfile?.user_id && businessUserProfile?.business_id);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prevFormData => {
            const updatedData = { ...prevFormData, [field]: value };
            return updatedData;
        });

        // Clear general error when user starts typing
        if (error) setError(null);

        // Real-time validation
        const newValidationErrors = { ...validationErrors };

        switch (field) {
            case 'emailAddress':
                if (value && !validateEmail(value)) {
                    newValidationErrors.emailAddress = 'Please enter a valid email address (e.g., user@example.com)';
                } else {
                    delete newValidationErrors.emailAddress;
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
        }

        setValidationErrors(newValidationErrors);
    };

    const handleAvatarChange = (avatarUrl: string) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            avatar: avatarUrl
        }));
    };

    // Persist form data to Redux when it changes
    useEffect(() => {
        dispatch(setBusinessFormData(formData));
    }, [formData, dispatch]);

    // Show toast when account is already created (only once)
    useEffect(() => {
        if ((isAccountCreated || hasBusinessProfile) && !toastShownRef.current) {
            toast.success('Account already created. You can proceed to the next step.', {
                duration: 4000,
                position: 'top-right',
            });
            toastShownRef.current = true;
        }
    }, [isAccountCreated, hasBusinessProfile]);

    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const finalizeSubmission = () => setIsSubmitting(false);
        const finalizeSubmissionWithDelay = () => setTimeout(finalizeSubmission, 700);
        const processResult = (result: unknown) => {
            if (result && typeof (result as Promise<unknown>).finally === 'function') {
                (result as Promise<unknown>).finally(finalizeSubmissionWithDelay);
            } else {
                finalizeSubmissionWithDelay();
            }
        };

        // Check if account is already created or if we have business profile data
        const hasBusinessProfile = businessUserProfile?.user_id && businessUserProfile?.business_id;
        if (isAccountCreated || hasBusinessProfile) {
            setIsSubmitting(true);
            setTimeout(() => {
                let shouldFinalize = true;
                try {
                    const result = onNext(formData) as unknown;
                    shouldFinalize = false;
                    processResult(result);
                } catch (submissionError) {
                    finalizeSubmission();
                    throw submissionError;
                } finally {
                    if (shouldFinalize) {
                        finalizeSubmissionWithDelay();
                    }
                }
            }, 350);
            return;
        }

        // Check for validation errors first
        const newValidationErrors: Record<string, string> = {};

        // Validate email
        if (!formData.emailAddress.trim()) {
            newValidationErrors.emailAddress = 'Email address is required';
        } else if (!validateEmail(formData.emailAddress)) {
            newValidationErrors.emailAddress = 'Please enter a valid email address (e.g., user@example.com)';
        }

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            newValidationErrors.confirmPassword = 'Passwords do not match';
        }

        // Validate password strength
        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            newValidationErrors.password = passwordErrors[0];
        }

        // If there are validation errors, set them and prevent submission
        if (Object.keys(newValidationErrors).length > 0) {
            setValidationErrors(newValidationErrors);
            setError(Object.values(newValidationErrors)[0]); // Show first error in general error message
            finalizeSubmission();
            return;
        }

        // Validate phone number (basic validation)
        if (formData.phoneNumber.length < 10) {
            setError('Please enter a valid phone number.');
            return;
        }

        // Validate website URL format (only if provided)
        if (formData.websiteUrl && formData.websiteUrl.trim() !== '') {
            // Import isValidUrl from utils if not already imported
            const isValidUrlFormat = (url: string) => {
                try {
                    const urlObj = new URL(url);
                    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
                } catch {
                    return false;
                }
            };

            if (!isValidUrlFormat(formData.websiteUrl)) {
                setError('Please enter a valid website URL (e.g., https://yourcompany.com)');
                return;
            }
        }

        // Ensure headquarters is provided
        if (!formData.headquarters.trim()) {
            setError('Please enter your company headquarters.');
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            let shouldFinalize = true;
            try {
                const result = onNext(formData) as unknown;
                shouldFinalize = false;
                processResult(result);
            } catch (submitError) {
                finalizeSubmission();
                throw submitError;
            } finally {
                if (shouldFinalize) {
                    finalizeSubmissionWithDelay();
                }
            }
        }, 350);
    };
    // Check if all required fields are filled (websiteUrl and linkedinProfile are optional)
    const requiredFields = {
        companyName: formData.companyName,
        industry: formData.industry,
        yearFounded: formData.yearFounded,
        country: formData.country,
        headquarters: formData.headquarters,
        companySize: formData.companySize,
        currentStage: formData.currentStage,
        briefDescription: formData.briefDescription,
        marketOpportunityDescription: formData.marketOpportunityDescription,
        competitive_advantage_description: formData.competitive_advantage_description,
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
    };

    const isFormComplete = Object.values(requiredFields).every((val) => val && val.trim() !== '');

    const passwordValidationErrors = validatePassword(formData.password);
    const passwordsMatch = formData.password === formData.confirmPassword;

    // For existing accounts, check basic info AND password fields
    const requiredFieldsForExistingAccount = {
        companyName: formData.companyName,
        industry: formData.industry,
        yearFounded: formData.yearFounded,
        country: formData.country,
        headquarters: formData.headquarters,
        companySize: formData.companySize,
        currentStage: formData.currentStage,
        briefDescription: formData.briefDescription,
        marketOpportunityDescription: formData.marketOpportunityDescription,
        competitive_advantage_description: formData.competitive_advantage_description,
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
    };

    const isBasicInfoComplete = Object.values(requiredFieldsForExistingAccount).every((val) => val && val.trim() !== '');

    // Check if email is valid
    const isEmailValid = formData.emailAddress && validateEmail(formData.emailAddress);

    const isSubmitDisabled = (isAccountCreated || hasBusinessProfile)
        ? !isBasicInfoComplete || !passwordsMatch || passwordValidationErrors.length > 0 || !isEmailValid
        : !isFormComplete || !passwordsMatch || passwordValidationErrors.length > 0 || !isEmailValid;


    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>

            <CompanyInformation
                formData={formData}
                onInputChange={handleInputChange}
                onAvatarChange={handleAvatarChange}
            />

            <PersonalInformation
                formData={formData}
                onInputChange={handleInputChange}
                emailError={validationErrors.emailAddress}
            />

            <AuthCredentials
                formData={formData}
                onInputChange={handleInputChange}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
                onToggleConfirmPasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                passwordError={validationErrors.password}
                confirmPasswordError={validationErrors.confirmPassword}
            />

            <FormActions
                isSubmitDisabled={isSubmitDisabled}
                error={error}
                isLoading={isSubmitting}
            />
        </Box>
    );
};