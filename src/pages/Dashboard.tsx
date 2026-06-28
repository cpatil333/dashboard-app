import type React from "react";
import ChartCard from "../components/cards/ChartCard";
import StatsGrid from "../components/cards/StatsGrid";
import NotificationItem from "../components/notification/NotificationPanel/NotificationItem";
import DataTable from "../components/tables/DataTable/DataTable";
import ThemeToggle from "../components/theme/ThemeToggle";
import { useChartData } from "../hooks/useChartData";
import { useDataTable } from "../hooks/useDataTable";
import { useNotifications } from "../hooks/useNotifications";

const dashboardData = [
  { title: "Revenue", value: "₹25,000", trend: "-12%", icon: "💰" },
  { title: "Users", value: "1254", trend: "+15%", icon: "💰" },
  { title: "Orders", value: "320", trend: "-25%", icon: "💰" },
  { title: "Sales", value: "₹75,000", trend: "+45%", icon: "💰" },
];

type DashboardProps = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setToast: React.Dispatch<React.SetStateAction<string>>;
};

const Dashboard = ({ theme, setTheme, setToast }: DashboardProps) => {
  const { data, loading, hasError } = useChartData();
  const { notifications, notificationsLoading, notificationHasError } =
    useNotifications();
  const { dataTable, dataTableLoadering, dataTableHasError } = useDataTable();

  return (
    <div>
      <ThemeToggle theme={theme} setTheme={setTheme} setToast={setToast} />
      <StatsGrid dashboardData={dashboardData} />
      <ChartCard chartData={data} loading={loading} hasError={hasError} />
      <DataTable
        dataTable={dataTable}
        dataTableLoadering={dataTableLoadering}
        dataTableHasError={dataTableHasError}
      />
      <NotificationItem
        notifications={notifications}
        loading={notificationsLoading}
        hasError={notificationHasError}
      />
    </div>
  );
};

export default Dashboard;
