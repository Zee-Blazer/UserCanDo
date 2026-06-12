export interface ReviewApplicationData {
    company: {
        name: string;
        amount: string;
        type: string;
        stage: string;
        industry: string;
    };
    useOfFunds: string[];
}

export interface ReviewApplicationProps {
    onBack: () => void;
    onSaveDraft: () => void;
    onContinue: () => void;
    data: ReviewApplicationData;
    onEditSection: (section: string) => void;
}

export interface FormHeaderProps {
    onBack: () => void;
    title: string;
    subtitle: string;
}

export interface ApplicationSummaryProps {
    data: ReviewApplicationData;
}

export interface ReviewSection {
    id: string;
    title: string;
}

export interface ReviewSectionsProps {
    sections: ReviewSection[];
    onEditSection: (section: string) => void;
}

export interface NextStepsProps {
    steps: string[];
}

export interface ActionButtonsProps {
    onSaveDraft: () => void;
    onContinue: () => void;
}

// Constants for review sections
export const DEFAULT_REVIEW_SECTIONS: ReviewSection[] = [
    { id: 'company-info', title: 'Company Information' },
    { id: 'funding-structure', title: 'Funding Structure' },
    { id: 'metrics-financials', title: 'Company Metrics & Financials' },
    { id: 'use-of-funds', title: 'Use of Funds' },
];

// Constants for next steps
export const DEFAULT_NEXT_STEPS = [
    'Upload required documents and complete compliance verification',
    'Final review and submission will occur after document upload',
    'Complete application review typically takes 3-5 business days'
];
