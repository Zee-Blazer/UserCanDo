export interface ComplianceData {
  regulatoryInfo: {
    interestStructure: string;
    registrationNumber: string;
    taxIdNumber: string;
    registeredAddress: string;
  };
  complianceChecklist: {
    legallyIncorporated: boolean;
    clearEquityAgreements: boolean;
    noPendingDisputes: boolean;
    authorizedToRaise: boolean;
    securitiesCompliance: boolean;
  };
  documents: {
    certificateOfIncorporation: File | null;
    founderAgreements: File | null;
    legalComplianceCertificate: File | null;
  };
  declarations: {
    accurateInfo: boolean;
    authorityToRaise: boolean;
    termsAgreement: boolean;
  };
}

export interface ComplianceVerificationFormProps {
  onBack: () => void;
  onNext: (data: ComplianceData) => void;
}

export interface FormHeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
}

export interface RegulatoryInformationSectionProps {
  regulatoryInfo: ComplianceData["regulatoryInfo"];
  onRegulatoryChange: (
    field: keyof ComplianceData["regulatoryInfo"],
    value: string
  ) => void;
}

export interface ComplianceChecklistSectionProps {
  complianceChecklist: ComplianceData["complianceChecklist"];
  onChecklistChange: (
    field: keyof ComplianceData["complianceChecklist"],
    checked: boolean
  ) => void;
}

export interface DocumentUploadSectionProps {
  documents: ComplianceData["documents"];
  onFileUpload: (
    field: keyof ComplianceData["documents"],
    file: File | null
  ) => void;
  onFileDelete: (field: keyof ComplianceData["documents"]) => void;
  uploadingFiles?: Set<string>;
}

export interface DeclarationSectionProps {
  declarations: ComplianceData["declarations"];
  onDeclarationChange: (
    field: keyof ComplianceData["declarations"],
    checked: boolean
  ) => void;
}

export interface ActionButtonsProps {
  onBack: () => void;
  isFormValid: boolean;
  onSubmit: () => void;
}

export interface ChecklistItem {
  key: keyof ComplianceData["complianceChecklist"];
  label: string;
}

export interface DeclarationItem {
  key: keyof ComplianceData["declarations"];
  label: string;
}

export interface DocumentUploadItem {
  key: keyof ComplianceData["documents"];
  label: string;
  id: string;
}

// Constants
export const INTEREST_STRUCTURE_OPTIONS = [
  "Select",
  "Common Stock",
  "Preferred Stock",
  "Convertible Note",
  "SAFE",
  "Revenue Based Financing",
  "Other",
];

export const COMPLIANCE_CHECKLIST_ITEMS: ChecklistItem[] = [
  { key: "legallyIncorporated", label: "Company is legally incorporated" },
  {
    key: "clearEquityAgreements",
    label: "All founders have clear equity agreements",
  },
  { key: "noPendingDisputes", label: "No pending legal disputes" },
  { key: "authorizedToRaise", label: "Authorized to raise capital" },
  {
    key: "securitiesCompliance",
    label: "Comply with local securities regulations",
  },
];

export const DECLARATION_ITEMS: DeclarationItem[] = [
  {
    key: "accurateInfo",
    label: "I certify that all information provided is accurate and complete",
  },
  {
    key: "authorityToRaise",
    label: "I have authority to raise capital on behalf of this company",
  },
  {
    key: "termsAgreement",
    label: "I agree to Nexfund's Terms of Service and Privacy Policy",
  },
];

export const DOCUMENT_UPLOAD_ITEMS: DocumentUploadItem[] = [
  {
    key: "certificateOfIncorporation",
    label: "Certificate of Incorporation",
    id: "certificate-upload",
  },
  {
    key: "founderAgreements",
    label: "Founder Agreements",
    id: "founder-upload",
  },
  {
    key: "legalComplianceCertificate",
    label: "Legal Compliance Certificate",
    id: "legal-upload",
  },
];
