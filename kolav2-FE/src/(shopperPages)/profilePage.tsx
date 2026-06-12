"use client";
import Company from "@/components/dashboard/profile/company/company";
import Personal from "@/components/dashboard/profile/personal/personal";
import ProfilePageHeader from "@/components/dashboard/profile/profilePageHeader";
import React, { useState } from "react";
import { TrashModal } from "@/components/General/trashModal";
import { clearAuthToken } from "@/utils/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { resetExceptCartAndFavorites } from "@/Redux/features/shopperSlice";
import { logUserOut } from "@/Redux/features/authSlice";
import { ROUTES } from "@/constants/routes";
import { useAuthSelector } from "@/Redux/selectors";
import { USE_CASES, UseCase } from "@/types";

const ProfilePage = () => {
  const { loginData } = useAuthSelector();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] =
    useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const USE_CASE = loginData?.use_case?.toLowerCase() as UseCase;
  const effectiveTabIndex = USE_CASE === USE_CASES.BUYER ? 1 : activeTabIndex;

  const handleShoppingModeToggle = async () => {
    router.push(ROUTES.businesses);
  };

  return (
    <main className="w-full">
      <ProfilePageHeader
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      />

      {effectiveTabIndex === 0 && USE_CASE !== USE_CASES.BUYER && (
        <Company
          USE_CASE={USE_CASE}
          onLogoutClick={() => setIsLogoutDialogOpen(true)}
          onDeleteAccountClick={() => setIsDeleteAccountDialogOpen(true)}
          onShoppingModeToggle={handleShoppingModeToggle}
        />
      )}

      {effectiveTabIndex === 1 && (
        <Personal
          USE_CASE={USE_CASE}
          onLogoutClick={() => setIsLogoutDialogOpen(true)}
          onDeleteAccountClick={() => setIsDeleteAccountDialogOpen(true)}
          onShoppingModeToggle={handleShoppingModeToggle}
        />
      )}

      <TrashModal
        warning={true}
        color="#007AF5"
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        header="Confirm Log Out"
        title="You can log back in with your phone number and PIN."
        proceedText="Yes"
        returnText="No"
        loading={loading}
        onDelete={() => {
          setIsLoading(true);

          clearAuthToken();
          localStorage.removeItem("access_token");
          dispatch(resetExceptCartAndFavorites());
          dispatch(logUserOut());
          router.push(ROUTES.home);

          setIsLoading(false);
        }}
      />

      <TrashModal
        warning={true}
        isOpen={isDeleteAccountDialogOpen}
        onClose={() => setIsDeleteAccountDialogOpen(false)}
        header="Delete Account"
        title="You can't undo this action."
        proceedText="Yes"
        returnText="No"
        // loading={}
        // onDelete={}
      />
    </main>
  );
};

export default ProfilePage;
