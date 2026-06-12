import React from "react";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface SearchResultsProps {
  results: any;
  total: number;
  isVisible: boolean;
  onClose: () => void;
}

export const SearchResultsDropdown: React.FC<SearchResultsProps> = ({
  results,
  total,
  isVisible,
  onClose,
}) => {
  const router = useRouter();

  if (!isVisible || total === 0) return null;

  const handleResultClick = (type: string, item: any) => {
    const itemsPerPage = 10;
    const itemIndex =
      results[type]?.findIndex((result: any) => result.id === item.id) || 0;
    const page = Math.floor(itemIndex / itemsPerPage) + 1;

    switch (type) {
      case "customers":
        router.push(
          `${ROUTES.customers}?search=${encodeURIComponent(
            item.customer_name || item.name || ""
          )}&highlight=${item.id}&page=${page}`
        );
        break;
      case "businesses":
        router.push(
          `${ROUTES.businesses}?search=${encodeURIComponent(
            item.business_name || ""
          )}&highlight=${item.id}&page=${page}`
        );
        break;
      case "products":
        router.push(
          `${ROUTES.inventory}?search=${encodeURIComponent(
            item.product_name || ""
          )}&highlight=${item.id}&page=${page}`
        );
        break;
      case "orders":
        router.push(
          `${ROUTES.orders}?search=${encodeURIComponent(
            item.order_id || ""
          )}&highlight=${item.id}&page=${page}`
        );
        break;
    }
    onClose();
  };

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-3 border-b">
        <Typography className="text-sm text-gray-600">
          {total} results found
        </Typography>
      </div>

      {(Object.entries(results) as [string, any[]][]).map(
        ([category, items]) =>
          items.length > 0 && (
            <div key={category} className="p-3 border-b last:border-b-0">
              <Typography className="font-semibold text-sm mb-2 capitalize">
                {category}
              </Typography>
              {items.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-50 cursor-pointer rounded"
                  onClick={() => handleResultClick(category, item)}
                >
                  <Typography className="text-sm font-medium">
                    {item.customer_name ||
                      item.business_name ||
                      item.product_name ||
                      item.order_id ||
                      item.name}
                  </Typography>
                  <Typography className="text-xs text-gray-500">
                    {item.customer_phone ||
                      item.city ||
                      item.product_brand_name ||
                      item.product_category ||
                      item.phone}
                  </Typography>
                </div>
              ))}
              {items.length > 3 && (
                <Typography className="text-xs text-blue-500 mt-1">
                  +{items.length - 3} more
                </Typography>
              )}
            </div>
          )
      )}
    </div>
  );
};
