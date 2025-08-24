import { useTheme } from "../context/ThemeContext";

export const ThemeToggle = () => {
  const { mode, setTheme, theme } = useTheme(); 

  return (
    <div className="theme-toggle" title={`Tema actual: ${mode} (${theme})`}>
      <button
        className={`tt-btn ${mode === "light" ? "active" : ""}`}
        onClick={() => setTheme("light")}
        aria-pressed={mode === "light"}
        aria-label="Tema claro"
      >☀️</button>

      <button
        className={`tt-btn ${mode === "dark" ? "active" : ""}`}
        onClick={() => setTheme("dark")}
        aria-pressed={mode === "dark"}
        aria-label="Tema oscuro"
      >🌙</button>

      <button
        className={`tt-btn ${mode === "system" ? "active" : ""}`}
        onClick={() => setTheme("system")}
        aria-pressed={mode === "system"}
        aria-label="Usar tema del sistema"
      >🖥️</button>
    </div>
  );
};
