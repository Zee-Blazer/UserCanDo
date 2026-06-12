import React from 'react';
import { ReviewApplication } from '../../../../components/authComp/sign-up/review-application';

export const ReviewApplicationStep: React.FC<{
    onBack: () => void;
    onSaveDraft: () => void;
    onContinue: () => void;
    data: any;
    onEditSection: (section: string) => void;
}> = ({ onBack, onSaveDraft, onContinue, data, onEditSection }) => {
    return (
        <ReviewApplication
            onBack={onBack}
            onSaveDraft={onSaveDraft}
            onContinue={onContinue}
            data={data}
            onEditSection={onEditSection}
        />
    );
};

export default ReviewApplicationStep;


