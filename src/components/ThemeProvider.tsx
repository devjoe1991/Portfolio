"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "system", setTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");

  // On mount, read from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "dark" || stored === "light" || stored === "system") {
      setThemeState(stored);
    }
  }, []);

  // Apply data-theme to <html> whenever theme or system preference changes
  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    function apply() {
      if (theme === "system") {
        root.setAttribute("data-theme", mq.matches ? "dark" : "light");
      } else {
        root.setAttribute("data-theme", theme);
      }
    }

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("theme", t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
