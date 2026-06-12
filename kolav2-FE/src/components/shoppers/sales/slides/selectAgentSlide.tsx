import { Button, Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useDashboardSelector } from "@/Redux/selectors";
import { getInitials } from "@/utils/helpers";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { useEffect } from "react";
import { useDash } from "@/context/dashboardContext";

const SelectAgentSlide = () => {
  const {
    nextShopperSaleSlide,
    shopperProfileSaleInputs,
    setShopperProfileSaleInputs,
  } = useAuth();
  const { salesAgents } = useDashboardSelector();
  const { loadSalesAgentsData } = useDash();

  const handleSelectAgent = (salesAgentId: string) => {
    setShopperProfileSaleInputs((prevState) => ({
      ...prevState,
      sales_agent_id: salesAgentId,
    }));
  };

  useEffect(() => {
    loadSalesAgentsData();
  }, [loadSalesAgentsData]);

  return (
    <div>
      <p className="text-xl font-medium mb-6">Add Sale</p>
      <div className="bg-white w-full max-w-3xl mx-auto px-10 py-8 rounded-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
        <div className="flex items-center justify-between mb-6">
          <Link
            href={ROUTES.shopperProfile}
            className="flex items-center gap-2 cursor-pointer text-pry2 text-sm font-medium"
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </Link>
          <p className="text-lg font-medium text-[#5A5555]">
            Select Sale Agent
          </p>
          <div className="w-10"></div>
        </div>

        <div className="space-y-4">
          {salesAgents?.map((salesAgent) => (
            <div
              key={salesAgent.id}
              onClick={() => handleSelectAgent(salesAgent.id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer`}
            >
              <div className="w-10 h-10 rounded-full bg-[#CCD6E0] text-pry2 font-bold flex items-center justify-center">
                {getInitials(salesAgent?.name)}
              </div>
              <div className="flex-grow">
                <p className="font-medium text-[#787486] capitalize">
                  {salesAgent.name}
                </p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center ${
                  shopperProfileSaleInputs?.sales_agent_id === salesAgent.id &&
                  "border-pry2"
                }`}
              >
                {shopperProfileSaleInputs?.sales_agent_id === salesAgent.id && (
                  <div className="w-3 h-3 rounded-full bg-pry2"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button
            className="bg-blue_pry w-full normal-case mt-4"
            onClick={nextShopperSaleSlide}
            disabled={!shopperProfileSaleInputs.sales_agent_id}
          >
            <Typography className="text-white font-normal">Continue</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectAgentSlide;
