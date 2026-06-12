"use client";
import SalesRequest from "@/components/agent/sales/slides/request";
import AddSalesRequest from "@/components/agent/profileSale/slides/request";

interface Props {
  screen?: string;
}

const SalesPage = ({ screen }: Props) => {
  return screen !== "add" ? <SalesRequest /> : <AddSalesRequest />;
};

export default SalesPage;
