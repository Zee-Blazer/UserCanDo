"use client";
import React from "react";
import { Typography, Spinner } from "@material-tailwind/react";
import { Search } from "lucide-react";
import Link from "next/link";
import { BackIcon } from "@/assets/svg";
import { FormInput } from "@/components/General/form";
import Pagination from "../shopperLayout/pagination";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  title: string;
  backLink: string;
  products: Product[];
  isLoading: boolean;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  backLink,
  products,
  isLoading,
  totalItems,
  currentPage,
  onPageChange,
  onSearch,
  searchQuery = "",
}) => {
  const itemsPerPage = 10;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-6">
        <Link href={backLink} className="flex items-center gap-2">
          <BackIcon />
          <Typography className="font-semibold text-xl">{title}</Typography>
        </Link>
        <FormInput
          placeholder="Search..."
          icon={<Search color="#A6ADB6" />}
          iconPosition="left"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearch?.(e.target.value)
          }
          paddingY="3"
          className="w-96 shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] rounded-xl bg-white"
        />
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products?.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
        </>
      )}
    </div>
  );
};

export default ProductGrid;
