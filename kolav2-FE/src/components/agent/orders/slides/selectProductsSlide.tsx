import React, { useState, useEffect } from "react";
import { Check, ChevronLeft, MapPin } from "lucide-react";
import { useAgentSelector } from "@/Redux/selectors";
import { Button, Typography } from "@material-tailwind/react";
import Image, { StaticImageData } from "next/image";
import { getInitials } from "@/utils/helpers";
import SearchComp from "@/components/General/TanTable/searchComp";
import { useAgent } from "@/context/agentContext";
import { usePageData } from "@/api/hooks/usePageData";

interface Product {
  id: string;
  image: StaticImageData | string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  weight?: string;
}

const SelectProductsSlide = () => {
  const {
    nextOrderSaleSlide,
    prevOrderSaleSlide,
    goToOrderSaleSlide,
    shopperProfileSaleInputs,
    setShopperProfileSaleInputs,
  } = useAgent();

  const { loadAgentCustomersData, loadAgentProductsData } = useAgent();
  const { customers, products, supplierProducts } = useAgentSelector();

  usePageData([loadAgentCustomersData, loadAgentProductsData]);

  const customer = customers?.find(
    (c) => c.id === shopperProfileSaleInputs?.customer_id
  );

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (shopperProfileSaleInputs.products.length === 0) {
      setSelectedProducts([]);
      setSearchQuery("");
    }
  }, [shopperProfileSaleInputs.products]);

  const isMyStock = shopperProfileSaleInputs?.supplier_type === "my_stock";
  const currentProducts = isMyStock ? products : supplierProducts;

  const handleSelectProduct = (product: Product) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id);

    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));

      setShopperProfileSaleInputs((prevState) => ({
        ...prevState,
        products: prevState.products.filter((p) => p.product_id !== product.id),
      }));
    } else {
      setSelectedProducts([...selectedProducts, product]);

      const newProduct = {
        product_id: product.id,
        item_type: "pieces" as "case" | "pieces",
        quantity: product.quantity,
        unit_price: product.price,
        total_price: product.price * product.quantity,
        name: product.name,
        description: product.description,
        weight: product.weight,
        image: product.image,
      };

      setShopperProfileSaleInputs((prevState) => ({
        ...prevState,
        products: [...prevState.products, newProduct],
      }));
    }
  };

  const handleContinue = () => {
    nextOrderSaleSlide();
  };

  const handleBack = () => {
    // If it's "my_stock", go back to stock type selection (slide 3)
    // If it's "suppliers_stock", go back to supplier selection (slide 4)
    if (isMyStock) {
      goToOrderSaleSlide(3); // Go back to SelectOrderType
    } else {
      prevOrderSaleSlide(); // Go back to SelectSupplierType
    }
  };

  const filteredProducts =
    currentProducts?.filter(
      (product) =>
        product.product_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.product_category_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-medium">Select Products</p>
        <div className="flex gap-4 items-center">
          <span className="text-[#787486] text-sm">
            {selectedProducts.length} Items Selected
          </span>
          <SearchComp setSearchTerm={setSearchQuery} searchTerm={searchQuery} />
        </div>
      </div>

      <div
        className="flex items-center w-fit gap-2 cursor-pointer text-pry2 text-sm font-medium mb-4"
        onClick={handleBack}
      >
        <ChevronLeft size={18} />
        <span>Back</span>
      </div>

      <div className="flex items-center gap-4 p-3 mb-4 min-w-96 w-fit shadow-[0px_4px_8px_0px_#0000000F,0px_0px_4px_0px_#0000000A]">
        <div className="w-10 h-10 rounded-full bg-[#CCD6E0] text-pry2 font-bold flex items-center justify-center">
          {getInitials(customer?.customer_name || "")}
        </div>
        <div className="flex-grow text-[#787486]">
          <p className="font-medium">{customer?.customer_name}</p>
          <div className="text-sm flex gap-1">
            <MapPin size={16} />
            <p className="text-sm">{customer?.location}</p>
          </div>
        </div>
      </div>

      <div className="overflow-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 py-2.5">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 w-full max-w-[200px] mx-auto cursor-pointer"
              onClick={() =>
                handleSelectProduct({
                  id: item.id,
                  image: item.product_image,
                  name: item.product_name,
                  price: item.product_retail_price,
                  quantity: 1,
                  description: item.product_description,
                  weight: item.product_weight,
                })
              }
            >
              <div className="mb-3 py-2 bg-[#F9FAFB] relative">
                <div className="h-[120px] flex items-center justify-center">
                  <Image
                    src={item.product_image}
                    alt={item.product_name}
                    className="max-h-full max-w-full object-contain"
                    width={100}
                    height={100}
                  />
                  <button className="absolute top-2 right-2 bg-[#F2F2F2] rounded-full p-1.5">
                    {selectedProducts.some((p) => p.id === item.id) ? (
                      <div className="w-4 h-4 bg-[#14BA74] rounded-full flex items-center justify-center">
                        <Check size={12} color="#F2F2F2" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 border-2 border-[#8585856B] rounded-full"></div>
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-1 p-3">
                <Typography className="text-md font-bold text-center line-clamp-2">
                  {item?.product_name}
                </Typography>
                <Typography className="text-xs font-normal text-gray-700 line-clamp-1 text-center">
                  {item?.product_category_name}
                </Typography>
                <Typography className="text-xl font-semibold text-[#B87C16] text-center">
                  GHS {item?.product_retail_price}
                </Typography>
                <Typography className="text-sm text-gray-500 text-center">
                  {item?.product_stock_level} in stock
                </Typography>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 text-gray-300 mx-auto">📦</div>
            </div>
            <Typography variant="h6" className="text-gray-600 mb-2 font-medium">
              {searchQuery
                ? "No products found"
                : `No ${
                    isMyStock ? "business" : "supplier"
                  } products available`}
            </Typography>
            <Typography className="text-gray-500 text-sm max-w-md">
              {searchQuery
                ? `No products match "${searchQuery}". Try adjusting your search.`
                : `There are no ${
                    isMyStock ? "business" : "supplier"
                  } products available at the moment.`}
            </Typography>
          </div>
        )}
      </div>

      <div className="mt-8 w-3/6 mx-auto">
        <Button
          className="bg-blue_pry w-full normal-case mt-4"
          onClick={handleContinue}
          disabled={selectedProducts?.length === 0}
        >
          <Typography className="text-white font-normal">Continue</Typography>
        </Button>
      </div>
    </div>
  );
};

export default SelectProductsSlide;
