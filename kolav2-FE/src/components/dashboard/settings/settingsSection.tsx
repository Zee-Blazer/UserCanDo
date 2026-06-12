import React from "react";
import { Button, Card, CardBody, Collapse } from "@material-tailwind/react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface SettingsSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const SettingsSection = ({
  title,
  isOpen,
  onToggle,
  children,
}: SettingsSectionProps) => (
  <div className="my-8">
    <Button
      onClick={onToggle}
      variant="text"
      className="flex items-center justify-between w-full bg-[#F8FAFB] rounded-[0.625rem] py-6 px-12"
    >
      <span className="text-base text-[#101828] font-semibold capitalize">
        {title}
      </span>
      <div className="text-[#D5D8DC] p-1 rounded-full border border-[#D5D8DC]">
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5" />
        ) : (
          <ChevronDownIcon className="h-5 w-5" />
        )}
      </div>
    </Button>
    <Collapse open={isOpen}>
      <div>{children}</div>
    </Collapse>
  </div>
);

export default SettingsSection;
