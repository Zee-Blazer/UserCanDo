import { ListItemPrefix, Typography } from "@material-tailwind/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ProfileItemProps {
  icon: any;
  label: string;
  href?: string;
  onLogoutClick?: () => void;
  onDeleteAccountClick?: () => void;
}

const ProfileItem = ({
  label,
  href = "#",
  icon,
  onLogoutClick,
  onDeleteAccountClick,
}: ProfileItemProps) => {
  const Icon = icon;
  const isLogout = label.trim() === "Logout";
  const isDeleteAccount = label.trim() === "Delete Account";

  return (
    <Link
      href={href}
      onClick={
        isLogout || isDeleteAccount
          ? isDeleteAccount
            ? (e) => {
                e.preventDefault();
                onDeleteAccountClick?.();
              }
            : (e) => {
                e.preventDefault();
                onLogoutClick?.();
              }
          : undefined
      }
      className="cursor-pointer justify-between items-center flex"
    >
      <div className="flex items-center">
        <ListItemPrefix className="w-6 h-6">
          <Icon color={isLogout ? "#FF3A44" : "#474A4E"} />
        </ListItemPrefix>
        <Typography className={`font-normal ${isLogout ? "text-red-500" : ""}`}>
          {label}
        </Typography>
      </div>
      <ChevronRight className="text-[#D2D5DA]" />
    </Link>
  );
};

export default ProfileItem;
