"use client";
import { useState } from "react";
import BusinessHeader from "@/components/dashboard/businesses/businessHeader";
import BusinessTable from "@/components/dashboard/businesses/businessTable";
import { Typography } from "@material-tailwind/react";
import React from "react";
import AddBusinessFlyout from "@/components/dashboard/businesses/addBusinessFlyout";
import EditBusinessFlyout from "@/components/dashboard/businesses/EditBusinessFlyout";

const Businesses = () => {
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [businessDetails, setBusinessDetails] =
    useState<BusinessListProps | null>(null);

  return (
    <div>
      <BusinessHeader
        onClick={() => {
          setIsRightDrawerOpen(true);
        }}
      />
      <Typography className="font-semibold">Businesses</Typography>
      <BusinessTable
        onEditButtonClick={(data: BusinessListProps) => {
          setBusinessDetails(data);
          setIsEditDrawerOpen(true);
        }}
      />
      <AddBusinessFlyout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={() => {
          setIsRightDrawerOpen(false);
        }}
      />
      <EditBusinessFlyout
        isEditDrawerOpen={isEditDrawerOpen}
        closeFlyout={() => {
          setIsEditDrawerOpen(false);
        }}
        data={businessDetails || null}
      />
    </div>
  );
};

export default Businesses;
