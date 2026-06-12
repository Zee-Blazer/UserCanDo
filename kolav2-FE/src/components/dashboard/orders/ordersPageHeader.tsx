import { ROUTES } from "@/constants/routes";
import { useDashboardSelector } from "@/Redux/selectors";
import { Download, PenSquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrdersPageHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onDownload?: () => void;
}

const OrdersPageHeader = ({
  activeIndex,
  setActiveIndex,
  onDownload,
}: OrdersPageHeaderProps) => {
  const router = useRouter();
  const selector = useDashboardSelector();

  const tabData = [
    { label: "Overview" },
    { label: "New", count: selector.pendingOrders?.length || 0 },
    { label: "Approved", count: selector.approvedOrders?.length || 0 },
    {
      label: "Out For delivery",
      count: selector.outForDeliveryOrders?.length || 0,
    },
    { label: "Delivered", count: selector.deliveredOrders?.length || 0 },
    { label: "Cancelled", count: selector.cancelledOrders?.length || 0 },
    { label: "All invoices", count: 0 },
  ];

  return (
    <div className="mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={onDownload || (() => console.log("Download clicked"))}
            className="flex items-center space-x-2 text-sm text-gray-600 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-transform"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
          <button
            onClick={() => router.push(ROUTES.placeOrder)}
            className="flex items-center space-x-2 text-sm text-gray-600 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-transform"
          >
            <PenSquare className="h-4 w-4" />
            <span>Record Order</span>
          </button>
        </div>
      </header>

      <div className="border-b border-gray-200">
        <div className="overflow-x-auto pb-1">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabData.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium focus:outline-none text-sm ${
                  activeIndex === index
                    ? "border-[#F5AA29] "
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={`ml-2 text-xs  px-2 py-0.5 rounded-full ${
                      activeIndex === index
                        ? "bg-[#E9E9EB] text-gray-700"
                        : "bg-[#E9E9EB] text-gray-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default OrdersPageHeader;
