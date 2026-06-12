"use client";
import React, { useState, useEffect, useMemo } from "react";
import FilterTermsModal from "@/components/dashboard/suppliersTerm/modals/filterTermsModal";
import SuppliersTermPageHeader from "@/components/dashboard/suppliersTerm/suppliersTermPageHeader";
import { useDashboardSelector } from "@/Redux/selectors";
import SuppliersTermsTable from "@/components/dashboard/suppliersTerm/suppliersTermTable";
import { useDash } from "@/context/dashboardContext";
import { DeleteModal } from "@/components/General/deleteModal";
import PlaceOrderModal from "@/components/dashboard/suppliersTerm/modals/placeOrderModal";

interface FilterTermState {
  supplier_name?: string;
  approval_status?: string;
  payment_status?: string;
  due_date?: string;
  start_date?: string;
  end_date?: string;
  term_number?: string;
}

const SuppliersTerm = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isTermDetailsFlyoutOpen, setIsTermDetailsFlyoutOpen] = useState(false);
  const [selectedTermForDetails, setSelectedTermForDetails] =
    useState<any>(null);
  const [isPlaceOrderModalOpen, setIsPlaceOrderModalOpen] = useState(false);
  const [editTermData, setEditTermData] = useState<any>(null);

  const [filters, setFilters] = useState<FilterTermState>({
    supplier_name: "",
    approval_status: "",
    payment_status: "",
    due_date: "",
    start_date: "",
    end_date: "",
    term_number: "",
  });

  const {
    loadSupplierTermsData,
    handleDeleteCreditRequest,
    isCreditRequestDeleting,
  } = useDash();

  const {
    suppliersTerms,
    approvedTerms,
    pendingTerms,
    declinedTerms,
    onHoldTerms,
    newTerms,
    recoveryWindowTerms,
  } = useDashboardSelector();

  useEffect(() => {
    loadSupplierTermsData();
  }, [loadSupplierTermsData]);

  const handleViewTermDetails = (termData: any) => {
    setSelectedTermForDetails(termData);
    setIsTermDetailsFlyoutOpen(true);
  };

  const handleDelete = () => {
    if (selectedRow) {
      handleDeleteCreditRequest(selectedRow, () => {
        setIsDeleteModalOpen(false);
        setSelectedRow(null);
      });
    }
  };

  const handleDeleteOpenDialog = () => setIsDeleteModalOpen(true);
  const handleDeleteCloseDialog = () => setIsDeleteModalOpen(false);

  const handleFilter = (newFilters: FilterTermState) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const handleEditTerm = (data: any) => {
    setEditTermData(data);
    setIsPlaceOrderModalOpen(true);
  };

  const getCurrentTabData = useMemo(() => {
    switch (activeTabIndex) {
      case 0:
        return suppliersTerms || [];
      case 1:
        return suppliersTerms || [];
      case 2:
        return (
          newTerms ||
          suppliersTerms?.filter(
            (term: any) => term.approval_status?.toLowerCase() === "new"
          ) ||
          []
        );
      case 3:
        return (
          approvedTerms ||
          suppliersTerms?.filter(
            (term: any) => term.approval_status?.toLowerCase() === "approved"
          ) ||
          []
        );
      case 4:
        return (
          declinedTerms ||
          suppliersTerms?.filter(
            (term: any) => term.approval_status?.toLowerCase() === "declined"
          ) ||
          []
        );
      case 5:
        return (
          onHoldTerms ||
          suppliersTerms?.filter(
            (term: any) => term.approval_status?.toLowerCase() === "on hold"
          ) ||
          []
        );
      case 6:
        return (
          recoveryWindowTerms ||
          suppliersTerms?.filter(
            (term: any) =>
              term.payment_status?.toLowerCase() === "overdue" ||
              term.approval_status?.toLowerCase() === "recovery"
          ) ||
          []
        );
      default:
        return suppliersTerms || [];
    }
  }, [
    activeTabIndex,
    suppliersTerms,
    approvedTerms,
    pendingTerms,
    declinedTerms,
    onHoldTerms,
    newTerms,
    recoveryWindowTerms,
  ]);

  const sharedProps = {
    onOpenEditDrawer: handleEditTerm,
    onOpenModal: handleDeleteOpenDialog,
    filters,
    onOpenFilterModal: () => setIsFilterModalOpen(true),
    setSelectedRow,
    onViewTermDetails: handleViewTermDetails,
    activeTabIndex,
  };

  return (
    <div className="border-[1px] pb-20 border-gray_2 rounded-md">
      <SuppliersTermPageHeader
        activeIndex={activeTabIndex}
        setActiveIndex={setActiveTabIndex}
      />

      <SuppliersTermsTable data={getCurrentTabData} {...sharedProps} />

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleDeleteCloseDialog}
        onDelete={handleDelete}
        header="Delete Supplier Term?"
        message="Are you sure you want to delete this supplier term? This action cannot be undone."
        loading={isCreditRequestDeleting}
      />

      <FilterTermsModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilter={handleFilter}
        currentFilters={filters}
      />

      <PlaceOrderModal
        isOpen={isPlaceOrderModalOpen}
        onClose={() => {
          setIsPlaceOrderModalOpen(false);
          setEditTermData(null);
        }}
        editData={editTermData}
        isEdit={!!editTermData}
      />
    </div>
  );
};

export default SuppliersTerm;
