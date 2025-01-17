"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function NextThemeProvider({ children }: { children: React.ReactNode }) {

  const { mode, color, radius } = useSelector((state: any) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", color);
    document.documentElement.style.setProperty("--radius", radius);
  }, [color, radius]);

  return <ThemeProvider defaultTheme={mode} attribute="class">{children}</ThemeProvider>;
}
