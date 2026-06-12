import { useState } from "react";
import { Typography, IconButton, Button } from "@material-tailwind/react";
import Image from "next/image";
import { Trash } from "@phosphor-icons/react";
import { DeleteModal } from "@/components/General/deleteModal";
import { VendorCart } from "@/types/shopper";
import defaultProductImage from "@/assets/images/prod1.jpeg";
import { useShopper } from "@/context/shopperContext";

interface VendorCartCardProps {
  vendorCart: VendorCart;
  updateActiveTabIndex: (value: number) => void;
  nextIndex: number;
  onSelectVendor: (vendorName: string) => void;
}

const VendorCartCard = ({
  vendorCart,
  updateActiveTabIndex,
  nextIndex,
  onSelectVendor,
}: VendorCartCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { removeVendorItems, isCartDeleting } = useShopper();

  const handleDelete = async () => {
    if (!vendorCart.vendor_id) return;
    await removeVendorItems(vendorCart.vendor_id, () => {
      setIsDeleteModalOpen(false);
    });
  };

  const openDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const calculateVendorTotal = () => {
    return vendorCart.cart_items.reduce((total, item) => {
      const price = parseFloat(item.product_price_per_piece) || 0;
      const quantity = item.quantity || 0;
      return total + price * quantity;
    }, 0);
  };

  const vendorTotal = calculateVendorTotal();
  const formattedTotal = vendorTotal.toFixed(2);

  const vendorThumbnail = vendorCart.vendor_logo || defaultProductImage;

  const handleViewItems = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectVendor(vendorCart.vendor_name);
    updateActiveTabIndex(nextIndex);
  };

  const displayedItems = Math.min(vendorCart.cart_items.length, 3);
  const hasMoreItems = vendorCart.cart_items.length > 3;

  const imageContainerWidth =
    20 + (displayedItems - 1) * 16 + (hasMoreItems ? 20 : 0);

  return (
    <>
      <div className="flex justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#EDEEF0] mb-3 sm:mb-4">
        <div className="flex gap-3 sm:gap-4">
          <div className="relative w-20 h-20 sm:w-[100px] sm:h-[100px]">
            <Image
              src={vendorThumbnail || ""}
              alt={`${vendorCart.vendor_name} thumbnail`}
              fill
              className="object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultProductImage.src;
              }}
            />
          </div>
          <div className="flex flex-col gap-y-1 sm:gap-y-2">
            <Typography className="text-[#6D7280] font-semibold whitespace-nowrap text-sm sm:text-base">
              {vendorCart.vendor_name}
            </Typography>
            <Typography className="text-[#B87C16] font-bold text-sm sm:text-base">
              GHS {formattedTotal}
            </Typography>
            <div className="flex items-center gap-x-3 sm:gap-x-5">
              <div
                className="relative flex h-5 sm:h-6"
                style={{ width: `${imageContainerWidth}px` }}
              >
                {vendorCart.cart_items.slice(0, 3).map((item, index) => (
                  <div
                    key={item.product_id}
                    className="absolute"
                    style={{
                      left: `${index * 16}px`,
                      zIndex: vendorCart.cart_items.length - index,
                    }}
                  >
                    <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                      <Image
                        src={item?.product_image || ""}
                        alt={item?.product_name || ""}
                        fill
                        className="rounded-full border-2 border-white shadow-md object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = defaultProductImage.src;
                        }}
                      />
                    </div>
                  </div>
                ))}
                {vendorCart.cart_items.length > 3 && (
                  <div
                    className="absolute bg-gray-200 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                    style={{ left: `${48}px` }}
                  >
                    <Typography className="text-[10px] sm:text-xs">
                      +{vendorCart.cart_items.length - 3}
                    </Typography>
                  </div>
                )}
              </div>
              <Typography className="text-xs md:flex hidden whitespace-nowrap">
                <span className="font-semibold">
                  {vendorCart.cart_items.length} items
                </span>{" "}
                added
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 items-end justify-between py-1 sm:py-2">
          <IconButton
            variant="text"
            onClick={openDeleteModal}
            className="hover:bg-red-50 p-2 sm:p-3"
            disabled={isCartDeleting}
          >
            <Trash size={20} color="#6D7280" />
          </IconButton>
          <Button
            className="normal-case bg-[#E0F0FF] text-xs sm:text-sm whitespace-nowrap text-pry2 shadow-md hover:bg-[#cce4ff] py-2 sm:py-3 px-3 sm:px-4"
            onClick={handleViewItems}
          >
            View items
          </Button>
        </div>
      </div>

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => !isCartDeleting && setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        header="Delete All Items?"
        message={`Are you sure you want to remove all items from ${vendorCart.vendor_name}?`}
        loading={isCartDeleting}
      />
    </>
  );
};

export default VendorCartCard;
