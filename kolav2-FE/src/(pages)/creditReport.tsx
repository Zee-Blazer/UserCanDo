"use client";
import CreditReportPageHeader from "@/components/dashboard/creditReport/creditReportPageHeader";
import CreditReportStats from "@/components/dashboard/creditReport/creditReportStats";
import OverviewCreditReport from "@/components/dashboard/creditReport/overviewCreditReport";

const CreditReport = () => {
  return (
    <main className="border-[1px] border-gray_2 rounded-md p-4">
      <CreditReportPageHeader />
      <CreditReportStats />
      <OverviewCreditReport />
    </main>
  );
};

export default CreditReport;
