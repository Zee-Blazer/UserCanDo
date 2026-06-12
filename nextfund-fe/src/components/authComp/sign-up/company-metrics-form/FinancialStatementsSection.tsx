import { Box, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FORM_TOOLTIPS } from '../../../../constants/formTooltips';
import { AuthFormInput } from '../../../General/form/authFormInput';
import { InfoTooltip } from '../../../General/ui';

interface FinancialStatementsSectionProps {
    value?: string;
    onChange?: (value: string) => void;
    onValidationChange?: (isValid: boolean) => void;
}

export const FinancialStatementsSection: React.FC<FinancialStatementsSectionProps> = ({
    value = '',
    onChange,
    onValidationChange
}) => {
    const theme = useTheme();
    const [urlError, setUrlError] = useState<string>('');

    // Stricter URL validation that requires http:// or https://
    const isStrictValidUrl = (url: string): boolean => {
        if (!url || url.trim() === '') return true; // Empty is valid (optional)

        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    };

    // Validate on mount and when value changes from parent
    useEffect(() => {
        const validateUrl = () => {
            const trimmedValue = value.trim();
            const isValid = isStrictValidUrl(trimmedValue);

            if (trimmedValue !== '' && !isValid) {
                setUrlError('Please enter a valid URL starting with https:// (e.g., https://drive.google.com/...)');
                if (onValidationChange) onValidationChange(false);
            } else {
                setUrlError('');
                if (onValidationChange) onValidationChange(true);
            }
        };

        validateUrl();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleFieldChange = (slug: string, value: string) => {
        if (onChange) {
            onChange(value);
        }

        // Validate URL format
        const isValid = isStrictValidUrl(value);
        if (value.trim() !== '' && !isValid) {
            setUrlError('Please enter a valid URL starting with https:// (e.g., https://drive.google.com/...)');
            if (onValidationChange) onValidationChange(false);
        } else {
            setUrlError('');
            if (onValidationChange) onValidationChange(true);
        }
    };

    return (
        <>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 1.5,
                    color: theme.palette.text.primary,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                Financial Statements Information (URL) - Optional
                <InfoTooltip
                    title={FORM_TOOLTIPS.financialStatements.title}
                    description={FORM_TOOLTIPS.financialStatements.description}
                />
            </Typography>

            <Box sx={{ mb: 2 }} id="financialStatements">
                <AuthFormInput
                    label=""
                    type="url"
                    value={value}
                    slug="financialStatements"
                    handleChange={handleFieldChange}
                    placeholder="Enter financial statements URL (e.g., https://drive.google.com/...)"
                    borderColor={urlError ? '#f87171' : undefined}
                    id="financialStatements"
                />
                {urlError && (
                    <Box sx={{ mt: 0.5 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#f87171',
                                fontSize: '0.75rem',
                                fontWeight: 500
                            }}
                        >
                            {urlError}
                        </Typography>
                    </Box>
                )}
            </Box>
        </>
    );
};
