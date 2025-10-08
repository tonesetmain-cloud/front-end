"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  ReactNode,
} from "react";
import "../styles/globals.css";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // Load saved theme or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Apply theme and log it
  useLayoutEffect(() => {
    // First remove any old theme classes if necessary
    document.body.classList.remove("light-theme", "dark-theme");

    // Then add the current theme class
    document.body.classList.add(
      theme === "light" ? "light-theme" : "dark-theme"
    );

    // Save to localStorage as before
    localStorage.setItem("theme", theme);

    console.log("Theme applied with class:", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be inside ThemeProvider");
  return context;
};
