import { BagIcon } from "@/assets/svg";
import { Typography } from "@material-tailwind/react";

interface SettingsPageHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}
const SettingsPageHeader = ({
  activeIndex,
  setActiveIndex,
}: SettingsPageHeaderProps) => {
  const btnTexts = [
    { label: "Personal Settings" },
    { label: "Business Settings" },
    { label: "Credit" },
  ];

  return (
    <div className="pt-8 px-12">
      <Typography className="text-xs text-[#6F6F6F]">
        Settings
        {btnTexts.map((text, index) => (
          <span key={index}>
            {" "}
            /
            <span
              className={`${
                activeIndex === index ? "text-[#101828] font-medium" : ""
              }`}
            >
              {" "}
              {text.label.split(" ")[0]}
            </span>
          </span>
        ))}
      </Typography>
      <div className="flex flex-col md:flex-row my-4 md:justify-between lg:items-center gap-4">
        <Typography className="text-base font-semibold text-[#101828]">
          {btnTexts[activeIndex].label.split(" ")[0]}
        </Typography>
        <div className="flex items-center flex-wrap gap-4">
          <button className="flex items-center justify-center gap-2 text-sm text-[#6F6F6F]">
            <BagIcon color="#6F6F6F" />
            All Businesses
          </button>
        </div>
      </div>
      <div className="flex gap-6 border-b-[1px] border-b-gray_2 -mx-12 px-12">
        {btnTexts.map((btn, index) => {
          return (
            <div
              key={index}
              className={`text-sm p-0 py-2 cursor-pointer ${
                activeIndex === index
                  ? "font-medium text-[#101828] border-b-[#DB8E0A]"
                  : "font-normal text-[#6F6F6F] border-b-transparent"
              } border-b-[1px] rounded-none`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="text-center">{btn.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsPageHeader;
