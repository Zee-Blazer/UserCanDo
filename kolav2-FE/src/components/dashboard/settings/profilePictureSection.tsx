import { UIGuard } from "@/components/guards/roleGuard";
import { useDash } from "@/context/dashboardContext";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { USER_ROLES } from "@/types";
import { Button } from "@material-tailwind/react";
import { House, Pencil } from "lucide-react";
import React, { useState } from "react";

const ProfilePictureSection = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { userProfile } = useDashboardSelector();
  const { loginData } = useAuthSelector();
  const { handleProfileUpdate, isProfileUpdating } = useDash();
  const [user, setUser] = useState<UserProfile>(userProfile);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store the actual file

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Store file for upload
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsEdit(false);
    if (selectedFile) {
      //@ts-ignore
      await handleProfileUpdate({}, selectedFile);
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-y-[#D5D8DC] px-12 py-8 my-10 justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-pry2 rounded-full flex items-center justify-center text-white">
          <House size={32} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-[#101828] font-bold">
            {userProfile?.first_name} {userProfile?.last_name}
          </p>
          <p className="text-sm text-[#6F6F6F] capitalize">
            {userProfile?.role?.toLowerCase() === USER_ROLES.USER
              ? loginData?.use_case?.toLowerCase()
              : userProfile?.role?.toLowerCase()}
          </p>
        </div>
      </div>

      {isEdit && (
        <div className="flex flex-col items-center gap-4">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-600"
          />
        </div>
      )}
      <UIGuard permission="UPDATE_PROFILE">
        <div className="flex gap-3 justify-end">
          {isEdit ? (
            <Button
              className="bg-[#F8FAFB] text-pry2 text-sm p-3 font-medium rounded-[0.3125rem] border border-[#D0D5DD66] shadow-[0px_1px_2px_0px_#1018280D] normal-case"
              onClick={handleSave}
              loading={isProfileUpdating}
              disabled={isProfileUpdating}
            >
              Save
            </Button>
          ) : (
            <Button
              className="flex gap-3 bg-pry2 text-white text-sm p-3 font-medium rounded-[0.3125rem] normal-case"
              onClick={() => setIsEdit(true)}
              loading={isProfileUpdating}
              disabled={isProfileUpdating}
            >
              Edit profile picture <Pencil size={18} />
            </Button>
          )}
        </div>
      </UIGuard>
    </div>
  );
};

export default ProfilePictureSection;
