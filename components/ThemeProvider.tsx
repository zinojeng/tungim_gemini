"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "mednote-theme";

/**
 * ThemeProvider — single source of truth for light/dark.
 *
 * Why not `next-themes`? We want to stay dependency-light; the FOUC bootstrap
 * already lives in app/layout.tsx as an inline <script>, so all this provider
 * has to do is read the class that was set pre-paint and expose a toggle.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // `undefined` until we hydrate to avoid mismatch flicker.
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setThemeState(isDark ? "dark" : "light");
    setMounted(true);
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private-browsing / storage disabled — fall back to in-memory only */
    }
  }, []);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      applyTheme(next);
    },
    [applyTheme]
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // If the user hasn't explicitly chosen, follow OS theme changes live.
  useEffect(() => {
    if (\!mounted) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (\!localStorage.getItem(STORAGE_KEY)) {
          setTheme(e.matches ? "dark" : "light");
        }
      } catch {
        /* noop */
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mounted, setTheme]);

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (\!ctx) {
    // Fallback — if a component is rendered outside the provider (e.g.
    // server component), return a no-op so nothing crashes.
    return {
      theme: "light",
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
  return ctx;
}
