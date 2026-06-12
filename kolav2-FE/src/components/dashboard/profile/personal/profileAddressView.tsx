import { ChevronLeft } from "lucide-react";
import { PlusCircle, DotsThree, ChatText, X } from "@phosphor-icons/react";
import { Typography, IconButton, Button } from "@material-tailwind/react";
import { useState, useRef, useEffect, MouseEvent } from "react";

interface ProfileAddressPageProps {
  onBackClick: () => void;
  onAddClick: () => void;
  onUpdateClick: () => void;
}

const ProfileAddressView = ({
  onBackClick,
  onAddClick,
  onUpdateClick,
}: ProfileAddressPageProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent<Document>) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, []);
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBackClick}
          className="flex items-center gap-2 cursor-pointer text-pry2 text-sm font-medium bg-transparent shadow-none hover:bg-gray-100 normal-case"
        >
          <ChevronLeft size={18} />
          <span>Back</span>
        </Button>
        <Typography className="text-lg font-inter font-medium text-[#5A5555]">
          Address
        </Typography>
        <Button
          className="flex items-center gap-x-1 normal-case shadow-none"
          onClick={onAddClick}
        >
          <PlusCircle color="#0052A3" size={16} />
          <Typography className="text-[#0052A3] font-semibold font-inter text-sm ">
            Add New Address
          </Typography>
        </Button>
      </div>
      <div className="flex items-center justify-between px-10 py-8 mt-10 rounded-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
        <div className="flex flex-col gap-y-2">
          <Typography className="font-medium text-lg text-[#101828]">
            Marie Reine Seshie Business
          </Typography>
          <Typography className="font-inter text-lg text-[#5A5555]">
            Ghana
          </Typography>
          <Typography className="font-inter text-lg text-[#5A5555]">
            Accra
          </Typography>
        </div>

        <div className="relative" ref={dropdownRef}>
          <IconButton variant="text" onClick={toggleDropdown}>
            <DotsThree size={20} />
          </IconButton>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg py-2 z-10">
              <Button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-x-2 normal-case font-normal border-none shadow-none"
                onClick={onUpdateClick}
              >
                <ChatText size={16} />
                Update Address
              </Button>
              <Button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-x-2 normal-case font-normal shadow-none">
                <X size={16} />
                Remove Address
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileAddressView;
