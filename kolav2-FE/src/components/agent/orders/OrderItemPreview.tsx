import { Typography } from "@material-tailwind/react";
import { getInitials } from "@/utils/helpers";
import MenuDropdown from "@/components/General/menuDropdown";

interface OrderItemPreviewProps {
  business_name: string;
  order_date: string;
  products: number;
  status: string;
  onDelete: () => void;
  index: number;
  onClick: () => void;
}

const statusOptions = [
  "Awaiting Approval",
  "Approved",
  "Delivered",
  "Declined",
];

const OrderItemPreview = ({
  business_name,
  order_date,
  products,
  status,
  onDelete,
  index,
  onClick,
}: OrderItemPreviewProps) => {
  const statusIndex = statusOptions.indexOf(status);

  return (
    <div
      className="flex hover:bg-[#F2F4F7] transition-colors duration-200 py-2 px-1 rounded-lg justify-between items-center w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-[#CCD6E0] rounded-full text-center w-12 h-12 p-2">
        <Typography className="text-pry2 text-xl font-medium">
          {getInitials(business_name)}
        </Typography>
      </div>
      <div className="pl-4 flex justify-between items-end w-full">
        <div className="flex flex-col items-start w-full ">
          <Typography className="text-[#787486] font-Poppins font-medium">
            {business_name}
          </Typography>
          <div className="flex items-center justify-between">
            <Typography className="text-[#787486]">{order_date}</Typography>
            <div className="w-0.5 h-3/4 bg-[#787486] mx-4"></div>
            <Typography className="text-[#787486]">
              {`${products} product${products > 1 ? "s" : ""}`}
            </Typography>
          </div>
        </div>
        <div className="flex justify-between items-end w-full">
          <div
            className={`flex flex-row items-center justify-center  lg:w-30 px-2 py-1.5 rounded-md gap-2 ${
              statusIndex === 0
                ? "bg-[#6099FF1A] text-[#6099FF]"
                : statusIndex === 1
                ? "bg-[#2AB40E0D] text-[#2AB40E]"
                : statusIndex === 2
                ? "bg-[#AF0B960D] text-[#AF0B96]"
                : statusIndex === 3
                ? "bg-[#F84B1B0D] text-[#F84B1B]"
                : ""
            }`}
          >
            <p className=" self-center text-xs font-semibold font-poppins text-center align-center">
              {status}
            </p>
          </div>
          <MenuDropdown onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default OrderItemPreview;
