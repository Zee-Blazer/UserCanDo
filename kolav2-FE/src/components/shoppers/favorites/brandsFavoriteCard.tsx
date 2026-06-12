import { Typography, Button } from "@material-tailwind/react";
import Image from "next/image";
import defaultProductImage from "@/assets/images/prod1.jpeg";

interface Brand {
  brand_name: string;
  brand_logo: string | null;
  cart_items: any[];
}

interface BrandFavCardProps {
  brand: Brand;
  updateActiveTabIndex: (value: number) => void;
  nextIndex: number;
  onSelectBrand: (brandName: string) => void;
}

const BrandFavoriteCard = ({
  brand,
  updateActiveTabIndex,
  nextIndex,
  onSelectBrand,
}: BrandFavCardProps) => {
  const calculateBrandTotal = () => {
    return brand.cart_items.reduce((total, item) => {
      const price = parseFloat(item.product_price_per_piece) || 0;
      const quantity = item.quantity || 0;
      return total + price * quantity;
    }, 0);
  };

  const brandTotal = calculateBrandTotal();
  const formattedTotal = brandTotal.toFixed(2);

  const handleViewItems = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!brand.brand_name) return;
    onSelectBrand(brand.brand_name);
    updateActiveTabIndex(nextIndex);
  };

  const displayedItems = Math.min(brand.cart_items.length, 3);
  const hasMoreItems = brand.cart_items.length > 3;

  const imageContainerWidth =
    24 + (displayedItems - 1) * 20 + (hasMoreItems ? 24 : 0);

  return (
    <>
      <div className="flex justify-between px-4 pb-4 border-b border-[#EDEEF0] mb-4">
        <div className="flex gap-5 items-start">
          <div className="relative w-[100px] h-[100px] flex-shrink-0">
            <Image
              src={brand.brand_logo || defaultProductImage}
              alt={`${brand.brand_name || "Unknown Brand"} thumbnail`}
              fill
              className="object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultProductImage.src;
              }}
            />
          </div>
          <div className="flex flex-col justify-between h-[100px] py-1">
            <Typography className="text-[#6D7280] font-semibold">
              {brand.brand_name || "Unknown Brand"}
            </Typography>
            <Typography className="text-[#B87C16] font-bold">
              GHS {formattedTotal}
            </Typography>
            <div className="flex items-center mt-auto gap-x-2">
              <div
                className="relative flex h-6"
                style={{ width: `${imageContainerWidth}px` }}
              >
                {brand.cart_items.slice(0, 3).map((item, index) => (
                  <div
                    key={item.product_id}
                    className="absolute"
                    style={{
                      left: `${index * 20}px`,
                      zIndex: brand.cart_items.length - index,
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
                {brand.cart_items.length > 3 && (
                  <div
                    className="absolute bg-gray-200 w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                    style={{ left: `${(displayedItems - 1) * 20 + 24}px` }}
                  >
                    <Typography className="text-xs">
                      +{brand.cart_items.length - 3}
                    </Typography>
                  </div>
                )}
              </div>
              <Typography className="text-xs md:flex hidden whitespace-nowrap">
                <span className="font-semibold">
                  {brand.cart_items.length} items
                </span>{" "}
                added
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex items-end mt-auto py-2">
          <Button
            className="normal-case bg-[#E0F0FF] text-pry2 shadow-md hover:bg-[#cce4ff] text-sm px-3 py-2"
            onClick={handleViewItems}
            disabled={!brand.brand_name}
          >
            View items
          </Button>
        </div>
      </div>
    </>
  );
};

export default BrandFavoriteCard;
