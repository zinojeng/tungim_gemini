"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

/**
 * ThemeToggle — minimal hairline button. Sits in the Navbar utility row.
 * Switches Sun/Moon icon by current theme; aria-label flips with state.
 */
export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "切換成亮色模式" : "切換成深色模式"}
      title={isDark ? "亮色模式" : "深色模式"}
      className={
        "inline-flex h-8 w-8 items-center justify-center rounded-sm " +
        "border border-hair text-ink-muted transition-colors " +
        "hover:text-ink hover:border-ink/30 " +
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-editorial " +
        className
      }
    >
      {isDark ? (
        <Sun className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.5} />
      )}
    </button>
  );
}
