import React, { useState } from "react";
import { X } from "lucide-react";
import NoNotificationsView from "./noNotificationsView";
import NotificationsView from "./notificationsView";
import { NotificationIcon } from "@/assets/svg";
import {
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";

const NotificationDropdown = () => {
  const [hasNotifications, setHasNotifications] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Popover open={openPopover} handler={() => setOpenPopover(!openPopover)}>
      <PopoverHandler className="">
        <IconButton>
          <NotificationIcon color="#6D7280" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
            0
          </span>
        </IconButton>
      </PopoverHandler>
      <PopoverContent className="flex flex-col gap-2 max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <p className="text-[#0D121D] text-2xl font-semibold">Notifications</p>
          <button title="close" onClick={() => setOpenPopover(!openPopover)}>
            <X size={18} />
          </button>
        </div>

        {hasNotifications ? <NoNotificationsView /> : <NotificationsView />}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;
