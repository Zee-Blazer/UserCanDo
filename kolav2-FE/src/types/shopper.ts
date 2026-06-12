export interface Category {
  id: string;
  category_name: string;
  image_url: string | null;
}

export interface Vendor {
  id: string;
  business_name: string;
  business_logo: string;
  km_away: string;
}

export interface CartItem {
  cart_item_id: string;
  product_id: string;
  product_name: string;
  product_sku: string;
  product_description: string;
  product_category: string | null;
  product_category_name: string | null;
  product_brand: string;
  product_brand_name: string;
  product_package_type: string;
  product_quantity_per_package: string;
  product_wholesale_price: string;
  product_retail_price: string;
  product_sale_discount_price: string;
  product_minimum_quantity: number;
  product_price_per_piece: string;
  product_weight: string;
  product_weight_type: string;
  product_volume: string;
  product_volume_type: string;
  product_expiration_date: string;
  product_stock_level: number;
  product_image: string;
  business_id: string;
  business_name: string;
  quantity: number;
  brand_logo: string;
}

export interface VendorCart {
  vendor_name: string;
  vendor_id: string;
  cart_items: CartItem[];
  vendor_logo: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  business_id: string;
  business_name: string;
  business_user_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: string;
  total_price: string;
}

export interface CheckoutItem {
  id: string;
  user_id: string;
  cart_id: string;
  total_price: string;
  payment_option: string;
  pay_later_2_weeks_option: string | null;
  pay_later_4_weeks_option: string | null;
  card_last_four_digits: string | null;
  delivery_address: string;
  delivery_method: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface Installment {
  id: string;
  installment_number: number;
  amount_paid: string;
  amount: string;
  due_date: string;
  status: string;
}

export interface Order {
  id: string;
  user: string;
  checkout_items: CheckoutItem;
  order_items: OrderItem[];
  status: string;
  total_price: string;
  total_installments: string;
  installments: Installment[];
  due_date: string;
  created_at: string;
  updated_at: string;
}

export interface OrderMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  order_id: string;
  message: string;
  created_at: string;
}
