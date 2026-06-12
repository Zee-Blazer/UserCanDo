import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { CustomButton } from '../../../General/ui';

interface FormActionsProps {
    isSubmitDisabled: boolean;
    error: string | null;
    isLoading?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
    isSubmitDisabled,
    error,
    isLoading = false,
}) => {
    return (
        <>
            <Box sx={{ mt: 4 }}>
                <CustomButton
                    variant="primary"
                    fullWidth
                    type="submit"
                    sx={{
                        fontSize: '1rem',
                        py: 1.5,
                        borderRadius: '12px',
                        fontWeight: 600
                    }}
                    disabled={isSubmitDisabled || isLoading}
                    isLoading={isLoading}
                >
                    Create account
                </CustomButton>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Link
                        href="/sign-in"
                        style={{
                            color: '#4CAF50',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontWeight: 500
                        }}
                    >
                        Log in
                    </Link>
                </Typography>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    By creating an account, you agree to our Terms of<br />
                    Service and Privacy Policy.
                </Typography>
            </Box>

            {error && (
                <Box sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: '#ffebee',
                    border: '1px solid #f44336',
                    borderRadius: '8px',
                    color: '#d32f2f'
                }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {error}
                    </Typography>
                </Box>
            )}
        </>
    );
};
