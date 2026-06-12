import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { AddCustomer, BlueBulkIcon } from "@/assets/svg";
import { useDashboardSelector } from "@/Redux/selectors";
import { UIGuard } from "@/components/guards/roleGuard";

interface CustomersPageHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onAddCustomer: () => void;
  onBulkUpload: () => void;
}

const CustomersPageHeader = ({
  activeIndex,
  setActiveIndex,
  onAddCustomer,
  onBulkUpload,
}: CustomersPageHeaderProps) => {
  const { activeBusiness } = useDashboardSelector();

  const btnTexts = [
    { label: "All" },
    { label: "Wholesaler" },
    { label: "Retailer" },
  ];

  return (
    <div className="px-4 py-3">
      <Typography variant="small" className="text-gray-600">
        {activeBusiness?.business_name || "Kola Market"} /{" "}
        <span className="font-medium">Customers</span>
      </Typography>

      <div className="flex flex-col md:flex-row my-3 md:justify-between lg:items-center gap-4">
        <Typography variant="h4" className="font-bold">
          Customers
        </Typography>

        <UIGuard permission="CREATE_CUSTOMER">
          <div className="flex items-center flex-wrap gap-4">
            <Button
              onClick={onAddCustomer}
              className="flex items-center justify-center normal-case gap-2 text-white bg-[#003366] font-normal shadow-none hover:shadow-none px-6 py-3"
            >
              <AddCustomer />
              Add Customer
            </Button>
            <Button
              onClick={onBulkUpload}
              className="flex items-center justify-center normal-case gap-2 text-[#003366] border-[#F8FAFB] border-[2px] bg-[#FAFAFB] font-normal shadow-none hover:shadow-none px-6 py-3"
            >
              <BlueBulkIcon />
              Bulk Upload
            </Button>
          </div>
        </UIGuard>
      </div>
      <div className="flex gap-3 border-b-[1px] border-b-gray_2 -mx-4 px-4">
        {btnTexts.map((btn, index) => {
          return (
            <Button
              key={index}
              className={`normal-case bg-transparent font-normal shadow-none p-0 py-2 hover:shadow-none ${
                activeIndex === index
                  ? "text-black border-b-sec"
                  : "text-gray_4 border-b-transparent"
              } border-b-[1px] rounded-none`}
              onClick={() => setActiveIndex(index)}
            >
              <Typography className="flex items-center gap-2">
                {btn.label}
              </Typography>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CustomersPageHeader;
