import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { X } from "@phosphor-icons/react";
import { useAgentSelector, useDashboardSelector } from "@/Redux/selectors";
import { useDispatch } from "react-redux";
import { useAgent } from "@/context/agentContext";
import { setActiveBusiness } from "@/Redux/features/agentSlice";

const SwitchDropdown = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const handleOpenPopover = () => setOpenPopover((prev) => !prev);
  const { businesses, activeBusiness } = useAgentSelector();
  const dispatch = useDispatch();
  const { setFetchCount } = useAgent();

  const handleBusinessSwitch = (business: any) => {
    dispatch(setActiveBusiness(business));
    setFetchCount((prev) => prev + 1);
    setOpenPopover(false);
  };

  useEffect(() => {
    if (businesses?.length > 0 && !activeBusiness) {
      dispatch(setActiveBusiness(businesses[0]));
      handleBusinessSwitch(businesses[0]);
    }
  }, [businesses, activeBusiness, dispatch]);

  return (
    <Popover open={openPopover} handler={handleOpenPopover} placement="bottom">
      <PopoverHandler>
        <button>
          <span className="text-blue-500">Switch</span>
        </button>
      </PopoverHandler>
      <PopoverContent className="flex flex-col gap-2 rounded-2xl py-3 px-3 w-[500px]">
        <header className="flex justify-between border-b p-3 items-center">
          <Typography className="font-bold text-2xl text-black">
            Switch Team
          </Typography>
          <button title="close" onClick={() => setOpenPopover(!openPopover)}>
            <X size={18} />
          </button>
        </header>
        <section className="w-full">
          <div className="flex mt-4 w-full justify-between">
            <div className="grid gap-3 grid-cols-1 w-full">
              {businesses?.map((business, index) => {
                const isActive = activeBusiness?.id === business.id;

                return (
                  <div
                    key={business.id}
                    className="flex px-2 border w-full justify-between border-gray-50 rounded-xl py-3 bg-[#F9FAFB]"
                  >
                    <div>
                      <Typography className="font-semibold text-black text-lg">
                        {business.business_name}
                      </Typography>
                      <div className="flex flex-col">
                        <span>{business.business_email}</span>
                        <span>{business.business_address}</span>
                      </div>
                    </div>
                    <Switch
                      id={`switch-${business.id}`}
                      ripple={false}
                      checked={isActive}
                      onChange={() => handleBusinessSwitch(business)}
                      className="h-full w-full checked:bg-[#CEAD42]"
                      containerProps={{
                        className: "w-11 h-6",
                      }}
                      circleProps={{
                        className: "before:hidden left-0.5 border-none",
                      }}
                      crossOrigin={undefined}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default SwitchDropdown;
