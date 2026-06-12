export interface HybridFundingData {
  equityPortion: number;
  equityComponent: {
    repaymentSchedule: "SAFE" | "Priced Round" | "Revenue Share";
    equityPercentage: string;
    enabled: boolean;
  };
  debtComponent: {
    type: "Convertible Note" | "Traditional Debt";
    interestRate: string;
    maturityPeriod?: string;
    repaymentTerm?: string;
    conversionDiscount?: string;
    valuationCap?: string;
    security?: "Secured" | "Unsecured";
    repaymentSchedule?: "Monthly" | "Quarterly" | "Annually";
    enabled: boolean;
  };
  conversionOptions: {
    allowDebtToEquityConversion: boolean;
    performanceBasedTriggers: boolean;
    timeBasedOptions: boolean;
    selectedOption?:
      | "allowDebtToEquityConversion"
      | "performanceBasedTriggers"
      | "timeBasedOptions";
  };
  intendedUse: string;
}

export interface HybridFundingSelectorProps {
  onBack: () => void;
  onNext: (data: HybridFundingData) => void;
  selectedFundingType?: string;
}

export interface FormHeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
}

export interface SplitConfigurationProps {
  equityPortion: number;
  onEquityPortionChange: (_event: Event, newValue: number | number[]) => void;
}

export interface EquityComponentProps {
  formData: HybridFundingData;
  onComponentToggle: (component: "equity" | "debt") => void;
  onInputChange: (
    section: "equityComponent" | "debtComponent" | "conversionOptions",
    field: string,
    value: string | boolean
  ) => void;
  onEquityScheduleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DebtComponentProps {
  formData: HybridFundingData;
  onComponentToggle: (component: "equity" | "debt") => void;
  onInputChange: (
    section: "equityComponent" | "debtComponent" | "conversionOptions",
    field: string,
    value: string | boolean
  ) => void;
  onDebtTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDebtSecurityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDebtRepaymentScheduleChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export interface ConversionOptionsProps {
  formData: HybridFundingData;
  onConversionOptionChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export interface StyledRadioButtonProps {
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
}

// Constants for form options
export const INTENDED_USE_OPTIONS = [
  { value: "product-development", label: "Product Development" },
  { value: "marketing-sales", label: "Marketing & Sales" },
  { value: "team-expansion", label: "Team Expansion" },
  { value: "technology-infrastructure", label: "Technology & Infrastructure" },
  { value: "working-capital", label: "Working Capital" },
  { value: "market-expansion", label: "Market Expansion" },
  { value: "other", label: "Other" },
];
