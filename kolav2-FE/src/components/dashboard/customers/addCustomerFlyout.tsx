import FlyoutLayout from "@/components/General/flyoutLayout";
import AddCustomerForm from "./addCustomerForm";

interface AddCustomerFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
  editData?: any; 
  isEditMode?: boolean; 
}

function AddCustomerFlyout({
  isRightDrawerOpen,
  closeFlyout,
  editData,
  isEditMode = false,
}: AddCustomerFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isRightDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading={isEditMode ? "Edit Customer" : "Add Customer"}
      subheading={
        isEditMode
          ? "Update the customer information below."
          : "Complete the form below to associate a business as a customer."
      }
      showButtons={false}
    >
      <AddCustomerForm editData={editData} isEditMode={isEditMode} />
    </FlyoutLayout>
  );
}

export default AddCustomerFlyout;
