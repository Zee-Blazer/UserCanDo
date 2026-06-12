import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  label: string;
  href: string;
}

const NavItem = ({ label, href }: NavItemProps) => {
  const path = usePathname();

  const isActive =
    href === "/agent"
      ? path === "/agent"
      : path === href || path.startsWith(href + "/");

  return (
    <Link
      key={label}
      href={href}
      className={`cursor-pointer ${
        isActive ? "bg-[#E9EEF2] border-l-4 border-l-yellow_pry" : ""
      } rounded-none px-6 flex p-3`}
    >
      <Typography
        className={`${
          isActive ? "text-pry2 font-[500]" : "text-[#787486] font-[400]"
        }`}
      >
        {label}
      </Typography>
    </Link>
  );
};

export default NavItem;
