import FlyoutLayout from "@/components/General/flyoutLayout";
import AddOrdersForm from "./addOrdersForm";

interface AddOrdersFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
}

function AddOrdersFlyout({
  isRightDrawerOpen,
  closeFlyout,
}: AddOrdersFlyoutProps) {
  return (
    <>
      <FlyoutLayout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={closeFlyout}
        heading="Add New Order"
        subheading="Add the details of this order."
        buttonContainerClass="justify-between flex py-10"
        buttonWidth="w-40"
        showButtons={false}
      >
        <AddOrdersForm onClose={closeFlyout} />
      </FlyoutLayout>
    </>
  );
}

export default AddOrdersFlyout;
