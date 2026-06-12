import { UIGuard } from "@/components/guards/roleGuard";
import { useDashboardSelector } from "@/Redux/selectors";
import { Button, Typography } from "@material-tailwind/react";
import { CirclePlus } from "lucide-react";
import React from "react";

interface BusinessHeaderProps {
  onClick: () => void;
}
const BusinessHeader = ({ onClick }: BusinessHeaderProps) => {
  const { activeBusiness } = useDashboardSelector();

  return (
    <div className="flex items-center justify-between">
      <Typography className="text-sm">
        Kola Market Place/{" "}
        {activeBusiness?.business_name || "Kola Market Place"}
      </Typography>
      <UIGuard permission="CREATE_BUSINESS">
        <Button
          className="flex items-center gap-2 normal-case bg-transparent text-sec shadow-none p-0"
          onClick={onClick}
        >
          <CirclePlus size={20} />
          <Typography className="text-sm">Add Business</Typography>
        </Button>
      </UIGuard>
    </div>
  );
};

export default BusinessHeader;
