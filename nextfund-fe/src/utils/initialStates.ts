export const initialLoginData = {
  access_token: "",
  refresh_token: "",
  role: "",
  user_id: "",
  email: "",
  first_name: "",
  last_name: "",
  avatar: null,
  user_type: "",
  is_business: false,
  business_id: "",
};

export const initialLoginForm = {
  email: "",
  password: "",
};

export const initialBusinessUserProfile = {
  business_id: "",
  user_id: "",
  company_name: "",
  industry_sector: "",
  year_founded: "",
  country_location: "",
  company_size: "",
  current_stage: "",
  description: "",
  website_url: "",
  first_name: "",
  last_name: "",
  linked_in_profile: "",
  email: "",
  phone_number: "",
};

export const initialInvestorSignUpDetails = {
  first_name: "",
  last_name: "",
  email: "",
  investment_firm: "",
  password: "",
  avatar: "",
};

// Business signup form initial states
export const initialBusinessFormData = {
  companyName: "",
  industry: "",
  yearFounded: "",
  country: "",
  countryName: "",
  headquarters: "",
  companySize: "",
  currentStage: "",
  briefDescription: "",
  marketOpportunityDescription: "",
  competitive_advantage_description: "",
  websiteUrl: "",
  firstName: "",
  lastName: "",
  linkedinProfile: "",
  emailAddress: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

export const initialFundingStructureData = {
  funding_type: "",
  instrument_type: "",
  funding_amount_seeking: "",
  current_valuation: "",
  percentage_equity_offering: "",
  intended_use_of_funds: "",
  interest_rate: "",
  maturity_period: "",
  repayment_term: "",
  conversion_discount: "",
  valuation_cap: "",
  ideal_interest_range: "",
  security_type: "",
  interest_structure: "",
  repayment_schedule: "",
  collateral_available: "",
  hybrid_equity_type: "",
  hybrid_debt_type: "",
  hybrid_equity_percentage: "",
  hybrid_debt_percentage: "",
  hybrid_equity_enabled: false,
  hybrid_debt_enabled: false,
  selected_debt_types: [],
};

export const initialCompanyMetricsData = {
  company_stage: "",
  gross_margin: "",
  burn_rate: "",
  months_of_runway: "",
  upload_option_for_financial_statements: "",
  monthly_revenue: "",
  monthly_growth_rate: "",
  number_of_customers: "",
  team_size: "",
  previous_funding: "",
  total_previous_funding: "",
  team_members: [],
};

export const initialUseOfFundsData = {
  product_development: "",
  marketing_and_sales: "",
  team_expansion: "",
  technology_infrastructure: "",
  working_capital: "",
  market_expansion: "",
  others: "",
  expected_funding_completion: "",
  funds_deployment_timeline: "",
  key_milestone_to_achieve_with_funding: "",
};

export const initialEssentialDocumentsData = {
  business_plan: "",
  financial_statements: "",
  financial_projections: "",
  pitch_deck: "",
  certificate_of_incorporation: "",
  cap_table: "",
  market_analysis: "",
  product_demo: "",
  customer_references: "",
  legal_agreements: "",
  director_id: "",
};

export const initialComplianceVerificationData = {
  interest_structure: "",
  registration_number: "",
  tax_id_number: "",
  registered_address: "",
  legally_incorporated: false,
  founders_equity_agreement: false,
  pending_legal_disputes: false,
  authorized_to_raise_capital: false,
  local_securities_regulations: false,
  certificate_of_incorporation: "",
  founder_agreements: "",
  legal_compliance_certificate: "",
  declaration: false,
};

export const initialInvestmentPreferencesData = {
  minimum_investment: 0,
  maximum_investment: 0,
  maximum_number_of_investors: 0,
  geographic_preference: "",
  funding_round_duration: "",
  expected_close_date: "",
  due_diligence_timeline: "",
  investor_type_preference: "",
  board_seat_offering: "",
  investor_updates_frequency: "",
  anti_dilution_rights: "",
};

export const initialBusinessListingData = {
  payload: {
    user_id: "",
    business_id: "",
    is_complete: false,
    listing_id: "",
  },
  funding_structure: initialFundingStructureData,
  company_metrics_and_financial_information: initialCompanyMetricsData,
  use_of_funds: initialUseOfFundsData,
  essential_documents: initialEssentialDocumentsData,
  compliance_and_verification: initialComplianceVerificationData,
  investment_preference: initialInvestmentPreferencesData,
};
