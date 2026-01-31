"use client";

import { FC } from "react";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { Button } from "@heroui/button";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className = "" }) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Button
      isIconOnly
      size="sm"
      disableAnimation
      variant="light"
      onClick={toggleTheme}
      className={`relative flex items-center justify-center text-default-500 transition-opacity overflow-hidden ${className}`}
      aria-label={`Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`}
    >
      <SunFilledIcon
        size={20}
        className={`absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === "light" || isSSR
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-50 translate-y-5 opacity-0"
        }`}
      />
      <MoonFilledIcon
        size={20}
        className={`absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === "dark" && !isSSR
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-50 translate-y-5 opacity-0"
        }`}
      />
    </Button>
  );
};
