export interface InvestorUserProfile {
  investor_id: string;
  user_id: string;
}

export interface InvestorSignUpDetails {
  first_name: string;
  last_name: string;
  email: string;
  investment_firm?: string;
  investor_type?: string;
  investment_experience?: string;
  password: string;
  avatar?: string;
}
