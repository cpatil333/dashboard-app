import { fetchChartData } from "../api/chartApi";
import { useQuery } from "@tanstack/react-query";

export const useChartData = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  return { data, isLoading, isError };
};
