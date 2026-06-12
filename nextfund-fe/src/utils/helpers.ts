import toast from "react-hot-toast";

export const handleError = (error: any) => {
  let message = "Something went wrong";
  console.log(error);
  if (error.data && error.data.message) {
    message = error.data.message;
  } else if (error.data && Array.isArray(error.data.errors)) {
    message = error.data.errors[0].message;
  } else if (
    error.data &&
    error.data.error &&
    typeof error.data.error === "string"
  ) {
    message = error.data.error;
  }
  toast.error(message);
};

export const isValidUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    const partialUrlRegex = /^(https?:\/\/)?([\w-]+\.)*[\w-]+(\.[a-z]{2,})?\/?/;
    return partialUrlRegex.test(string);
  }
};

export const isAnyFalse = (businessListingDocuments: any): boolean => {
  if (!businessListingDocuments) return true;

  const initialData = [
    {
      documentName: "Cap Table",
      type: "cap_table",
      featured:
        businessListingDocuments?.payload?.essential_documents?.cap_table !==
        "",
    },
    {
      documentName: "Pitch Deck",
      type: "pitch_deck",
      featured:
        businessListingDocuments?.payload?.essential_documents?.pitch_deck !==
        "",
    },
    {
      documentName: "Product Demo",
      type: "product_demo",
      featured:
        businessListingDocuments?.payload?.essential_documents?.product_demo !==
        "",
    },
    {
      documentName: "Business Plan",
      type: "business_plan",
      featured:
        businessListingDocuments?.payload?.essential_documents
          ?.business_plan !== "",
    },
    {
      documentName: "Market Analysis",
      type: "market_analysis",
      featured:
        businessListingDocuments?.payload?.essential_documents
          ?.market_analysis !== "",
    },
    {
      documentName: "Legal Agreements",
      type: "legal_agreements",
      featured:
        businessListingDocuments?.payload?.essential_documents
          ?.legal_agreements !== "",
    },
    {
      documentName: "Customer References",
      type: "customer_references",
      featured:
        businessListingDocuments?.payload?.essential_documents
          ?.customer_references !== "",
    },
    {
      documentName: "Financial Statements",
      type: "financial_statements",
      featured:
        businessListingDocuments?.payload?.essential_documents
          ?.financial_statements !== "",
    },
    {
      documentName: "Financial Projections",
      type: "financial_projections",
      featured:
        businessListingDocuments?.payload?.essential_documents
          ?.financial_projections !== "",
    },
    {
      documentName: "Certificate of Incorporation",
      type: "certificate_of_incorporation",
      featured:
        businessListingDocuments?.payload?.essential_documents
          ?.certificate_of_incorporation !== "",
    },
    {
      documentName: "Director's ID",
      type: "director_id",
      featured:
        businessListingDocuments?.payload?.essential_documents?.director_id !==
        "",
    },
    {
      documentName: "Legal Compliance Certificate",
      type: "legal_compliance_certificate",
      featured:
        businessListingDocuments?.payload?.compliance_and_verification
          ?.legal_compliance_certificate !== "",
    },
    {
      documentName: "Founder Agreements",
      type: "founder_agreements",
      featured:
        businessListingDocuments?.payload?.compliance_and_verification
          ?.founder_agreements !== "",
    },
  ];

  return initialData.some((doc) => doc.featured === false);
};

export const isProd = process.env.NEXT_PUBLIC_TIER === "prod";

/**
 * Build a mailto: URL safely (encodes subject & body) and open it in the browser
 */
export const openMailTo = (to: string, subject = '', body = '') => {
  if (!to) return;
  const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  // Using window in client components — safe when called from client code
  if (typeof window !== 'undefined') window.location.href = mailto;
};

/**
 * Return the first two initials of a name (uppercase).
 * Example: "John Doe" -> "JD". Handles multi-space names.
 */
export const getInitials = (name: string | undefined | null): string => {
  if (!name) return '';
  return name
    .split(' ')
    .filter(Boolean)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Formatting helpers
export const formatDate = (dateString?: string | null): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return '';
  }
};

export const formatCurrency = (amount: number | null | undefined, locale = 'en-US', currency = 'USD') => {
  const value = Number(amount || 0);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Disbursement / timeline helpers
export type StageStatus = 'completed' | 'pending' | 'locked';

/**
 * Determine status for a stage date.
 * - completed: stageDate <= now
 * - pending: previousStageDate <= now but stageDate > now
 * - locked: previousStageDate > now (or not provided and stageDate > now)
 */
export const getStageStatus = (
  stageDate?: string | null,
  previousStageDate?: string | null,
  isFirstStage = false,
  now: Date = new Date()
): StageStatus => {
  if (!stageDate) return 'locked';
  const stage = new Date(stageDate);
  if (stage <= now) return 'completed';
  if (previousStageDate) {
    const prev = new Date(previousStageDate);
    if (prev <= now) return 'pending';
    return 'locked';
  }
  if (isFirstStage) return 'pending';
  return 'locked';
};

export const getDotColor = (status: StageStatus) => {
  switch (status) {
    case 'completed': return '#22c55e';
    case 'pending': return '#facc15';
    default: return '#a3a3a3';
  }
};

export const getLineColor = (status: StageStatus, nextStageDate?: string | null, now: Date = new Date()) => {
  if (status === 'completed' && nextStageDate) {
    const next = new Date(nextStageDate);
    if (next <= now) return '#22c55e';
    return '#facc15';
  }
  return '#a3a3a3';
};

export const downloadCsv = async (path: string, filename?: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  });
  if (!res.ok) throw new Error('Failed to download');
  const blob = await res.blob();
  const fileName = filename || `export-${new Date().toISOString().slice(0,10)}.csv`;
  const link = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = link;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(link);
  document.body.removeChild(a);
};
