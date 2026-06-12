import { COLORS } from "@/constants/colors";
import { Filter } from "lucide-react";

interface FilterDialogProps {
  onClick: () => void;
}

const FilterDialog: React.FC<FilterDialogProps> = ({ onClick }) => {
  return (
    <div className="relative border rounded-md py-2 border-gray_2 text-gray_4">
      <button
        onClick={onClick}
        className="px-4 left-0 flex gap-3 h-full top-0 items-center justify-center cursor-pointer"
      >
        <Filter size={20} color={COLORS.gray4} />
        Filter
      </button>
    </div>
  );
};

export default FilterDialog;
