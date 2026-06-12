"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDashboardSelector } from "@/Redux/selectors";
import InvoiceTemplate from "@/components/dashboard/orders/invoiceTemplate";
import { useDash } from "@/context/dashboardContext";

const OrderInvoice = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { loadOrdersData } = useDash();
  const { orders } = useDashboardSelector();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    loadOrdersData();
  }, [loadOrdersData]);

  useEffect(() => {
    if (orderId && orders && orders.length > 0) {
      const selectedOrder = orders.find((order: any) => order.id === orderId);
      if (selectedOrder) {
        setOrderData(selectedOrder);
      }
    }
  }, [orderId, orders]);

  return <InvoiceTemplate title="Order Invoice" itemData={orderData} />;
};

export default OrderInvoice;
