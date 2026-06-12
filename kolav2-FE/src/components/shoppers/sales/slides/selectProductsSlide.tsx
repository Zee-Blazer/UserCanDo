import React, { useEffect, useState } from "react";
import {
  Check,
  ChevronLeft,
  MapPin,
  Plus,
  PlusCircle,
  Search,
} from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useDashboardSelector } from "@/Redux/selectors";
import cat4 from "@/assets/images/cat4.png";
import { Button, Typography } from "@material-tailwind/react";
import Image, { StaticImageData } from "next/image";
import { getInitials } from "@/utils/helpers";
import SearchComp from "@/components/General/TanTable/searchComp";
import { useDash } from "@/context/dashboardContext";

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
    prevSlide,
    nextShopperSaleSlide,
    shopperProfileSaleInputs,
    setShopperProfileSaleInputs,
  } = useAuth();
  const { loadCustomersData } = useDash();
  const { customers } = useDashboardSelector();
  const customer = customers?.find(
    (c) => c.id === shopperProfileSaleInputs?.customer_id
  );

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock products data with additional fields needed for cart
  const products: Product[] = Array(12)
    .fill(null)
    .map((_, index) => ({
      id: `product-${index}`,
      image: cat4,
      name: "Dove body lotion",
      price: 300,
      quantity: 1,
      description: index % 2 === 0 ? "Body moisturizer" : "Skin care lotion",
      weight: "250ml",
    }));

  const handleSelectProduct = (product: Product) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id);

    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));

      // Also remove from shopperProfileSaleInputs
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    loadCustomersData();
  }, [loadCustomersData]);

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
        onClick={prevSlide}
      >
        <ChevronLeft size={18} />
        <span>Back</span>
      </div>
      <div className="flex items-center gap-4 p-3 mb-2 min-w-96 w-fit shadow-[0px_4px_8px_0px_#0000000F,0px_0px_4px_0px_#0000000A]">
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

      <div className="overflow-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 mb-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-lg overflow-hidden bg-white cursor-pointer shadow-[0px_4.33px_25.99px_0px_#68686F1A]"
            onClick={() => handleSelectProduct(product)}
          >
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-28 object-cover"
              />
              <button className="absolute top-2 right-2 bg-[#F2F2F2] rounded-full p-1.5">
                {selectedProducts.some((p) => p.id === product.id) ? (
                  <div className="w-4 h-4 bg-[#14BA74] rounded-full flex items-center justify-center">
                    <Check size={12} color="#F2F2F2" />
                  </div>
                ) : (
                  <div className="w-4 h-4 border-2 border-[#8585856B] rounded-full"></div>
                )}
              </button>
            </div>
            <div className="px-3 py-5 space-y-3">
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-sm font-medium text-[#6169F3]">
                GHS {product.price}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#848688]">
                  {product.quantity} pcs
                </span>
                {selectedProducts.some((p) => p.id === product.id) && (
                  <button
                    title="add_quantity"
                    className="border-2  rounded-full size-6 flex items-center justify-center"
                  >
                    <Plus size={16} color="#667085" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button
          className="bg-blue_pry w-full normal-case mt-4"
          onClick={nextShopperSaleSlide}
          disabled={selectedProducts.length === 0}
        >
          <Typography className="text-white font-normal">Continue</Typography>
        </Button>
      </div>
    </div>
  );
};

export default SelectProductsSlide;
