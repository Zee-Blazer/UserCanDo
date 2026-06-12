import { Box, Divider } from '@mui/material';
import React from 'react';

import { ActionButtons } from './application-summary/ActionButtons';
import { ApplicationOverview } from './application-summary/ApplicationOverview';
import { CompletedSections } from './application-summary/CompletedSections';
import { FinalSteps } from './application-summary/FinalSteps';
import { FormHeader } from './application-summary/FormHeader';

import type { ApplicationSummaryProps } from './application-summary/types';
import { COMPLETED_SECTIONS, FINAL_STEPS } from './application-summary/types';

export type { ApplicationSummaryData, ApplicationSummaryProps } from './application-summary/types';

export const ApplicationSummary: React.FC<ApplicationSummaryProps> = ({
    onBack,
    onEditApplication,
    onSubmitApplication,
    onSaveDraft,
    isSubmitting,
    data,
}) => {
    return (
        <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
            {/* Header Section */}
            <FormHeader
                onBack={onBack}
                title="Application Summary"
                subtitle="Review your complete application details before final submission"
            />

            {/* Application Overview Section */}
            <ApplicationOverview data={data} />

            {/* Completed Sections */}
            <CompletedSections completedSections={COMPLETED_SECTIONS} />

            <Divider sx={{ mb: 4 }} />

            {/* Final Steps */}
            <FinalSteps finalSteps={FINAL_STEPS} />

            {/* Action Buttons */}
            <ActionButtons
                onEditApplication={onEditApplication}
                onSubmitApplication={onSubmitApplication}
                onSaveDraft={onSaveDraft}
                isSubmitting={isSubmitting}
            />
        </Box>
    );
};