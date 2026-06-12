interface PhoneNumberCodeProps {
  country_code: string;
  phone_number: string;
}

interface CreateAccountProps extends PhoneNumberCodeProps {
  use_case: string;
}

interface LoginDetailsProps extends PhoneNumberCodeProps {
  password: string;
}

interface CreateProfileProps {
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  mobile_number: string;
  email: string;
  file: File | null;
  password: string;
  password_pin: string;
  user_id: string;
}

interface CreateShopperProps {
  phone_number: string;
  password_pin: string;
  fullname: string;
  business_name: string;
  business_headquarters: string;
  use_case: string;
  country_code: string;
}

interface ResetPasswordProps {
  token: string;
  new_password: string;
}

interface BusinessProps {
  user_id?: string;
  business_name: string;
  business_address: string;
  business_email: string;
  business_logo: string;
  business_type: string[];
  country: string;
  city: string;
  // number_of_product: number;
  number_of_store: number;
  where_do_you_hear_about_us: string;
  region: string;
  year_established: string;
  instagram: string;
  facebook: string;
  website: string;
  expectations: string;
  business_headquarters: string;
  region_two: string;
  city_two: string;
  tin_number: string;
  id: string;
  business_phone: string;
}

interface CreateBusinessProps extends BusinessProps {
  business_phone_number: string;
  business_phone: string;
  id: string;
}

interface AgentOrderInputProps {
  orderDateAndTime: string;
  delivery_address: string;
  nearest_landmark: string;
  delivery_date: string;
}

interface AgentRequestHistoryProps {
  status: string;
  request_date: string;
  comment: string;
  isCompleted: boolean;
  created_at?: string;
}

interface UpdateAgentRequestStatusProps {
  id: string;
  status: string;
  status_date: string;
  estimated_delivery_date: string;
  actual_delivery_date: string;
  comment: string;
}

interface SalesProps {
  id: string;
  business_id: string;
  customer_id?: string;
  customer_entity_id?: string;
  customer_entity_type?: string;
  customer_name?: string;
  sales_agent_id: string;
  sales_agent_name: string;
  sale_type: string;
  sale_date: string;
  due_date: string;
  order_status: string;
  status: string;
  payment_mode: string;
  delivery_location: string;
  discount_type: string;
  discount_value: number;
  products: ProductProps[];
  total_sale_amount?: number;
}

interface SalesOrderProps {
  business_id: string;
  customer_id: string;
  customer_name?: string;
  sales_agent_id: string;
  sales_agent_name: string;
  sale_type: string;
  order_status: string;
  due_date: string;
  payment_mode: string;
  delivery_location: string;
  discount_type: string;
  discount_value: number;
  products: ProductProps[];
  total_sale_amount?: number;
  id: string;
  order_number?: string;
  created_at?: string;
}

interface AbandonCartProps {
  customer_id: string;
  abandoned_date: string;
  discount_type: string;
  discount_value: number;
  products: AbandonCartProduct[];
  customer_entity_type: string;
  customer_entity_id: string;
}

interface CreateSaleProps extends SalesProps {
  id: string;
}

interface CreateOrderProps {
  products: {
    product_id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
  id?: string;
  // business_id: string;
  customer_entity_type: string;
  customer_entity_id: string;
  sales_agent_id: string;
  sale_type: string;
  payment_mode: string;
  due_date: string;
  delivery_location: string;
  discount_type: string;
  discount_value: number;
}

interface OrderOperationProps {
  total_orders: number;
  total_order_value: string;
  average_order_value: string;
  conversion_rate: number;
  monthly_data: any[];
  top_orders: any[];
}

interface AbandonCartProduct {
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface CreateAbandonCartProps extends AbandonCartProps {
  id: string;
  abandoned_date: string | null;
  business_id: string;
  business_name: string;
  customer_id: string;
  customer_name: string;
  total_sale_amount: string;
  discount_type: string;
  discount_value: string;
  created_at: string;
  updated_at: string;
  products: CartItem[];
}

interface CountryDataListProps {
  alpha_2: string;
  name: string;
}

interface RegionDataListProps {
  code: string;
  name: string;
}

interface CitiesDataListProps {
  id: string;
  name: string;
}

interface PinChangeProps {
  current_pin: string;
  new_pin: string;
  new_confirm_pin: string;
}

interface Product {
  id: string;
  business_id: string;
  product_name: string;
  product_sku: string;
  product_description: string;
  product_category_name: string;
  category_id?: string;
  product_brand_name: string;
  brand_id: string;
  product_package_type: string;
  product_quantity_per_package: string;
  product_wholesale_price: number;
  product_retail_price: number;
  product_sale_discount_price: number;
  product_minimum_quantity: number;
  product_price_per_piece: number;
  product_weight: string;
  product_weight_type: string;
  product_volume: string;
  product_volume_type: string;
  product_expiration_date: string;
  product_stock_level: number;
  product_image: string;
  product_id: string;
}

interface CreateSalesAgentProps {
  id: string;
  user_id: string;
  business_id: string;
  business_name?: string;
  name: string;
  first_name: string;
  last_name: string;
  latest_target: number;
  description: string;
  phone_number: string;
  agent_role: string;
  email: string;
  total_sales_value?: number | null;
  sales_volume?: number | null;
  location: string;
  country_code: string;
  created_at?: string;
  updated_at?: string;
}

interface CreateCustomerProps {
  id?: string;
  business_id?: string;
  customer_name?: string;
  customer_address?: string;
  customer_phone?: string;
  customer_type?: string;
  customer_business_type?: string[];
  location?: string;
  country?: string;
  city?: string;
  region?: string;
  customer_entity_id?: string;
  customer_entity_type?: string;
}

interface OrderHistoryProduct {
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  item_type: string;
  location: string;
  product_image: string;
}

interface OrderHistory {
  order_id: string;
  order_date?: string;
  customer_name: string;
  order_number: string;
  order_date: string | null;
  status: "pending" | "completed" | "cancelled" | string; // Add more if needed
  products: OrderHistoryProduct[];
}

// Start Request History Props

interface AgentHistoryProduct {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  item_type: string;
}

interface AgentHistoryRequest {
  request_id: string;
  request_number: string;
  request_date: string;
  status: string;
  total_request_price: number;
  location: string;
  products: ProductItem[];
}

// End Request Hostory Props

interface CreateRequestOrderProps {
  business_id: string;
  customer_entity_type: string;
  customer_entity_id: string;
  sale_date: string;
  sales_agent_id: string;
  order_type: string;
  supplier_id: string;
  due_date: string;
  delivery_date: string;
  delivery_address: string;
  nearest_landmark: string;
  products: {
    product_id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
}

interface SupplierDataProps {
  id: string;
  business_logo: string;
  name: string;
  email: string;
  phone: string;
  location: string | null;
  created_at: string;
  last_updated: string;
  supplier_entity_id: string;
  supplier_entity_type: string;
}

interface CreateSuppliersProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  country_code: string;
}

interface AddSuppliersProps {
  supplier_entity_id: string;
}

interface AgentRequestProps {
  id: string;
  request_number?: string;
  name?: string;
  business_id?: string;
  business_name?: string;
  business_phone?: string;
  sales_agent_id: string;
  sales_agent_name?: string;
  location: string;
  request_date: string;
  estimated_delivery_date?: string;
  total_request_price?: string;
  status: string;
  comment?: string | null;
  request_history?: AgentRequestHistoryProps[];
  created_at?: string;
  updated_at?: string;
  products: ProductProps[];
}

interface CreateAgentRequestProps extends AgentRequestProps {
  id: string;
}
interface TeamListProps {
  country_code: string;
  phone_number: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  business: string;
}

interface ShopperSalesProps {
  business_id: string;
  customer_entity_id?: string;
  customer_entity_type?: string;
  customer_name?: string;
  sale_date: string;
  sales_agent_id: string;
  sales_agent_name: string;
  sale_type: string;
  status: string;
  order_status: string;
  due_date: string;
  payment_mode: string;
  delivery_location: string;
  discount_type: string;
  discount_value: number;
  products: any[];
  total_sale_amount?: number;
  id: string;
}

interface CreateShopperSaleProps extends ShopperSalesProps {
  id: string;
  customer_id?: string;
  customer_name?: string;
  order_type?: string;
  main_type?: string;
  supplier_type?: string;
  supplier_id?: string;
}

interface PurchaseProduct extends ProductProps {
  price: number | null;
  product_name: string;
}

interface PurchaseOrderProps {
  po_number: string;
  total_cost: string;
  customer: string;
  supplier: string;
  status: string;
  payment_status: string;
  approval_status: string;
  delivery_date: string;
  request_date: string;
}

interface SaleStatusProps {
  id: string;
  status: string;
  status_date: string;
  comment: string;
}

interface SupplierOrderProps {
  order_date: string;
  type: string;
  customer: string;
  sales_agent: string;
  total: string;
  due_date: string;
  order_status: string;
}

interface SalesSummaryReportProps {
  period: string;
  number_of_sales: number;
  product_sold: number;
  total_value: number;
}

interface SalesSupplierReportProps {
  supplier_name: string;
  total_sales_value: number;
  sales_receipts: number;
  product_ordered: number;
  unique_product: number;
  most_frequently_sold_products: string;
}

interface SalesCustomerReportProps {
  customer_name: string;
  total_sales_value: number;
  sales_receipts: number;
  product_ordered: number;
  unique_product: number;
  most_frequently_sold_products: string;
}

interface UserCategoryStats {
  total: number;
  active: number;
  percent_change: number;
}

interface CustomersOverviewProps {
  customers: UserCategoryStats;
  retailers: UserCategoryStats;
  wholesalers: UserCategoryStats;
}

interface SalesRegionReportProps {
  supplier_name: string;
  sales_between: string;
  sales_receipts: number;
  sales_agent: string;
}

interface CreditLimitFormProps {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  means_of_identification: string;
  identification_file: null;
  next_of_kin_name: string;
  next_of_kin_phone_number: string;
  address: string;
  registered_business_address: string;
  date_of_birth: string;
  verified_bank_statement: string;
  verified_bank_statement_file: null;
  supplier_distributor_statement: string;
  supplier_distributor_statement_file: null;
  sales_record: string;
  sales_record_file: null;
  // Step 1 - Business Details
  business_strategy: string;
  business_governance: string;
  key_man_risk: string;
  team_employee_engagement: string;
  knowledge_management: string;
  innovation_digitization: string;
  gender_considerations: string;
  financial_health: string;
  projections: string;
  sales_profitability: string;
  asset_management: string;
  liquidity_capital_management: string;
  cash_flow_management: string;
  operations_management: string;
  transport_logistics: string;
  community_entry: string;
  warehousing_storage: string;
  market_access: string;

  // Step 2 - Business Operations
  store_type: string;
  storage_capacity: string;
  restocking_frequency: string;
  average_sales_per_month: string;
  top_selling_product: string;
  has_market_association_permit: string;
  previous_loans_taken: string;
  current_outstanding_debts: string;
  credit_bureau_check: string;
  momo_usage_frequency: string;
  pos_tech_literacy: string;
  number_of_daily_transactions: string;
  attended_gwk_training: string;
  willingness_to_refer_kola: string;
  product_category: string;
  product_shelf_life: string;
  inventory_turnover_rate: string;
  sales_mix: string;

  // Step 3 - Additional Details
  sales_seasonality: string;
  supplier_payment_behavior: string;
  shop_ownership: string;
  length_of_time_in_current_location: string;
  operating_days_per_week: string;
  number_of_dependents: string;
}

interface CreditAccessmentFormProps {
  id: string;
  // Step 1 - Business Details
  business_strategy: string;
  business_governance: string;
  key_man_risk: string;
  team_employee_engagement: string;
  knowledge_management: string;
  innovation_digitization: string;
  gender_considerations: string;
  financial_health: string;
  projections: string;
  sales_profitability: string;
  asset_management: string;
  liquidity_capital_management: string;
  cash_flow_management: string;
  operations_management: string;
  transport_logistics: string;
  community_entry: string;
  warehousing_storage: string;
  market_access: string;

  // Step 2 - Business Operations
  store_type: string;
  storage_capacity: string;
  restocking_frequency: string;
  average_sales_per_month: string;
  top_selling_product: string;
  has_market_association_permit: string;
  previous_loans_taken: string;
  current_outstanding_debts: string;
  credit_bureau_check: string;
  momo_usage_frequency: string;
  pos_tech_literacy: string;
  number_of_daily_transactions: string;
  attended_gwk_training: string;
  willingness_to_refer_kola: string;
  product_category: string;
  product_shelf_life: string;
  inventory_turnover_rate: string;
  sales_mix: string;

  // Step 3 - Additional Details
  sales_seasonality: string;
  supplier_payment_behavior: string;
  shop_ownership: string;
  length_of_time_in_current_location: string;
  operating_days_per_week: string;
  number_of_dependents: string;
}

interface SaleBulkUpload {
  supplier_id: string;
  sales_agent_id: string;
  sales_type: string;
  sales_date: string;
}

interface CreateSuppliersTermPlaceOrderProps {
  id?: string;
  customer_entity_id: string;
  customer_entity_type: string;
  markup_type: string;
  markup_percentage: number;
  markup_duration: number;
  markup_penalty_rate: number;
  products: {
    supplier_entity_id: string;
    supplier_entity_type: string;
    products: {
      product_id: string;
      quantity: number;
      price: number;
    }[];
  }[];
}

interface CreateStaffProps {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  country_code: string;
  role: string;
}

interface ProductProps {
  product_id: string;
  product_name?: string;
  item_type?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface CustomerOrSupplier {
  name: string;
  email: string;
  company_name: string;
  country: string;
  region: string;
  phone_number: string;
  town: string;
  street_address: string;
  nearest_landmark: string;
}

interface ProductItem {
  product_id: string;
  item_type: string;
  quantity: number;
  unit_price: number;
}

interface CreatePurchaseOrderProps {
  customer: CustomerOrSupplier;
  supplier: CustomerOrSupplier;
  shipping_method: string;
  delivery_date: string;
  shipping_street_address: string;
  zip_code: string;
  city: string;
  shipping_phone_number: string;
  payment_method: string;
  po_type: string;
  due_date: string;
  products: ProductItem[];
}

interface ShippingData {
  shipping_method: string;
  delivery_date: string;
  shipping_street_address: string;
  zip_code: string;
  city: string;
  shipping_phone_number: string;
}

interface CreateSaleOrderProps {
  business_id: string;
  customer_entity_type: string;
  customer_entity_id: string;
  sale_date: string;
  sales_agent_id: string;
  sale_type: string;
  due_date: string;
  payment_mode: string;
  order_status: string;
  delivery_location: string;
  discount_type: string;
  discount_value: number;
  products: ProductProps[];
  supplier_id: string;
  town: string;
  region: string;
  street_address: string;
  nearest_landmark: string;
  mark_up: string;
  percentage: number;
  duration: number;
  penalty_rate: number;
  actual_supplier: string;
}

interface ProductCategory {
  image: string;
  category_name: string;
}

interface CreditInvoiceFormProps {
  // business_id: string;
  customer_entity_id: string;
  customer_entity_type: string;
  markup_type: string;
  markup_percentage?: number;
  markup_duration?: number;
  markup_penalty_rate?: number;
  invoices: [
    {
      supplier_entity_id: string;
      supplier_entity_type: string;
      request_date: string;
      issue_date: string;
      invoice_date: string;
      invoice_number: string;
      invoice_amount: number;
      invoice_file_url: string;
    }
  ];
}
