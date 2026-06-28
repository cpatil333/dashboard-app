import { useState } from "react";
import "./App.css";
import Toast from "./components/toast/Toast";
import { useTheme } from "./hooks/useTheme";
import Dashboard from "./pages/Dashboard";

function App() {
  const { theme, setTheme } = useTheme();
  const [toast, setToast] = useState("");
  return (
    <>
      <div className={theme}>
        <Dashboard theme={theme} setTheme={setTheme} setToast={setToast} />
        {toast && <Toast message={toast} onClose={() => setToast("")} />}
      </div>
    </>
  );
}

export default App;
