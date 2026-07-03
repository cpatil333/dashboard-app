import { useState } from "react";
import Toast from "../components/toast/Toast";
import { useTheme } from "../hooks/useTheme";
import Dashboard from "../pages/Dashboard";

const DashboardLayout = () => {
  const { theme, setTheme } = useTheme();
  const [toast, setToast] = useState("");

  return (
    <>
      <Dashboard theme={theme} setTheme={setTheme} setToast={setToast} />

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </>
  );
};

export default DashboardLayout;
