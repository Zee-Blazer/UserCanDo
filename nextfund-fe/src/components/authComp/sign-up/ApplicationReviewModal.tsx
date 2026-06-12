import { Box, Modal } from '@mui/material';
import React from 'react';

import { ActionButtons } from './application-review-modal/ActionButtons';
import { AfterApprovalSection } from './application-review-modal/AfterApprovalSection';
import { ContactInfo } from './application-review-modal/ContactInfo';
import { ModalHeader } from './application-review-modal/ModalHeader';
import { NextStepsSection } from './application-review-modal/NextStepsSection';
import { ReviewChecklist } from './application-review-modal/ReviewChecklist';

import type { ApplicationReviewModalProps } from './application-review-modal/types';

export const ApplicationReviewModal: React.FC<ApplicationReviewModalProps> = ({
    open,
    onClose,
    onEditApplication,
    onTrackStatus
}) => {
    const checklistItems = [
        'Company incorporation status',
        'Funding amount and structure',
        'Regulatory compliance readiness',
        'Platform eligibility criteria'
    ];

    const nextSteps = [
        {
            title: 'Qualified applications',
            description: 'proceed to set investor preferences and final submission'
        },
        {
            title: 'Applications needing clarification -',
            description: "we'll contact you within 24 hours"
        },
        {
            title: 'Review timeline:',
            description: '1-2 business days'
        }
    ];

    const afterApprovalSteps = [
        'Set your investor preferences and terms',
        'Complete final application review',
        'Go live on the platform'
    ];

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    p: { xs: 3, sm: 4 },
                    maxWidth: '700px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    position: 'relative',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
            >
                {/* Header Section */}
                <ModalHeader
                    onClose={onClose}
                    title="Application Under Review"
                    subtitle="We're reviewing your application to ensure you meet our platform requirements"
                />

                {/* Review Checklist Section */}
                <ReviewChecklist checklistItems={checklistItems} />

                {/* Next Steps Section */}
                <NextStepsSection nextSteps={nextSteps} />

                {/* After Approval Section */}
                <AfterApprovalSection afterApprovalSteps={afterApprovalSteps} />

                {/* Action Buttons Section */}
                <ActionButtons
                    onEditApplication={onEditApplication}
                    onTrackStatus={onTrackStatus}
                />

                {/* Contact Information Section */}
                <ContactInfo email="applications@nexfund.com" />
            </Box>
        </Modal>
    );
};