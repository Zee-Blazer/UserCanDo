import React from 'react';
import { ApplicationSummary } from '../../../../components/authComp/sign-up/application-summary';


export const ApplicationSummaryStep: React.FC<{
    onBack: () => void;
    onEditApplication: () => void;
    onSubmitApplication: () => void;
    onSaveDraft: () => void;
    isSubmitting?: boolean;
    data: any;
}> = ({ onBack, onEditApplication, onSubmitApplication, onSaveDraft, isSubmitting, data }) => {
    return (
        <ApplicationSummary
            onBack={onBack}
            onEditApplication={onEditApplication}
            onSubmitApplication={onSubmitApplication}
            onSaveDraft={onSaveDraft}
            isSubmitting={isSubmitting}
            data={data}
        />
    );
};

export default ApplicationSummaryStep;


