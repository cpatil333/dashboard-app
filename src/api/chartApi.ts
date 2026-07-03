import chartData from "../data/chartdata.json";
import { type Charts } from "../types/charts";

export const fetchChartData = async (): Promise<Charts[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return chartData;
};
