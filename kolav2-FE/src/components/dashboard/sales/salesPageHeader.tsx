import { DownloadIcon, NoteIcon } from "@/assets/svg";
import { UIGuard } from "@/components/guards/roleGuard";
import { colors } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import { useDashboardSelector } from "@/Redux/selectors";
import { Button, Typography } from "@material-tailwind/react";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SalesPageHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onClick: () => void;
  btnTexts: { label: string; count?: number }[];
  onDownload?: () => void;
}
const SalesPageHeader = ({
  activeIndex,
  setActiveIndex,
  onClick,
  btnTexts,
  onDownload,
}: SalesPageHeaderProps) => {
  const { activeBusiness } = useDashboardSelector();

  return (
    <div>
      <Typography>
        {activeBusiness?.business_name || "Kola Market Place"} /
        <span className="font-medium">{""}Sales</span>{" "}
      </Typography>
      <div className="flex flex-col md:flex-row my-4 md:justify-between lg:items-center gap-4">
        <Typography className="font-bold">Sales</Typography>
        <UIGuard permission="CREATE_SALE">
          <div className="flex items-center flex-wrap gap-4">
            <Button className="flex items-center justify-center normal-case gap-1 text-gray_4 bg-transparent font-normal shadow-none p-0 hover:shadow-none"
              onClick={onDownload}
            >
              <DownloadIcon />
              Download
            </Button>
            <Button
              className="flex items-center justify-center normal-case gap-1 text-gray_4 bg-transparent font-normal shadow-none p-0 hover:shadow-none"
              onClick={onClick}
            >
              <NoteIcon />
              Add New Sale
            </Button>
            <Link href={ROUTES.salesBulkUpload}>
              <Button className="flex items-center justify-center normal-case gap-1 text-sec bg-transparent font-normal shadow-none p-0 hover:shadow-none">
                <CirclePlus size={20} color={colors.sec} />
                Bulk Upload
              </Button>
            </Link>
          </div>
        </UIGuard>
      </div>
      <div className="flex gap-3 border-b-[1px] border-b-gray_2 -mx-4 px-4">
        {btnTexts?.map((btn, index) => {
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
                {btn.count !== undefined && (
                  <span className="bg-green-600 bg-opacity-10 rounded-full text-xs p-2 w-8 h-8 flex items-center justify-center text-green-600 font-semibold">
                    {btn.count}
                  </span>
                )}
              </Typography>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SalesPageHeader;
