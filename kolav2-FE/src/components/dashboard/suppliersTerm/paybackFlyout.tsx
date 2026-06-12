// import FlyoutLayout from "@/components/General/flyoutLayout";
// import PaybackForm from "./paybackForm";

// interface PaybackFlyoutProps {
//   isRightDrawerOpen: boolean;
//   closeFlyout: () => void;
// }

// function PaybackFlyout({ isRightDrawerOpen, closeFlyout }: PaybackFlyoutProps) {
//   return (
//     <FlyoutLayout
//       isRightDrawerOpen={isRightDrawerOpen}
//       closeFlyout={closeFlyout}
//       onSave={closeFlyout}
//       heading="Credit Payback"
//       showButtons={false}
//     >
//       <h1>hii</h1>
//       <PaybackForm />
//     </FlyoutLayout>
//   );
// }

// export default PaybackFlyout;

import FlyoutLayout from "@/components/General/flyoutLayout";
import PaybackForm from "./paybackForm";

interface PaybackFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
  selectedTerm?: any;
}

function PaybackFlyout({
  isRightDrawerOpen,
  closeFlyout,
  selectedTerm,
}: PaybackFlyoutProps) {
  const handlePayNow = async (installmentId: string) => {
    // Add your payment logic here
    console.log("Processing payment for installment:", installmentId);
    // You can call your payment API here
  };

  return (
    <FlyoutLayout
      isRightDrawerOpen={isRightDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Credit Payback"
      showButtons={false}
    >
      <PaybackForm
        selectedTerm={selectedTerm}
        onPayNow={handlePayNow}
        isLoading={false}
      />
    </FlyoutLayout>
  );
}

export default PaybackFlyout;
