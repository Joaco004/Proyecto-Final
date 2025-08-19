import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
const THEME_KEY = "ui:theme";

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem(THEME_KEY) || "system");

  
  const systemPrefersDark = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  }, []);

  const theme = mode === "system" ? (systemPrefersDark ? "dark" : "light") : mode;

  
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
   
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);


  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);


  useEffect(() => {
    if (mode !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const t = media.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", t);
      document.documentElement.classList.toggle("dark", t === "dark");
    };
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, [mode]);

  const toggle = () => setMode((m) => (m === "light" ? "dark" : m === "dark" ? "system" : "light"));
  const setTheme = (t) => setMode(t);

  return (
    <ThemeContext.Provider value={{ mode, theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);