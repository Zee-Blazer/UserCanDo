import notificationBell from "@/assets/images/notification_bell.png";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";

const NoNotificationsView = () => {
  return (
    <div className="text-[#0D121D] p-4 flex flex-col items-center justify-center h-full">
      <Image src={notificationBell} alt="notification_bell" />
      <p className="text-2xl font-bold mb-2">No notifications</p>
      <p className="mb-4 text-center">
        No notifications to show right now. To get push notifications, enable
        push notifications in your settings
      </p>
      <Button className="bg-blue_pry w-full normal-case mt-4">
        <Typography className="text-white font-normal">
          Enable notifications
        </Typography>
      </Button>
    </div>
  );
};

export default NoNotificationsView;
