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
  avatar?: string;
}

export interface BusinessSignUpFormProps {
  onNext: (formData: BusinessFormData) => void;
}

export interface CompanyInformationProps {
  formData: BusinessFormData;
  onInputChange: (field: string, value: string) => void;
  onAvatarChange?: (avatarUrl: string) => void;
}

export interface PersonalInformationProps {
  formData: BusinessFormData;
  onInputChange: (field: string, value: string) => void;
}

export interface AuthCredentialsProps {
  formData: BusinessFormData;
  onInputChange: (field: string, value: string) => void;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onTogglePasswordVisibility: () => void;
  onToggleConfirmPasswordVisibility: () => void;
}

export interface FormActionsProps {
  isSubmitDisabled: boolean;
  error: string | null;
}

// Constants for dropdowns
export const INDUSTRIES = [
  "Agriculture",
  "Education",
  "Entertainment",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Real Estate",
  "Retail",
  "Technology",
  "Transportation",
  "Other",
];

// Countries are now imported from @/constants/countries
// This provides better type safety, search functionality, and maintainability

export const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

export const COMPANY_STAGES = [
  "Ideation",
  "Pre-revenue",
  "Revenue-generating",
  "Profitable",
];
