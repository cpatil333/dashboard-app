import { useState } from "react";
import "./App.css";
import Toast from "./components/toast/Toast";
import { useTheme } from "./hooks/useTheme";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import styles from "./module/dashboard.module.css";

function App() {
  const { theme, setTheme } = useTheme();
  const [toast, setToast] = useState("");

  return (
    <>
      <div className={theme}>
        <div className={styles.layout}>
          <Sidebar />
          <Dashboard theme={theme} setTheme={setTheme} setToast={setToast} />
          {toast && <Toast message={toast} onClose={() => setToast("")} />}
        </div>
      </div>
    </>
  );
}

export default App;
