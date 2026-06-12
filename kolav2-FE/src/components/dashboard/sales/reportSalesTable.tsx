import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import SalesSummaryTable from "./salesSummaryTable";
import SalesBySupplierTable from "./salesBySupplierTable";
import SalesByCustomerTable from "./salesByCustomerTable";
import SalesByRegionTable from "./salesByRegionTable";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";

const ReportSalesTable = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const btnTexts = [
    { label: "Sale Summary" },
    { label: "Sale By Supplier" },
    { label: "Sale By Customer" },
    { label: "Sale By Region" },
  ];

  const { loadReportsData } = useDash();
  const { salesSummary, salesSupplier, salesCustomer, salesRegion } =
    useDashboardSelector();

  useEffect(() => {
    loadReportsData();
  }, [loadReportsData]);

  return (
    <div data-table="report-sales-table" className="report-sales-container">
      <div className="flex gap-3 py-2">
        {btnTexts.map((btn, index) => {
          return (
            <Button
              key={index}
              className={`normal-case bg-transparent font-normal shadow-none p-0 py-2 hover:shadow-none ${
                activeTabIndex === index
                  ? "text-black border-b-sec"
                  : "text-gray_4 border-b-transparent"
              } border-b-[1px] rounded-none`}
              onClick={() => setActiveTabIndex(index)}
            >
              <Typography className="flex items-center gap-2 text-sm">
                {btn.label}
              </Typography>
            </Button>
          );
        })}
      </div>
      {activeTabIndex === 0 && <SalesSummaryTable data={salesSummary || []} />}
      {activeTabIndex === 1 && (
        <SalesBySupplierTable data={salesSupplier || []} />
      )}
      {activeTabIndex === 2 && (
        <SalesByCustomerTable data={salesCustomer || []} />
      )}
      {activeTabIndex === 3 && <SalesByRegionTable data={salesRegion || []} />}
    </div>
  );
};

export default ReportSalesTable;
