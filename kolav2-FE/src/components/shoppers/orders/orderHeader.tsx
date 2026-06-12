import { TOrderFilter } from "@/types";
import { orderFilters } from "@/constants";
import FilterItem from "@/components/shoppers/orders/filterItem";

interface IOrderHeaderProps {
  orderFilter: TOrderFilter;
  setOrderFilter: (filter: TOrderFilter) => void;
  title: string;
}

const OrderHeader = ({
  orderFilter,
  setOrderFilter,
  title,
}: IOrderHeaderProps) => {
  return (
    <div
      className={
        "flex md:flex-row flex-col gap-3 md:justify-between items-center w-full"
      }
    >
      <h2 className={"text-[24px] font-[500]"}>{title}</h2>
      <div
        className={
          "flex flex-row flex-wrap justify-center items-center md:gap-2.5 gap-1.5"
        }
      >
        {Object.keys(orderFilters).map((filter, index) => (
          <FilterItem
            key={index}
            title={filter}
            value={orderFilters[filter]}
            orderFilter={orderFilter}
            setOrderFilter={setOrderFilter}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderHeader;
