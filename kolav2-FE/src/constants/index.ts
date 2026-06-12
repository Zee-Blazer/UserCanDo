import { IMessage, IOrder, TOrderFilters } from "@/types";

export const mockOrders: IOrder[] = [
  {
    id: "456-1237",
    status: "pending",
    storeName: "Medino-sobston stores",
    price: 235.09,
    location: "Achimota Golf club, Accra, Ghana",
    createdAt: "9:45 am; 2nd Oct.",
    items: [
      {
        id: 1,
        adjective: "Catalina Crunch",
        name: "Peanut Butter Sandwich Cookies",
        quantity: 12,
        size: "4kg (Small)",
        price: 45.99,
        img: "",
      },
      {
        id: 2,
        adjective: "Heaven and earth",
        name: "Hazelnut Almond Butter Date Bites",
        quantity: 12,
        size: "4kg (Small)",
        price: 70.99,
        img: "",
      },
    ],
    orderUpdate: [
      {
        title: "Order placed",
        time: "9:45 am; 2nd Oct. 2024",
        done: true,
      },
      {
        title: "All items confirmed",
        time: "9:45 am; 2nd Oct. 2024",
        done: true,
      },
      {
        title: "Order in-transit",
        time: "9:45 am; 2nd Oct. 2024",
        done: false,
      },
      {
        title: "Order delivered",
        time: "9:45 am; 2nd Oct. 2024",
        done: false,
      },
    ],
  },
  {
    id: "456-1239",
    status: "shipped",
    storeName: "Medino-sobston stores",
    price: 235.09,
    location: "Achimota Golf club, Accra, Ghana",
    createdAt: "9:45 am; 2nd Oct.",
    items: [
      {
        id: 1,
        adjective: "Catalina Crunch",
        name: "Peanut Butter Sandwich Cookies",
        quantity: 12,
        size: "4kg (Small)",
        price: 45.99,
        img: "",
      },
      {
        id: 2,
        adjective: "Heaven and earth",
        name: "Hazelnut Almond Butter Date Bites",
        quantity: 12,
        size: "4kg (Small)",
        price: 70.99,
        img: "",
      },
    ],
    orderUpdate: [
      {
        title: "Order placed",
        time: "9:45 am; 2nd Oct. 2024",
        done: true,
      },
      {
        title: "All items confirmed",
        time: "9:45 am; 2nd Oct. 2024",
        done: false,
      },
      {
        title: "Order in-transit",
        time: "9:45 am; 2nd Oct. 2024",
        done: false,
      },
      {
        title: "Order delivered",
        time: "9:45 am; 2nd Oct. 2024",
        done: false,
      },
    ],
  },
];

export const orderFilters: TOrderFilters = {
  All: "all",
  Pending: "pending",
  Shipped: "shipped",
  cancelled: "cancelled",
};

export const messages: IMessage[] = [
  {
    content: "Hi, I'm having issues buying an item from your store.",
    sender: "You",
    time: "12:41 pm",
  },
  {
    content: "Hello, how can I be of help?",
    sender: "Sagay Armanda",
    time: "12:41 pm",
  },
  {
    content:
      "Please I realised the items of yours that I carted are the only ones in my cart that has not been cleared. Kindly confirm what the issue is, so I can decide whether to wait or remove it from my cart.",
    sender: "You",
    time: "13:08 pm",
  },
  {
    content: "Ok I will check that out and get back to you.",
    sender: "Sagay Armanda",
    time: "13:21 pm",
  },
];

export const creditLimitDropdownOptions = {
  // Step 1 options
  business_strategy: [
    "No clear strategy",
    "Strategy understood only by management",
    "Strategy understood, but no clear roadmap",
    "Clear, documented short-term and long-term strategy",
  ],
  business_governance: [
    "No board in place",
    "Board exists but rarely meets",
    "Board meets but lacks oversight",
    "Board meets regularly, decides, and ensures compliance",
  ],
  key_man_risk: [
    "No succession plan",
    "Idea of succession but not documented",
    "Succession plan not documented but in place",
    "Clear, documented succession plan",
  ],
  team_employee_engagement: [
    "No clear employee KPIs or performance management",
    "Defined KPIs, no structured management",
    "Structured management, needs improvement",
    "Clear structure for employee appraisal and promotion",
  ],
  knowledge_management: [
    "No knowledge management systems",
    "Knowledge management not digitized",
    "Digital knowledge management, inconsistently maintained",
    "Digitized knowledge management used for decision making",
  ],
  innovation_digitization: [
    "Manual operational, financial, and management systems",
    "Limited adoption of digitization",
    "Digitization inconsistent across organization",
    "Full digitization, innovative internal solutions",
  ],
  gender_considerations: [
    "No clear plans for gender equity",
    "Evidence of gender equality/equity but not documented",
    "Gender considerations in engagements & unclear policies",
    "Documented policies with KPIs for gender considerations",
  ],
  financial_health: [
    "Reliance on manual financial reporting",
    "Systems for tracking financial decisions need support",
    "Effective tracking of financial decisions",
    "Management is savvy about financial position",
  ],
  projections: [
    "No projections or budgets in place",
    "No projections but capable team",
    "Clear projections aligned with strategy",
  ],
  sales_profitability: [
    "Negative net profits, no plans for profitability",
    "Negative net profits, plans for profitability",
    "Positive net profits, plans for remaining profitable",
  ],
  asset_management: [
    "Poor working investment",
    "Okay working investment",
    "Strong working investment",
  ],
  liquidity_capital_management: [
    "Poor working capital",
    "Okay working capital",
    "Strong working capital",
  ],
  cash_flow_management: [
    "Poor working capital",
    "Okay working capital",
    "Strong working capital",
  ],
  operations_management: [
    "No SOPs for operations management",
    "Breaches of operations management best practices",
    "Aware of QC protocol, needs support",
    "Operations optimized, adherence to QC protocol",
  ],
  transport_logistics: [
    "Use of unofficially registered 3rd party logistics",
    "Use of non-compliant logistics",
    "Use of recognized 3rd party logistics, optimal conditions",
  ],
  community_entry: [
    "No documentary evidence",
    "Some documentary evidence",
    "Documentary evidence",
  ],
  warehousing_storage: [
    "Own or 3rd party with significant deviation",
    "Own or 3rd party with inadequate capacity",
    "Reliable 3rd party warehouse with adequate capacity",
  ],
  market_access: [
    "One or two major offtakers",
    "More than one offtaker, needs support",
    "Poor working capital",
    "Okay working capital",
    "Strong working capital",
    "More than one offtaker, clear plans for expansion",
  ],

  // Step 2 options
  store_type: ["Retails", "Wholesale", "Distribution"],
  storage_capacity: ["None", "Small", "Large"],
  restocking_frequency: ["Monthly", "Bi-Weekly", "Weekly"],
  average_sales_per_month: [
    "<500",
    "500-1500",
    "1500 - 5000",
    "5000 - 20000",
    "20000 - 100000",
    ">10000",
  ],
  top_selling_product: ["None", "1-2", "3+"],
  has_market_association_permit: ["Yes", "No"],
  previous_loans_taken: ["None", "One", "More than one"],
  current_outstanding_debts: ["None", "Small", "Large"],
  credit_bureau_check: ["None", "Excellent", "Good", "Fair", "Poor"],
  momo_usage_frequency: ["None", "Occasional", "Daily"],
  pos_tech_literacy: ["None", "Needs Help", "Can Operate"],
  number_of_daily_transactions: ["0", "1", "2", "5-6", "6>"],
  attended_gwk_training: ["No", "Yes <6mo", "Yes >6mo"],
  willingness_to_refer_kola: ["1", "2", "3", "4", "5"],
  product_category: ["FMCG", "Perishables", "Others"],
  product_shelf_life: ["Perishables", "Non - Perishable"],
  inventory_turnover_rate: ["<1 week", "1-2 weeks", ">2 weeks"],
  sales_mix: ["100% Cash", "Mixed", "Mostly Credit"],

  // Step 3 options
  sales_seasonality: ["Consistent Year-round", "Seasonal", "Unstable"],
  supplier_payment_behavior: ["Always On-Time", "Mixed", "Frequent Delays"],
  shop_ownership: ["Owned", "Family-Owned", "Rented", "Hawker"],
  length_of_time_in_current_location: ["<1yr", "1-2yr", ">2yr"],
  operating_days_per_week: ["<3 days", "4-5 days", "6-7 days"],
  number_of_dependents: ["0", "1-2", "3+"],
};
