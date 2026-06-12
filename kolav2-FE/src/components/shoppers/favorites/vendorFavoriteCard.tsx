import { useState } from "react";
import { Typography, IconButton, Button } from "@material-tailwind/react";
import Image from "next/image";
import { Trash } from "@phosphor-icons/react";
import { DeleteModal } from "@/components/General/deleteModal";
import { VendorCart } from "@/types/shopper";
import defaultProductImage from "@/assets/images/prod1.jpeg";
import { useShopper } from "@/context/shopperContext";

interface VendorFavCardProps {
  vendorCart: VendorCart;
  updateActiveTabIndex: (value: number) => void;
  nextIndex: number;
  onSelectVendor: (vendorName: string) => void;
}

const VendorFavouriteCard = ({
  vendorCart,
  updateActiveTabIndex,
  nextIndex,
  onSelectVendor,
}: VendorFavCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { removeVendorFavouriteItems, isCartDeleting } = useShopper();

  const handleDelete = async () => {
    if (!vendorCart.vendor_id) return;
    await removeVendorFavouriteItems(vendorCart.vendor_id, () => {
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

  const handleViewItems = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectVendor(vendorCart.vendor_name);
    updateActiveTabIndex(nextIndex);
  };

  const displayedItems = Math.min(vendorCart.cart_items.length, 3);
  const hasMoreItems = vendorCart.cart_items.length > 3;

  const imageContainerWidth =
    24 + (displayedItems - 1) * 20 + (hasMoreItems ? 24 : 0);

  return (
    <>
      <div className="flex justify-between px-4 pb-4 border-b border-[#EDEEF0] mb-4">
        <div className="flex gap-5 items-start">
          <div className="relative w-[100px] h-[100px] flex-shrink-0">
            <Image
              src={vendorCart.vendor_logo || defaultProductImage}
              alt={`${vendorCart.vendor_name} thumbnail`}
              fill
              className="object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultProductImage.src;
              }}
            />
          </div>
          <div className="flex flex-col justify-between h-[100px] py-1">
            <Typography className="text-[#6D7280] font-semibold text-sm sm:text-base">
              {vendorCart.vendor_name}
            </Typography>
            <Typography className="text-[#B87C16] font-bold text-sm sm:text-base">
              GHS {formattedTotal}
            </Typography>
            <div className="flex items-center mt-auto gap-x-2">
              <div
                className="relative flex h-6"
                style={{ width: `${imageContainerWidth}px` }}
              >
                {vendorCart.cart_items.slice(0, 3).map((item, index) => (
                  <div
                    key={item.product_id}
                    className="absolute"
                    style={{
                      left: `${index * 20}px`,
                      zIndex: vendorCart.cart_items.length - index,
                    }}
                  >
                    <div className="relative w-6 h-6">
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
                    className="absolute bg-gray-200 w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                    style={{ left: `${(displayedItems - 1) * 20 + 24}px` }}
                  >
                    <Typography className="text-xs">
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
        <div className="flex flex-col items-end justify-between py-2">
          <IconButton
            variant="text"
            onClick={openDeleteModal}
            className="hover:bg-red-50 w-10 h-10"
            disabled={isCartDeleting}
          >
            <Trash size={20} color="#6D7280" />
          </IconButton>
          <Button
            className="normal-case bg-[#E0F0FF] text-pry2 shadow-md hover:bg-[#cce4ff] text-sm px-3 py-2"
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

export default VendorFavouriteCard;
