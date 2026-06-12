import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@material-tailwind/react";
import { useDashboardSelector } from "@/Redux/selectors";
import kola from "@/assets/images/km.png";

const BrandList = ({ onBrandSelect }: any) => {
  const [selectedBrands, setSelectedBrands] = useState<BrandProps[]>([]);
  const { brands = [] } = useDashboardSelector();

  const handleBrandSelect = (brand: BrandProps) => {
    const isSelected = selectedBrands.some(
      (b: BrandProps) => b.id === brand.id
    );
    let newSelectedBrands;

    if (isSelected) {
      newSelectedBrands = selectedBrands.filter((b) => b.id !== brand.id);
    } else {
      newSelectedBrands = [...selectedBrands, brand];
    }

    setSelectedBrands(newSelectedBrands);
    onBrandSelect?.(newSelectedBrands);
  };

  return (
    <div>
      <div className="mt-4">
        {brands.map((brand, index) => (
          <div key={brand.id}>
            <div
              className="flex items-center gap-4 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => handleBrandSelect(brand)}
            >
              {/* <Checkbox
                crossOrigin=""
                checked={selectedBrands.some((b) => b.id === brand.id)}
                onChange={() => handleBrandSelect(brand)}
                color="blue"
              /> */}
              <Image
                src={brand.logo || kola}
                alt={brand.brand_name}
                width={40}
                height={40}
                className="w-10 h-10 object-cover rounded"
              />
              <div>
                <p className="font-medium">{brand.brand_name}</p>
              </div>
            </div>
            {index < brands.length - 1 && <hr className="border-gray-200" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandList;
