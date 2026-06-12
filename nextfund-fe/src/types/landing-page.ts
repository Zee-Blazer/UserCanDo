export interface Investment {
  id: string; // Should be listing_id when routing to opportunity details
  listing_id?: string; // Explicit listing ID field (from business_listing_id in API)
  category:
    | "FINTECH"
    | "AGRICULTURE"
    | "HEALTHCARE"
    | "REAL ESTATE"
    | "LOGISTICS"
    | "ENERGY"
    | "Technology"
    | "Agriculture"
    | "Healthcare"
    | "Real Estate"
    | "Logistics"
    | "Energy"
    | "Manufacturing"
    | "Hospitality";
  title: string;
  location: string;
  description: string;
  fundingProgress: number;
  targetAmount: number;
  expectedROI: string;
  isSharesCompliant?: boolean;
  founded?: number;
  teamSize?: number;
  website?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  contactVisible?: boolean;
  headquarters?: string;
  investmentTerm?: string;
  minInvestment?: number;
  investors?: number;
  closingDays?: number;
  expectedCloseDate?: string;
  businessOverview?: string;
  businessOverviewTitle?: string;
  marketOpportunity?: string;
  competitiveAdvantage?: string;
  maxInvestment?: number;
  burnRate?: string;
  grossMargin?: string;
  monthlyGrowthRate?: string;
  geographicPreference?: string;
  dueDiligenceTimeline?: string;
  fundingRoundDuration?: string;
  // Contact information
  ownerName?: string | null;
  taxIdNumber?: string;
  registrationNumber?: string;
  // Financial metrics
  currentValuation?: number;
  equityOffering?: string;
  // Use of funds breakdown
  useOfFunds?: Record<string, string>;
  // Documents
  documents?: Record<string, string>;
  documents_restricted?: boolean;
  documents_object?: Record<string, any>;
  preview_document?: {
    key: string;
    name: string;
    file: string | null;
  };
  // Compliance
  compliance?: Record<string, any>;
  // Investment preferences
  investmentPreferences?: Record<string, any>;
  fundingGoal?: number;
  currentFunding?: number;
  company_metrics_and_financial_information?: Record<string, any>;
  funding_structure?: Record<string, any>;
  use_of_funds?: Record<string, any>;
  essential_documents?: Record<string, any>;
  compliance_and_verification?: Record<string, any>;
  investment_preference?: Record<string, any>;
  is_complete?: boolean;
  review_status?: string;
  approval_status?: string;
  funding_status?: string;
  created_at?: string;
  last_modified?: string;
  userInvestmentStatus?: string;
  userHasActiveInterest?: boolean;
  userInvestmentId?: string;
  userDueDiligenceStatus?: string;
}

export interface FilterState {
  categories: string[];
  location: string;
  expectedROI: string[];
  search: string;
  compliance?: string[];
  investmentAmount?: [number, number];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  style?: React.CSSProperties;
}

export interface SocialMediaLink {
  icon: string;
  href: string;
  label: string;
  ariaLabel: string;
}

export interface KeyMetric {
  label: string;
  value: string;
  description?: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  completed?: boolean;
}

export interface CompetitiveAdvantage {
  title: string;
  description: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface BusinessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SecurityFeature {
  id: string;
  title: string;
  description: string;
}

export interface WhyChooseFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}
