import ProfilePage from "@/(shopperPages)/profilePage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

export default function Profile() {
  return (
    <PageGuard allowedUseCases={[USE_CASES.BUYER, USE_CASES.BOTH]}>
      <ProfilePage />
    </PageGuard>
  );
}
