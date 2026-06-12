import { useDashboardSelector } from "@/Redux/selectors";
import { Button, Typography } from "@material-tailwind/react";

interface ProductTableProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const ProductTable = ({ activeIndex, setActiveIndex }: ProductTableProps) => {
  const { productCategories } = useDashboardSelector();

  const allCategories = [
    { label: "All" },
    ...productCategories?.map((cat) => ({ label: cat?.category_name })),
    { label: "Uncategorized" },
  ];

  return (
    <main className="w-full whitespace-nowrap">
      <div className="flex py-3 border-b-[1px] border-b-gray-200">
        {allCategories?.map((category, index) => (
          <Button
            key={index}
            className={`normal-case bg-transparent font-normal py-1 shadow-none px-2 hover:shadow-none ${
              activeIndex === index
                ? "text-white bg-[#FFC107] rounded-md"
                : "text-black bg-transparent"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Typography className="flex text-sm gap-4 items-center">
              {category.label}
            </Typography>
          </Button>
        ))}
      </div>
    </main>
  );
};

export default ProductTable;
