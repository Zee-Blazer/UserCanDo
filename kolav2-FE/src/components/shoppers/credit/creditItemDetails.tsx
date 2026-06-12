import { useState, useRef, useEffect } from "react";
import { Typography, IconButton, Button } from "@material-tailwind/react";
import OrderStatusTag from "../orders/orderStatusTag";
import {
  CaretRight,
  DotsThreeVertical,
  MapPin,
  ListDashes,
  ChatText,
} from "@phosphor-icons/react";
import CreditProductTab from "./creditProductTab";
import OrderUpdateItem from "./orderUpdateItem";

interface CreditItemDetailsProps {
  onPayCreditClick: () => void;
  onOpenPaymentHistoryClick: () => void;
}

const CreditItemDetails = ({
  onPayCreditClick,
  onOpenPaymentHistoryClick,
}: CreditItemDetailsProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border border-1 border-[#EDEEF0] py-6 px-10 rounded-lg relative">
      <div className="flex items-center justify-between">
        <Typography className="text-lg font-semibold font-inter">
          Order ID: #456-1237
        </Typography>

        <div className="relative" ref={menuRef}>
          <IconButton
            variant="text"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <DotsThreeVertical color="#6D7280" size={24} />
          </IconButton>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-[#EDEEF0] z-10">
              <Button
                variant="text"
                className="flex items-center gap-2 cursor-pointer  normal-case font-normal w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={onOpenPaymentHistoryClick}
              >
                <ListDashes size={16} />
                Repayment history
              </Button>
              <Button
                variant="text"
                className="flex items-center gap-2 cursor-pointer normal-case font-normal w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                <ChatText size={16} />
                Message supplier
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between py-6">
        <Typography className="text-sm font-bold text-[#474A4E] font-inter">
          Order Status
        </Typography>
        <OrderStatusTag status="Pending" />
      </div>

      <hr className="border border-1 border-[#D2D5DA] border-opacity-40 my-4" />

      {/* Store Details */}
      <div className="flex items-center justify-between mb-5">
        <Typography className="font-semibold text-sm font-inter">
          Medino-sobston stores
        </Typography>
        <Typography className="text-xs text-[#6D7280] font-inter">
          9:45 am; 2nd Oct.
        </Typography>
      </div>

      <div className="flex items-center justify-between gap-x-10 pb-5">
        <div className="flex gap-x-2 items-center">
          <MapPin size={16} />
          <Typography className="font-inter text-xs">
            16B, Beverley str., Achimota Golf club, Accra, Ghana
          </Typography>
        </div>
        <div className="bg-[#FEF2F2] border border-1 border-[#FECACA] py-1 px-2 rounded-full">
          <Typography className="text-[#EF4444] font-semibold text-xs whitespace-nowrap">
            12 days Overdue
          </Typography>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between pt-5">
          <Typography className="font-semibold text-sm text-[#474A4E]">
            Order Details
          </Typography>
          <Typography className="font-semibold text-sm text-[#474A4E]">
            4 items
          </Typography>
        </div>
        <hr className="border border-1 border-[#D2D5DA] border-opacity-40 my-4" />

        <CreditProductTab />
        <Button
          variant="text"
          className="text-blue_pry flex items-center gap-x-2 normal-case text-sm font-semibold mx-auto"
        >
          View all <CaretRight />
        </Button>

        <hr className="border border-1 border-[#D2D5DA] border-opacity-40 my-4" />

        <div className="flex items-center justify-between pb-2">
          <Typography className="font-semibold text-sm text-[#474A4E]">
            Total Cost
          </Typography>
          <Typography className="font-semibold text-[#B87C16]">
            GHS 235<span className="text-xs">.09</span>
          </Typography>
        </div>
        <div className="flex items-center justify-between pb-2">
          <Typography className="font-semibold text-sm text-[#474A4E]">
            Amount Due
          </Typography>
          <Typography className="font-semibold text-[#FF3A44]">
            GHS 175<span className="text-xs">.09</span>
          </Typography>
        </div>

        <Button
          className="bg-blue_pry w-full normal-case mt-6"
          onClick={onPayCreditClick}
        >
          <Typography className="font-semibold">Pay Credit Due</Typography>
        </Button>
      </div>

      <div>
        <Typography className="pt-8 font-semibold text-sm">
          Order Update
        </Typography>
        <hr className="border border-1 border-[#D2D5DA] border-opacity-40 my-4" />
        <OrderUpdateItem status="All items confirmed" />
      </div>
    </div>
  );
};

export default CreditItemDetails;
