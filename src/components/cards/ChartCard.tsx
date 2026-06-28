import type { Charts } from "../../types/charts";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartdataTypes = {
  chartData: Charts[];
  loading: boolean;
  hasError: boolean;
};

const ChartCard = ({ chartData, loading, hasError }: ChartdataTypes) => {
  if (loading) return <p>Loading chart...</p>;
  if (hasError) return <p>Unable to load chart data.</p>;
  return (
    <div>
      {chartData.length > 0 ? (
        <LineChart width={1000} height={400} data={chartData}>
          <XAxis dataKey="month" />
          <YAxis dataKey="sales" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="month" stroke="#ff7300" />
          <Line type="monotone" dataKey="sales" stroke="#387908" />
        </LineChart>
      ) : (
        <p>No sales data available</p>
      )}
    </div>
  );
};

export default ChartCard;
