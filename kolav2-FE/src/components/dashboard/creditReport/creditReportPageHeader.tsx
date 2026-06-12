import React, { useState } from "react";
import { Button, ButtonGroup, Typography } from "@material-tailwind/react";
import {
  CustomDatePicker,
  DateRange,
} from "@/components/General/form/customDatePicker";
import { useDashboardSelector } from "@/Redux/selectors";

const CreditReportPageHeader = () => {
  const { activeBusiness } = useDashboardSelector();

  const [activeTab, setActiveTab] = useState("All");
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const tabs = ["All", "Today", "This Month", "Last Month", "Custom"];

  return (
    <section className="px-4 md:px-6 lg:px-8 py-3 relative">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
        <Typography variant="small" className="mb-2 md:mb-0">
          {activeBusiness?.business_name || "Kola Market"} /{" "}
          <span className="font-medium">Credit Report</span>
        </Typography>
        <div className="flex items-center">
          <ButtonGroup
            variant="outlined"
            className="border !border-gray-300 rounded-md border-1 w-full md:w-auto"
          >
            {tabs.map((tab, index) => (
              <Button
                key={tab}
                className={`
                  px-2 md:px-4 py-3 relative outline-none focus:outline-none focus:shadow-none
                  ${activeTab === tab ? "text-pry2" : "text-gray-700"}
                  ${index === 0 ? "rounded-l-md" : ""} 
                  ${
                    index === tabs.length - 1
                      ? "rounded-r-md border-gray-300"
                      : ""
                  } 
                  ${
                    index !== tabs.length - 1
                      ? "border-r border-gray-300 border-[1px]"
                      : ""
                  } 
                  ${
                    activeTab === tab
                      ? "after:absolute after:bottom-[4px] after:left-[15%] after:w-[70%] after:h-0.5 after:bg-sec"
                      : ""
                  }
                `}
                onClick={() => setActiveTab(tab)}
              >
                <Typography className="font-medium text-xs md:text-sm">
                  {tab}
                </Typography>
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </div>

      {activeTab === "Custom" && (
        <div className="mt-4 md:mt-6">
          <CustomDatePicker
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
            onClose={() => setActiveTab("All")}
            onApply={() => {}}
          />
        </div>
      )}

      <div className="flex mt-4 md:mt-6 flex-col">
        <Typography className="font-bold text-lg md:text-xl lg:text-2xl">
          Credit Report
        </Typography>
        <Typography variant="small" className="font-normal text-gray-600 mt-1">
          Summary of Credits extended and reports made.
        </Typography>
      </div>
    </section>
  );
};

export default CreditReportPageHeader;
