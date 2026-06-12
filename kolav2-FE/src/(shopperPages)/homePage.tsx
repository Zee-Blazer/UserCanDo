"use client";
import HeaderComp from "@/components/shopperHome/headerComp";
import Vendors from "@/components/shopperHome/vendors";
import NewDeals from "@/components/shopperHome/newDeals";
import TopCategories from "@/components/shopperHome/topCategories";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderComp />
      <Vendors />
      <NewDeals />
      <TopCategories />
    </div>
  );
};

export default HomePage;
