export interface FundingOption {
  id: string;
  title: string;
  description: string[];
  selected: boolean;
}

export interface AdditionalFieldsData {
  fundingAmount: string;
  currentValuation: string;
  percentageEquity: string;
  intendedUse: string;
}

export interface BusinessFundingOptionsSelectorProps {
  onBack: () => void;
  onNext: (
    selectedFunding: string, // Changed from string[] to string since only one can be selected
    additionalFields?: AdditionalFieldsData
  ) => void;
}

export interface FormHeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
}

export interface FundingOptionsSelectorProps {
  fundingOptions: FundingOption[];
  onOptionToggle: (optionId: string) => void;
}

export interface AdditionalFieldsProps {
  formData: AdditionalFieldsData;
  onFieldChange: (field: keyof AdditionalFieldsData, value: string) => void;
}

export interface CustomTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
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

export const DEFAULT_FUNDING_OPTIONS: FundingOption[] = [
  {
    id: "safe",
    title: "SAFE (Simple Agreement for Future Equity)",
    description: [
      "Faster, simpler process",
      "Converts to equity in future funding round",
      "Popular with early-stage startups",
    ],
    selected: false,
  },
  {
    id: "priced",
    title: "Priced Round (Term Sheet)",
    description: [
      "Set valuation and share price now",
      "More complex but immediate equity",
      "Common for Series A and beyond",
    ],
    selected: false,
  },
  {
    id: "revenue",
    title: "Revenue Share Agreement",
    description: [
      "Share percentage of future revenue",
      "No direct equity dilution",
      "Performance-based returns",
    ],
    selected: false,
  },
];
