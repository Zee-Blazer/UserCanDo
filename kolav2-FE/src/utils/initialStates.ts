export const initialPhoneNumberCodeDetails: PhoneNumberCodeProps = {
  country_code: "+233",
  phone_number: "",
};

export const initialAccountDetails: CreateAccountProps = {
  ...initialPhoneNumberCodeDetails,
  use_case: "vendor",
};

export const initialLoginDetails: LoginDetailsProps = {
  ...initialPhoneNumberCodeDetails,
  password: "",
};

export const initialProfileDetails: CreateProfileProps = {
  first_name: "",
  last_name: "",
  gender: "",
  date_of_birth: "",
  mobile_number: "",
  email: "",
  file: null,
  password: "",
  password_pin: "",
  user_id: "",
};

export const initialResetPasswordDetails: ResetPasswordProps = {
  token: "",
  new_password: "",
};

export const initialLoginData = {
  access_token: "",
  phone_number: "",
  refresh_token: "",
  role: "",
  user_id: "",
  use_case: "",
};

export const initialBusinessProfileState: any = {
  user_id: "",
  business_name: "",
  business_address: "",
  business_email: "",
  business_phone_number: "",
  business_category: "",
  business_type: "",
  country: "",
  city: "",
  // number_of_product: 0,
  number_of_store: 0,
  where_do_you_hear_about_us: "",
  region: "",
  year_established: "",
  instagram: "",
  facebook: "",
  website: "",
  expectations: "",
  business_headquarters: "",
  region_two: "",
  city_two: "",
  tin_number: "",
  business_phone: "",
  id: "",
};

export const initialSaleState: CreateSaleProps = {
  business_id: "",
  customer_id: "",
  sale_date: "",
  sales_agent_id: "",
  sale_type: "",
  due_date: "",
  payment_mode: "",
  sales_agent_name: "",
  status: "",
  order_status: "",
  delivery_location: "",
  discount_type: "",
  discount_value: 0,
  products: [],
  id: "",
};

export const initialOrderState: CreateOrderProps = {
  //   business_id: "",
  customer_entity_id: "",
  customer_entity_type: "",
  sales_agent_id: "",
  sale_type: "",
  due_date: "",
  payment_mode: "",
  delivery_location: "",
  discount_type: "",
  discount_value: 0,
  products: [],
  id: "",
};

export const initialUserProfile: UserProfile = {
  bio: "",
  country: "",
  country_code: "",
  date_of_birth: "",
  email: "",
  first_name: "",
  last_name: "",
  location: "",
  mobile_number: "",
  profile_image: "",
  user_id: "",
  role: "",
};

export const initialCustomerOverview: CustomersOverviewProps = {
  customers: { total: 0, active: 0, percent_change: 0 },
  retailers: { total: 0, active: 0, percent_change: 0 },
  wholesalers: { total: 0, active: 0, percent_change: 0 },
};

export const initialSalesOverview: SalesOverviewProps = {
  total_sales: "",
  total_value: "",
  average_value: "",
};

export const initialOrderOperation: OrderOperationProps = {
  total_orders: 0,
  total_order_value: "0.00",
  average_order_value: "0.00",
  conversion_rate: 0,
  monthly_data: [],
  top_orders: [],
};

export const initialProfileCompletion: ProfileCompletionProps = {
  completion: 0,
};

export const initialPinChangeData: PinChangeProps = {
  current_pin: "",
  new_confirm_pin: "",
  new_pin: "",
};

export const initialProductState: Product = {
  business_id: "",
  product_name: "",
  product_sku: "",
  product_description: "",
  category_id: "",
  brand_id: "",
  product_package_type: "",
  product_quantity_per_package: "", //@ts-ignore
  product_wholesale_price: "", //@ts-ignore
  product_retail_price: "", //@ts-ignore
  product_sale_discount_price: 0, //@ts-ignore
  product_minimum_quantity: "", //@ts-ignore
  product_price_per_piece: "",
  product_weight: "",
  product_weight_type: "",
  product_volume: "",
  product_volume_type: "",
  product_expiration_date: "",
  //@ts-ignore
  product_stock_level: "",
  product_brand_name: "",
  product_category_name: "",
};

export const initialSalesAgent: CreateSalesAgentProps = {
  user_id: "",
  agent_role: "",
  business_id: "",
  description: "",
  email: "",
  location: "",
  name: "",
  first_name: "",
  last_name: "",
  latest_target: 0,
  phone_number: "",
  id: "",
  country_code: "",
  total_sales_value: null,
  sales_volume: null,
};

export const initialCustomer: CreateCustomerProps = {
  business_id: "",
  city: "",
  country: "",
  customer_address: "",
  customer_name: "",
  customer_phone: "",
  customer_business_type: [],
  location: "",
  region: "",
  id: "",
};

export const initialCreateSupplier: CreateSuppliersProps = {
  name: "",
  email: "",
  phone: "",
  location: "",
  country_code: "",
};

export const initialCreateTeam: TeamListProps = {
  country_code: "",
  phone_number: 0,
  email: "",
  first_name: "",
  last_name: "",
  role: "",
  business: "",
};

export const initialAgentRequestState: CreateAgentRequestProps = {
  sales_agent_id: "",
  location: "",
  request_date: "",
  status: "pending",
  products: [],
  id: "",
};

export const initialAgentRequestStatus: UpdateAgentRequestStatusProps = {
  id: "",
  status: "pending",
  status_date: "",
  comment: "",
  estimated_delivery_date: "",
  actual_delivery_date: "",
};

export const initialShopperSaleState: any = {
  business_id: "",
  customer_id: "",
  sales_type: "",
  payment_mode: "",
  products: [],
};

export const initialShopperProfile: CreateShopperProps = {
  phone_number: "",
  password_pin: "",
  fullname: "",
  business_name: "",
  business_headquarters: "",
  country_code: "",
  use_case: "",
};

export const initialAddSupplier: AddSuppliersProps = {
  supplier_entity_id: "",
};

export const initialCheckoutForm: CheckoutFormProps = {
  payment_option: "",
  pay_later_2_weeks_option: "",
  pay_later_4_weeks_option: "",
  pay_later_weekly_option: "",
  payment_method: "",
  card_last_four_digits: "",
  delivery_address: "",
  delivery_method: "standard_delivery",
};

export const initialCreditLimitForm: CreditLimitFormProps = {
  id: "",
  full_name: "",
  phone_number: "",
  email: "",
  means_of_identification: "",
  identification_file: null,
  next_of_kin_name: "",
  next_of_kin_phone_number: "",
  address: "",
  registered_business_address: "",
  date_of_birth: "",
  verified_bank_statement: "",
  verified_bank_statement_file: null,
  supplier_distributor_statement: "",
  supplier_distributor_statement_file: null,
  sales_record: "",
  sales_record_file: null,
  // Step 1 values
  business_strategy: "",
  business_governance: "",
  key_man_risk: "",
  team_employee_engagement: "",
  knowledge_management: "",
  innovation_digitization: "",
  gender_considerations: "",
  financial_health: "",
  projections: "",
  sales_profitability: "",
  asset_management: "",
  liquidity_capital_management: "",
  cash_flow_management: "",
  operations_management: "",
  transport_logistics: "",
  community_entry: "",
  warehousing_storage: "",
  market_access: "",

  // Step 2 values
  store_type: "",
  storage_capacity: "",
  restocking_frequency: "",
  average_sales_per_month: "",
  top_selling_product: "",
  has_market_association_permit: "",
  previous_loans_taken: "",
  current_outstanding_debts: "",
  credit_bureau_check: "",
  momo_usage_frequency: "",
  pos_tech_literacy: "",
  number_of_daily_transactions: "",
  attended_gwk_training: "",
  willingness_to_refer_kola: "",
  product_category: "",
  product_shelf_life: "",
  inventory_turnover_rate: "",
  sales_mix: "",

  // Step 3 values
  sales_seasonality: "",
  supplier_payment_behavior: "",
  shop_ownership: "",
  length_of_time_in_current_location: "",
  operating_days_per_week: "",
  number_of_dependents: "",
};

export const initialCreditAccessmentForm: CreditAccessmentFormProps = {
  id: "",
  // Step 1 values
  business_strategy: "",
  business_governance: "",
  key_man_risk: "",
  team_employee_engagement: "",
  knowledge_management: "",
  innovation_digitization: "",
  gender_considerations: "",
  financial_health: "",
  projections: "",
  sales_profitability: "",
  asset_management: "",
  liquidity_capital_management: "",
  cash_flow_management: "",
  operations_management: "",
  transport_logistics: "",
  community_entry: "",
  warehousing_storage: "",
  market_access: "",

  // Step 2 values
  store_type: "",
  storage_capacity: "",
  restocking_frequency: "",
  average_sales_per_month: "",
  top_selling_product: "",
  has_market_association_permit: "",
  previous_loans_taken: "",
  current_outstanding_debts: "",
  credit_bureau_check: "",
  momo_usage_frequency: "",
  pos_tech_literacy: "",
  number_of_daily_transactions: "",
  attended_gwk_training: "",
  willingness_to_refer_kola: "",
  product_category: "",
  product_shelf_life: "",
  inventory_turnover_rate: "",
  sales_mix: "",

  // Step 3 values
  sales_seasonality: "",
  supplier_payment_behavior: "",
  shop_ownership: "",
  length_of_time_in_current_location: "",
  operating_days_per_week: "",
  number_of_dependents: "",
};

export const initialSaleBulkUpload: SaleBulkUpload = {
  supplier_id: "",
  sales_agent_id: "",
  sales_type: "",
  sales_date: "",
};

export const initialSuppliersTermPlaceOrderState: CreateSuppliersTermPlaceOrderProps =
  {
    customer_entity_id: "",
    customer_entity_type: "",
    markup_type: "",
    markup_percentage: 0,
    markup_duration: 0,
    markup_penalty_rate: 0,
    products: [],
    id: "",
  };

export const initialAgentOrderState: AgentOrderInputProps = {
  orderDateAndTime: "",
  delivery_address: "",
  nearest_landmark: "",
  delivery_date: "",
};

export const initialStaffState: CreateStaffProps = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  password: "",
  country_code: "+234",
  role: "",
};

export const initialPurchaseOrderState: CreatePurchaseOrderProps = {
  customer: {
    name: "",
    email: "",
    company_name: "",
    phone_number: "",
    country: "",
    region: "",
    town: "",
    street_address: "",
    nearest_landmark: "",
  },
  supplier: {
    name: "",
    email: "",
    company_name: "",
    phone_number: "",
    country: "",
    region: "",
    town: "",
    street_address: "",
    nearest_landmark: "",
  },
  shipping_method: "",
  delivery_date: "",
  shipping_street_address: "",
  zip_code: "",
  city: "",
  shipping_phone_number: "",
  payment_method: "",
  po_type: "",
  due_date: "",
  products: [
    {
      product_id: "",
      item_type: "",
      quantity: 0,
      unit_price: 0,
    },
  ],
};

export const initialSaleOrderState: CreateSaleOrderProps = {
  business_id: "",
  customer_entity_type: "",
  customer_entity_id: "",
  sale_date: "",
  sales_agent_id: "",
  sale_type: "",
  due_date: "",
  payment_mode: "",
  order_status: "",
  delivery_location: "",
  discount_type: "",
  discount_value: 0,
  products: [
    {
      product_id: "",
      quantity: 0,
      unit_price: 0,
      total_price: 0,
    },
  ],
  supplier_id: "",
  town: "",
  region: "",
  street_address: "",
  nearest_landmark: "",
  mark_up: "",
  percentage: 0,
  duration: 0,
  penalty_rate: 0,
  actual_supplier: "",
};
