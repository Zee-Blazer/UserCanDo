import React from 'react';
import { ApplicationSubmittedSuccess } from '../../../../components/authComp/sign-up/application-submitted-success';

export const SubmittedSuccessStep: React.FC<{
    onGoToDashboard: () => void;
    onViewStatus: () => void;
    onAccessDashboard: () => void;
    onInviteMembers: () => void;
    onPreviewListing: () => void;
}> = ({ onGoToDashboard, onViewStatus, onAccessDashboard, onInviteMembers, onPreviewListing }) => {
    return (
        <ApplicationSubmittedSuccess
            onGoToDashboard={onGoToDashboard}
            onViewStatus={onViewStatus}
            onAccessDashboard={onAccessDashboard}
            onInviteMembers={onInviteMembers}
            onPreviewListing={onPreviewListing}
        />
    );
};

export default SubmittedSuccessStep;


