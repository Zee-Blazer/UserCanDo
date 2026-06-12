interface Product {
  id: string;
  product_name: string;
  product_description: string;
  product_image: string;
  product_price_per_piece: string;
  product_quantity_per_package: string;
  product_retail_price: string;
  product_wholesale_price: string;
  product_stock_level: number;
  product_category_name: string;
  product_category: string;
}

interface ProductResponse {
  count: number;
  limit: number;
  page: number;
  products: Product[];
}
