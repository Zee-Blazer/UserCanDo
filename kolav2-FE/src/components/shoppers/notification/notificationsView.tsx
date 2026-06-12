import { NotificationCardIcon, NotificationDocumentIcon, NotificationLockIcon } from "@/assets/svg";
import { useState } from "react";
import notificationImage from "@/assets/images/notification_image.png";
import Image from "next/image";

interface Notification {
  id: string;
  type: "update" | "cancelled" | "password" | "credit";
  message: string;
  timestamp: string;
  icon: "document" | "lock" | "credit-card";
  status: "normal" | "error";
  hasImage?: boolean;
}

interface NotificationGroups {
  [date: string]: Notification[];
}

interface NotificationsData {
  orders: Notification[];
  general: Notification[];
}

// Type for the tab options
type TabType = "orders" | "general";

const notifications: NotificationsData = {
  orders: [
    {
      id: "1",
      type: "update",
      message: 'Your order "#244-435" is now in transit.',
      timestamp: "Today, 12:35 PM",
      icon: "document",
      status: "normal",
      hasImage: true,
    },
    {
      id: "2",
      type: "cancelled",
      message: 'Your order "#244-435" has been cancelled.',
      timestamp: "Wednesday, 08:35 PM",
      icon: "document",
      status: "error",
      hasImage: true,
    },
    {
      id: "3",
      type: "update",
      message: 'Your order "#244-435" is now in transit.',
      timestamp: "Wednesday, 08:35 PM",
      icon: "document",
      status: "normal",
      hasImage: true,
    },
  ],
  general: [
    {
      id: "1",
      type: "password",
      message: "Password was updated successfully",
      timestamp: "Today, 12:35 PM",
      icon: "lock",
      status: "normal",
      hasImage: false,
    },
    {
      id: "2",
      type: "credit",
      message: 'Your credit order "#244-435" from Racy is due for payment.',
      timestamp: "Wednesday, 08:35 PM",
      icon: "credit-card",
      status: "error",
      hasImage: true,
    },
  ],
};

const NotificationsView = () => {
  const [activeTab, setActiveTab] = useState<TabType>("orders");

  // Group notifications by date (Today, Wednesday, etc.)
  const groupNotificationsByDate = (
    notificationList: Notification[]
  ): NotificationGroups => {
    return notificationList.reduce(
      (groups: NotificationGroups, notification) => {
        const datePart = notification.timestamp.includes("Today")
          ? "Today"
          : notification.timestamp.split(",")[0]; // Extract day name

        if (!groups[datePart]) {
          groups[datePart] = [];
        }

        groups[datePart].push(notification);
        return groups;
      },
      {}
    );
  };

  // Render the appropriate icon component based on type and status
  const getIconComponent = (
    iconType: Notification["icon"],
    status: Notification["status"]
  ) => {
    const bgColor = status === "error" ? "bg-[#FEF2F2]" : "bg-[#F1F1F1]";
    const color = status === "error" ? "#EF4444" : "#6D7280";

    switch (iconType) {
      case "document":
        return (
          <div className={`rounded-full p-2 ${bgColor}`}>
            <NotificationDocumentIcon color={color}/>
          </div>
        );
      case "lock":
        return (
          <div className={`rounded-full p-2 ${bgColor}`}>
            <NotificationLockIcon color={color}/>
          </div>
        );
      case "credit-card":
        return (
          <div className={`rounded-full p-2 ${bgColor}`}>
            <NotificationCardIcon color={color}/>
          </div>
        );
      default:
        return null;
    }
  };

  // Get notification title based on type
  const getNotificationTitle = (type: Notification["type"]): string => {
    switch (type) {
      case "update":
        return "Order update";
      case "cancelled":
        return "Order cancelled";
      case "credit":
        return "Credit update";
      case "password":
        return "Password was updated successfully";
      default:
        return "";
    }
  };

  // Render the notifications content based on active tab
  const renderNotificationContent = () => {
    const currentNotifications = notifications[activeTab];
    const groupedNotifications = groupNotificationsByDate(currentNotifications);

    return (
      <div className="max-h-96 overflow-y-auto no-scrollbar">
        {Object.entries(groupedNotifications).map(([date, notifs]) => (
          <div key={date}>
            <div className="px-4 py-2 text-xs font-semibold text-[#0D121D]">
              {date}
            </div>
            {notifs.map((notification) => (
              <div
                key={notification.id}
                className="p-4 flex items-start gap-3 hover:bg-gray-50"
              >
                {getIconComponent(notification.icon, notification.status)}
                <div className="flex-grow">
                  <p className="text-xs font-semibold text-[#0D121D]">
                    {getNotificationTitle(notification.type)}
                    <span className="ml-2 text-[0.625rem] text-[#6D7280]">
                    {notification.timestamp}
                  </span>
                  </p>
                  <p className="text-xs text-[#0D121D]">
                    {notification.message}
                  </p>
                  
                </div>
                {notification.hasImage && (
                  <div className="ml-auto">
                    <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Image src={notificationImage} alt="image" className="w-10 h-10" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
        <div>
          <button
            className={`flex-1 p-3 text-center relative ${
              activeTab === "orders"
                ? "text-blue_pry font-medium"
                : "text-[#6D7280]"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
            <span
              className={`ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold ${
                activeTab === "orders"
                  ? "text-white bg-blue_pry"
                  : "text-[#6D7280] bg-[#F1F1F1]"
              }
               rounded-full`}
            >
              {notifications.orders.length}
            </span>
            {activeTab === "orders" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue_pry"></div>
            )}
          </button>
          <button
            className={`flex-1 p-3 text-center relative ${
              activeTab === "general"
                ? "text-blue_pry font-medium"
                : "text-[#6D7280]"
            }`}
            onClick={() => setActiveTab("general")}
          >
            General
            <span
              className={`ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold ${
                activeTab === "general"
                  ? "text-white bg-blue_pry"
                  : "text-[#6D7280] bg-[#F1F1F1]"
              } rounded-full`}
            >
              {notifications.general.length}
            </span>
            {activeTab === "general" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue_pry"></div>
            )}
          </button>
        </div>

      {renderNotificationContent()}
    </div>
  );
};

export default NotificationsView;
