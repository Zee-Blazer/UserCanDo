import React, { ReactNode } from "react";
import { Button, Drawer, Typography } from "@material-tailwind/react";
import { XIcon } from "lucide-react";

interface FlyoutLayoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
  onSave?: () => void;
  children?: ReactNode;
  heading?: string;
  subheading?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  buttonContainerClass?: string;
  buttonWidth?: string;
  showButtons?: boolean;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  headingRightComponent?: ReactNode;
  loading?: boolean;
  drawerSize?: number;
}

function FlyoutLayout({
  isRightDrawerOpen,
  closeFlyout,
  onSave,
  children,
  heading,
  subheading,
  primaryBtnText = "Save Changes",
  secondaryBtnText = "Cancel",
  buttonContainerClass = "py-14 flex justify-end items-center gap-x-11",
  buttonWidth = "",
  showButtons = true,
  showPrimaryButton = true,
  showSecondaryButton = true,
  headingRightComponent,
  loading = false,
  drawerSize = 645,
}: FlyoutLayoutProps) {
  const sharedButtonClass = `px-4 py-[10px] rounded-lg text-sm font-medium text-center ${buttonWidth}`;

  return (
    <Drawer
      placement="right"
      open={isRightDrawerOpen}
      onClose={closeFlyout}
      className="p-12 overflow-y-auto"
      size={drawerSize}
    >
      <header className="pb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <button
              title="close_icon"
              onClick={closeFlyout}
              className="text-blue-500 hover:underline"
            >
              <XIcon color="#101828" />
            </button>
            <Typography className="font-semibold text-2xl">
              {heading}
            </Typography>
          </div>
          {headingRightComponent}
        </div>
        <Typography className="text-[#6F6F6F] text-sm">{subheading}</Typography>
      </header>

      {children}

      {showButtons && (
        <div className={buttonContainerClass}>
          {showSecondaryButton && (
            <button
              className={`${sharedButtonClass} bg-[#F8FAFB] border-2 border-[#D0D5DD66] text-[#344054] hover:bg-gray-100`}
              onClick={closeFlyout}
            >
              {secondaryBtnText}
            </button>
          )}
          {showPrimaryButton && (
            <Button
              className={`${sharedButtonClass} bg-[#003366] normal-case text-white hover:opacity-90`}
              onClick={onSave}
              loading={loading}
              disabled={loading}
            >
              {primaryBtnText}
            </Button>
          )}
        </div>
      )}
    </Drawer>
  );
}

export default FlyoutLayout;
