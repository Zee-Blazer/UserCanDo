"use client";
import React, { useEffect, useState } from "react";
import TanTable from "@/components/General/TanTable";
import { Typography, Button } from "@material-tailwind/react";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import { BinIcon } from "@/assets/svg";
import { TrashModal } from "@/components/General/trashModal";

const Notification = () => {
  const { notifications, activeBusiness } = useDashboardSelector();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "unread" | "read"
  >("all");

  const {
    loadNotificationsData,
    handleDeleteNotification,
    isNotificationDeleting,
    handleUpdateNotificationStatus,
  } = useDash();

  useEffect(() => {
    loadNotificationsData();
  }, [loadNotificationsData]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const readCount = notifications.filter((n) => n.is_read).length;

  const handleDeleteModal = (row: any) => {
    setSelectedRow(row.original);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteNotification(selectedRow, () => {
        setIsDeleteModalOpen(false);
        setSelectedRow(null);
      });
    }
  };

  const handleRowClick = (row: any) => {
    if (!row.original.is_read) {
      handleUpdateNotificationStatus(row.original, () => {
        console.log("Notification marked as read:", row.original.id);
      });
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (selectedFilter === "unread") return !n.is_read;
    if (selectedFilter === "read") return n.is_read;
    return true;
  });

  const columns = [
    {
      header: "#",
      cell: (item: any) => <span>#{item.row.index + 1}</span>,
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }: any) => {
        const date = new Date(row.original.created_at);
        const formattedDate = `${date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })} ${date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}`;
        return (
          <div className="text-sm">
            {formattedDate.split(" ").slice(0, 3).join(" ")}
          </div>
        );
      },
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Content",
      accessorKey: "content",
    },
    {
      header: "Type",
      accessorKey: "notification_type",
      cell: ({ row }: any) => {
        const rawType = row.original.notification_type;
        const formattedType = rawType
          .replace(/_/g, " ")
          .replace(/^\w/, (c: string) => c.toUpperCase());

        return formattedType;
      },
    },
    {
      header: "Status",
      accessorKey: "is_read",
      cell: ({ row }: any) => (
        <span
          className={`inline-block w-20 text-center px-2 py-1 rounded-lg ${
            !row.original.is_read
              ? "bg-[#FBF4F3] text-[#B42318]"
              : "bg-[#F2F8F6] text-[#027A48]"
          }`}
        >
          {row.original.is_read ? "read" : "unread"}
        </span>
      ),
    },
    {
      header: "Delete",
      accessorKey: "delete",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteModal(row);
            }}
            className="cursor-pointer"
          >
            <BinIcon color="#667085" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="border-[1px] border-gray_2 rounded-md p-4">
      <div className="mb-8">
        <Typography variant="small" className="text-gray_4 mb-4">
          {activeBusiness?.business_name || "Kola Market Place"} /
          <span className="font-medium ml-1 text-black">Notification</span>
        </Typography>
        <Typography variant="h6" className="font-semibold">
          Notifications
        </Typography>
      </div>

      {/* Filter Buttons */}
      <div className="flex mb-3 gap-4 flex-wrap">
        <Button
          onClick={() => setSelectedFilter("all")}
          className={`py-2 px-4 bg-[#F8F4FE] text-[#6941C6] font-medium rounded-lg shadow-none ${
            selectedFilter === "all" ? "border-2 border-[#6941C6]" : ""
          }`}
        >
          {notifications.length} Notifications
        </Button>
        <Button
          onClick={() => setSelectedFilter("unread")}
          className={`py-2 px-4 bg-[#FBF4F3] text-[#B42318] font-medium rounded-lg shadow-none ${
            selectedFilter === "unread" ? "border-2 border-[#B42318]" : ""
          }`}
        >
          {unreadCount} Unread Notifications
        </Button>
        <Button
          onClick={() => setSelectedFilter("read")}
          className={`py-2 px-4 bg-[#F2F8F6] text-[#027A48] font-medium rounded-lg shadow-none ${
            selectedFilter === "read" ? "border-2 border-[#027A48]" : ""
          }`}
        >
          {readCount} Read Notifications
        </Button>
      </div>

      <Typography variant="small" className="text-gray_4 mb-4">
        Keep track of all notifications
      </Typography>

      <TanTable
        columnData={columns}
        data={filteredNotifications}
        length={5}
        onRowClick={(row: any) => handleRowClick(row)}
      />

      <TrashModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        header="Delete Notification"
        title="Are you sure you want to delete this notification?"
        onDelete={confirmDelete}
        loading={isNotificationDeleting}
      />
    </div>
  );
};

export default Notification;
