"use client";
import AddSaleFlyout from "@/components/dashboard/sales/addSaleFlyout";
import AllSalesTable from "@/components/dashboard/sales/allSalesTable";
import EditSaleFlyout from "@/components/dashboard/sales/EditSaleFlyout";
import ReportSalesTable from "@/components/dashboard/sales/reportSalesTable";
import SalesPageHeader from "@/components/dashboard/sales/salesPageHeader";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import React, { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TABS = {
  ALL: 0,
  CASH: 1,
  CREDIT: 2,
  REPORT: 3,
};

interface TabData {
  label: string;
  count?: number;
  saleType: string;
}

const Sales = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(TABS.ALL);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [saleDetails, setSaleDetails] = useState<SalesListProps | null>(null);
  const { sales } = useDashboardSelector();
  const { loadSalesData } = useDash();

  useEffect(() => {
    loadSalesData();
  }, [loadSalesData]);

  const { allSales, cashSales, creditSales, tabsData } = useMemo(() => {
    if (!sales || !Array.isArray(sales)) {
      return {
        allSales: [],
        cashSales: [],
        creditSales: [],
        tabsData: [
          { label: "All", count: 0, saleType: "all" },
          { label: "Cash", count: 0, saleType: "cash" },
          { label: "Credit", count: 0, saleType: "credit" },
          { label: "Report", saleType: "" },
        ],
      };
    }

    const allSales = [...sales];
    const cashSales = sales.filter(
      (sale) => sale.sale_type?.toLowerCase() === "cash"
    );
    const creditSales = sales.filter(
      (sale) => sale.sale_type?.toLowerCase() === "credit"
    );

    const tabsData: TabData[] = [
      { label: "All", count: allSales.length, saleType: "all" },
      { label: "Cash", count: cashSales.length, saleType: "cash" },
      { label: "Credit", count: creditSales.length, saleType: "credit" },
      { label: "Report", saleType: "" },
    ];

    return { allSales, cashSales, creditSales, tabsData };
  }, [sales]);

  const currentSalesData = useMemo(() => {
    switch (activeTabIndex) {
      case TABS.CASH:
        return cashSales;
      case TABS.CREDIT:
        return creditSales;
      case TABS.ALL:
      default:
        return allSales;
    }
  }, [activeTabIndex, allSales, cashSales, creditSales]);

  const btnTexts = tabsData.map(({ label, count }) => ({ label, count }));

  const handleAddSale = () => {
    setIsRightDrawerOpen(true);
  };

  const handleEditSale = (data: SalesListProps) => {
    setSaleDetails(data);
    setIsEditDrawerOpen(true);
  };

  const handleDownloadPDF = async () => {
    const tabNames = ["All", "Cash", "Credit", "Report"];

    const currentTabName = tabNames[activeTabIndex] || "Sales";

    try {
      let tableElement: HTMLElement | null = null;

      if (activeTabIndex === TABS.REPORT) {
        tableElement =
          (document.querySelector(
            '[data-table="report-sales-table"]'
          ) as HTMLElement) ||
          (document.querySelector(".report-sales-container") as HTMLElement) ||
          (document.querySelector("table") as HTMLElement);
      } else {
        tableElement =
          (document.querySelector(
            '[data-table="sales-table"]'
          ) as HTMLElement) ||
          (document.querySelector("table") as HTMLElement) ||
          (document.querySelector(
            ".bg-lightBg.dark\\:bg-darkBg"
          ) as HTMLElement);
      }

      if (!tableElement) {
        return;
      }

      const tableContainer =
        tableElement.closest(".space-y-4") || tableElement.parentElement;
      const elementToCapture = tableContainer || tableElement;

      const canvas = await html2canvas(elementToCapture as HTMLElement, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: elementToCapture.scrollWidth,
        height: elementToCapture.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const availableWidth = pageWidth - 2 * margin;
      const availableHeight = pageHeight - 40;

      const imgAspectRatio = canvas.width / canvas.height;
      let imgWidth = availableWidth;
      let imgHeight = availableWidth / imgAspectRatio;

      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = availableHeight * imgAspectRatio;
      }

      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${currentTabName} Sales Report`, pageWidth / 2, 20, {
        align: "center",
      });

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        pageWidth / 2,
        28,
        { align: "center" }
      );

      const xPosition = (pageWidth - imgWidth) / 2;
      const yPosition = 35;

      pdf.addImage(imgData, "PNG", xPosition, yPosition, imgWidth, imgHeight);

      const fileName = `${currentTabName.replace(/\s+/g, "_")}_Sales_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      pdf.save(fileName);
    } catch (error) {}
  };

  return (
    <div className="border-[1px] border-gray_2 rounded-md p-4">
      <SalesPageHeader
        activeIndex={activeTabIndex}
        setActiveIndex={setActiveTabIndex}
        onClick={handleAddSale}
        btnTexts={btnTexts}
        onDownload={handleDownloadPDF}
      />
      {activeTabIndex === TABS.REPORT ? (
        <ReportSalesTable />
      ) : (
        <AllSalesTable
          salesData={currentSalesData}
          onEditButtonClick={handleEditSale}
        />
      )}
      <AddSaleFlyout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={() => {
          setIsRightDrawerOpen(false);
        }}
      />
      <EditSaleFlyout
        isEditDrawerOpen={isEditDrawerOpen}
        closeFlyout={() => {
          setIsEditDrawerOpen(false);
        }}
        data={saleDetails || null}
      />
    </div>
  );
};

export default Sales;
