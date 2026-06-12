"use client";

import ProductDetails from "@/components/dashboard/profile/stock/productDetails";
import React from "react";

const ProductDetailPage = ({ productId }: any) => {
  return <ProductDetails product={productId} />;
};

export default ProductDetailPage;
