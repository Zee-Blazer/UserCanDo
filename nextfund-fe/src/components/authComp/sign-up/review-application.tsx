import { Box, Divider } from '@mui/material';
import React from 'react';


import { ActionButtons } from './review-application/ActionButtons';
import { ApplicationSummary } from './review-application/ApplicationSummary';
import { FormHeader } from './review-application/FormHeader';
import { NextSteps } from './review-application/NextSteps';
import { ReviewSections } from './review-application/ReviewSections';


import {
    DEFAULT_NEXT_STEPS,
    DEFAULT_REVIEW_SECTIONS,
    type ReviewApplicationProps
} from './review-application/types';


export type {
    ReviewApplicationData,
    ReviewApplicationProps
} from './review-application/types';

export const ReviewApplication: React.FC<ReviewApplicationProps> = ({
    onBack,
    onSaveDraft,
    onContinue,
    data,
    onEditSection
}) => {

    return (
        <Box sx={{
            maxWidth: '800px',
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, sm: 3 }
        }}>
            <FormHeader
                onBack={onBack}
                title="Review Your Application"
                subtitle="Review all information before proceeding to document upload and final compliance"
            />

            <ApplicationSummary data={data} />

            <Divider sx={{ my: { xs: 3, sm: 4 } }} />

            <ReviewSections
                sections={DEFAULT_REVIEW_SECTIONS}
                onEditSection={onEditSection}
            />

            <Divider sx={{ my: { xs: 3, sm: 4 } }} />

            <NextSteps steps={DEFAULT_NEXT_STEPS} />

            <ActionButtons
                onSaveDraft={onSaveDraft}
                onContinue={onContinue}
            />
        </Box>
    );
};