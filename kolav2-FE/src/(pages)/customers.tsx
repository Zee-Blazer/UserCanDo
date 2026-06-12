"use client";
import AddCustomerFlyout from "@/components/dashboard/customers/addCustomerFlyout";
import AllCustomersTable from "@/components/dashboard/customers/allCustomersTable";
import BulkUploadFlyout from "@/components/dashboard/customers/bulkUploadFlyout";
import CustomersPageHeader from "@/components/dashboard/customers/customersPageHeader";
import RetailersTable from "@/components/dashboard/customers/retailersTable";
import WholeSalersTable from "@/components/dashboard/customers/wholeSalersTable";
import { DeleteModal } from "@/components/General/deleteModal";
import FilterCustomerModal, {
  FilterCustomerState,
} from "@/components/dashboard/customers/modals/filterCustomerModal";
import { useDash } from "@/context/dashboardContext";
import { useState } from "react";
import CreateBusinessFlyout from "@/components/dashboard/customers/createBusinessFlyout";

const Customers = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isCreateBusinessOpen, setIsCreateBusinessOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [editData, setEditData] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { handleDeleteCustomer, isCustomerDeleting } = useDash();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterCustomerState>({
    customerName: "",
    phoneNumber: "",
    location: "",
    country: "",
    region: "",
  });

  const handleFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilter = (newFilters: FilterCustomerState) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const handleDeleteModal = (row: any) => {
    setSelectedRow(row.original);
    setIsDeleteModalOpen(true);
  };

  const handleEditModal = (row: any) => {
    setEditData(row.original);
    setIsEditMode(true);
    setIsCreateBusinessOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteCustomer(selectedRow, () => {
        setIsDeleteModalOpen(false);
        setSelectedRow(null);
      });
    }
  };

  const handleAddCustomer = () => {
    setIsEditMode(false);
    setEditData(null);
    setIsAddCustomerOpen(true);
  };

  const handleBulkUpload = () => {
    setIsBulkUploadOpen(true);
  };

  const closeFlyout = () => {
    setIsAddCustomerOpen(false);
    setIsCreateBusinessOpen(false);
    setIsEditMode(false);
    setEditData(null);
  };

  const closeCreateBusinessFlyout = () => {
    setIsCreateBusinessOpen(false);
    setIsEditMode(false);
    setEditData(null);
  };

  return (
    <div className="border-[1px] border-gray_2 rounded-md p-4">
      <CustomersPageHeader
        activeIndex={activeTabIndex}
        setActiveIndex={setActiveTabIndex}
        onAddCustomer={handleAddCustomer}
        onBulkUpload={handleBulkUpload}
      />
      {activeTabIndex === 0 && (
        <AllCustomersTable
          handleDeleteModal={handleDeleteModal}
          handleEditModal={handleEditModal}
          handleFilterModal={handleFilterModal}
          filters={filters}
        />
      )}
      {activeTabIndex === 1 && (
        <WholeSalersTable
          handleDeleteModal={handleDeleteModal}
          handleEditModal={handleEditModal}
          handleFilterModal={handleFilterModal}
          filters={filters}
        />
      )}
      {activeTabIndex === 2 && (
        <RetailersTable
          handleDeleteModal={handleDeleteModal}
          handleEditModal={handleEditModal}
          handleFilterModal={handleFilterModal}
          filters={filters}
        />
      )}
      <AddCustomerFlyout
        isRightDrawerOpen={isAddCustomerOpen}
        closeFlyout={closeFlyout}
        editData={editData}
        isEditMode={isEditMode}
      />
      <CreateBusinessFlyout
        isRightDrawerOpen={isCreateBusinessOpen}
        closeFlyout={closeCreateBusinessFlyout}
        editData={editData}
        isEditMode={isEditMode}
      />
      <BulkUploadFlyout
        isRightDrawerOpen={isBulkUploadOpen}
        closeFlyout={() => setIsBulkUploadOpen(false)}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRow(null);
        }}
        onDelete={confirmDelete}
        header="Delete Customer?"
        message={`Are you sure you want to remove "${selectedRow?.customer_name}"?`}
        loading={isCustomerDeleting}
      />

      <FilterCustomerModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilter={handleFilter}
        initialFilters={filters}
      />
    </div>
  );
};

export default Customers;
