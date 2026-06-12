"use client";
import React, { useState } from "react";
import SuppliersPageHeader from "@/components/dashboard/suppliers/suppliersPageHeader";
import SuppliersTab from "@/components/dashboard/suppliers/suppliersTab";
import OrderHistoryTable from "@/components/dashboard/suppliers/orderHistoryTable";
import AddSupplierModal from "@/components/dashboard/suppliers/modals/addSupplierModal";

const Suppliers = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  return (
    <div className="border-[1px] border-gray_2 rounded-md">
      <SuppliersPageHeader
        activeIndex={activeTabIndex}
        setActiveIndex={setActiveTabIndex}
        onCreateSupplier={() => setIsRightDrawerOpen(true)}
        onAddSupplier={() => setIsAddSupplierModalOpen(true)}
      />

      {activeTabIndex === 0 && <SuppliersTab />}
      {activeTabIndex === 1 && <OrderHistoryTable />}

      <AddSupplierModal
        open={isAddSupplierModalOpen}
        onClose={() => {
          setIsAddSupplierModalOpen(false);
        }}
        onSave={() => {
          setIsAddSupplierModalOpen(false);
        }}
      />
    </div>
  );
};

export default Suppliers;
