import FlyoutLayout from "@/components/General/flyoutLayout";
import CreateBusinessForm from "./createBusinessForm";

interface CreateBusinessFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
  editData?: any;
  isEditMode?: boolean;
}

function CreateBusinessFlyout({
  isRightDrawerOpen,
  closeFlyout,
  editData,
  isEditMode = false,
}: CreateBusinessFlyoutProps) {
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
      buttonContainerClass="justify-between flex py-10"
      buttonWidth="w-40"
      primaryBtnText="Submit"
      showButtons={false}
    >
      <CreateBusinessForm
        closeFlyout={closeFlyout}
        editData={editData}
        isEditMode={isEditMode}
      />
    </FlyoutLayout>
  );
}

export default CreateBusinessFlyout;
