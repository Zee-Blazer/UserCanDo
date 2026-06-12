import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import crunch from "@/assets/images/crunch.png";
import { StaticImageData } from "next/image";
import { TrashModal } from "./modal/trashModal";
import { ProductCard } from "./productCard";

interface FoodProps {
  addNewStock: () => void;
}

interface Product {
  id: number;
  image: string | StaticImageData;
  productName: string;
  productVariant: string;
  productType: string;
  price: number;
  quantity: number;
  weight: number;
}

const Food: React.FC<FoodProps> = ({ addNewStock }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      image: crunch,
      productName: "Catalina Crunch",
      productVariant: "Peanut Butter",
      productType: "Sandwich Cookies",
      price: 109.99,
      quantity: 86,
      weight: 4,
    },
    {
      id: 2,
      image: crunch,
      productName: "Nature Valley",
      productVariant: "Honey Oat",
      productType: "Granola Bars",
      price: 79.5,
      quantity: 64,
      weight: 2.5,
    },
    {
      id: 3,
      image: crunch,
      productName: "Oreo",
      productVariant: "Double Stuff",
      productType: "Chocolate Cookies",
      price: 59.75,
      quantity: 120,
      weight: 3,
    },
    {
      id: 4,
      image: crunch,
      productName: "Lays",
      productVariant: "Classic",
      productType: "Potato Chips",
      price: 44.99,
      quantity: 32,
      weight: 1.5,
    },
  ]);

  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const totalItems = products.length;

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
    }
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <main className="px-4 md:px-0">
      <section className="flex flex-col md:flex-row md:gap-14 gap-6 mt-8 justify-center">
        <div className="flex flex-col w-full md:w-auto">
          <div className="flex px-6 md:px-10 rounded-xl py-6 gap-2 text-center bg-[#feebe9] flex-col">
            <Typography variant="h5" className="font-semibold">
              GHS {totalValue.toFixed(2)}
            </Typography>
            <Typography className="text-[#898b8e]">
              Total value In Stock
            </Typography>
          </div>
          <span className="mt-6 md:mt-8 text-[#898b8e]">
            Available in stock
          </span>
        </div>

        <div className="flex flex-col w-full md:w-auto">
          <div className="flex px-6 md:px-10 py-6 text-center gap-2 rounded-xl flex-col bg-[#e4f3ed]">
            <Typography variant="h5" className="font-semibold">
              {totalItems}
            </Typography>
            <Typography className="text-[#898b8e]">Number of Items</Typography>
          </div>
          <button
            onClick={addNewStock}
            className="mt-6 md:mt-8 flex justify-end"
          >
            <span className="text-[#003366]">Add New Stock</span>
          </button>
        </div>
      </section>

      <section className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            productName={product.productName}
            productVariant={product.productVariant}
            productType={product.productType}
            price={product.price}
            quantity={product.quantity}
            weight={product.weight}
            onClose={() => handleDeleteClick(product)}
            id={product.id}
          />
        ))}
      </section>

      <TrashModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
};

export default Food;
