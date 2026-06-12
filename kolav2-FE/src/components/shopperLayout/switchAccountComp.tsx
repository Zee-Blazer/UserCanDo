import React, { useMemo } from "react";
import { Button, Dialog, Typography } from "@material-tailwind/react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";

import {
  useAgentSelector,
  useAuthSelector,
  useDashboardSelector,
} from "@/Redux/selectors";
import { setActiveBusiness } from "@/Redux/features/dashboardSlice";
import { useDash } from "@/context/dashboardContext";
import { USE_CASES, UseCase } from "@/types";
import { useAgent } from "@/context/agentContext";

interface Account {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  image: string;
  signInStatus: string;
  businessData: any;
}

interface SwitchAccountCompProps {
  handleOpen: () => void;
  open: boolean;
  onAccountSwitch?: () => void;
}

const SwitchAccountComp: React.FC<SwitchAccountCompProps> = ({
  handleOpen,
  open,
  onAccountSwitch,
}) => {
  const { loginData } = useAuthSelector();
  const useCase = loginData?.use_case?.toLowerCase() as UseCase;
  const isAgent = useCase === USE_CASES.AGENT;

  const { businesses, activeBusiness } = isAgent
    ? useAgentSelector()
    : useDashboardSelector();

  const agentContext = useAgent();
  const dashContext = useDash();

  const contextResult = isAgent ? agentContext : dashContext;
  const { setFetchCount } = contextResult || {};

  const dispatch = useDispatch();

  const accounts: Account[] = useMemo(() => {
    if (!businesses || businesses.length === 0) return [];

    return businesses.map((business: any) => {
      const isActive = activeBusiness?.id === business.id;

      return {
        id: business.id,
        name: business.business_name,
        status: isActive ? "Active" : "Inactive",
        image: business.business_logo,
        signInStatus: isActive ? "Active" : "Not signed in",
        businessData: business,
      };
    });
  }, [businesses, activeBusiness]);

  const getStatusStyles = (status: string) => {
    return status === "Active"
      ? "bg-amber-50 text-amber-800 border-amber-200"
      : "bg-gray-50 text-gray-500 border-gray-200";
  };

  const getBackgroundStyles = (status: string) => {
    return status === "Active" ? "bg-[#F1F1F1]" : "bg-gray-50";
  };

  const handleAccountSwitch = (account: Account) => {
    dispatch(setActiveBusiness(account.businessData));

    if (setFetchCount && typeof setFetchCount === "function") {
      setFetchCount((prev) => prev + 1);
    } else {
      console.warn("setFetchCount is not available from context");
    }

    handleOpen();

    onAccountSwitch && onAccountSwitch();
  };

  if (!contextResult) {
    console.error(
      `Context not available. Make sure the component is wrapped with ${
        isAgent ? "AgentProvider" : "DashProvider"
      }`
    );
  }

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="bg-white p-6 rounded-xl max-w-md w-full mx-auto text-black"
      size="sm"
    >
      <div className="flex justify-between items-center p-4 border-b">
        <Typography variant="h5" className="font-semibold">
          Switch account
        </Typography>
        <Button variant="text" onClick={handleOpen} className="p-2 min-w-0">
          <X />
        </Button>
      </div>

      <div className="p-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className={`flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 mb-4 cursor-pointer ${getBackgroundStyles(
              account.status
            )}`}
            onClick={() => handleAccountSwitch(account)}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg overflow-hidden`}>
                <img
                  src={account.image}
                  alt={account.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <Typography variant="h6">{account.name}</Typography>
                <Typography variant="small" color="gray">
                  {account.signInStatus}
                </Typography>
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(
                account.status
              )}`}
            >
              {account.status}
            </div>
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default SwitchAccountComp;
