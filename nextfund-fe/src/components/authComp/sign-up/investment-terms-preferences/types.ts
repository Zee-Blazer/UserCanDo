export interface InvestmentTermsData {
  minimumInvestment: string;
  maximumInvestment: string;
  maximumInvestors: string;
  geographicPreference: string;
  fundingRoundDuration: string;
  expectedCloseDate: string;
  dueDiligenceTimeline: string;
  investorTypePreference: string;
  investorUpdatesFrequency: "monthly" | "quarterly" | "";
}

export interface InvestmentTermsPreferencesProps {
  onBack: () => void;
  onBackToEdit: () => void;
  onContinue: () => void;
  data?: InvestmentTermsData;
  onDataChange: (data: InvestmentTermsData) => void;
}

export interface FormHeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
}

export interface InvestorPreferencesProps {
  formData: InvestmentTermsData;
  onAuthFormChange: (slug: string, inputValue: string) => void;
  onKeyPress: (
    field: keyof InvestmentTermsData
  ) => (event: React.KeyboardEvent<HTMLInputElement>) => void;
  showMaximumInvestmentError?: boolean;
}

export interface InvestmentTimelineProps {
  formData: InvestmentTermsData;
  onAuthFormChange: (slug: string, inputValue: string) => void;
  investorTypeOptions: string[];
  onKeyPress: (
    field: keyof InvestmentTermsData
  ) => (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface AdditionalTermsProps {
  formData: InvestmentTermsData;
  onRadioChange: (
    field: keyof InvestmentTermsData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  radioStyles: object;
}

export interface ActionButtonsProps {
  onBackToEdit: () => void;
  onContinue: () => void;
}
