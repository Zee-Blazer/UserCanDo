import React from "react";
import { CancelIcon } from "@/assets/svg";
import { HorizontalDivider } from "@/components/General/divider";

interface Vendor {
  id: string;
  name: string;
  isOnline: boolean;
}

interface VendorMessagingSelectorProps {
  vendorsList: Vendor[];
  onSelectVendor: (vendor: Vendor) => void;
  onClose: () => void;
}

const VendorMessagingSelector = ({
  vendorsList,
  onSelectVendor,
  onClose,
}: VendorMessagingSelectorProps) => {
  return (
    <div className="w-full max-w-[840px] rounded-[24px] bg-white h-full drop-shadow-sm flex flex-col">
      <div className="w-full">
        <div className="flex flex-row items-center justify-between gap-3 px-5 py-4">
          <h2 className="text-black_0 font-[600]">
            Select a Vendor to Message
          </h2>
          <button
            title="cancel_icon"
            className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-gray_1"
            onClick={onClose}
          >
            <CancelIcon />
          </button>
        </div>
        <HorizontalDivider color="#F1F1F1" />
      </div>

      <div className="px-5 py-4 flex flex-col gap-4">
        {vendorsList.map((vendor) => (
          <div
            key={vendor.id}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelectVendor(vendor)}
          >
            <div className="flex items-center gap-3">
              <div className="h-[40px] w-[40px] rounded-full bg-gray flex items-center justify-center text-white font-bold">
                {vendor.name.charAt(0)}
              </div>
              <div>
                <p className="font-[600]">{vendor.name}</p>
                <p className="text-sm text-gray-500">Select to message</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorMessagingSelector;
