import React from "react";
import { File } from "@phosphor-icons/react";
import { Typography } from "@material-tailwind/react";
import IconContainer from "@/components/General/iconContainer";

const AppraiserInformation = () => {
  const appraisalData = [
    {
      title: "1. Details on Improvements/Updates made to the property",
      items: [
        "Description",
        "Dates implemented - Started & Completed",
        "Before and After Images",
        "Costs - Receipts",
        "Permits",
      ],
    },
    {
      title: "2. Property Information",
      items: [
        "Geological survey of the property (if provided when the property was acquired)",
        "Soil Reports",
        "Flood Information",
        "Septic Reports",
        "Blueprints/Plans/specs - floorplan (if available)",
        "Copy or link to the Covenants, conditions, and restrictions (CC&R) if applicable to the subdivision or community",
        "Information about the homeowner's association",
      ],
    },
    {
      title: "3. Type of Property",
      items: ["Single Family Vs. Condominium"],
    },
    {
      title: "4. Condominium Requirements",
      items: [
        "Information about the homeowner's association",
        "Monthly fees",
        "List of common elements and/or recreation facilities",
        "Fannie Mae and Freddie Mac Requirements",
        "Information about special assessments (the amount for which the owner is responsible, and what the assessment covers) is also helpful.",
      ],
    },
    {
      title: "5. Actual condominium documents (if available)",
      items: ["provided to to the appraiser or lender (If Available)"],
    },
    {
      title:
        "6. A link to where the documents may be recorded in the public records",
      items: ["would be useful to the homeowner, appraiser, and lender."],
    },
    {
      title: "7. Document Format Required",
      items: [
        "Link to an online folder with all the documents.",
        "Option to Print paper files,",
      ],
    },
  ];

  return (
    <div className="rounded-xl bg-lightBg dark:bg-darkBg min-h-[524px] h-full p-4 flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-4">
          <IconContainer icon={<File />} />
          <Typography className="text-black dark:text-white text-xl font-medium">
            Requirements
          </Typography>
        </div>
      </div>

      <div className="flex flex-col p-4 gap-4 max-h-96 bg-lightBg dark:bg-darkBg overflow-y-auto">
        {appraisalData.map((section, index) => (
          <div key={index}>
            <Typography className="text-primary text-lg font-semibold mb-2">
              {section.title}
            </Typography>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              {section.items.map((item, idx) => (
                <li key={idx} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppraiserInformation;
