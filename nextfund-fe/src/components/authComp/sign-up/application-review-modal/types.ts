export interface ApplicationReviewModalProps {
  open: boolean;
  onClose: () => void;
  onEditApplication: () => void;
  onTrackStatus: () => void;
}

export interface NextStep {
  title: string;
  description: string;
}

export interface ModalHeaderProps {
  onClose: () => void;
  title: string;
  subtitle: string;
}

export interface ReviewChecklistProps {
  checklistItems: string[];
}

export interface NextStepsProps {
  nextSteps: NextStep[];
}

export interface AfterApprovalStepsProps {
  afterApprovalSteps: string[];
}

export interface ActionButtonsProps {
  onEditApplication: () => void;
  onTrackStatus: () => void;
}

export interface ContactInfoProps {
  email: string;
}
