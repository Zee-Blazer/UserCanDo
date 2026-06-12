"use client";
import AddNewStockFlyout from "@/components/dashboard/profile/stock/addNewStockFlyout";
import All from "@/components/dashboard/profile/stock/all";
import StockPageHeader from "@/components/dashboard/profile/stock/stockPageHeader";
import StockProducts from "@/components/dashboard/profile/stock/stockProducts";
import React, { useState } from "react";

const StockPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  const handleAddStock = () => {
    setIsRightDrawerOpen(true);
  };

  return (
    <main>
      <StockPageHeader addNewStock={handleAddStock} />
      <StockProducts
        activeIndex={activeTabIndex}
        setActiveIndex={setActiveTabIndex}
      />
      <div className="flex-grow">
        <All addNewStock={handleAddStock} activeTabIndex={activeTabIndex} />
      </div>
      <AddNewStockFlyout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={() => setIsRightDrawerOpen(false)}
      />
    </main>
  );
};

export default StockPage;
