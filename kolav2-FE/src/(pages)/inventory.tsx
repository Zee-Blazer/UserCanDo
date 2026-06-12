"use client";
import AddNewProductFlyout from "@/components/dashboard/inventory/addNewProductFlyout";
import InventoryPageHeader from "@/components/dashboard/inventory/inventoryPageHeader";
import InventoryTable from "@/components/dashboard/inventory/inventoryTable";
import { useState } from "react";

const Inventory = () => {
  const [isAddNewProductOpen, setIsAddCustomerOpen] = useState(false);

  const handleAddProduct = () => {
    setIsAddCustomerOpen(true);
  };

  return (
    <div className="border-[1px] border-gray_2 rounded-md p-4">
      <InventoryPageHeader onAddProduct={handleAddProduct} />
      <InventoryTable />
      <AddNewProductFlyout
        isAddNewProductOpen={isAddNewProductOpen}
        closeFlyout={() => setIsAddCustomerOpen(false)}
      />
    </div>
  );
};

export default Inventory;
