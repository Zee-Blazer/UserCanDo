"use client";
import React from "react";
import ShopperNavigation from "@/components/shopperLayout/shopperNavigation";
import AuthProvider from "@/context/authContext";
import DashboardProvider from "@/context/dashboardContext";
import ShopperProvider from "@/context/shopperContext";

const ShopperLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-gray-50 overflow-auto">
      <AuthProvider>
        <DashboardProvider>
          <ShopperProvider>
            <ShopperNavigation />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </ShopperProvider>
        </DashboardProvider>
      </AuthProvider>
    </div>
  );
};

export default ShopperLayout;
