import { FormSelect } from "@/components/General/form";
import { Textarea, Typography } from "@material-tailwind/react";
import { RefreshCw } from "lucide-react";
import React, { useState, ChangeEvent } from "react";
import ProductItemsFlyout from "./productItemsFlyout";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";

const AddProductStockForm = ({
  onProductSelect,
}: {
  onProductSelect: (products: Product[]) => void;
}) => {
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBrandID, setSelectedBrandID] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const { brands } = useDashboardSelector();
  const { handleCreateProduct, isProductCreating } = useDash();

  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setSelectedBrandID(getBrandIDFromName(e.target.value));
    setIsRightDrawerOpen(true);
  };

  const handleReset = () => {
    setSelectedBrand("");
    setSelectedProducts([]);
  };

  const handleProductSelect = (products: Product[]) => {
    setSelectedProducts(products);
    onProductSelect(products);
  };

  const getBrandIDFromName = (name: string) => {
    const found = brands.find((brand) => brand.brand_name === name);
    if (found) {
      return found?.id;
    } else return "not_found";
  };

  const selectedProductsText = selectedProducts
    .map(
      (product) => `${product.product_name} - ${product.product_category_name}`
    )
    .join("\n");

  return (
    <main>
      <h6 className="font-medium mb-2">
        Select products by brand from Stock Library to add to the inventory.
      </h6>
      <Typography variant="small" className="text-[#6F6F6F] text-sm">
        Note: Product wholesale and retail price will need to be manually
        updated from their defaults.
      </Typography>
      <div className="grid md:grid-cols-[auto_1fr] mt-5 grid-cols-1 gap-y-8 gap-x-14 items-start">
        <label className="text-sm font-medium text-[#101828]">
          Select Brand
        </label>
        <div className="grid grid-cols-[70%_auto] w-full items-center gap-4">
          <FormSelect
            options={brands.map((brand) => brand.brand_name)}
            className="rounded-none w-full"
            paddingY="2"
            onChange={handleBrandChange}
            value={selectedBrand}
          />
          <button
            onClick={handleReset}
            className="flex items-center hover:text-red-700 transition-colors h-8"
            aria-label="Reset brand selection"
          >
            <RefreshCw size={15} />
          </button>
        </div>
        <label className="text-sm font-medium text-black">
          Selected Products
        </label>
        <Textarea
          disabled
          value={selectedProductsText}
          className="w-full border-none bg-[#F2F2F2] min-h-[130px]"
        />
      </div>
      <ProductItemsFlyout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={() => {
          setIsRightDrawerOpen(false);
        }}
        onComplete={
          () => setIsRightDrawerOpen(false)
          // handleCreateProduct(selectedProducts, null, () => {
          //   setIsRightDrawerOpen(false);
          // });
        }
        selectedBrand={selectedBrand}
        onProductSelect={handleProductSelect}
        activeBrandID={selectedBrandID}
      />
    </main>
  );
};

export default AddProductStockForm;
