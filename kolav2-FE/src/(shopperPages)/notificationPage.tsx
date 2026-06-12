"use client";

import { useAgent } from "@/context/agentContext";
import { useShopper } from "@/context/shopperContext";
import { useAuthSelector } from "@/Redux/selectors";
import { USE_CASES, UseCase } from "@/types";
import { Switch, Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NotificationPage = () => {
  const router = useRouter();
  const { loginData } = useAuthSelector();

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const useCase = loginData?.use_case?.toLowerCase() as UseCase;
  const isAgent = useCase === USE_CASES.AGENT;

  const {
    handleToggleNotification,
    isNotificationEnabling,
    notificationStatus,
    getNotificationStatus,
  } = isAgent ? useAgent() : useShopper();

  useEffect(() => {
    setIsNotificationsEnabled(notificationStatus);
  }, [notificationStatus]);

  useEffect(() => {
    getNotificationStatus();
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const toggleNotifications = async () => {
    const newStatus = !isNotificationsEnabled;

    try {
      setIsNotificationsEnabled(newStatus);

      await handleToggleNotification(newStatus, () => {
        getNotificationStatus();
      });
    } catch (error) {
      console.error("Failed to toggle notifications", error);
      setIsNotificationsEnabled(!newStatus);
    }
  };

  return (
    <main>
      <header className="flex flex-col md:flex-row justify-between px-4 md:px-8 lg:px-0 gap-4">
        <Typography className="font-semibold text-black text-xl">
          My Profile
        </Typography>
      </header>
      <section>
        <div className="px-4 md:px-8 lg:px-16 pb-8 w-full shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] lg:max-w-2xl pt-8 lg:pt-14 m-auto mt-4 bg-white rounded-t-xl">
          <div className="flex items-center justify-between relative">
            <button
              onClick={handleGoBack}
              className="absolute left-0 cursor-pointer flex items-center gap-2"
            >
              <ChevronLeft color="#0052A3" />
              <span className="text-[#0052A3] font-semibold">Back</span>
            </button>
            <Typography className="text-[#5A5555] font-semibold mx-auto">
              Notifications
            </Typography>
          </div>
          <div className="rounded-t-lg shadow-lg mt-3 py-7 px-8">
            <Typography className="text-black font-medium">
              Enable Notifications
            </Typography>
            <div className="flex lg:flex-row md:flex-row flex-col gap-4">
              <Typography className="text-gray_5 font-normal mt-3">
                Subscribe to notifications about your orders and other
                activities.
              </Typography>
              <div className="flex justify-end">
                <Switch
                  crossOrigin=""
                  id="custom-switch-component"
                  ripple={false}
                  className="h-full w-full checked:bg-[#2ec946]"
                  containerProps={{
                    className: "w-11 h-6",
                  }}
                  circleProps={{
                    className: "before:hidden left-0.5 border-none",
                  }}
                  checked={isNotificationsEnabled}
                  onChange={toggleNotifications}
                  disabled={isNotificationEnabling}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotificationPage;
