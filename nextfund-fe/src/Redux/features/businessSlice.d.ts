export interface BusinessUserProfile {
  business_id: string;
  user_id: string;
  company_name?: string;
  industry_sector?: string;
  year_founded?: string;
  country_location?: string;
  company_size?: string;
  current_stage?: string;
  description?: string;
  website_url?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  linked_in_profile?: string;
  email?: string;
  phone_number?: string;
}

// Business Form Data for initial registration
export interface BusinessFormData {
  companyName: string;
  industry: string;
  yearFounded: string;
  country: string;
  countryName?: string;
  headquarters: string;
  companySize: string;
  currentStage: string;
  briefDescription: string;
  marketOpportunityDescription: string;
  competitive_advantage_description: string;
  websiteUrl: string;
  firstName: string;
  lastName: string;
  linkedinProfile: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

// Funding Structure Data
export interface FundingStructureData {
  funding_type: string;
  instrument_type: string;
  funding_amount_seeking: string;
  current_valuation: string;
  percentage_equity_offering: string;
  intended_use_of_funds: string;
  interest_rate: string;
  maturity_period: string;
  repayment_term: string;
  conversion_discount: string;
  valuation_cap: string;
  ideal_interest_range: string;
  security_type: string;
  interest_structure: string;
  repayment_schedule: string;
  collateral_available: string;
  hybrid_equity_type: string;
  hybrid_debt_type: string;
  hybrid_equity_percentage: string;
  hybrid_debt_percentage: string;
  hybrid_equity_enabled: boolean;
  hybrid_debt_enabled: boolean;
  selected_debt_types: string[];
}

// Team Member Data
export interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  description: string;
}

// Company Metrics Data
export interface CompanyMetricsData {
  company_stage: string;
  gross_margin: string;
  burn_rate: string;
  months_of_runway: string;
  upload_option_for_financial_statements: string;
  monthly_revenue: string;
  monthly_growth_rate: string;
  number_of_customers: string;
  team_size: string;
  previous_funding: string;
  total_previous_funding: string;
  team_members: TeamMember[];
}

// Use of Funds Data
export interface UseOfFundsData {
  product_development: string;
  marketing_and_sales: string;
  team_expansion: string;
  technology_infrastructure: string;
  working_capital: string;
  market_expansion: string;
  others: string;
  expected_funding_completion: string;
  funds_deployment_timeline: string;
  key_milestone_to_achieve_with_funding: string;
}

// Essential Documents Data
export interface EssentialDocumentsData {
  business_plan: string;
  financial_statements: string;
  financial_projections: string;
  pitch_deck: string;
  certificate_of_incorporation: string;
  cap_table: string;
  market_analysis: string;
  product_demo: string;
  customer_references: string;
  legal_agreements: string;
  director_id: string;
}

// Compliance and Verification Data
export interface ComplianceVerificationData {
  interest_structure: string;
  registration_number: string;
  tax_id_number: string;
  registered_address: string;
  legally_incorporated: boolean;
  founders_equity_agreement: boolean;
  pending_legal_disputes: boolean;
  authorized_to_raise_capital: boolean;
  local_securities_regulations: boolean;
  certificate_of_incorporation: string;
  founder_agreements: string;
  legal_compliance_certificate: string;
  declaration: boolean;
}

// Investment Preferences Data
export interface InvestmentPreferencesData {
  minimum_investment: number;
  maximum_investment: number;
  maximum_number_of_investors: number;
  geographic_preference: string;
  funding_round_duration: string;
  expected_close_date: string;
  due_diligence_timeline: string;
  investor_type_preference: string;
  board_seat_offering: string;
  investor_updates_frequency: string;
  anti_dilution_rights: string;
}

// Complete Business Listing Data
export interface BusinessListingData {
  payload: {
    user_id: string;
    business_id: string;
    is_complete: boolean;
    listing_id?: string;
  };
  funding_structure: FundingStructureData;
  company_metrics_and_financial_information: CompanyMetricsData;
  use_of_funds: UseOfFundsData;
  essential_documents: EssentialDocumentsData;
  compliance_and_verification: ComplianceVerificationData;
  investment_preference: InvestmentPreferencesData;
}
