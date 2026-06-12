export interface DebtFundingOption {
  id: string;
  title: string;
  description: string[];
  selected: boolean;
}

export interface ConvertibleFields {
  fundingAmount: string;
  interestRate: string;
  maturityPeriod: string;
  conversionDiscount: string;
  valuationCap: string;
  intendedUse: string;
}

export interface TraditionalFields {
  fundingAmount: string;
  idealInterestRateRange: string;
  maturityPeriod: string;
  securityType: string;
  interestStructure: string;
  preferredRepaymentSchedule: string;
  collateralAvailable: string;
  intendedUse: string;
}

export interface BusinessDebtDetailsFormProps {
  onBack?: () => void;
  onNext?: (data: any) => void;
  selectedDebtTypes?: string[];
  selectedFundingType?: string;
}

export interface FormHeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
}

export interface DebtOptionsSelectorProps {
  debtOptions: DebtFundingOption[];
  onOptionToggle: (optionId: string) => void;
  error?: string;
}

export interface ConvertibleNoteFormProps {
  formData: ConvertibleFields;
  onFieldChange: (field: keyof ConvertibleFields, value: string) => void;
  errors: Record<string, string>;
}

export interface TraditionalDebtFormProps {
  formData: TraditionalFields;
  onFieldChange: (field: keyof TraditionalFields, value: string) => void;
  errors: Record<string, string>;
}

export interface CustomRadioButtonProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  label: string;
  error?: string;
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

export const INTEREST_STRUCTURE_OPTIONS = ["fixed", "variable", "stepped"];

export const SECURITY_TYPE_OPTIONS = ["Secured", "Unsecured"];

export const REPAYMENT_SCHEDULE_OPTIONS = ["Monthly", "Quarterly", "Annually"];

export const COLLATERAL_OPTIONS = ["Yes", "No"];
