import FlyoutLayout from "@/components/General/flyoutLayout";
import OrderStatus from "./orderStatus";
import { useState } from "react";
import OrderDetailsHeader from "./orderDetailsHeader";
import OrderDetails from "./orderDetails";
import StatusHistory from "./statusHistory";
import VendorOrderComments from "./vendorOrderComments";

interface OrderDetailsFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
  orderData: any;
  onEditOrder?: (data: any) => void;
}

function OrderDetailsFlyout({
  isRightDrawerOpen,
  closeFlyout,
  orderData,
  onEditOrder,
}: OrderDetailsFlyoutProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <>
      <FlyoutLayout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={closeFlyout}
        heading="Order Details"
        subheading="details of the order placed."
        buttonContainerClass="justify-between flex py-10"
        buttonWidth="w-40"
        showButtons={false}
        headingRightComponent={
          <OrderStatus closeFlyout={closeFlyout} orderData={orderData} />
        }
        drawerSize={750}
      >
        <OrderDetailsHeader
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
        />
        <div className="py-3">
          {activeTabIndex === 0 && (
            <OrderDetails
              orderData={orderData}
              onClose={closeFlyout}
              onEditOrder={onEditOrder}
            />
          )}
          {activeTabIndex === 1 && (
            <StatusHistory orderData={orderData} onClose={closeFlyout} />
          )}
          {activeTabIndex === 2 && (
            <VendorOrderComments
              orderId={orderData?.id}
              onClose={closeFlyout}
            />

          )}
        </div>
      </FlyoutLayout>
    </>
  );
}

export default OrderDetailsFlyout;
