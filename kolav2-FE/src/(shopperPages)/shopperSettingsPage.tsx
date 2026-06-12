"use client";
import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { X, BookOpen } from "@phosphor-icons/react";
import { TrashModal } from "@/components/General/trashModal";
import { useRouter } from "next/navigation";

const ShopperSettingsPage = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const router = useRouter();

  const handleDeleteOpenDialog = () => setIsDeleteDialogOpen(true);
  const handleDeleteCloseDialog = () => setIsDeleteDialogOpen(false);

  const handleBack = () => {
    router.back();
  };

  const handleClearCache = async () => {
    try {
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }

      const authToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      localStorage.clear();
      sessionStorage.clear();

      if (authToken) localStorage.setItem("access_token", authToken);
      if (refreshToken) localStorage.setItem("refresh_token", refreshToken);

      window.location.reload();
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  };

  return (
    <div>
      <Typography className="text-xl font-medium mb-6">My Profile</Typography>
      <div className="bg-white w-full max-w-2xl mx-auto px-10 py-8 rounded-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 cursor-pointer text-pry2 text-sm font-medium"
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </button>
          <div className="flex flex-col items-center gap-y-2">
            <Typography className="text-lg font-inter font-medium text-[#5A5555]">
              Settings
            </Typography>
          </div>
          <div className="w-10"></div>
        </div>
        <div className="w-full flex flex-col gap-y-8 ">
          <div
            className="flex flex-row items-center justify-between w-full cursor-pointer"
            onClick={handleDeleteOpenDialog}
          >
            <div className="flex gap-x-2">
              <div className="bg-[#FEF7EB] p-4 rounded-full ">
                <X color="#F5AA29" />
              </div>
              <div className="flex flex-col gap-y-1">
                <Typography className="text-xl font-medium text-[#787486]">
                  Clear Cache
                </Typography>
                <Typography className="text-sm text-[#6D7280]">
                  Clear cache data and reload item from the server.
                </Typography>
              </div>
            </div>
            <ChevronRight size={24} strokeWidth={1.5} />
          </div>
          <div className="flex flex-row items-center gap-x-2  w-full">
            <div className="bg-[#FEF7EB] p-4 rounded-full ">
              <BookOpen color="#F5AA29" />
            </div>
            <div className="flex flex-col gap-y-1">
              <Typography className="text-xl font-medium text-[#787486]">
                About
              </Typography>
              <Typography className="text-sm text-[#6D7280]">
                App Version 2.10.0
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <TrashModal
        warning={true}
        color="#007AF5"
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCloseDialog}
        header="Confirm Clear Cache"
        title="Cached data aside authentication data will be cleared. Are you sure you want to continue?"
        proceedText="Yes"
        returnText="No"
        onDelete={handleClearCache}
        // loading={isClearing}
      />
    </div>
  );
};

export default ShopperSettingsPage;
