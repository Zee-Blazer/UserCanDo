export interface TermsSection {
  id: string;
  title: string;
  content?: string;
  subsections?: TermsSubsection[];
  items?: string[];
}

export interface TermsSubsection {
  id: string;
  title: string;
  content?: string;
  items?: string[];
  additionalSections?: {
    header: string;
    items: string[];
  }[];
}
