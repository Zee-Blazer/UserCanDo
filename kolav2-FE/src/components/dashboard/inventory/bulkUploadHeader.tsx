import { Logs, UploadWhite } from "@/assets/svg";
import { ROUTES } from "@/constants/routes";
import { Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

const BulkUploadHeader = () => {
  return (
    <div className="px-4 py-3">
      <section>
        <Typography>
          Kola Market Place /
          <span className="font-medium text-black">Inventory</span>{" "}
        </Typography>
      </section>
      <section>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <Typography className="font-bold">
            Imports Products into Business Inventory
          </Typography>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Link href="/inventory-bulk-template.csv">
              <Button className="inline-flex items-center justify-center w-full md:w-40 whitespace-nowrap normal-case gap-2 text-white min-w-[200px] bg-[#027848] font-normal shadow-none hover:shadow-none py-3 px-4">
                <UploadWhite />
                <span className="truncate">Download Template</span>
              </Button>
            </Link>
            <Link href={ROUTES.inventoryLogs}>
              <Button className="flex border border-[#D0D5DD66] items-center justify-center normal-case gap-2 text-[#003366] bg-inherit font-medium shadow-none hover:shadow-none px-6 py-2">
                <Logs />
                <span>Import Logs</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BulkUploadHeader;
