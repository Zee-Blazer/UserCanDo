import { colors } from "@/constants/colors";
import { ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavItemProps {
  icon: any;
  label: string;
  href: string;
}

const NavItem = ({ label, href, icon }: NavItemProps) => {
  const router = useRouter();
  const path = usePathname();
  const Icon = icon;

  const isActive =
    path === href ||
    (path.startsWith(href + "/") && href !== "/dashboard/sales");

  return (
    <Link
      key={label}
      href={href}
      className={`cursor-pointer ${
        isActive ? "bg-[#E9EEF2] border-l-4 border-l-yellow_pry" : ""
      } rounded-none px-4 flex py-1`}
    >
      <ListItemPrefix className="mr-3 h-15  w-auto">
        <Icon color={isActive ? colors.pry2 : "#787486"} />
      </ListItemPrefix>
      <Typography
        className={`text-sm ${
          isActive ? "text-pry2 font-[500]" : "text-[#787486] font-[400]"
        }`}
      >
        {label}
      </Typography>
    </Link>
  );
};

export default NavItem;
