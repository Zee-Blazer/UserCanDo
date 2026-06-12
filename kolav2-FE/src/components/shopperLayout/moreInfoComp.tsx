import { LogoutIcon, SwitchAccountIcon } from "@/assets/svg";
import { colors } from "@/constants/colors";
import { Button, Typography } from "@material-tailwind/react";
import { SettingsIcon } from "lucide-react";
import React, { useState } from "react";
import SwitchAccountComp from "./switchAccountComp";
import { useAuthSelector } from "@/Redux/selectors";
import { ROUTES } from "@/constants/routes";
import LoginDialog from "../auth/LoginDialog";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logUserOut } from "@/Redux/features/authSlice";
import { resetExceptCartAndFavorites } from "@/Redux/features/shopperSlice";
import { clearAuthToken } from "@/utils/auth";
import { UIGuard } from "../guards/roleGuard";
import { USE_CASES, UseCase } from "@/types";
import Link from "next/link";

const MoreInfoComp = () => {
  const [open, setOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { isLoggedIn, loginData } = useAuthSelector();
  const dispatch = useDispatch();
  const router = useRouter();
  const useCase = loginData?.use_case?.toLowerCase() as UseCase;
  const isAgent = useCase === USE_CASES.AGENT;

  const handleOpen = () => setOpen(!open);

  const handleLogout = () => {
    setIsLoggingOut(true);

    clearAuthToken();
    localStorage.removeItem("access_token");
    dispatch(resetExceptCartAndFavorites());
    dispatch(logUserOut());
    router.push(ROUTES.home);

    setIsLoggingOut(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {!isLoggedIn ? (
        <>
          <Button
            variant="text"
            className="flex items-center gap-2 normal-case w-full bg-pry2 text-white"
            onClick={() => setIsLoginDialogOpen(true)}
          >
            Login
          </Button>
          <LoginDialog
            open={isLoginDialogOpen}
            onClose={() => setIsLoginDialogOpen(false)}
            callback={() => setIsLoginDialogOpen(false)}
          />
        </>
      ) : (
        <>
          <UIGuard allowedUseCases={[USE_CASES.BOTH]}>
            <Link
              href={ROUTES.businesses}
              className="normal-case p-0 flex items-center gap-2 w-full font-normal cursor-pointer"
            >
              <SwitchAccountIcon />
              <Typography>Switch to Vendor</Typography>
            </Link>
          </UIGuard>

          <Link
            href={isAgent ? ROUTES.agentSettings : ROUTES.shopperSettings}
            className="flex items-center gap-2 normal-case p-0 w-full"
          >
            <i className="w-8 h-8 flex items-center justify-center">
              <SettingsIcon color={colors.gray_3} size={18} />
            </i>
            <Typography>Settings</Typography>
          </Link>

          <Button
            variant="text"
            className="flex items-center gap-2 normal-case p-0 w-full"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <i className="w-8 h-8 flex items-center justify-center">
              <LogoutIcon />
            </i>
            <Typography>
              {isLoggingOut ? "Logging Out..." : "Log Out"}
            </Typography>
          </Button>

          <SwitchAccountComp handleOpen={() => setOpen(false)} open={open} />
        </>
      )}
    </div>
  );
};

export default MoreInfoComp;
