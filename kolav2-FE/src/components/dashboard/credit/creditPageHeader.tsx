import { DownloadIcon } from "@/assets/svg";
import { colors } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import { useDashboardSelector } from "@/Redux/selectors";
import { Button, Typography } from "@material-tailwind/react";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreditPageHeader = ({
  openApplyCreditModal,
  openRecordPaymentFlyout,
  activeTabIndex,
  onDownload,
}: {
  openApplyCreditModal: () => void;
  openRecordPaymentFlyout: () => void;
  activeTabIndex: number;
  onDownload?: () => void;
}) => {
  const { activeBusiness } = useDashboardSelector();

  return (
    <div>
      <Typography>
        {activeBusiness?.business_name || "Kola Market Place"}/{" "}
        <span className="font-medium">Credit</span>{" "}
      </Typography>
      <div className="flex flex-col md:flex-row my-8 md:justify-between lg:items-center gap-4">
        <Typography className="font-bold">
          Credit{" "}
          <span className="font-normal text-gray_7">
            (Contains all your credit applications)
          </span>
        </Typography>
        <div className="flex items-center flex-wrap gap-8">
          <Button className="flex items-center justify-center normal-case gap-1 text-gray_4 bg-transparent font-normal shadow-none p-0 hover:shadow-none"
            onClick={onDownload}
          >
            <DownloadIcon />
            <Typography>Download</Typography>
          </Button>

          {activeTabIndex !== 2 ? (
            <Button
              className="flex items-center justify-center normal-case gap-1 text-sec bg-transparent font-normal shadow-none p-0 hover:shadow-none"
              onClick={openApplyCreditModal}
            >
              <CirclePlus size={20} color={colors.sec} />
              <Typography>Apply for Credit</Typography>
            </Button>
          ) : (
            <Button
              className="flex items-center justify-center normal-case gap-1 text-sec bg-transparent font-normal shadow-none p-0 hover:shadow-none"
              onClick={openRecordPaymentFlyout}
            >
              <CirclePlus size={20} color={colors.sec} />
              <Typography>Record Payment</Typography>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditPageHeader;
