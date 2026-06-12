import AnalyticsChart from "@/components/General/analyticsChart";

const OverviewAnalytics = () => {
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
        series1: "Total sales value (GHS)",
        series2: "Total credit Extended (GHS)",
      }}
    />
  );
};

export default OverviewAnalytics;
