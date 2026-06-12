import FlyoutLayout from "@/components/General/flyoutLayout";
import AddOrdersForm from "./addOrdersForm";

interface EditSaleFlyoutProps {
  isEditDrawerOpen: boolean;
  closeFlyout: () => void;
  data?: CreateOrderProps | null;
}

function EditOrderFlyout({
  isEditDrawerOpen,
  closeFlyout,
  data,
}: EditSaleFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isEditDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Edit Order"
      subheading="Edit the details of this order"
      showButtons={false}
    >
      <AddOrdersForm
        isEdit
        //@ts-ignore
        initialData={data}
        onClose={closeFlyout}
      />
    </FlyoutLayout>
  );
}

export default EditOrderFlyout;
