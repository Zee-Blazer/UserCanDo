"use client";

import Orders from "@/components/dashboard/purchaseOder/orders";
import PurchasePageHeader from "@/components/dashboard/purchaseOder/purchasePageHeader";
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PurchaseOrder = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleDownloadPDF = async () => {
    const tabNames = ["New", "Finance Approved", "CEO Approved"];

    const currentTabName = tabNames[activeTabIndex] || "Purchase Order";

    try {
      const tableElement =
        document.querySelector('[data-table="purchase-order-table"]') ||
        document.querySelector("table") ||
        document.querySelector(".bg-lightBg.dark\\:bg-darkBg");

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

      // Calculate dimensions to fit the page
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const availableWidth = pageWidth - 2 * margin;
      const availableHeight = pageHeight - 40; // Leave space for title and margins

      // Calculate scaled dimensions
      const imgAspectRatio = canvas.width / canvas.height;
      let imgWidth = availableWidth;
      let imgHeight = availableWidth / imgAspectRatio;

      // If height exceeds available space, scale based on height
      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = availableHeight * imgAspectRatio;
      }

      // Add title
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${currentTabName} Purchase Order Report`, pageWidth / 2, 20, {
        align: "center",
      });

      // Add subtitle with date
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        pageWidth / 2,
        28,
        { align: "center" }
      );

      // Add image
      const xPosition = (pageWidth - imgWidth) / 2;
      const yPosition = 35;

      pdf.addImage(imgData, "PNG", xPosition, yPosition, imgWidth, imgHeight);

      // Download the PDF
      const fileName = `${currentTabName.replace(/\s+/g, "_")}_Purchase_Order_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      pdf.save(fileName);
    } catch (error) {}
  };

  return (
    <main className="border-[1px] border-gray_2 rounded-md p-4">
      <PurchasePageHeader
        activeIndex={activeTabIndex}
        setActiveIndex={setActiveTabIndex}
        onDownload={handleDownloadPDF}
      />
      <Orders />
    </main>
  );
};

export default PurchaseOrder;
