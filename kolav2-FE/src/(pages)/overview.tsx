"use client";
import OverViewHeader from "@/components/dashboard/overview/overViewHeader";
import React, { useState } from "react";
import DashboardPanels from "@/components/General/dashboardPanels";
import GeneralOverviewSlide from "@/components/dashboard/overview/views/GeneralOverviewSlide";
import OverviewSalesView from "@/components/dashboard/overview/views/OverviewSalesView";
import OverviewCreditsView from "@/components/dashboard/overview/views/OverviewCreditsView";
import OverviewOrdersView from "@/components/dashboard/overview/views/OverviewOrdersView";

const OverviewDisplay = ({ selectedPanel }: { selectedPanel: string }) => {
  let view;

  switch (selectedPanel) {
    case "generalOverview":
      view = <GeneralOverviewSlide />;
      break;
    case "sales":
      view = <OverviewSalesView />;
      break;
    case "creditandrepayments":
      view = <OverviewCreditsView />;
      break;
    case "orders":
      view = <OverviewOrdersView />;
      break;
  }

  return <div>{view}</div>;
};

const OverviewPage = () => {
  const [selectedPanel, setSelectedPanel] = useState("generalOverview");
  const panels = [
    {
      title: "General Overview",
      slug: "generalOverview",
    },
    {
      title: "Sales",
      slug: "sales",
    },
    {
      title: "Credit and Repayments",
      slug: "creditandrepayments",
    },
    {
      title: "Orders",
      slug: "orders",
    },
  ];

  function handlePanelClick(slug: string) {
    setSelectedPanel(slug);
  }

  return (
    <main className="">
      <OverViewHeader />
      <DashboardPanels
        panelList={panels}
        selectedPanel={selectedPanel}
        onPanelClick={handlePanelClick}
      />
      <OverviewDisplay selectedPanel={selectedPanel} />
    </main>
  );
};

export default OverviewPage;
