import { MarkIcon, ConfirmIcon } from "@/assets/svg";
import { Typography } from "@material-tailwind/react";
import { Truck, Package, ShoppingCart } from "@phosphor-icons/react";

interface OrderStep {
  label: string;
  level: number;
  activeIcon: JSX.Element;
  inactiveIcon: JSX.Element;
}

interface OrderUpdateItemProps {
  status: string;
  timeStamps?: Record<string, string>;
}

const OrderUpdateItem: React.FC<OrderUpdateItemProps> = ({
  status,
  timeStamps,
}) => {
  const statusMap: Record<string, number> = {
    "Order Placed": 1,
    "All items confirmed": 2,
    "Order-in-transit": 3,
    "Order delivered": 4,
  };

  const statusLevel = statusMap[status] || 1;

  const orderSteps: OrderStep[] = [
    {
      level: 1,
      label: "Order Placed",
      activeIcon: <MarkIcon color="#007AF5" width="16" />,
      inactiveIcon: <MarkIcon color="#6D7280" width="16" />,
    },
    {
      level: 2,
      label: "All items confirmed",
      activeIcon: <MarkIcon color="#007AF5" width="16" />,
      inactiveIcon: <ShoppingCart color="#6D7280" size={16} />,
    },
    {
      level: 3,
      label: "Order-in-transit",
      activeIcon: <MarkIcon color="#007AF5" width="16" />,
      inactiveIcon: <Truck color="#6D7280" size={16} />,
    },
    {
      level: 4,
      label: "Order delivered",
      activeIcon: <MarkIcon color="#007AF5" width="16" />,
      inactiveIcon: <Package color="#6D7280" size={16} />,
    },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      {orderSteps.map((step, index) => {
        const isActive = step.level <= statusLevel;
        const isLastItem = index === orderSteps.length - 1;

        return (
          <div key={step.level} className="flex items-start gap-x-3">
            <div className="flex flex-col justify-center w-fit items-center">
              <div
                className={`p-2 rounded-full ${
                  isActive ? "bg-[#E0F0FF]" : "bg-[#F1F1F1]"
                } w-fit`}
              >
                {isActive ? step.activeIcon : step.inactiveIcon}
              </div>

              {!isLastItem && (
                <div className="w-[2px] h-10 bg-[#F1F1F1] self-center" />
              )}
            </div>

            <div>
              <Typography className="font-semibold text-sm text-[#0D121D]">
                {step.label}
              </Typography>
              <Typography className="text-xs text-[#474A4E]">
                {timeStamps ? timeStamps[step.label] : "Time not available"}
              </Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderUpdateItem;
