import { useEffect, useState } from "react";
import chartdata from "../data/chartdata.json";
import type { Charts } from "../types/charts";

export const useChartData = () => {
  const [data, setData] = useState<Charts[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, sethasError] = useState(false);

  const fetchData = async () => {
    try {
      setTimeout(() => {
        setData(chartdata);
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        sethasError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { data, loading, hasError };
};
