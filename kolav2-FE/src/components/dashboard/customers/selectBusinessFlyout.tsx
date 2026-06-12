import FlyoutLayout from "@/components/General/flyoutLayout";
import SelectBusinessForm from "./selectBusinessForm";

interface SelectBusinessFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
}

function SelectBusinessFlyout({
  isRightDrawerOpen,
  closeFlyout,
}: SelectBusinessFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isRightDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Add Customer"
      subheading="Complete the form below to associate a business as a customer."
      showButtons={false}
    >
      <SelectBusinessForm closeFlyout={closeFlyout} />
    </FlyoutLayout>
  );
}

export default SelectBusinessFlyout;
