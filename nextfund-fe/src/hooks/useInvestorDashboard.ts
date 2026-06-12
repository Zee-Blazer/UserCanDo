import { useGetInvestorDashboardQuery } from "../queries/dashboardApi";

interface UseInvestorDashboardParams {
  start_date?: string | null;
  end_date?: string | null;
}

export const useInvestorDashboard = (
  dateRange?: UseInvestorDashboardParams
) => {
  const {
    data: dashboardData,
    isLoading: isLoadingDashboard,
    error: dashboardError,
    refetch: refetchDashboard,
  } = useGetInvestorDashboardQuery(
    {
      start_date: dateRange?.start_date || null,
      end_date: dateRange?.end_date || null,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const refreshData = () => {
    refetchDashboard();
  };

  return {
    dashboardData,
    isLoadingDashboard,
    dashboardError,
    refreshData,
  };
};
