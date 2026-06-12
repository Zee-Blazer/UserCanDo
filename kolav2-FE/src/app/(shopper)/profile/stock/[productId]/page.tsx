import ProductDetailPage from "@/(shopperPages)/productDetailPage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = ({ params }: any) => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.BOTH]}>
      <ProductDetailPage productId={params.productId} />
    </PageGuard>
  );
};

export default page;
