"use client";
import ExpensesPage from "@/app/(pages)/expenses";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const query = useSearchParams();
  const renId = query.get("id")?.trim() || "";

  return <ExpensesPage id={renId} />;
};

export default Page;
