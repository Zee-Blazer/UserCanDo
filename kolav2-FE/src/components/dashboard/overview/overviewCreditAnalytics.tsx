import AnalyticsChart from "@/components/General/analyticsChart";

const OverviewCreditAnalytics = () => {
  const data = {
    series1: [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
    series2: [420, 420, 420, 420, 420, 420, 420, 420, 420, 420, 420, 420],
  };

  return (
    <AnalyticsChart
      title="Business Details And Analytics"
      subtitle="High level statistics across all businesses"
      initialStartDate="2022-01"
      initialEndDate="2022-12"
      seriesData={data}
      seriesNames={{
        series1: "Total credit extended (GHS)",
        series2: "Total credit recovered (GHS)",
      }}
    />
  );
};

export default OverviewCreditAnalytics;
