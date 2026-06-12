import { Button, Typography } from "@material-tailwind/react";
import { CirclePlus } from "lucide-react";
import { DownloadSimple } from "@phosphor-icons/react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useDashboardSelector } from "@/Redux/selectors";

interface PurchasePageHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onDownload?: () => void;
}

const PurchasePageHeader = ({
  activeIndex,
  setActiveIndex,
  onDownload,
}: PurchasePageHeaderProps) => {
  const { allPurchaseOrder } = useDashboardSelector();

  const purchaseTabs = [
    { label: "New", count: allPurchaseOrder?.length || 0 },
    { label: "Finance approved", count: allPurchaseOrder?.length || 0 },
    { label: "CEO approved", count: allPurchaseOrder?.length || 0 },
  ];
  return (
    <div>
      <Typography variant="small" className="text-gray-600">
        Kola Market /{" "}
        <span className="font-medium text-black">Purchase Order</span>
      </Typography>

      <section className="flex flex-col md:flex-row my-4 md:justify-between lg:items-center gap-4">
        <Typography className="font-semibold text-[24px] text-[#101828]">
          Purchase Order
        </Typography>
        <div className="flex items-center flex-wrap gap-4">
          <Button className="flex items-center justify-center normal-case gap-1 text-[#6F6F6F] bg-transparent font-normal shadow-none p-0 hover:shadow-none"
            onClick={onDownload}
          >
            <DownloadSimple size={20} />
            Download
          </Button>
          <Link href={ROUTES.createPurchaseOrder}>
            <Button className="flex items-center justify-center normal-case gap-1 text-[#F5AA29] bg-transparent font-normal shadow-none p-0 hover:shadow-none">
              <CirclePlus size={20} />
              Create purchase order
            </Button>
          </Link>
        </div>
      </section>

      <div className="flex gap-4 mb-4 flex-wrap items-center border-b  border-gray-300">
        {purchaseTabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`z-10 px-3 py-1  text-sm font-medium border-b ${
              activeIndex === index
                ? "border-sec text-[#101828]"
                : "border-gray-300 text-[#6F6F6F]"
            }`}
          >
            {tab.label}{" "}
            <span className="bg-[#f9f9f9] rounded-lg p-1 mb-1 ml-1 text-xs text-gray-400">
              {tab?.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PurchasePageHeader;
