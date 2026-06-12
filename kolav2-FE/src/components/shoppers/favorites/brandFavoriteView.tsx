import {
  Typography,
  IconButton,
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { ArrowLeft, DotsThreeVertical, Trash } from "@phosphor-icons/react";
import { VendorCart, CartItem } from "@/types/shopper";
import FavoriteProductCard from "./favoriteProductCard";
import { useState } from "react";
import { TrashModal } from "@/components/General/trashModal";
import { useShopper } from "@/context/shopperContext";
import FavoriteSummary from "./favoriteSummary";
import DeleteModal from "./modal/deleteModal";

interface BrandFavViewProps {
  updateActiveTabIndex: (value: number) => void;
  cartItems: VendorCart[];
  brandName: string;
}

const BrandFavoriteView = ({
  updateActiveTabIndex,
  cartItems,
  brandName,
}: BrandFavViewProps) => {
  const [isShowSelect, setIsShowSelect] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

  const { removeFavoriteItem, isCartDeleting } = useShopper();

  const brandItems = cartItems.flatMap((vendor) => vendor.cart_items);

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
    if (brandItems.length > 0) {
      setSelectedItems([...brandItems]);
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
      <Typography className="font-sans text-2xl font-medium pb-10">
        Saved Items
      </Typography>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <IconButton variant="text" onClick={() => updateActiveTabIndex(1)}>
            <ArrowLeft size={20} />
          </IconButton>
          <Typography className="font-inter font-semibold text-xl">
            {brandItems.length} Items in cart
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
                >
                  <DotsThreeVertical size={24} />
                </IconButton>
              </PopoverHandler>
              <PopoverContent className="flex flex-col p-0">
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
      <hr className="pb-8" />
      <div className="w-full flex justify-between gap-x-4">
        <div className="lg:w-[48%]">
          {brandItems.map((item) => (
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
          <div className="flex mt-8 justify-end">
            {selectedItems.length > 0 && isShowSelect && (
              <Button
                size="sm"
                className="flex bg-[#F9FAFB] text-[#EF4444] text-sm font-semibold rounded-none py-3 normal-case shadow-none items-center gap-1 w-[60%]"
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

export default BrandFavoriteView;
