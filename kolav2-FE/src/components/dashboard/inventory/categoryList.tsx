import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@material-tailwind/react";
import { useDashboardSelector } from "@/Redux/selectors";
import kola from "@/assets/images/km.png";

interface CategoryListProps {
  closeFlyout: () => void;
  onCategorySelect?: (categories: ProductCategoryProps[]) => void;
}

const CategoryList = ({ closeFlyout, onCategorySelect }: CategoryListProps) => {
  const [selectedCategories, setSelectedCategories] = useState<
    ProductCategoryProps[]
  >([]);
  const { productCategories = [] } = useDashboardSelector();

  const handleCategorySelect = (category: ProductCategoryProps) => {
    const isSelected = selectedCategories.some((c) => c.id === category.id);
    let newSelectedCategories;

    if (isSelected) {
      newSelectedCategories = selectedCategories.filter(
        (c) => c.id !== category.id
      );
    } else {
      newSelectedCategories = [...selectedCategories, category];
    }

    setSelectedCategories(newSelectedCategories);
    onCategorySelect?.(newSelectedCategories);
  };

  return (
    <div>
      <div className="mt-4">
        {productCategories.map((category, index) => (
          <div key={category.id}>
            <div
              className="flex items-center gap-4 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => handleCategorySelect(category)}
            >
              {/* <Checkbox
                crossOrigin=""
                checked={selectedCategories.some((c) => c.id === category.id)}
                onChange={() => handleCategorySelect(category)}
                color="blue"
              /> */}
              <Image
                src={category.image_url || kola}
                alt={category.category_name}
                width={40}
                height={40}
                className="w-10 h-10 object-cover rounded"
              />
              <div>
                <p className="font-medium">{category.category_name}</p>
              </div>
            </div>
            {index < productCategories.length - 1 && (
              <hr className="border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
