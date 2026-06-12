import FlyoutLayout from "@/components/General/flyoutLayout";
import AddSaleForm from "./addSaleForm";

interface AddSaleFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
}

function AddSaleFlyout({ isRightDrawerOpen, closeFlyout }: AddSaleFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isRightDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Add Sales Items"
      subheading="Add a new sale transaction"
      buttonContainerClass="justify-between flex py-10"
      buttonWidth="w-40"
      showButtons={false}
    >
      <AddSaleForm onClose={closeFlyout} />
    </FlyoutLayout>
  );
}

export default AddSaleFlyout;
