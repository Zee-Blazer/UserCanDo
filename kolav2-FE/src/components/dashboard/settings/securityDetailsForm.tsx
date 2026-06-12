import { LockIcon } from "@/assets/svg";
import { FormInput } from "@/components/General/form";
import Toggle from "@/components/General/toggle";
import { UIGuard } from "@/components/guards/roleGuard";
import { colors } from "@/constants/colors";
import { useDash } from "@/context/dashboardContext";
import { initialPinChangeData } from "@/utils/initialStates";
import { Button } from "@material-tailwind/react";
import { Eye, EyeOff, Pencil } from "lucide-react";
import { ChangeEvent, useState } from "react";

const SecurityDetailsForm = () => {
  const [visiblePins, setVisiblePins] = useState({
    currentPin: false,
    newPin: false,
    confirmPin: false,
  });

  const [pinData, setPinData] = useState<PinChangeProps>(initialPinChangeData);
  const [isEdit, setIsEdit] = useState(false);
  const { isPinUpdating, handleUpdatePin } = useDash();

  const handlePinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPinData({ ...pinData, [e.target.name]: e.target.value });
  };

  const togglePinVisibility = (field: keyof typeof visiblePins) => {
    setVisiblePins((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div>
      <div className="flex items-center gap-4 border border-y-[#D5D8DC] px-12 py-8 my-10">
        <div className="w-16 h-16 rounded-full flex items-center justify-center border border-[#D5D8DC]">
          <LockIcon color="#003366" />
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-sm text-[#101828] font-bold">Login alert</p>
          <p className="text-xs text-[#6F6F6F] max-w-80">
            Saved login info. We'll remember the login info for Kola Market, so
            you won't need to enter it again
          </p>
        </div>
        <Toggle
          checked={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            // onChange("loginAlert", e.target.checked)
            {}
          }
        />
      </div>
      <div className="border border-y-[#D5D8DC] px-12 py-8 my-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FormInput
            label="Current pin"
            type={visiblePins.currentPin ? "text" : "password"}
            placeholder="0000"
            icon={
              visiblePins.currentPin ? (
                <EyeOff color={colors.gray_5} size={15} />
              ) : (
                <Eye color={colors.gray_5} size={15} />
              )
            }
            iconPosition="right"
            iconClick={() => togglePinVisibility("currentPin")}
            onChange={handlePinInputChange}
            name="current_pin"
            readOnly={!isEdit}
            value={pinData.current_pin}
          />
          <FormInput
            label="New pin"
            type={visiblePins.newPin ? "text" : "password"}
            placeholder="1234"
            readOnly={!isEdit}
            icon={
              visiblePins.newPin ? (
                <EyeOff color={colors.gray_5} size={15} />
              ) : (
                <Eye color={colors.gray_5} size={15} />
              )
            }
            iconPosition="right"
            iconClick={() => togglePinVisibility("newPin")}
            onChange={handlePinInputChange}
            name="new_pin"
            value={pinData.new_pin}
          />
          <FormInput
            label="Confirm pin"
            type={visiblePins.confirmPin ? "text" : "password"}
            placeholder="1234"
            icon={
              visiblePins.confirmPin ? (
                <EyeOff color={colors.gray_5} size={15} />
              ) : (
                <Eye color={colors.gray_5} size={15} />
              )
            }
            readOnly={!isEdit}
            iconPosition="right"
            iconClick={() => togglePinVisibility("confirmPin")}
            onChange={handlePinInputChange}
            name="new_confirm_pin"
            value={pinData.new_confirm_pin}
          />
        </div>
        <UIGuard permission="CHANGE_PIN">
          <div className="flex gap-3 justify-end mt-8">
            {isEdit ? (
              <Button
                className="bg-[#F8FAFB] text-pry2 text-sm p-3 font-medium rounded-[0.3125rem] border border-[#D0D5DD66] shadow-[0px_1px_2px_0px_#1018280D] normal-case"
                onClick={() => {
                  handleUpdatePin(pinData);
                  setIsEdit(false);
                }}
                loading={isPinUpdating}
                disabled={isPinUpdating}
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsEdit(true);
                }}
                className="flex gap-3 bg-pry2 text-white text-sm p-3 font-medium rounded-[0.3125rem] normal-case"
                loading={isPinUpdating}
                disabled={isPinUpdating}
              >
                Edit Pin <Pencil size={18} />
              </Button>
            )}
          </div>
        </UIGuard>
      </div>
    </div>
  );
};

export default SecurityDetailsForm;