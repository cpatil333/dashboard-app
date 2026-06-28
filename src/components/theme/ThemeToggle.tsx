import styles from "../../module/dashboard.module.css";

type ThemeToggleProps = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setToast: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeToggle = ({ theme, setTheme, setToast }: ThemeToggleProps) => {
  const handleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    setToast(`Switched to ${newTheme} mode`);
  };

  return (
    <div>
      <button className={styles.themeBtn} onClick={handleTheme}>
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
  );
};

export default ThemeToggle;
