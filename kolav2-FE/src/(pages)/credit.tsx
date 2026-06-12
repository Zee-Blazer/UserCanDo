"use client";
import AllTimeCredit from "@/components/dashboard/credit/allTimeCredit";
import ApplyDecision from "@/components/dashboard/credit/applyDecision";
import CreditPageHeader from "@/components/dashboard/credit/creditPageHeader";
import CreditPayback from "@/components/dashboard/credit/creditPayback";
import CreditPurchase from "@/components/dashboard/credit/creditPurchase";
import CreditTabs from "@/components/dashboard/credit/creditTabs";
import MessagingFlyout from "@/components/dashboard/credit/messagingFlyout";
import React, { useState, useEffect } from "react";
import ApplyForCreditModal from "@/components/dashboard/credit/modals/applyForCreditModal";
import RecordPaymentFlyout from "@/components/dashboard/credit/RecordPaymentFlyout";
import { CreditLimitAssessment } from "@/components/dashboard/credit/modals/creditLimitAssessment";
import { useDash } from "@/context/dashboardContext";
import {
  initialCreditAccessmentForm,
  initialCreditLimitForm,
} from "@/utils/initialStates";
import { useDashboardSelector } from "@/Redux/selectors";
import { ApplyCreditAssessmentModal } from "@/components/dashboard/credit/modals/applyCreditLimitAccessmentModal";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Credit = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isApplyCreditModalOpen, setIsApplyCreditModalOpen] = useState(false);
  const [isRecordPaymentFlyoutOpen, setIsRecordPaymentFlyoutOpen] =
    useState(false);
  const [isCreditLimitAssessmentOpen, setIsCreditLimitAssessmentOpen] =
    useState(false);
  const [formData, setFormData] = useState<CreditLimitFormProps>(
    initialCreditLimitForm
  );
  const [accessmentFormData, setAccessmentFormData] =
    useState<CreditAccessmentFormProps>(initialCreditAccessmentForm);
  const [isFreshCreditAssessmentOpen, setIsFreshCreditAssessmentOpen] =
    useState(false);
  const {
    loadCreditData,
    handleCreateCreditApplication,
    handleCreateCreditAccessment,
  } = useDash();
  const { creditApplications } = useDashboardSelector();

  const handleDeleteOpenDialog = () => setIsDeleteDialogOpen(true);
  const handleDeleteCloseDialog = () => setIsDeleteDialogOpen(false);

  const hasExistingCreditApplication = () => {
    return creditApplications && creditApplications.length > 0;
  };

  const handleApplyForCredit = () => {
    if (hasExistingCreditApplication()) {
      setIsFreshCreditAssessmentOpen(true);
    } else {
      setIsApplyCreditModalOpen(true);
    }
  };

  useEffect(() => {
    loadCreditData();
  }, [loadCreditData]);

  useEffect(() => {
    if (activeTabIndex === 3) {
      setIsRightDrawerOpen(true);
    }
  }, [activeTabIndex]);

  const handleDownloadPDF = async () => {
    const tabNames = [
      "Apply Decision",
      "Credit Purchases",
      "Credit PayBack",
      "Messaging",
    ];

    const currentTabName = tabNames[activeTabIndex] || "Credit";

    try {
      const creditCardsElement =
        document.querySelector('[data-credit-cards="true"]') ||
        document.querySelector(".border-gray_2.border-t.border-b");

      let tableElement: HTMLElement | null = null;

      switch (activeTabIndex) {
        case 0:
          tableElement = document.querySelector(
            '[data-table="apply-decision-table"]'
          ) as HTMLElement;
          break;
        case 1:
          tableElement = document.querySelector(
            '[data-table="credit-purchase-table"]'
          ) as HTMLElement;
          break;
        case 2:
          tableElement = document.querySelector(
            '[data-table="credit-payback-table"]'
          ) as HTMLElement;
          break;
        case 3:
          tableElement =
            (document.querySelector(
              '[data-table="messaging-table"]'
            ) as HTMLElement) ||
            (document.querySelector(".messaging-content") as HTMLElement);
          break;
      }

      // Fallback to any table if specific one not found
      if (!tableElement && activeTabIndex !== 3) {
        tableElement = document.querySelector("table") as HTMLElement;
      }

      if (!creditCardsElement && !tableElement) {
        console.warn("No content found to download");
        return;
      }

      // Create a container to capture both credit cards and table
      const tempContainer = document.createElement("div");
      tempContainer.style.backgroundColor = "#ffffff";
      tempContainer.style.padding = "20px";
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "0";
      tempContainer.style.width = "1200px"; // Fixed width for consistent layout

      // Add credit cards if they exist
      if (creditCardsElement) {
        const creditCardsClone = creditCardsElement.cloneNode(
          true
        ) as HTMLElement;
        creditCardsClone.style.marginBottom = "30px";
        tempContainer.appendChild(creditCardsClone);
      }

      // Add table if it exists
      if (tableElement) {
        const tableContainer =
          tableElement.closest(".space-y-4") || tableElement.parentElement;
        const elementToClone = tableContainer || tableElement;
        const tableClone = elementToClone.cloneNode(true) as HTMLElement;
        tempContainer.appendChild(tableClone);
      }

      document.body.appendChild(tempContainer);

      // Create canvas from the combined content
      const canvas = await html2canvas(tempContainer, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: tempContainer.scrollWidth,
        height: tempContainer.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });

      // Remove temporary container
      document.body.removeChild(tempContainer);

      // Create PDF
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
      pdf.text(`${currentTabName} Credit Report`, pageWidth / 2, 20, {
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
      const fileName = `${currentTabName.replace(/\s+/g, "_")}_Credit_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      pdf.save(fileName);
    } catch (error) {
      // Silent failure - PDF generation failed
    }
  };

  return (
    <div className="border-[1px] border-gray_2 rounded-md p-4">
      <CreditPageHeader
        openApplyCreditModal={handleApplyForCredit}
        activeTabIndex={activeTabIndex}
        openRecordPaymentFlyout={() => setIsRecordPaymentFlyoutOpen(true)}
        onDownload={handleDownloadPDF}
      />
      <AllTimeCredit />
      <CreditTabs
        onClick={() => setIsRightDrawerOpen(true)}
        activeIndex={activeTabIndex}
        setActiveIndex={setActiveTabIndex}
      />
      {activeTabIndex === 0 && <ApplyDecision />}
      {activeTabIndex === 1 && (
        <CreditPurchase onDelete={handleDeleteOpenDialog} />
      )}
      {activeTabIndex === 2 && (
        <CreditPayback onDelete={handleDeleteOpenDialog} />
      )}

      <MessagingFlyout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={() => setIsRightDrawerOpen(false)}
      />

      <ApplyForCreditModal
        isOpen={isApplyCreditModalOpen}
        onClose={() => setIsApplyCreditModalOpen(false)}
        onApply={() => {
          setIsApplyCreditModalOpen(false);
          setIsCreditLimitAssessmentOpen(true);
        }}
        formData={formData}
        setFormData={setFormData}
      />

      <RecordPaymentFlyout
        isRightDrawerOpen={isRecordPaymentFlyoutOpen}
        closeFlyout={() => setIsRecordPaymentFlyoutOpen(false)}
        onSave={() => setIsRecordPaymentFlyoutOpen(false)}
      />

      <CreditLimitAssessment
        isEditing={true}
        open={isCreditLimitAssessmentOpen}
        onClose={() => setIsCreditLimitAssessmentOpen(false)}
        onApply={() => {
          handleCreateCreditApplication(
            formData,
            formData.sales_record_file,
            formData.supplier_distributor_statement_file,
            formData.verified_bank_statement_file,
            formData.identification_file,
            () => {
              // Credit application created successfully
            }
          );
          setIsCreditLimitAssessmentOpen(false);
        }}
        onBack={() => {
          setIsCreditLimitAssessmentOpen(false);
          if (!hasExistingCreditApplication()) {
            setIsApplyCreditModalOpen(true);
          }
        }}
        formData={formData}
        setFormData={setFormData}
      />
      <ApplyCreditAssessmentModal
        open={isFreshCreditAssessmentOpen}
        onClose={() => setIsFreshCreditAssessmentOpen(false)}
        onApply={() => {
          handleCreateCreditAccessment(accessmentFormData, () => {
            setIsFreshCreditAssessmentOpen(false);
            setAccessmentFormData(initialCreditAccessmentForm);
          });
        }}
        accessmentFormData={accessmentFormData}
        setAccessmentFormData={setAccessmentFormData}
      />
    </div>
  );
};

export default Credit;
