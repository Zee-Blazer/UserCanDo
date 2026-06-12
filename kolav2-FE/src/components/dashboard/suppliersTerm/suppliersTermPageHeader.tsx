import { DownloadIcon } from "@/assets/svg";
import { colors } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import { Button, Typography } from "@material-tailwind/react";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import StatsHeader, { StatItem } from "./statsHeader";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";

interface SuppliersPageHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const SuppliersTermPageHeader = ({
  activeIndex,
  setActiveIndex,
}: SuppliersPageHeaderProps) => {
  const { loadSupplierTermsData } = useDash();
  const {
    suppliersTerms,
    approvedTerms,
    pendingTerms,
    declinedTerms,
    onHoldTerms,
    newTerms,
    recoveryWindowTerms,
    creditScore,
  } = useDashboardSelector();

  useEffect(() => {
    loadSupplierTermsData();
  }, [loadSupplierTermsData]);

  const stats: StatItem[] = useMemo(() => {
    const totalCredit =
      suppliersTerms?.reduce(
        (sum, term) => sum + (term.total_payable || 0),
        0
      ) || 0;
    const totalPaid =
      suppliersTerms?.reduce((sum, term) => {
        if (term.payment_status === "fully paid")
          return sum + (term.total_payable || 0);
        if (term.payment_status === "partially paid")
          return sum + (term.amount_paid || 0);
        return sum;
      }, 0) || 0;
    const totalOutstanding = totalCredit - totalPaid;
    const overdueCounts =
      suppliersTerms?.filter((term) => term.payment_status === "overdue") || [];
    const totalOverdue = overdueCounts.reduce(
      (sum, term) => sum + (term.total_payable || 0),
      0
    );

    return [
      {
        title: "Credit Score",
        value: creditScore?.score || 0,
        color: "#027A480D",
        textColor: "#027A48",
        iconColor: "#027A48",
      },
      {
        title: "Total Credit (GHS)",
        value: totalCredit,
        color: "#0033660D",
        textColor: "#003366",
        iconColor: "#003366",
      },
      {
        title: "Total Amount Paid (GHS)",
        value: totalPaid,
        color: "#027A480D",
        textColor: "#027A48",
        iconColor: "#027A48",
      },
      {
        title: "Amount Outstanding (GHS)",
        value: totalOutstanding,
        color: "#7A20020D",
        textColor: "#B42318",
        iconColor: "#B42318",
      },
      {
        title: "Amount Overdue (GHS)",
        value: totalOverdue,
        color: "#CA810A0D",
        textColor: "#DB8E0A",
        iconColor: "#DB8E0A",
      },
    ];
  }, [suppliersTerms]);

  const tabCounts = useMemo(() => {
    return {
      allRequests: suppliersTerms?.length || 0,
      new:
        newTerms?.length ||
        suppliersTerms?.filter(
          (term) => term.approval_status?.toLowerCase() === "new"
        )?.length ||
        0,
      approved:
        approvedTerms?.length ||
        suppliersTerms?.filter(
          (term) => term.approval_status?.toLowerCase() === "approved"
        )?.length ||
        0,
      declined:
        declinedTerms?.length ||
        suppliersTerms?.filter(
          (term) => term.approval_status?.toLowerCase() === "declined"
        )?.length ||
        0,
      onHold:
        onHoldTerms?.length ||
        suppliersTerms?.filter(
          (term) => term.approval_status?.toLowerCase() === "on hold"
        )?.length ||
        0,
      recoveryWindow:
        recoveryWindowTerms?.length ||
        suppliersTerms?.filter(
          (term) => term.payment_status?.toLowerCase() === "overdue"
        )?.length ||
        0,
    };
  }, [
    suppliersTerms,
    approvedTerms,
    pendingTerms,
    declinedTerms,
    onHoldTerms,
    newTerms,
    recoveryWindowTerms,
  ]);

  const btnTexts = [
    { label: "Overview" },
    { label: "All Request", count: tabCounts.allRequests },
    { label: "New", count: tabCounts.new },
    { label: "Approved", count: tabCounts.approved },
    { label: "Declined", count: tabCounts.declined },
    { label: "On Hold", count: tabCounts.onHold },
    { label: "Recovery Window", count: tabCounts.recoveryWindow },
  ];

  return (
    <main className="p-4">
      <Typography variant="small">
        Kola Market / <span className="font-medium">Credit Request</span>
      </Typography>

      <div className="flex flex-col md:flex-row my-4 md:justify-between lg:items-center gap-4">
        <Typography className="font-bold"> Credit Request</Typography>
        <div className="flex items-center flex-wrap gap-4">
          <Button className="flex items-center justify-center normal-case gap-1 text-gray_4 bg-transparent font-normal shadow-none p-0 hover:shadow-none">
            <DownloadIcon />
            <Typography className="text-sm">Download</Typography>
          </Button>
          <Link href={ROUTES.newCreditRequestOptions}>
            <Button className="flex items-center justify-center normal-case gap-1 text-sec bg-transparent font-normal shadow-none p-0 hover:shadow-none">
              <CirclePlus size={20} color={colors.sec} />
              <Typography className="text-sm">New Credit Request</Typography>
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full mb-6">
        <StatsHeader stats={stats} />
      </div>

      <div className="flex gap-4 border-b-[1px] border-b-gray_2 -mx-4 px-4 overflow-x-auto">
        {btnTexts.map((btn, index) => {
          return (
            <Button
              key={index}
              className={`normal-case bg-transparent font-normal shadow-none p-0 py-3 hover:shadow-none whitespace-nowrap ${
                activeIndex === index
                  ? "text-black border-b-sec"
                  : "text-gray_4 border-b-transparent"
              } border-b-2 rounded-none min-w-fit`}
              onClick={() => setActiveIndex(index)}
            >
              <Typography className="flex items-center gap-2 text-sm">
                {btn.label}
                {btn.count !== undefined && (
                  <span className="bg-gray_5 bg-opacity-10 rounded-full text-xs px-2 py-1 min-w-6 h-6 flex items-center justify-center text-gray_6 font-semibold">
                    {btn.count}
                  </span>
                )}
              </Typography>
            </Button>
          );
        })}
      </div>
    </main>
  );
};

export default SuppliersTermPageHeader;
