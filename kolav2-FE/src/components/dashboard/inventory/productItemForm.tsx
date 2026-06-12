import SearchComp from "@/components/General/TanTable/searchComp";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Checkbox } from "@material-tailwind/react";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import cart from "@/assets/images/cart.png";

interface Product {
  id: string;
  product_name: string;
  product_category_name: string;
  product_image: string;
}

interface ProductItemFormProps {
  onProductSelect: (products: Product[]) => void;
  activeBrandID: string;
}

const ProductItemForm = ({
  onProductSelect,
  activeBrandID,
}: ProductItemFormProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const { productsByBrand = [] } = useDashboardSelector();

  const { handleGetProductsByBrand, isProductsByBrandLoading } = useDash();

  useEffect(() => {
    handleGetProductsByBrand(activeBrandID, () => {});
  }, [activeBrandID]);

  const handleProductSelect = (product: Product) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id);
    let newSelectedProducts;

    if (isSelected) {
      newSelectedProducts = selectedProducts.filter((p) => p.id !== product.id);
    } else {
      newSelectedProducts = [...selectedProducts, product];
    }

    setSelectedProducts(newSelectedProducts);
    onProductSelect(newSelectedProducts);
  };

  const filteredProducts = productsByBrand.filter((product: Product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchComp
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="search for products..."
        maxWidth="w-full"
      />

      <div className="mt-4">
        {isProductsByBrandLoading ? (
          <p className="text-center py-4">Loading products...</p>
        ) : (
          filteredProducts.map((product, index) => (
            <div key={product.id}>
              <div
                className="flex items-center gap-4 py-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleProductSelect(product)}
              >
                <Checkbox
                  crossOrigin=""
                  checked={selectedProducts.some((p) => p.id === product.id)}
                  onChange={() => handleProductSelect(product)}
                  color="blue"
                />
                {/* <Image
                  src={product.product_image || cart}
                  alt={product.product_name}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover"
                /> */}
                <div>
                  <p className="font-medium">{product.product_name}</p>
                  <p className="text-sm text-gray-500">
                    {product.product_category_name}
                  </p>
                </div>
              </div>
              {index < filteredProducts.length - 1 && (
                <hr className="border-gray-200" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductItemForm;
