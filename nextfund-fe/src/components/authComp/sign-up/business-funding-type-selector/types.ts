export interface FundingOption {
  id: "equity" | "debt" | "hybrid";
  title: string;
  subtitle?: string;
  description: string[];
}

export interface BusinessFundingTypeSelectorProps {
  onBack: () => void;
  onNext: (selectedFunding: string[]) => void;
}

export interface FormHeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
}

export interface FundingOptionsGridProps {
  fundingOptions: FundingOption[];
  selectedFunding: string;
  onFundingToggle: (fundingId: string) => void;
}

export interface FundingOptionCardProps {
  option: FundingOption;
  isSelected: boolean;
  onToggle: (fundingId: string) => void;
}

export interface ActionButtonsProps {
  selectedFunding: string;
  onContinue: () => void;
}

// Constants
export const FUNDING_OPTIONS: FundingOption[] = [
  {
    id: "equity",
    title: "Equity Funding",
    description: [
      "Bring in investors who give you money in exchange for owning a piece of your business",
      "You don't have to pay them back like a loan",
      "Investors make money only if your company grows and becomes more valuable",
      "Common for startups that want to grow quickly and don't have steady cash flow yet",
    ],
  },
  {
    id: "debt",
    title: "Debt Funding",
    description: [
      "Borrow money (like a loan) that you agree to pay back over time, usually with interest",
      "You keep full ownership of your company",
      "Works best if you already have reliable income to cover repayments",
      "Similar to how a bank loan works, but sometimes offered by investors who specialize in funding businesses",
    ],
  },
  {
    id: "hybrid",
    title: "Hybrid Funding",
    subtitle: '(e.g., "70% equity + 30% debt")',
    description: [
      "A mix of the two — part investment (where investors own a share) and part loan (which you repay)",
      "Can be tailored to your company's needs",
      "Lets you raise money without giving up as much ownership as pure equity",
      "Gives you more flexibility than only taking on debt",
    ],
  },
];
