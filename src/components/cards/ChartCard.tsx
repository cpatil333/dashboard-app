import type { Charts } from "../../types/charts";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SkeletonCard from "../skeleton/SkeletonCard";
import dashboardStyles from "../../module/dashboard.module.css";

type ChartdataTypes = {
  chartData: Charts[];
  loading: boolean;
  hasError: boolean;
};

const ChartCard = ({ chartData, loading, hasError }: ChartdataTypes) => {
  if (loading) {
    return (
      <div className={dashboardStyles.subContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }
  if (hasError) return <p>Unable to load chart data.</p>;
  return (
    <div>
      {chartData.length > 0 ? (
        <LineChart width={1000} height={400} data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />

          <Line type="monotone" dataKey="sales" stroke="#387908" />
        </LineChart>
      ) : (
        <p>No sales data available</p>
      )}
    </div>
  );
};

export default ChartCard;
