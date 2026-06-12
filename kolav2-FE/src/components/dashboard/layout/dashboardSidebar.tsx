import { Card, Typography, List, IconButton } from "@material-tailwind/react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import NavItem from "./navItem";
import { BagIcon } from "@/assets/svg";
import { mainMenu, marketPlace, otherMenu } from "./navItemsData";
import { X } from "lucide-react";
import { useState } from "react";
import BusinessSelector from "./businessSelector";
import { useDashboardSelector } from "@/Redux/selectors";
import { UIGuard } from "@/components/guards/roleGuard";

const DashboardSidebar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeBusiness } = useDashboardSelector();

  return (
    <Card className="h-[calc(100vh)] w-full max-w-[20rem] shadow-none rounded-none p-0 bg-[#F8FAFB] py-2">
      <div className="h-full flex flex-col">
        <div className="px-4">
          <div className="flex justify-between items-center">
            <Image src={logo} alt="logo" className="w-[116px] object-contain" />
            <X
              onClick={toggleSidebar}
              className="w-6 h-6 text-gray-700 cursor-pointer md:hidden"
            />
          </div>
          {activeBusiness && (
            <div className="border-2 rounded-md flex items-center justify-between pl-2 mt-3">
              <Typography className="text-pry2">
                {activeBusiness?.business_name}
              </Typography>
              <IconButton
                className="block border-l-2 p-1 cursor-pointer bg-inherit"
                onClick={() => setIsModalOpen(true)}
              >
                <BagIcon color="#787486" />
              </IconButton>
            </div>
          )}
        </div>

        <div className="mt-3 overflow-y-scroll flex-1 hide-scrollbar">
          <div className="mb-4">
            <Typography className="uppercase px-4 text-sm">
              Main menu
            </Typography>
            <List className="p-0 gap-0 mt-2">
              {mainMenu.map((item, index) => (
                <NavItem
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  key={index}
                />
              ))}
            </List>
          </div>
          <div className="mb-4">
            <Typography className="uppercase px-4 text-sm">
              {activeBusiness?.business_name || "KOLA MARKET PLACE"}
            </Typography>
            <List className="p-0 gap-0 mt-3">
              {marketPlace.map((item, index) =>
                item.permission ? (
                  <UIGuard key={index} permission={item.permission}>
                    <NavItem
                      href={item.href}
                      icon={item.icon}
                      label={item.label}
                    />
                  </UIGuard>
                ) : (
                  <NavItem
                    key={index}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                  />
                )
              )}
            </List>
          </div>
          <div>
            <Typography className="uppercase px-4 text-sm">OTHERS</Typography>
            <List className="p-0 gap-0 mt-3">
              {otherMenu.map((item, index) =>
                item.permission ? (
                  <UIGuard key={index} permission={item.permission}>
                    <NavItem
                      href={item.href}
                      icon={item.icon}
                      label={item.label}
                    />
                  </UIGuard>
                ) : (
                  <NavItem
                    key={index}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                  />
                )
              )}
            </List>
          </div>
        </div>
      </div>
      <BusinessSelector
        handler={() => setIsModalOpen(!isModalOpen)}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      />
    </Card>
  );
};

export default DashboardSidebar;
