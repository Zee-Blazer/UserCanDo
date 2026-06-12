import {TOrderFilter} from "@/types";

interface IFilterItemProps {
    title: string;
    value: TOrderFilter,
    orderFilter: TOrderFilter,
    setOrderFilter: (value: TOrderFilter) => void;
}

const FilterItem = ({ title, value, orderFilter, setOrderFilter }: IFilterItemProps) => {
    return (
        <button
            className={`flex flex-row justify-center items-center px-4 py-2 rounded-[8px] ${value === orderFilter ? "bg-blue_pry text-white font-[600]" : "bg-gray text-dark_gray font-[400]"} md:text-[16px] text-[14px]`}
            onClick={() => setOrderFilter(value)}
        >
            {title}
        </button>
    )
}

export default FilterItem;