export interface ApplicationSubmittedSuccessProps {
  onGoToDashboard: () => void | Promise<void>;
  onViewStatus: () => void;
  onAccessDashboard: () => void;
  onInviteMembers: () => void;
  onPreviewListing: () => void;
}

export interface SuccessHeaderProps {
  title: string;
  subtitle: string;
}

export interface ProcessStep {
  title: string;
  items: string[];
}

export interface WhatHappensNextProps {
  steps: ProcessStep[];
}

export interface ImmediateAction {
  id: string;
  title: string;
  onClick?: () => void;
  href?: string;
}

export interface ImmediateActionsProps {
  actions: ImmediateAction[];
}

export interface ActionButtonsProps {
  onInviteMembers: () => void;
  onGoToDashboard: () => void | Promise<void>;
  isGoToDashboardLoading?: boolean;
  showInviteMembers?: boolean;
}

export interface ContactInformationProps {
  email: string;
  helpLink: string;
}

// Constants
export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "1. Review Process (within 48 hours)",
    items: [
      "Our team reviews your application and documents",
      "We may contact you for additional information",
    ],
  },
  {
    title: "2. Due Diligence Support",
    items: [
      "Access to investor relations tools",
      "Document management system",
      "Investor communication platform",
    ],
  },
  {
    title: "3. Go Live",
    items: [
      "Your company listing becomes visible to investors",
      "Start receiving investor interest and inquiries",
    ],
  },
];
