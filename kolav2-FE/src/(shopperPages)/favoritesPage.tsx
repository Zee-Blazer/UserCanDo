"use client";
import React, { useState, useEffect } from "react";
import NoFavorites from "@/components/shoppers/favorites/noFavorites";
import GeneralSavedItems from "@/components/shoppers/favorites/generalSavedItemsView";
import VendorFavoriteView from "@/components/shoppers/favorites/vendorFavoriteView";
import OrderSuccessful from "@/components/shoppers/cart/orderSuccessful";
import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import BrandFavoriteView from "@/components/shoppers/favorites/brandFavoriteView";
import FavoriteCheckoutView from "@/components/shoppers/favorites/favoriteCheckoutView";
import { Typography } from "@material-tailwind/react";

const FavoritesPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { favouriteItems } = useSelector((state: RootState) => state.shopper);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  useEffect(() => {
    if (favouriteItems?.length > 0) {
      setActiveTabIndex(1);
    } else {
      setActiveTabIndex(0);
    }
  }, [favouriteItems]);

  const updateActiveTabIndex = (value: number) => {
    setActiveTabIndex(value);
  };

  const handleSelectVendor = (vendorName: string) => {
    setSelectedVendor(vendorName);
    setSelectedBrand(null);
  };

  const handleSelectBrand = (brandName: string) => {
    setSelectedBrand(brandName);
    setSelectedVendor(null);
  };

  const selectedVendorItems = selectedVendor
    ? favouriteItems?.filter((vendor) => vendor.vendor_name === selectedVendor)
    : favouriteItems;

  const selectedBrandItems = selectedBrand
    ? favouriteItems
        ?.map((vendor) => ({
          ...vendor,
          cart_items: vendor.cart_items.filter(
            (item) =>
              item.product_brand_name?.trim().toLowerCase() ===
              selectedBrand?.trim().toLowerCase()
          ),
        }))
        ?.filter((vendor) => vendor.cart_items.length > 0)
    : favouriteItems;

  return (
    <main className="pb-10 min-h-screen">
      {activeTabIndex === 0 &&
        (!favouriteItems || favouriteItems.length === 0) && (
          <NoFavorites updateActiveTabIndex={updateActiveTabIndex} />
        )}
      {activeTabIndex === 1 && (
        <GeneralSavedItems
          updateActiveTabIndex={updateActiveTabIndex}
          favItems={favouriteItems}
          onSelectVendor={handleSelectVendor}
          onSelectBrand={handleSelectBrand}
        />
      )}
      {activeTabIndex === 2 && selectedBrand && (
        <BrandFavoriteView
          cartItems={selectedBrandItems}
          updateActiveTabIndex={updateActiveTabIndex}
          brandName={selectedBrand}
        />
      )}
      {activeTabIndex === 2 && selectedVendor && !selectedBrand && (
        <VendorFavoriteView
          cartItems={selectedVendorItems}
          updateActiveTabIndex={updateActiveTabIndex}
        />
      )}
      {activeTabIndex === 3 && (
        <FavoriteCheckoutView updateActiveTabIndex={updateActiveTabIndex} />
      )}
      {activeTabIndex === 4 && <OrderSuccessful />}
      {activeTabIndex === 2 && !selectedVendor && !selectedBrand && (
        <div className="text-center py-10">
          <Typography>No vendor or brand selected.</Typography>
        </div>
      )}
    </main>
  );
};

export default FavoritesPage;
