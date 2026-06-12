import { AddIcon } from "@/assets/svg";
import { Typography } from "@material-tailwind/react";
import { ListIcon } from "lucide-react";
import React, { useState } from "react";
import SelectBusinessFlyout from "./selectBusinessFlyout";
import CreateBusinessFlyout from "./createBusinessFlyout";
import { UIGuard } from "@/components/guards/roleGuard";

interface AddCustomerFormProps {
  editData?: any;
  isEditMode?: boolean;
}

const AddCustomerForm = ({
  editData,
  isEditMode = false,
}: AddCustomerFormProps) => {
  const [isSelectBusinessOpen, setIsSelectBusinessOpen] = useState(false);
  const [isCreateBusinessOpen, setIsCreateBusinessOpen] = useState(isEditMode);

  const handleSelectBusinessClick = () => {
    setIsSelectBusinessOpen(true);
  };

  const handleCreateBusinessClick = () => {
    setIsCreateBusinessOpen(true);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <UIGuard permission="CREATE_CUSTOMER">
          <div
            onClick={handleSelectBusinessClick}
            className="flex flex-col gap-3 items-center justify-center p-8 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
          >
            <ListIcon />
            <Typography className="font-small text-[#003366] text-center">
              Select Business
            </Typography>
          </div>
        </UIGuard>
        <UIGuard permission="CREATE_BUSINESS">
          <div
            onClick={handleCreateBusinessClick}
            className="flex flex-col gap-3 items-center justify-center p-8 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
          >
            <AddIcon />
            <Typography className="font-small text-[#003366] text-center">
              Create New Business
            </Typography>
          </div>
        </UIGuard>
      </div>
      <SelectBusinessFlyout
        isRightDrawerOpen={isSelectBusinessOpen}
        closeFlyout={() => setIsSelectBusinessOpen(false)}
      />
      <CreateBusinessFlyout
        isRightDrawerOpen={isCreateBusinessOpen}
        closeFlyout={() => setIsCreateBusinessOpen(false)}
        editData={editData}
        isEditMode={isEditMode}
      />
    </>
  );
};

export default AddCustomerForm;
