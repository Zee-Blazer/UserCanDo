import { UserProfileIcon } from "@/assets/svg";
import { colors } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import {
  Avatar,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import MoreInfoComp from "./moreInfoComp";
import {
  useAgentSelector,
  useAuthSelector,
  useDashboardSelector,
} from "@/Redux/selectors";
import { USE_CASES, UseCase } from "@/types";

const ProfileDropdown = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const { loginData } = useAuthSelector();

  const useCase = loginData?.use_case?.toLowerCase() as UseCase;
  const isAgent = useCase === USE_CASES.AGENT;
  const { userProfile } = isAgent ? useAgentSelector() : useDashboardSelector();

  const closePopover = () => setOpenPopover(false);
  return (
    <div className="hidden xl:flex items-center gap-2 w-full justify-between max-w-[200px]">
      <div className="flex gap-2 items-center">
        <Avatar
          src={
            userProfile?.profile_image ||
            "https://docs.material-tailwind.com/img/face-2.jpg"
          }
          alt="avatar"
          size="sm"
        />
        <div className="">
          <Typography className="font-semibold text-sm">
            {userProfile?.first_name} {userProfile?.last_name}
          </Typography>
        </div>
      </div>
      <Popover
        open={openPopover}
        handler={() => setOpenPopover(!openPopover)}
        placement="bottom-end"
      >
        <PopoverHandler className="">
          <IconButton variant="text" color="gray">
            <ChevronDown className="cursor-pointer" color={colors.gray_3} />
          </IconButton>
        </PopoverHandler>
        <PopoverContent className="flex flex-col gap-4">
          <MoreInfoComp />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProfileDropdown;
