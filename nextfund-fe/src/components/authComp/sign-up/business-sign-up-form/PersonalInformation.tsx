import { isValidUrl } from '@/utils/helpers';
import { Box } from '@mui/material';
import React from 'react';
import FormInput from '../../../General/form/formInput';
import type { BusinessFormData } from './types';

interface PersonalInformationProps {
    formData: BusinessFormData;
    onInputChange: (field: string, value: string) => void;
    emailError?: string;
}

export const PersonalInformation: React.FC<PersonalInformationProps> = ({
    formData,
    onInputChange,
    emailError
}) => {
    const fieldContainerStyles = { mb: 2.5, width: '100%' };


    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const phoneRegex = /^[0-9+\-() ]*$/;
        if (phoneRegex.test(value) && value.length <= 20) {
            onInputChange('phoneNumber', value);
        }
    };

    const handlePhoneNumberKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {

        const allowedChars = /[0-9+\-() ]/;
        if (!allowedChars.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
            e.preventDefault();
        }
    };

    return (
        <>
            {/* First Name */}
            <Box sx={fieldContainerStyles}>
                <FormInput
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('firstName', e.target.value)}
                    required
                />
            </Box>

            {/* Last Name */}
            <Box sx={fieldContainerStyles}>
                <FormInput
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('lastName', e.target.value)}
                    required
                />
            </Box>

            {/* LinkedIn Profile */}
            <Box sx={fieldContainerStyles}>
                <FormInput
                    label="LinkedIn Profile (Optional)"
                    type="url"
                    value={formData.linkedinProfile}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        if (value === '' || isValidUrl(value)) {
                            onInputChange('linkedinProfile', value);
                        }
                    }}
                    placeholder="https://linkedin.com/in/yourprofile"
                />
            </Box>

            {/* Email Address */}
            <Box sx={fieldContainerStyles}>
                <FormInput
                    label="Email Address"
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('emailAddress', e.target.value)}
                    required
                    error={emailError}
                />
            </Box>

            {/* Phone Number */}
            <Box sx={fieldContainerStyles}>
                <FormInput
                    label="Phone Number"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    onKeyPress={handlePhoneNumberKeyPress}
                    placeholder="e.g., +1 (555) 123-4567"
                    required
                />
            </Box>
        </>
    );
};
