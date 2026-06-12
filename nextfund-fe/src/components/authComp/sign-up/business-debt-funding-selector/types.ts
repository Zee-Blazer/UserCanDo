export interface DebtFundingOption {
  id: string;
  title: string;
  description: string[];
  selected: boolean;
}

export interface BusinessDebtFundingSelectorProps {
  onBack: () => void;
  onNext: (selectedDebtOptions: string[]) => void;
}

export interface FormHeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
}

export interface DebtOptionsGridProps {
  debtOptions: DebtFundingOption[];
  onOptionToggle: (optionId: string) => void;
}

export interface DebtOptionCardProps {
  option: DebtFundingOption;
  onToggle: (optionId: string) => void;
}

export interface ActionButtonsProps {
  isFormValid: boolean;
  onContinue: () => void;
}

// Constants
export const INITIAL_DEBT_OPTIONS: DebtFundingOption[] = [
  {
    id: 'convertible',
    title: 'Convertible Note',
    description: [
      'Debt that converts to equity at future funding',
      'Includes interest rate and maturity date',
      'Often includes discount and valuation cap'
    ],
    selected: false
  },
  {
    id: 'traditional',
    title: 'Traditional Debt',
    description: [
      'Repayment only (no equity conversion)',
      'Fixed repayment terms',
      'Retain full company ownership'
    ],
    selected: false
  }
];
