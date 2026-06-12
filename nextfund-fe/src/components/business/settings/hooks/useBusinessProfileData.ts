import { getCountryByCode } from "@/constants/countries";

export const useBusinessProfileData = (businessSettings: any) => {
  const getContactPreferenceDisplay = (value: string) => {
    const options = [
      { label: "Email", value: "email" },
      { label: "Phone Number", value: "phone_number" },
      { label: "Both", value: "both" },
    ];
    return options.find((option) => option.value === value)?.label || value;
  };

  const formatCountryDisplay = (value: string | null | undefined) => {
    if (!value) {
      return "N/A";
    }
    const country = getCountryByCode(value);
    return country?.name || value;
  };

  const personalInfo = businessSettings?.payload
    ? [
        {
          label: "First Name",
          value:
            businessSettings.payload.personal_information?.first_name || "N/A",
        },
        {
          label: "Last Name",
          value:
            businessSettings.payload.personal_information?.last_name || "N/A",
        },
        {
          label: "Email",
          value: businessSettings.payload.personal_information?.email || "N/A",
        },
        {
          label: "Phone Number",
          value:
            businessSettings.payload.personal_information?.phone_number ||
            "N/A",
        },
        {
          label: "Country",
          value: businessSettings.payload.personal_information?.country || "",
          displayValue: formatCountryDisplay(
            businessSettings.payload.personal_information?.country
          ),
          editable: true,
          field: "country",
          placeholder: "Not Provided",
          custom: true,
        },
        {
          label: "Contact Preference",
          value: getContactPreferenceDisplay(
            businessSettings.payload.personal_information?.contact_preference ||
              "email"
          ),
          editable: true,
          field: "contact_preference",
          select: true,
          options: [
            { label: "Email", value: "email" },
            { label: "Phone Number", value: "phone_number" },
            { label: "Both", value: "both" },
          ],
        },
      ]
    : [
        { label: "First Name", value: "Loading..." },
        { label: "Last Name", value: "Loading..." },
        { label: "Email", value: "Loading..." },
        { label: "Phone Number", value: "Loading..." },
        {
          label: "Country",
          value: "",
          displayValue: "Loading...",
          editable: true,
          field: "country",
          placeholder: "Not Provided",
          custom: true,
        },
        { label: "Contact Preference", value: "Loading..." },
      ];

  const businessInfo = businessSettings?.payload
    ? [
        {
          label: "Business Name",
          value: businessSettings.payload.business_information?.name || "N/A",
          editable: true,
          field: "company_name",
        },
        {
          label: "Industry",
          value:
            businessSettings.payload.business_information?.industry || "N/A",
          editable: true,
          field: "industry_sector",
        },
        {
          label: "Location",
          value:
            businessSettings.payload.business_information?.location || "N/A",
          editable: true,
          field: "country_location",
        },
        {
          label: "Registration No.",
          value:
            businessSettings.payload.business_information
              ?.registration_number || "N/A",
        },
        {
          label: "Website",
          value:
            businessSettings.payload.business_information?.website || "N/A",
          editable: true,
          field: "website_url",
        },
        {
          label: "Year Founded",
          value:
            businessSettings.payload.business_information?.founded || "N/A",
          editable: true,
          field: "year_founded",
        },
      ]
    : [
        { label: "Business Name", value: "Loading..." },
        { label: "Industry", value: "Loading..." },
        { label: "Location", value: "Loading..." },
        { label: "Registration No.", value: "Loading..." },
        { label: "Website", value: "Loading..." },
        { label: "Year Founded", value: "Loading..." },
      ];

  const kycCompliance = businessSettings?.payload
    ? [
        {
          label: "Status",
          value: businessSettings.payload.personal_information?.status
            ? businessSettings.payload.personal_information.status
                .charAt(0)
                .toUpperCase() +
              businessSettings.payload.personal_information.status.slice(1)
            : "N/A",
        },
        {
          label: "Investment Firm",
          value:
            businessSettings.payload.personal_information?.investment_firm ||
            "Not Specified",
        },
      ]
    : [
        { label: "Status", value: "Loading..." },
        { label: "Investment Firm", value: "Loading..." },
      ];

  const bankPaymentInfo = businessSettings?.payload
    ? [
        {
          label: "Account Name",
          value: businessSettings.payload.bank_information?.account_name || "",
          displayValue:
            businessSettings.payload.bank_information?.account_name ||
            "Not Provided",
          editable: true,
          field: "account_name",
        },
        {
          label: "Bank Name",
          value: businessSettings.payload.bank_information?.bank_name || "",
          displayValue:
            businessSettings.payload.bank_information?.bank_name ||
            "Not Provided",
          editable: true,
          field: "bank_name",
        },
        {
          label: "Account Number",
          value:
            businessSettings.payload.bank_information?.account_number || "",
          displayValue: businessSettings.payload.bank_information
            ?.account_number
            ? `****${businessSettings.payload.bank_information.account_number.slice(
                -4
              )}`
            : "Not Provided",
          editable: true,
          field: "account_number",
        },
        {
          label: "Bank Code",
          value: businessSettings.payload.bank_information?.bank_code || "",
          displayValue:
            businessSettings.payload.bank_information?.bank_code ||
            "Not Provided",
          editable: true,
          field: "bank_code",
        },
        {
          label: "Cryptocurrency Address",
          value:
            businessSettings.payload.bank_information?.cryptocurrency
              ?.address || "",
          displayValue:
            businessSettings.payload.bank_information?.cryptocurrency
              ?.address || "Not Provided",
          editable: true,
          field: "cryptocurrency_address",
        },
        {
          label: "Cryptocurrency Type",
          value:
            businessSettings.payload.bank_information?.cryptocurrency?.symbol ||
            "",
          displayValue:
            businessSettings.payload.bank_information?.cryptocurrency?.symbol ||
            "Not Provided",
          editable: true,
          field: "cryptocurrency_type",
        },
      ]
    : [
        { label: "Account Name", value: "Loading..." },
        { label: "Bank Name", value: "Loading..." },
        { label: "Account Number", value: "Loading..." },
        { label: "Bank Code", value: "Loading..." },
        { label: "Cryptocurrency", value: "Loading..." },
      ];

  const security = [
    { label: "Password", value: "**********" },
    { label: "2-Factor Authentication (2FA)", value: "Enabled" },
  ];

  const preferences = [
    { label: "Preferred Currency", value: "USD" },
    {
      label: "Notification Settings",
      value: [
        "Email me when an investor expresses interest",
        "Notify me of document downloads",
        "Weekly engagement summary",
        "Notify me of admin changes",
      ],
      checkList: true,
    },
  ];

  return {
    personalInfo,
    businessInfo,
    kycCompliance,
    bankPaymentInfo,
    security,
    preferences,
  };
};
