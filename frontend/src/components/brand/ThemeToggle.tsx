"use client";

import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn("header-theme-toggle", className)}
      aria-label={isDark ? t.common.themeLight : t.common.themeDark}
      title={isDark ? t.common.themeLight : t.common.themeDark}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
