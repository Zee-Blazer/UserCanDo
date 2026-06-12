"use client";

import AddStaffFlyout from "@/components/dashboard/staff/addStaffFlyout";
import EditStaffFlyout from "@/components/dashboard/staff/EditStaffFlyout";
import StaffPageHeader from "@/components/dashboard/staff/staffPageHeader";
import AllStaff from "@/components/dashboard/staff/staffTable";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import React, { useEffect, useMemo, useState } from "react";

const TABS = {
  ALL: 0,
  ACTIVE: 1,
  SUSPENDED: 2,
};

interface TabData {
  label: string;
  count?: number;
}

const Staff = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(TABS.ALL);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [staffDetails, setStaffDetails] = useState<StaffProps | null>(null);
  const { loadStaffData } = useDash();
  const { staff } = useDashboardSelector();

  const { allStaff, activeStaff, suspendedStaff, tabsData } = useMemo(() => {
    if (!staff || !Array.isArray(staff)) {
      return {
        allStaff: [],
        activeStaff: [],
        suspendedStaff: [],
        tabsData: [
          { label: "All", count: 0 },
          { label: "Active", count: 0 },
          { label: "Suspended", count: 0 },
        ],
      };
    }

    const allStaff = [...staff];
    const activeStaff = staff.filter((member) => !member.is_suspended);
    const suspendedStaff = staff.filter((member) => member.is_suspended);

    const tabsData: TabData[] = [
      { label: "All", count: allStaff.length },
      { label: "Active", count: activeStaff.length },
      { label: "Suspended", count: suspendedStaff.length },
    ];

    return { allStaff, activeStaff, suspendedStaff, tabsData };
  }, [staff]);

  const getCurrentStaffData = () => {
    switch (activeTabIndex) {
      case TABS.ACTIVE:
        return activeStaff;
      case TABS.SUSPENDED:
        return suspendedStaff;
      default:
        return allStaff;
    }
  };

  const btnTexts = tabsData.map(({ label, count }) => ({ label, count }));

  const handleAddStaff = () => {
    setIsRightDrawerOpen(true);
  };

  const handleEditStaff = (data: StaffProps) => {
    setStaffDetails(data);
    setIsEditDrawerOpen(true);
  };

  useEffect(() => {
    loadStaffData();
  }, [loadStaffData]);

  return (
    <div className="border-[1px] border-gray_2 rounded-md p-4">
      <StaffPageHeader
        activeIndex={activeTabIndex}
        setActiveIndex={setActiveTabIndex}
        onClick={handleAddStaff}
        btnTexts={btnTexts}
      />
      <AllStaff
        staffData={getCurrentStaffData()}
        onEditButtonClick={handleEditStaff}
      />
      <AddStaffFlyout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={() => {
          setIsRightDrawerOpen(false);
        }}
      />
      <EditStaffFlyout
        isEditDrawerOpen={isEditDrawerOpen}
        closeFlyout={() => {
          setIsEditDrawerOpen(false);
        }}
        data={staffDetails || null}
      />
    </div>
  );
};

export default Staff;
