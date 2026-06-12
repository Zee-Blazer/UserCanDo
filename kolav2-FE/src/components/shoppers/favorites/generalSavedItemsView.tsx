import { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import VendorFavoriteCard from "./vendorFavoriteCard";
import FavoriteProductCard from "./favoriteProductCard";
import FavoriteSummary from "./favoriteSummary";
import { VendorCart } from "@/types";
import { useShopper } from "@/context/shopperContext";
import BrandFavoriteCard from "./brandsFavoriteCard";

interface GeneralFavViewProps {
  updateActiveTabIndex: (value: number) => void;
  favItems: VendorCart[];
  onSelectVendor: (vendorName: string) => void;
  onSelectBrand: (brandName: string) => void;
}

const GeneralSavedItems = ({
  updateActiveTabIndex,
  favItems,
  onSelectVendor,
  onSelectBrand,
}: GeneralFavViewProps) => {
  const groupButtons = ["Brands", "Products", "Businesses"];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(2);
  const { isFavoritesLoading } = useShopper();

  if (isFavoritesLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const totalItems = favItems.reduce(
    (total, vendor) => total + vendor.cart_items.length,
    0
  );

  const brandGroups = favItems
    .flatMap((vendor) => vendor.cart_items)
    .reduce((acc, item) => {
      const brand = item.product_brand_name;
      if (!acc[brand]) {
        acc[brand] = {
          brand_name: brand,
          brand_logo: item.brand_logo || null,
          cart_items: [],
        };
      }
      acc[brand].cart_items.push(item);
      return acc;
    }, {} as Record<string, { brand_name: string; brand_logo: string | null; cart_items: any[] }>);

  const brands = Object.values(brandGroups);

  const renderTabContent = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
            <div className="w-full lg:w-[48%]">
              {brands.map((brand, index) => (
                <BrandFavoriteCard
                  key={index}
                  brand={brand}
                  updateActiveTabIndex={updateActiveTabIndex}
                  nextIndex={2}
                  onSelectBrand={onSelectBrand}
                />
              ))}
            </div>
            <FavoriteSummary
              updateActiveTabIndex={updateActiveTabIndex}
              favoriteItems={favItems}
            />
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
            <div className="w-full lg:w-[48%]">
              {favItems
                .flatMap((vendor) => vendor.cart_items)
                .map((item) => (
                  <FavoriteProductCard
                    key={item.cart_item_id}
                    product={item}
                    showSelect={false}
                    isSelected={false}
                  />
                ))}
            </div>
            <FavoriteSummary
              updateActiveTabIndex={updateActiveTabIndex}
              favoriteItems={favItems}
            />
          </div>
        );
      case 2:
      default:
        return (
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
            <div className="w-full lg:w-[48%]">
              {favItems.map((vendorCart, index) => (
                <VendorFavoriteCard
                  key={index}
                  vendorCart={vendorCart}
                  updateActiveTabIndex={updateActiveTabIndex}
                  nextIndex={2}
                  onSelectVendor={onSelectVendor}
                />
              ))}
            </div>
            <FavoriteSummary
              updateActiveTabIndex={updateActiveTabIndex}
              favoriteItems={favItems}
            />
          </div>
        );
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Typography className="font-sans text-xl sm:text-2xl font-medium">
          Saved Items
        </Typography>
        <div className="flex flex-wrap gap-2">
          {groupButtons.map((button, index) => (
            <Button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`normal-case px-3 py-2 text-xs sm:text-sm rounded-md transition-all duration-200 cursor-pointer font-normal min-w-[80px]
                ${
                  selectedIndex === index
                    ? "bg-blue_pry text-white"
                    : "bg-[#F1F1F1] text-[#6D7280]"
                }`}
            >
              {button}
            </Button>
          ))}
        </div>
      </div>
      <Typography className="font-inter font-semibold text-lg sm:text-xl flex flex-wrap items-center gap-x-2 w-fit ps-4 pb-4">
        <span>
          {selectedIndex === 0 ? brands.length : favItems.length}{" "}
          {selectedIndex === 0 ? "brands" : "vendors"}
        </span>
        <span className="h-1/2 text-xs font-normal text-[#474A4E] mx-2">|</span>
        <span>{totalItems} items added</span>
      </Typography>
      <hr className="mb-8" />
      {renderTabContent()}
    </div>
  );
};

export default GeneralSavedItems;
