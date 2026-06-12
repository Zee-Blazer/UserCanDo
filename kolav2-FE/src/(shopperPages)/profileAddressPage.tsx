"use client";
import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import ProfileAddressView from "@/components/dashboard/profile/personal/profileAddressView";
import ProfileAddAddress from "@/components/dashboard/profile/personal/profileAddAddress";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useAuthSelector } from "@/Redux/selectors";
import { USE_CASES, UseCase } from "@/types";

const ProfileAddressPage: React.FC = () => {
  const router = useRouter();
  const { loginData } = useAuthSelector();

  const [activeSlideName, setActiveSlideName] = useState("default");

  const USE_CASE = loginData?.use_case?.toLowerCase() as UseCase;

  const initialMockData = {
    business_name: "Marie Reine Business",
    region: "Ghana",
    city: "Accra",
  };

  return (
    <div>
      <Typography className="text-xl font-medium mb-6">My Profile</Typography>
      <div className="bg-white w-full max-w-2xl mx-auto px-10 py-8 rounded-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
        {activeSlideName == "default" && (
          <ProfileAddressView
            onBackClick={() =>
              router.push(
                USE_CASE === USE_CASES.AGENT
                  ? ROUTES.agentProfile
                  : ROUTES.shopperProfile
              )
            }
            onAddClick={() => setActiveSlideName("addAddress")}
            onUpdateClick={() => setActiveSlideName("editAddress")}
          />
        )}
        {activeSlideName == "addAddress" && (
          <ProfileAddAddress
            onBackClick={() => setActiveSlideName("default")}
            onSave={() => {}}
          />
        )}
        {activeSlideName == "editAddress" && (
          <ProfileAddAddress
            onBackClick={() => setActiveSlideName("default")}
            onSave={() => {}}
            edit={true}
            initialData={initialMockData}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileAddressPage;
