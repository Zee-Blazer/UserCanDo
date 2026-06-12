interface UserProfile {
  user_id: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  mobile_number: string;
  email: string;
  date_of_birth: string;
  bio: string;
  location: string;
  country: string;
  country_code: string;
  role: string;
}

interface SalesHistoryItem {
  customer: string;
  date: string;
  products_count: number;
  total_amount: number;
}

interface OverViewProps {
  total_sales_made?: string;
  avg_sales_value?: string;
  agent_target?: string;
  performance?: string;
  total_value_in_stock?: string;
  number_of_items?: string;
  sales_history?: SalesHistoryItem[];
}

interface sellingAgentOverviewProps {
  id: string;
  name: string;
  total_sales_volume: number;
  total_sales_value: string;
}

interface BusinessListProps extends BusinessProps {
  id: string;
  business_logo: string;
  has_business_info: boolean;
  business_phone: string;
}

interface SalesListProps extends SalesProps {
  id: string;
  transaction_type: string;
}

interface AgentSalesProps {
  id: string;
  business: {
    id: string;
    name: string;
  };
  customer: {
    id: string;
    name: string;
  };
  sales_agent: {
    id: string;
    name: string;
  };
  sale_date: string | null;
  payment_mode: string;
  sales_price: number;
  products: {
    id: string;
    product: {
      id: string;
      name: string;
      sku: string;
    };
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
  status_history: {
    status: string;
    comment: string;
    created_at: string;
  }[];
  created_at: string;
  updated_at: string;
}

interface SalesOrderlistProps extends SalesOrderProps {
  id: string;
}

interface BusinessCategoriesListProps {
  label: string;
  value: string;
}

interface SaleTypesListProps {
  value: string;
  label: string;
}

interface SaleStatusListProps {
  value: string;
  label: string;
}

interface SalesOverviewProps {
  total_sales: string;
  total_value: string;
  average_value: string;
}

interface BusinessTypesProps {
  value: string;
  label: string;
}

interface PaymentModesListProps {
  value: string;
  label: string;
}
interface BrandProps {
  id: string;
  brand_name: string;
  logo: string;
}
interface ProductCategoryProps {
  id: string;
  category_name: string;
  image_url: string;
}
interface PackageProps {
  id: string;
  package_type_name: string;
}

interface ProductListProps extends Product {
  id: string;
}

interface ProfileCompletionProps {
  completion: number;
}

interface cartProductProps {
  id: string;
  product_name: string;
  product_retail_price: number;
  quantity: number;
}

interface CartItem extends cartProductProps {
  unit_price?: number;
  total_price?: number;
  quantity: number;
  amount: number;
}

interface SupplierListProps extends CreateSuppliersProps {
  id: string;
  supplier_entity_id: string;
  supplier_entity_type: string;
}

interface SalesAgentListProps extends CreateSalesAgentProps {
  id: string;
  user_id: string;
  business_id: string;
  name: string;
  description: string;
  phone_number: string;
  agent_role: string;
  email: string;
  location: string;
}

interface PurchaseListProps extends PurchaseProps {
  id: string;
}

interface NotificationProps {
  id: string;
  user_id: string;
  sender_id: string;
  title: string;
  content: string;
  is_read: boolean;
  notification_type: string;
  reference_id: string;
  reference_purpose: string;
  created_at: string;
  updated_at: string;
}

interface CreateCreditFormDataProps {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  means_of_identification: string;
  identification_file: File | string | null;
  next_of_kin_name: string;
  next_of_kin_phone_number: string;
  address: string;
  registered_business_address: string;
  date_of_birth: string;
  verified_bank_statement: string;
  verified_bank_statement_file: File | string | null;
  supplier_distributor_statement: string;
  supplier_distributor_statement_file: File | string | null;
  sales_record: string;
  sales_record_file: File | string | null;
}

interface CreditApplicationProps {
  id: string;
  user_id: string;
  business_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  means_of_identification: string;
  identification_file: string;
  next_of_kin_name: string;
  next_of_kin_phone_number: string;
  address: string;
  registered_business_address: string;
  date_of_birth: string;
  verified_bank_statement: string;
  verified_bank_statement_file: string;
  supplier_distributor_statement: string;
  supplier_distributor_statement_file: string;
  sales_record: string;
  sales_record_file: string;
  due_date: string;
}

interface CreditAssessment {
  knowledge_management: string;
  gender_considerations: string;
  financial_health_assessment: string | null;
  projects: string | null;
  asset_management: string;
  liquidity_capital_management: string;
  cash_flow_management: string;
  operations_management_assessment: string | null;
  transport_logistics: string;
  community_entry_sensitization: string | null;
  warehousing_storage: string;
  market_access: string;
  sales_profitability: string;
  innovation_digitization: string;
  user_id: string;
}

interface CustomersOverviewProps {
  customers: { total: number; active: number; percent_change: number };
  retailers: { total: number; active: number; percent_change: number };
  wholesalers: { total: number; active: number; percent_change: number };
}

interface SalesOverviewProps {
  total_sales: string;
  total_value: string;
  average_value: string;
}

interface OrderOperationProps {
  total_orders: number;
  total_order_value: string;
  average_order_value: string;
  conversion_rate: number;
  monthly_data: any[];
  top_orders: any[];
}

interface ProfileCompletionProps {
  completion: number;
}

interface StaffProps {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_suspended: string;
  phone_number: string;
  country_code: string;
  role: string;
}

interface CartItem {
  id: string;
  product: string;
  quantity: number;
  unit: string;
  price: number;
  discount: number;
  discountAmount: number;
  total: number;
}

interface PurchaseOrder {
  po_number?: string;
  request_date?: string;
  delivery_date?: string;
  supplier?: string;
  customer?: string;
  total_cost?: string | number;
  payment_status?: string;
  approval_status?: string;
  status?: string;
  id?: string;
}
