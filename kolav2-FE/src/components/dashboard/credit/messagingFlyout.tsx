import FlyoutLayout from "@/components/General/flyoutLayout";
import Messaging from "@/components/dashboard/credit/messaging";
import React from "react";

interface MessagingFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
}

function MessagingFlyout({
  isRightDrawerOpen,
  closeFlyout,
}: MessagingFlyoutProps) {
  return (
    <>
      <FlyoutLayout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={closeFlyout}
        heading="Messages"
        buttonContainerClass="justify-between flex py-10"
        buttonWidth="w-40"
        showButtons={false}
      >
        <Messaging />
      </FlyoutLayout>
    </>
  );
}

export default MessagingFlyout;
