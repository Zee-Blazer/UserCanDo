export interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  description: string;
}

export interface CompanyMetricsData {
  companyStage: string;
  grossMargin: string;
  burnRate: string;
  monthsOfRunway: string;
  monthlyRevenue: string;
  monthlyGrowthRate: string;
  numberOfCustomers: string;
  teamSize: string;
  previousFunding: string;
  totalPreviousFunding: string;
  financialStatementsText?: string;
  teamMembers: TeamMember[];
}

export interface CompanyMetricsFormProps {
  onBack: () => void;
  onNext: (data: CompanyMetricsData) => void;
}

export interface FormHeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
}

export interface CompanyStageSectionProps {
  companyStage: string;
  onStageChange: (value: string) => void;
}

export interface FinancialsSectionProps {
  formData: {
    grossMargin: string;
    burnRate: string;
    monthsOfRunway: string;
  };
  onFieldChange: (field: string, value: string) => void;
}

export interface FinancialStatementsSectionProps {
  value?: string;
  onChange?: (value: string) => void;
}

export interface KeyMetricsSectionProps {
  formData: {
    monthlyRevenue: string;
    monthlyGrowthRate: string;
    numberOfCustomers: string;
    teamSize: string;
  };
  onFieldChange: (field: string, value: string) => void;
}

export interface PreviousFundingSectionProps {
  formData: {
    previousFunding: string;
    totalPreviousFunding: string;
  };
  onFieldChange: (field: string, value: string) => void;
}

export interface TeamDetailsSectionProps {
  teamMembers: TeamMember[];
  onTeamMembersChange: (teamMembers: TeamMember[]) => void;
  onRemoveTeamMember?: (memberId: string) => void;
}

export interface ActionButtonsProps {
  isFormValid: boolean;
  onSubmit: () => void;
}

// Constants
export const COMPANY_STAGE_OPTIONS = [
  "Idea Stage",
  "Prototype",
  "MVP",
  "Early Revenue",
  "Growth Stage",
  "Expansion",
  "Mature",
];

export const PREVIOUS_FUNDING_OPTIONS = [
  "None",
  "Friends & Family",
  "Angel Investment",
  "Seed Round",
  "Series A",
  "Series B",
  "Series C+",
  "Government Grant",
  "Crowdfunding",
  "Revenue Based Financing",
];
