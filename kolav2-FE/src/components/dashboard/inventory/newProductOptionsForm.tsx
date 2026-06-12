import { StockLibrary } from "@/assets/svg";
import SearchComp from "@/components/General/TanTable/searchComp";
import { Typography } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddProductStockFlyout from "./addProductStockFlyout";
import ManualNewProductFlyout from "./manualNewProductFlyout";
import ProductCategoryListFlyout from "./productCategoryListFlyout";
import BrandListFlyout from "./brandListFlyout";
import AddCategoryFlyout from "./addCategoryFlyout";
import AddBrandFlyout from "./addBrandFlyout";
import { UIGuard } from "@/components/guards/roleGuard";

const NewProductOptionForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isStockLibraryOpen, setIsStockLibraryOpen] = useState(false);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [isBrandListOpen, setIsBrandListOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);

  const handleStockClick = () => {
    setIsStockLibraryOpen(true);
  };

  const handleManualClick = () => {
    setIsManualOpen(true);
  };

  const handleBrandClick = () => {
    setIsBrandListOpen(true);
  };

  const handleCategoryClick = () => {
    setIsCategoryListOpen(true);
  };

  const handleAddCategoryClick = () => {
    setIsAddCategoryOpen(true);
  };

  const handleAddBrandClick = () => {
    setIsAddBrandOpen(true);
  };

  return (
    <>
      <div className="grid mb-4 grid-cols-2 gap-4">
        <div
          onClick={handleStockClick}
          className="flex flex-col gap-6 items-center justify-center p-5 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
        >
          <StockLibrary />
          <Typography className="font-small text-[#003366] text-center">
            Add from stock library
          </Typography>
        </div>
        <div
          onClick={handleManualClick}
          className="flex flex-col gap-3 items-center justify-center p-5 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
        >
          <Plus className="text-[#027A48]" />
          <Typography className="font-small text-[#003366] text-center">
            Add Manually
          </Typography>
        </div>
        <UIGuard permission="CREATE_BRANDS">
          <div
            onClick={handleBrandClick}
            className="flex flex-col gap-3 items-center justify-center p-5 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
          >
            <Plus className="text-[#027A48]" />
            <Typography className="font-small text-[#003366] text-center">
              Create Brands
            </Typography>
          </div>
        </UIGuard>
        <UIGuard permission="CREATE_CATEGORY">
          <div
            onClick={handleCategoryClick}
            className="flex flex-col gap-3 items-center justify-center p-5 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
          >
            <Plus className="text-[#027A48]" />
            <Typography className="font-small text-[#003366] text-center">
              Create New Category
            </Typography>
          </div>
        </UIGuard>
      </div>
      <SearchComp
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="search for business, wholesalers and sale agents..."
        maxWidth="w-full"
      />
      <AddProductStockFlyout
        isStockLibraryOpen={isStockLibraryOpen}
        closeFlyout={() => setIsStockLibraryOpen(false)}
      />
      <ManualNewProductFlyout
        isManualOpen={isManualOpen}
        closeFlyout={() => setIsManualOpen(false)}
      />
      <ProductCategoryListFlyout
        isCategoryListOpen={isCategoryListOpen}
        closeFlyout={() => setIsCategoryListOpen(false)}
        onAddCategoryClick={handleAddCategoryClick}
      />
      <AddCategoryFlyout
        isAddCategoryOpen={isAddCategoryOpen}
        closeFlyout={() => setIsAddCategoryOpen(false)}
      />
      <AddBrandFlyout
        isCreateBrandOpen={isAddBrandOpen}
        closeFlyout={() => setIsAddBrandOpen(false)}
      />
      <BrandListFlyout
        isBrandListOpen={isBrandListOpen}
        onAddBrandClick={handleAddBrandClick}
        closeFlyout={() => setIsBrandListOpen(false)}
      />
    </>
  );
};

export default NewProductOptionForm;
