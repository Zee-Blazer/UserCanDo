"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDashboardSelector } from "@/Redux/selectors";
import InvoiceTemplate from "@/components/dashboard/orders/invoiceTemplate";
import { useDash } from "@/context/dashboardContext";

const SalesInvoice = () => {
  const searchParams = useSearchParams();
  const saleId = searchParams.get("saleId");
  const { loadSalesData } = useDash();
  const { sales } = useDashboardSelector();
  const [saleData, setSaleData] = useState<any>(null);

  useEffect(() => {
    loadSalesData();
  }, [loadSalesData]);

  useEffect(() => {
    if (saleId && sales && sales.length > 0) {
      const selectedSale = sales.find((sale: any) => sale.id === saleId);
      if (selectedSale) {
        setSaleData(selectedSale);
      }
    }
  }, [saleId, sales]);

  return <InvoiceTemplate title="Sales Invoice" itemData={saleData} />;
};

export default SalesInvoice;
