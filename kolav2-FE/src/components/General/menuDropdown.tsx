import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { ChatCircle, DotsThree } from "@phosphor-icons/react";
import { Trash } from "lucide-react";
import React from "react";

interface MenuDropdownProps {
  onDelete?: () => void;
  onMessageCustomer?: () => void;
  isDeleting?: boolean;
}

const MenuDropdown = ({
  onDelete,
  onMessageCustomer,
  isDeleting,
}: MenuDropdownProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMessageCustomer?.();
  };

  return (
    <div>
      <Menu placement="bottom-end">
        <MenuHandler>
          <IconButton
            variant="text"
            className="pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <DotsThree size={24} />
          </IconButton>
        </MenuHandler>
        <MenuList className="p-0">
          <MenuItem className="p-0">
            <Button
              variant="text"
              color="black"
              onClick={handleDeleteClick}
              disabled={isDeleting}
              loading={isDeleting}
              className="w-full text-black flex items-center gap-2 normal-case text-left font-medium"
            >
              <Trash size={18} color="#A8A9AE" />
              Delete
            </Button>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default MenuDropdown;
