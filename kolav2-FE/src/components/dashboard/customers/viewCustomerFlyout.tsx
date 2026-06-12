import FlyoutLayout from "@/components/General/flyoutLayout";
import ViewCustomerForm from "./viewCustomerForm";

interface ViewCustomerFlyoutProps {
  isViewCustomerOpen: boolean;
  closeFlyout: () => void;
  customerData?: any;
}

function ViewCustomerFlyout({
  isViewCustomerOpen,
  closeFlyout,
  customerData,
}: ViewCustomerFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isViewCustomerOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="View Customer"
      subheading="View Customer details below."
      showButtons={false}
    >
      <ViewCustomerForm customerData={customerData} />
    </FlyoutLayout>
  );
}

export default ViewCustomerFlyout;
