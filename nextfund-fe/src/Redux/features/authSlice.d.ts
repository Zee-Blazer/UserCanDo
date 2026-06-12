export interface LoginApiData {
  access_token: string;
  refresh_token: string;
  role: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string | null;
  user_type: string;
  is_business: boolean;
  business_id: string;
  is_first_login?: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}
