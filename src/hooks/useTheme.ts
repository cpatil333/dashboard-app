import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// export const useTheme = () => {
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem("theme") || "light";
//   });

//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return { theme, setTheme };
// };

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
