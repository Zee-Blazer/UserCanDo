export interface FundingBreakdownData {
  productDevelopment: number;
  marketingSales: number;
  teamExpansion: number;
  technologyInfrastructure: number;
  workingCapital: number;
  marketExpansion: number;
  other: number;
}

export interface TimelineData {
  expectedFundingCompletion: string;
  fundsDeploymentTimeline: string;
}

export interface UseOfFundsData {
  fundingBreakdown: FundingBreakdownData;
  timeline: TimelineData;
  milestones: string;
}

export interface UseOfFundsFormProps {
  onBack: () => void;
  onNext: (data: UseOfFundsData) => void;
}
