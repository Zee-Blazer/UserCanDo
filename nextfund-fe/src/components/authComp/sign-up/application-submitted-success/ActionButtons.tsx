import { Box } from '@mui/material';
import React from 'react';
import { CustomButton } from '../../../General/ui';
import type { ActionButtonsProps } from './types';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    onInviteMembers,
    onGoToDashboard,
    isGoToDashboardLoading = false,
    showInviteMembers = true
}) => {
    const handleInviteMembers = async () => {
        const signupUrl = "https://nexfundafrica.com/sign-up";
        try {
            await navigator.clipboard.writeText(signupUrl);
            alert("Link has been copied to clipboard");
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = signupUrl;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                alert("Link has been copied to clipboard");
            } catch (fallbackErr) {
                alert(`Failed to copy link. Please copy manually: ${signupUrl}`);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                mb: 3
            }}
        >
            {/* NOT PROD READY */}
            {showInviteMembers && (
                <CustomButton
                    variant="outline"
                    fullWidth
                    onClick={handleInviteMembers}
                    sx={{ py: 2, fontSize: '1rem' }}
                >
                    Invite Team Members
                </CustomButton>
            )}
            <CustomButton
                variant="primary"
                fullWidth
                onClick={onGoToDashboard}
                sx={{ py: 2, fontSize: '1rem' }}
                isLoading={isGoToDashboardLoading}
            >
                Go to Dashboard
            </CustomButton>
        </Box>
    );
};
