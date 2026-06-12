import {
  Typography,
  IconButton,
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { ArrowLeft, DotsThreeVertical } from "@phosphor-icons/react";
import { VendorCart, CartItem } from "@/types/shopper";
import FavoriteProductCard from "./favoriteProductCard";
import { useState } from "react";
import { useShopper } from "@/context/shopperContext";
import DeleteModal from "./modal/deleteModal";
import FavoriteSummary from "./favoriteSummary";

interface VendorFavViewProps {
  updateActiveTabIndex: (value: number) => void;
  cartItems: VendorCart[];
}

const VendorFavoriteView = ({
  updateActiveTabIndex,
  cartItems,
}: VendorFavViewProps) => {
  const vendor = cartItems[0];
  const [isShowSelect, setIsShowSelect] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const { removeFavoriteItem, isCartDeleting } = useShopper();

  const toggleItemSelection = (item: CartItem) => {
    const isItemSelected = selectedItems.some(
      (selectedItem) => selectedItem.cart_item_id === item.cart_item_id
    );

    if (isItemSelected) {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.cart_item_id !== item.cart_item_id
        )
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const selectAllItems = () => {
    if (vendor?.cart_items.length > 0) {
      setSelectedItems([...vendor.cart_items]);
    }
    setOpenPopover(false);
  };

  const handleDeleteSelected = async () => {
    try {
      for (const item of selectedItems) {
        await removeFavoriteItem(item.cart_item_id);
      }
      setIsDeleteDialogOpen(false);
      setIsShowSelect(false);
      setSelectedItems([]);
    } catch (error) {
      console.error("Failed to delete items:", error);
    }
  };

  return (
    <div>
      <Typography className="font-sans text-xl sm:text-2xl font-medium pb-6 sm:pb-8 md:pb-10">
        Saved Items
      </Typography>
      <div className="flex flex-row items-start justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-x-2">
          <IconButton
            variant="text"
            onClick={() => updateActiveTabIndex(1)}
            className="w-10 h-10"
          >
            <ArrowLeft size={20} />
          </IconButton>
          <Typography className="font-inter font-semibold text-lg sm:text-xl">
            {vendor?.cart_items.length} Items in cart
          </Typography>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Popover
              open={openPopover}
              handler={() => setOpenPopover(!openPopover)}
              placement="bottom-end"
            >
              <PopoverHandler>
                <IconButton
                  variant="text"
                  onClick={() => setOpenPopover(!openPopover)}
                  className="w-10 h-10"
                >
                  <DotsThreeVertical size={24} />
                </IconButton>
              </PopoverHandler>
              <PopoverContent className="flex flex-col p-0 w-40">
                <div className="w-full px-3 py-2 hover:bg-gray-100">
                  <label className="flex items-center gap-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={() => {
                        setIsShowSelect(true);
                        setOpenPopover(false);
                      }}
                      className="h-4 w-4 bg-[#F5AA29] cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">Select item</span>
                  </label>
                </div>
                <div className="w-full px-3 py-2 hover:bg-gray-100">
                  <label className="flex items-center gap-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={() => {
                        setIsShowSelect(true);
                        selectAllItems();
                      }}
                      className="h-4 w-4 bg-[#F5AA29] cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">Select all</span>
                  </label>
                </div>
                {isShowSelect && (
                  <div className="w-full px-3 py-2 hover:bg-gray-100">
                    <Button
                      className="w-full text-left text-sm text-gray-700 flex items-center gap-x-2 normal-case font-normal border-none shadow-none"
                      onClick={() => {
                        setIsShowSelect(false);
                        setSelectedItems([]);
                        setOpenPopover(false);
                      }}
                    >
                      Cancel selection
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <hr className="my-6 sm:my-8" />
      <div className="w-full flex flex-col md:flex-row md:justify-between gap-6">
        <div className="w-full md:w-[48%]">
          {vendor?.cart_items.map((item) => (
            <FavoriteProductCard
              showSelect={isShowSelect}
              key={item.cart_item_id}
              product={item}
              isSelected={selectedItems.some(
                (selectedItem) =>
                  selectedItem.cart_item_id === item.cart_item_id
              )}
              onToggleSelect={() => toggleItemSelection(item)}
            />
          ))}
          <div className="flex mt-6 sm:mt-8 justify-end">
            {selectedItems.length > 0 && isShowSelect && (
              <Button
                size="sm"
                className="flex bg-[#F9FAFB] text-[#EF4444] text-sm font-semibold rounded-none py-3 normal-case shadow-none items-center gap-1 w-full sm:w-[60%]"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <span className="text-[#0D121D] mr-2 font-medium">
                  ({selectedItems.length}) item selected
                </span>{" "}
                Delete Item(s)
              </Button>
            )}
          </div>
        </div>
        <FavoriteSummary
          updateActiveTabIndex={updateActiveTabIndex}
          favoriteItems={cartItems}
        />
      </div>

      <DeleteModal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        selectedItem={selectedItems}
        loading={isCartDeleting}
        onDelete={handleDeleteSelected}
      />
    </div>
  );
};

export default VendorFavoriteView;
