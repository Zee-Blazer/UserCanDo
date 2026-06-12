import { NavItemType, ROLE_PERMISSIONS, UserRole, VendorCart } from "@/types";
import pdf from "@/assets/images/pdf.png";
import xcel from "@/assets/images/xcel.png";
import word from "@/assets/images/word.png";
import defaultFile from "@/assets/images/file.png";
import { ulid } from "ulid";
import { StaticImageData } from "next/image";

export const generateId = () => {
  return ulid();
};

export const formatTime = (dateString: string) => {
  const options: any = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
  };

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

export const formatFileSize = (bytes: number) => {
  if (bytes >= 1024 ** 2) {
    return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
  } else if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  } else {
    return `${bytes} bytes`;
  }
};

export const formatCurrency = (number: number, currency?: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency ? currency : "USD",
  }).format(number);
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return "";

  if (phone.startsWith("+")) {
    const countryCodeMatch = phone.match(/^\+(\d{1,3})/);

    if (countryCodeMatch) {
      const countryCode = countryCodeMatch[1];
      const countryCodeWithPlus = `+${countryCode}`;

      let remainingDigits = phone.substring(countryCodeWithPlus.length);

      if (remainingDigits.startsWith(countryCode)) {
        remainingDigits = remainingDigits.substring(countryCode.length);
      }

      return `${countryCodeWithPlus} ${remainingDigits}`;
    }
  }

  return phone;
};

export const getCurrentAgentRequestStatus = (
  request_history: AgentRequestHistoryProps[]
): string => {
  if (!request_history || request_history.length === 0) {
    return "pending";
  }

  const sortedHistory = [...request_history].sort((a, b) => {
    const dateA = a.created_at
      ? new Date(a.created_at).getTime()
      : new Date(a.request_date).getTime();
    const dateB = b.created_at
      ? new Date(b.created_at).getTime()
      : new Date(b.request_date).getTime();
    return dateB - dateA;
  });

  return sortedHistory[0].status || "pending";
};

export const getAgentRequestStatusClasses = (status: string): string => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-[#FEF3C7] text-[#CA810A]";
    case "placed":
      return "bg-[#F3F4F6] text-[#6941C6]";
    case "approved":
      return "bg-[#D1E0FF] text-[#365FB6]";
    case "completed":
      return "bg-[#ECFDF3] text-[#027A48]";
    case "delivered":
      return "bg-[#ECFDF3] text-[#027A48]";
    case "rejected":
      return "bg-[#FEF2F2] text-[#B42318]";
    case "cancelled":
      return "bg-[#F9F5FF] text-[#7A7489]";
    default:
      return "bg-[#F2F4F7] text-[#344054]";
  }
};

export const getHistoryItemDate = (
  history: AgentRequestHistoryProps[] | undefined,
  status: string
): string => {
  if (!history) return "";

  const item = history.find(
    (h: any) => h.status.toLowerCase() === status.toLowerCase()
  );
  return item?.created_at ? formatDate(item.created_at) : "";
};

export const getHistoryItemComment = (
  history: AgentRequestHistoryProps[] | undefined,
  status: string
): string => {
  if (!history) return "";

  const item = history.find(
    (h: any) => h.status.toLowerCase() === status.toLowerCase()
  );
  return item?.comment || "";
};

export const getAverageFulfillmentTime = (
  agentRequests: AgentRequestProps[]
): string => {
  if (!agentRequests || agentRequests.length === 0) {
    return "0 Days";
  }

  const completedRequests = agentRequests.filter(
    (req) =>
      getCurrentAgentRequestStatus(req.request_history || []) === "completed"
  );

  if (completedRequests.length === 0) {
    return "0 Days";
  }

  const totalFulfillmentTime = completedRequests.reduce((total, request) => {
    const startDate = request.created_at
      ? new Date(request.created_at)
      : new Date(request.request_date);

    const completedItem = request.request_history?.find(
      (h) => h.status.toLowerCase() === "completed"
    );

    if (!completedItem || !completedItem.created_at) {
      return total;
    }

    const endDate = new Date(completedItem.created_at);

    const timeDiff = endDate.getTime() - startDate.getTime();

    return total + timeDiff;
  }, 0);

  const avgTimeInDays =
    totalFulfillmentTime / completedRequests.length / (1000 * 60 * 60 * 24);

  const roundedDays = Math.round(avgTimeInDays);
  return roundedDays === 1 ? "1 Day" : `${roundedDays} Days`;
};

export const getInitials = (name: string) => {
  if (!name || typeof name !== "string") return "";

  const nameParts = name
    .trim()
    .split(" ")
    .filter((part) => part.length > 0);

  if (nameParts.length === 0) return "";

  if (nameParts.length === 1) {
    // For single names, take first two characters
    const singleName = nameParts[0];
    return singleName.length >= 2
      ? singleName.charAt(0).toUpperCase() + singleName.charAt(1).toUpperCase()
      : singleName.charAt(0).toUpperCase();
  }

  // For multiple names, take first character of first two names
  const firstChar = nameParts[0]?.charAt(0)?.toUpperCase() || "";
  const secondChar = nameParts[1]?.charAt(0)?.toUpperCase() || "";

  return firstChar + secondChar;
};

export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const formatAmount = (amount: number | string) => {
  const formattedAmount = parseFloat(amount as string).toFixed(2);
  const [whole, decimal = "00"] = formattedAmount.split(".");

  return {
    whole,
    decimal,
  };
};

export const formatNumAmount = (value: number | string): string => {
  const amount = Number(value);

  if (isNaN(amount)) return "0.00";

  return amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const generateUUID = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getUserLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};

export const inCart = (cartItems: VendorCart[], productId: string) => {
  return cartItems.some((item) =>
    item.cart_items.some((item) => item.product_id === productId)
  );
};

export const getStatusDisplay = (status?: string) => {
  if (!status) return "Awaiting Approval";

  switch (status.toLowerCase()) {
    case "pending":
      return "Awaiting Approval";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "out for delivery":
      return "Out for Delivery";
    case "delivered":
      return "Delivered";
    case "refunded":
      return "Refunded";
    case "cancelled":
      return "Cancelled";
    case "declined":
      return "Declined";
    default:
      return status;
  }
};

export const getStatusStyle = (status?: string) => {
  if (!status) return "bg-[#F9F5FF] text-[#6941C6]";

  switch (status.toLowerCase()) {
    case "pending":
      return "bg-[#F9F5FF] text-[#6941C6]";
    case "approved":
      return "bg-[#F2FEF7] text-[#027A48]";
    case "rejected":
      return "bg-[#FEF3F2] text-[#B42318]";
    case "out_for_delivery":
    case "out for delivery":
      return "bg-[#EEF4FF] text-[#6941C6]";
    case "delivered":
      return "bg-[#ECFDF3] text-[#027A48]";
    case "refunded":
      return "bg-[#FEF3F2] text-[#B42318]";
    case "cancelled":
      return "bg-[#FEF3F2] text-[#B42318]";
    default:
      return "bg-[#F9F5FF] text-[#6941C6]";
  }
};

export const getPaymentStatusDisplay = (status?: string) => {
  if (!status) return "N/A";

  switch (status.toLowerCase()) {
    case "owing":
      return "Owing";
    case "paid":
      return "Paid";
    case "partial":
      return "Partial Payment";
    case "overdue":
      return "Overdue";
    default:
      return status;
  }
};

export const getSaleTypeStyle = (saleType?: string) => {
  if (!saleType) return "bg-[#F9FAFB] text-[#667085]";

  switch (saleType.toLowerCase()) {
    case "credit":
      return "bg-[#D1E0FF] text-[#365FB6]";
    case "cash":
      return "bg-[#ECFDF3] text-[#027A48]";
    default:
      return "bg-[#F9FAFB] text-[#667085]";
  }
};

export const getFilePreview = (
  file?: string | StaticImageData | File | null
): string | StaticImageData | null => {
  if (!file) return null;

  if (typeof file === "object" && "src" in file) {
    return file;
  }

  let fileExtension: string | undefined;
  if (typeof file === "string") {
    fileExtension = file.split(".").pop()?.toLowerCase();
  } else if (file instanceof File) {
    fileExtension = file.name.split(".").pop()?.toLowerCase();
  }

  if (!fileExtension) return defaultFile;

  const isPdf = fileExtension === "pdf";
  const isImage = ["png", "jpg", "jpeg", "gif", "bmp"].includes(fileExtension);
  const isExcel = ["xls", "xlsx"].includes(fileExtension);
  const isWord = ["doc", "docx"].includes(fileExtension);

  if (isImage) {
    return typeof file === "string" ? file : URL.createObjectURL(file);
  }
  if (isPdf) return pdf;
  if (isExcel) return xcel;
  if (isWord) return word;

  return defaultFile;
};

export const getFileNameFromUrl = (
  url?: string | StaticImageData | File | null
): string | null => {
  if (!url) return null;

  if (typeof url === "object" && "src" in url) {
    return "Image File";
  }
  if (url instanceof File) {
    return url.name;
  }

  const decodedUrl = decodeURIComponent(url);
  const fileName = decodedUrl?.split("/").pop();
  return fileName || null;
};

export const hasPermission = (
  permission: keyof typeof ROLE_PERMISSIONS,
  userRole: UserRole
): boolean => {
  if (!permission || !userRole) return false;
  const allowedRoles = ROLE_PERMISSIONS[permission] as UserRole[];
  return allowedRoles.includes(userRole);
};

export const filterMenuByPermissions = <
  T extends { permission?: keyof typeof ROLE_PERMISSIONS }
>(
  menuItems: T[],
  userRole: UserRole
): T[] => {
  if (!userRole) return [];

  return menuItems.filter((item) => {
    if (!item.permission) return true;

    return hasPermission(item.permission, userRole);
  });
};

export function getDateRange(reference: "today" | "thisWeek" | "lastMonth") {
  const now = new Date();

  let start = new Date(now);
  let end = new Date(now);

  switch (reference) {
    case "today":
      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(23, 59, 59, 999);
      break;

    case "thisWeek": {
      const day = start.getUTCDay(); // Sunday = 0
      const diff = day === 0 ? -6 : 1 - day; // If Sunday, start from previous Monday
      start.setUTCDate(start.getUTCDate() + diff);
      start.setUTCHours(0, 0, 0, 0);

      end = new Date(start); // clone
      end.setUTCDate(start.getUTCDate() + 6);
      end.setUTCHours(23, 59, 59, 999);
      break;
    }

    case "lastMonth":
      start.setUTCMonth(start.getUTCMonth() - 1);
      start.setUTCDate(1);
      start.setUTCHours(0, 0, 0, 0);

      end = new Date(start);
      end.setUTCMonth(start.getUTCMonth() + 1);
      end.setUTCDate(0); // last day of previous month
      end.setUTCHours(23, 59, 59, 999);
      break;

    default:
      throw new Error("Invalid reference");
  }

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

export function getOrdersOverviewDateRange(interval: string) {
  const now = new Date();
  const startDate = new Date();

  switch (interval) {
    case "daily":
      // Last 30 days
      startDate.setDate(now.getDate() - 30);
      break;
    case "weekly":
      // Last 12 weeks (about 3 months)
      startDate.setDate(now.getDate() - 12 * 7);
      break;
    case "monthly":
      // Last 12 months
      startDate.setMonth(now.getMonth() - 12);
      break;
    default:
      // Default to last 12 months
      startDate.setMonth(now.getMonth() - 12);
  }

  return {
    start_date: startDate.toISOString(),
    end_date: now.toISOString(),
  };
}

export const dueDateOptions = ["1 Week", "2 Weeks", "3 Weeks", "1 Month"];
export const calculateDueDate = (
  salesDate: string,
  dueDateOption: string
): string => {
  if (!salesDate) return "";

  const saleDate = new Date(salesDate);
  let dueDate = new Date(saleDate);

  switch (dueDateOption) {
    case "1 Week":
      dueDate.setDate(saleDate.getDate() + 7);
      break;
    case "2 Weeks":
      dueDate.setDate(saleDate.getDate() + 14);
      break;
    case "3 Weeks":
      dueDate.setDate(saleDate.getDate() + 21);
      break;
    case "1 Month":
      dueDate.setMonth(saleDate.getMonth() + 1);
      break;
    default:
      return "";
  }

  return dueDate.toISOString().split("T")[0];
};

export const getDueDateOption = (
  salesDate: string,
  dueDate: string
): string => {
  if (!salesDate || !dueDate) return "";

  const saleDate = new Date(salesDate);
  const dueDateObj = new Date(dueDate);
  const diffTime = dueDateObj.getTime() - saleDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 7) return "1 Week";
  if (diffDays === 14) return "2 Weeks";
  if (diffDays === 21) return "3 Weeks";

  const monthDiff =
    dueDateObj.getMonth() -
    saleDate.getMonth() +
    12 * (dueDateObj.getFullYear() - saleDate.getFullYear());
  if (monthDiff === 1) return "1 Month";

  return "";
};

export const identificationOptions = [
  { value: "ID_VOTER_CARD", label: "Voter's Card" },
  { value: "ID_DRIVING_LICENSE", label: "Driver's License" },
  { value: "ID_NATIONAL_ID", label: "National ID" },
];

export const bankStatementOptions = [
  { value: "BS_1Y", label: "1 Year Bank Statement" },
  { value: "BS_6M", label: "6 Months Bank Statement" },
  { value: "BS_NA", label: "Not Available" },
];

export const supplierStatementOptions = [
  { value: "SS_6M", label: "6 Months Supplier Statement" },
  { value: "SS_1Y", label: "1 Year Supplier Statement" },
  { value: "SS_2Y", label: "2 Years Supplier Statement" },
  { value: "SS_NA", label: "Not Available" },
];

export const salesRecordOptions = [
  { value: "SR_2Y", label: "2 Years Sales Record" },
];

export const isOptionObject = (
  option: any
): option is { value: string; label: string } => {
  return (
    typeof option === "object" &&
    option !== null &&
    "value" in option &&
    "label" in option
  );
};

export const getPaymentStatusStyle = (status?: string) => {
  if (!status) return "bg-[#F9FAFB] text-[#667085]";

  switch (status.toLowerCase()) {
    case "owing":
      return "bg-[#FEF3F2] text-[#B42318]";
    case "pending":
      return "text-orange-500";
    case "paid":
      return "bg-[#ECFDF3] text-[#027A48]";
    case "partial":
      return "bg-[#FFF4ED] text-[#B93815]";
    case "overdue":
      return "bg-[#FEF3F2] text-[#B42318]";
    case "unpaid":
      return "bg-[#FFF6ED] text-[#FF000D]";
    default:
      return "bg-[#F9FAFB] text-[#667085]";
  }
};

export const displayValue = (value: any) => {
  if (value === null || value === undefined || value === "" || value === " ") {
    return "N/A";
  }
  return value;
};
