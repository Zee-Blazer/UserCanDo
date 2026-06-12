import { COLORS } from "@/constants/colors";
import { Check } from "lucide-react";
import { iCheckForm } from "./formTypes";

const FormCheckbox = ({ label, checked, setChecked, callback }: iCheckForm) => {
  return (
    <div
      className="flex items-center text-sm select-none cursor-pointer"
      onClick={() => {
        setChecked(!checked);
        callback && callback();
      }}
    >
      {checked ? (
        <span
          className={`w-5 h-5 border-[1px] border-pry rounded-[4px] flex items-center justify-center pointer-events-none`}
        >
          <Check color={COLORS.primary} />
        </span>
      ) : (
        <div className="w-5 h-5 border-pry_1 border-[1px] rounded-[4px] border-pry" />
      )}
      {label && <label className="ml-2">{label}</label>}
    </div>
  );
};

export default FormCheckbox;
