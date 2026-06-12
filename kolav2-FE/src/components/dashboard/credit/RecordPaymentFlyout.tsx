import FlyoutLayout from "@/components/General/flyoutLayout";
import RecordPaymentForm from "./RecordPaymentForm";

interface RecordPaymentFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
  onSave: () => void;
}

const RecordPaymentFlyout = ({
  isRightDrawerOpen,
  closeFlyout,
  onSave,
}: RecordPaymentFlyoutProps) => {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isRightDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={onSave}
      heading="Record Customer Payment"
      showButtons={false}
      buttonContainerClass="justify-between flex py-10"
      buttonWidth="w-40"
      primaryBtnText="Record Payment"
    >
      <RecordPaymentForm onRecordPayment={onSave} />
    </FlyoutLayout>
  );
};

export default RecordPaymentFlyout;
