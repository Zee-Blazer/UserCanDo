import FlyoutLayout from "@/components/General/flyoutLayout";
import AddSaleForm from "./addSaleForm";

interface EditSaleFlyoutProps {
  isEditDrawerOpen: boolean;
  closeFlyout: () => void;
  data?: SalesListProps | null;
}

function EditSaleFlyout({
  isEditDrawerOpen,
  closeFlyout,
  data,
}: EditSaleFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isEditDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Edit Sale"
      subheading="Edit the details of this sale"
      showButtons={false}
    >
      <AddSaleForm
        isEdit
        //@ts-ignore
        initialData={data}
        onClose={closeFlyout}
      />
    </FlyoutLayout>
  );
}

export default EditSaleFlyout;
