import { Box, Divider } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { ROUTES } from '../../../constants/routes';

import { ActionButtons } from './application-submitted-success/ActionButtons';
import { ContactInformation } from './application-submitted-success/ContactInformation';
import { ImmediateActions } from './application-submitted-success/ImmediateActions';
import { SuccessHeader } from './application-submitted-success/SuccessHeader';
import { WhatHappensNext } from './application-submitted-success/WhatHappensNext';

import type { ApplicationSubmittedSuccessProps, ImmediateAction } from './application-submitted-success/types';
import { PROCESS_STEPS } from './application-submitted-success/types';

export type { ApplicationSubmittedSuccessProps } from './application-submitted-success/types';

const isProd = process.env.NODE_ENV === 'production';

export const ApplicationSubmittedSuccess: React.FC<ApplicationSubmittedSuccessProps> = ({
    onGoToDashboard,
    onViewStatus,
    onAccessDashboard,
    onInviteMembers,
    onPreviewListing,
}) => {
    const immediateActions: ImmediateAction[] = [
        // NOT PROD READY
        ...(!isProd ? [{ id: 'view-status', title: 'View Application Status', onClick: onViewStatus }] : []),
        // NOT PROD READY
        ...(!isProd ? [{
            id: 'access-dashboard',
            title: 'Access Company Dashboard',
            href: ROUTES.login
        }] : []),
        // NOT PROD READY
        ...(!isProd ? [{ id: 'invite-members', title: 'Invite Team Members', onClick: onInviteMembers }] : []),
        // NOT PROD READY
        ...(!isProd ? [{ id: 'preview-listing', title: 'Preview Your Investor Listing', onClick: onPreviewListing }] : []),
    ];

    const [isGoToDashboardLoading, setIsGoToDashboardLoading] = useState(false);

    const handleGoToDashboardClick = useCallback(async () => {
        if (isGoToDashboardLoading) {
            return;
        }

        setIsGoToDashboardLoading(true);
        try {
            await Promise.resolve(onGoToDashboard());
        } finally {
            // If navigation happens synchronously, this won't run,
            // but ensures we reset state when the action does not redirect.
            setIsGoToDashboardLoading(false);
        }
    }, [isGoToDashboardLoading, onGoToDashboard]);

    return (
        <Box sx={{ maxWidth: '600px', mx: 'auto', p: 4 }}>
            {/* Success Header Section */}
            <SuccessHeader
                title="Application Submitted Successfully"
                subtitle="Your fundraising application is now under review"
            />

            {/* What Happens Next Section */}
            <WhatHappensNext steps={PROCESS_STEPS} />

            <Divider sx={{ mb: 4 }} />

            {/* Immediate Actions Section - NOT PROD READY */}
            {!isProd && <ImmediateActions actions={immediateActions} />}

            {/* Action Buttons Section */}
            <ActionButtons
                onInviteMembers={onInviteMembers}
                onGoToDashboard={handleGoToDashboardClick}
                isGoToDashboardLoading={isGoToDashboardLoading}
                showInviteMembers={!isProd}
            />

            {/* Contact Information Section */}
            <ContactInformation
                email="companies@nexfund.com"
                helpLink="#"
            />
        </Box>
    );
};