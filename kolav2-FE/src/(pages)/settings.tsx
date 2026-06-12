"use client";
import React, { useState } from "react";
import SettingsPageHeader from "@/components/dashboard/settings/settingsPageHeader";
import PersonalSettings from "@/components/dashboard/settings/personalSettings";
import BusinessSettings from "@/components/dashboard/settings/businessSettings";
import Credit from "@/components/dashboard/settings/credit";

const SettingsPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="bg-white border-[1px] border-gray_2 rounded-md transition-all duration-300">
      <SettingsPageHeader
        activeIndex={activeTabIndex}
        setActiveIndex={setActiveTabIndex}
      />
      {activeTabIndex === 0 && <PersonalSettings />}
      {activeTabIndex === 1 && <BusinessSettings />}
      {activeTabIndex === 2 && <Credit />}
    </div>
  );
};

export default SettingsPage;
