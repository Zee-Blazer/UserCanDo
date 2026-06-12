import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Typography } from "@material-tailwind/react";

interface NotificationItemProps {
  label: string;
  detail: string;
  image?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  label,
  detail,
  image,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text: string, wordCount: number) => {
    const words = text.split(" ");
    if (words.length <= wordCount) return text;
    return `${words.slice(0, wordCount).join(" ")}...`;
  };

  return (
    <div className="bg-white rounded-lg shadow-[0px_1px_3px_rgba(0,0,0,0.1)] mb-4 p-4">
      <div className="flex items-start">
        {image && (
          <div className="mr-3 flex-shrink-0">
            <img
              src={image}
              alt="user_image"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        )}

        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-base text-gray-900">{label}</h4>
              <p className="text-sm font-medium text-[#6B7785] mt-1">
                {isExpanded ? detail : truncateText(detail, 6)}
              </p>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsList: React.FC<{
  notifications: NotificationItemProps[];
  filter?: "today" | "month" | "year";
}> = ({ notifications }) => {
  return (
    <div className="mt-8">
      <Typography className="text-black font-medium mb-3">Today</Typography>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            label={notification.label}
            detail={notification.detail}
            image={notification.image}
          />
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No notifications found for this period.
          </p>
        </div>
      )}
    </div>
  );
};

export { NotificationItem, NotificationsList };
