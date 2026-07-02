"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "aera-theme";

type ThemeMode = "dark" | "light";

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const rootTheme = document.documentElement.dataset.theme;
    const initialTheme = rootTheme === "dark" ? "dark" : "light";

    setTheme(initialTheme);
    setIsReady(true);
  }, []);

  function handleToggle() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);
    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {}
  }

  const label = isReady
    ? theme === "light"
      ? "Enable dark mode"
      : "Enable light mode"
    : "Toggle color theme";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={theme === "dark"}
      className="interactive-lift relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-surface-strong/80 text-charcoal shadow-[0_12px_30px_rgba(17,52,61,0.08)] transition-colors duration-300 ease-out hover:bg-surface-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/70"
      onClick={handleToggle}
    >
      <SunMedium
        className={`h-5 w-5 transition-all duration-300 ${
          theme === "light" ? "scale-100 opacity-100" : "absolute scale-75 opacity-0"
        }`}
        aria-hidden="true"
      />
      <MoonStar
        className={`h-5 w-5 transition-all duration-300 ${
          theme === "dark" ? "scale-100 opacity-100" : "absolute scale-75 opacity-0"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
