export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface DocumentSection {
  id: string;
  title: string;
  required: boolean;
  uploadedFile?: UploadedFile;
}

export interface FinalizeApplicationFormProps {
  onBack: () => void;
  onNext: (documents: Record<string, UploadedFile>) => void;
}

export interface FormHeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
}

export interface ProgressAlertProps {
  requiredDocumentsUploaded: number;
  totalRequiredDocuments: number;
  canProceed: boolean;
}

export interface DocumentSectionProps {
  title: string;
  documents: DocumentSection[];
  onFileUpload: (documentId: string, isOptional?: boolean) => void;
  onFileDelete: (documentId: string, isOptional?: boolean) => void;
  isOptional?: boolean;
  uploadingFiles?: Set<string>;
}

export interface DocumentUploadCardProps {
  document: DocumentSection;
  onFileUpload: (documentId: string, isOptional?: boolean) => void;
  onFileDelete: (documentId: string, isOptional?: boolean) => void;
  isOptional?: boolean;
  uploadingFiles?: Set<string>;
}

export interface ActionButtonsProps {
  canProceedWithoutOptional: boolean;
  onSubmitWithoutOptional: () => void;
  onSubmitWithOptional: () => void;
}
