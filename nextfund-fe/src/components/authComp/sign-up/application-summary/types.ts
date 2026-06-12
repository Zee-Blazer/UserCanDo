export interface ApplicationSummaryData {
  company: {
    name: string;
    industry: string;
    foundedYear: string;
    stage: string;
    employeeCount: string;
  };
  funding: {
    type: string;
    amount: string;
    equityOffering: string;
    duration: string;
    closeDate: string;
  };
  useOfFunds: string[];
  investorPreferences: {
    minInvestment: string;
    maxInvestment: string;
    investorTypes: string[];
  };
}

export interface ApplicationSummaryProps {
  onBack: () => void;
  onEditApplication: () => void;
  onSubmitApplication: () => void;
  onSaveDraft: () => void;
  isSubmitting?: boolean;
  data: ApplicationSummaryData;
}

export interface FormHeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
}

export interface ApplicationOverviewProps {
  data: ApplicationSummaryData;
}

export interface CompletedSectionsProps {
  completedSections: string[];
}

export interface FinalStep {
  title: string;
  description: string;
}

export interface FinalStepsProps {
  finalSteps: FinalStep[];
}

export interface ActionButtonsProps {
  onEditApplication: () => void;
  onSubmitApplication: () => void;
  onSaveDraft: () => void;
  isSubmitting?: boolean;
}

export interface InfoCardProps {
  children: React.ReactNode;
}

// Constants
export const COMPLETED_SECTIONS = [
  "Company Information & Metrics",
  "Funding Structure & Terms",
  "Use of Funds Breakdown",
  "Required Documents Uploaded",
  "Compliance Verification",
  "Investment Preferences",
];

export const FINAL_STEPS: FinalStep[] = [
  {
    title: "Final Review",
    description: "Review all information one last time",
  },
  {
    title: "Submit Application",
    description: "Complete your fundraising application",
  },
  {
    title: "Platform Review (3-5 days)",
    description: "Our team reviews your application",
  },
  {
    title: "Go Live",
    description: "Start receiving investor interest",
  },
];
