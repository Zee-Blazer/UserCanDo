"use client";

import { NotificationsList } from "@/components/General/accordion";
import { accountActivity } from "@/utils/mockData";
import { Button, Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FilterType = "today" | "month" | "year";

const AccountActivity = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  const [activeFilter, setActiveFilter] = useState<FilterType>("today");

  const filteredNotifications = accountActivity;

  return (
    <main>
      <header className="flex flex-col md:flex-row justify-between md:px-8 lg:px-0 gap-6 mb-6">
        <Typography className="font-semibold text-black text-xl px-4 md:px-0">
          My Profile
        </Typography>
        <div className="bg-[#F2F4F7] flex gap-1 items-center rounded-lg p-2 w-full md:w-auto">
          <Button
            className={`flex justify-between items-center normal-case px-4 py-2 rounded-lg ${
              activeFilter === "today"
                ? "bg-white shadow-md"
                : "bg-transparent shadow-none"
            }`}
            onClick={() => setActiveFilter("today")}
          >
            <Typography
              className={`font-medium ${
                activeFilter === "today" ? "text-[#344054]" : "text-[#667085]"
              }`}
            >
              Today
            </Typography>
            <span
              style={{ backgroundColor: "#fce5bd" }}
              className="ml-2 rounded-full text-xs p-1 w-7 h-7 flex items-center justify-center text-black font-semibold"
            >
              2
            </span>
          </Button>
          <Button
            className={`flex justify-center items-center normal-case px-4 py-2 rounded-lg ${
              activeFilter === "month"
                ? "bg-white shadow-md"
                : "bg-transparent shadow-none"
            }`}
            onClick={() => setActiveFilter("month")}
          >
            <Typography
              className={`font-medium ${
                activeFilter === "month" ? "text-[#344054]" : "text-[#667085]"
              }`}
            >
              Month
            </Typography>
          </Button>
          <Button
            className={`flex justify-center items-center normal-case px-4 py-2 rounded-lg ${
              activeFilter === "year"
                ? "bg-white shadow-md"
                : "bg-transparent shadow-none"
            }`}
            onClick={() => setActiveFilter("year")}
          >
            <Typography
              className={`font-medium ${
                activeFilter === "year" ? "text-[#344054]" : "text-[#667085]"
              }`}
            >
              Year
            </Typography>
          </Button>
        </div>
      </header>
      <section>
        <div className="px-4 md:px-8 lg:px-16 pb-8 w-full shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] lg:max-w-2xl pt-8 lg:pt-14 m-auto mt-4 bg-white rounded-t-xl">
          <div className="flex items-center justify-between relative mb-6">
            <button
              onClick={handleGoBack}
              className="absolute left-0 cursor-pointer flex items-center gap-2"
            >
              <ChevronLeft color="#0052A3" />
              <span className="text-[#0052A3] font-semibold">Back</span>
            </button>
            <Typography className="text-[#5A5555] font-semibold mx-auto">
              Account Activity
            </Typography>
          </div>

          <NotificationsList
            notifications={filteredNotifications}
            filter={activeFilter}
          />
        </div>
      </section>
    </main>
  );
};

export default AccountActivity;
