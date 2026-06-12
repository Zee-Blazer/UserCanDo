"use client";
import {
  DashboardHeader,
  DashboardSidebar,
} from "@/components/dashboard/layout";
import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DashboardProvider from "@/context/dashboardContext";
import RootComp from "./rootComp";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const removePadding =
    pathname.endsWith("/product-list") || pathname.endsWith("/sales-pos");
  const hideHeader = pathname.endsWith("/sales-pos");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DashboardProvider>
      <PageGuard allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}>
        <div className="flex h-screen">
          <div
            className={`fixed top-0 left-0 h-full w-[20rem] z-50 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:translate-x-0`}
          >
            <DashboardSidebar toggleSidebar={toggleSidebar} />
          </div>

          <div
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? "ml-0 md:ml-[20rem]" : "ml-0"
            } overflow-auto`}
          >
            {!hideHeader && <DashboardHeader toggleSidebar={toggleSidebar} />}

            <div className={removePadding ? "" : "p-3 md:p-4"}>
              <div
                className={`p-0 ${removePadding ? "" : "md:p-4"} min-h-screen`}
              >
                <RootComp>{children}</RootComp>
              </div>
            </div>
          </div>
        </div>
      </PageGuard>
    </DashboardProvider>
  );
};

export default DashboardLayout;
