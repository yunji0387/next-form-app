"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { themeIcons } from "@/public/themeIcons";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex">
      <button
        onClick={toggleTheme}
        className={`relative flex items-center w-16 h-8 rounded-full shadow border ${
          theme === "dark"
            ? "hover:bg-gray-600 border-white"
            : "hover:bg-indigo-50 border-gray-300"
        } transition-all duration-200 ease-in-out`}
      >
        <div
          className="absolute transition-transform duration-300 ease-in-out"
          style={{
            transform: theme === "dark" ? "translateX(3px)" : "translateX(33px)",
          }}
        >
          <Image
            src={theme === "dark" ? themeIcons.dark : themeIcons.light}
            alt={theme === "dark" ? "dark mode" : "light mode"}
            width={25}
            height={25}
            className="select-none"
          />
        </div>
      </button>
    </div>
  );
}
