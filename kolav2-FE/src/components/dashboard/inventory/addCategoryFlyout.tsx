import FlyoutLayout from "@/components/General/flyoutLayout";
import AddCategoryForm from "./addCategoryForm";

interface AddCategoryFlyoutProps {
  isAddCategoryOpen: boolean;
  closeFlyout: () => void;
}

function AddCategoryFlyout({
  isAddCategoryOpen,
  closeFlyout,
}: AddCategoryFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isAddCategoryOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Add New Product Category"
      subheading="Enter the name of the category below"
      primaryBtnText="Save Changes"
      showButtons={false}
    >
      <AddCategoryForm closeFlyout={closeFlyout} />
    </FlyoutLayout>
  );
}

export default AddCategoryFlyout;
