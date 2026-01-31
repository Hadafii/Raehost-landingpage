"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Home } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";

import { ThemeSwitch } from "@/components/theme-switch";

// Dynamically import FuzzyText to avoid SSR issues with canvas
const FuzzyText = dynamic(() => import("@/components/FuzzyText"), {
  ssr: false,
});

export default function NotFound() {
  const [hoverIntensity, setHoverIntensity] = useState(0.5);
  const [enableHover, setEnableHover] = useState(true);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fixed font size - tidak responsive
  const fontSize = "10rem"; // atau ukuran tetap lain yang Anda inginkan

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine text color based on theme
  const textColor = mounted && theme === "light" ? "#f43f5e" : "#f43f5e";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black flex flex-col items-center justify-center p-4">
      {/* Theme Switch in top right */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeSwitch />
      </div>

      {/* Navbar */}
      <header className="absolute top-0 left-0 right-0 py-4 px-6 flex justify-center">
        <Link href="/">
          <img
            alt="Raehost Logo"
            className="h-6 sm:h-8 w-auto dark:hidden"
            src="/assets/Raehost_Title_2_(dark).svg"
          />
          <img
            alt="Raehost Logo Dark"
            className="h-6 sm:h-8 w-auto hidden dark:inline"
            src="/assets/Raehost_Title_2.svg"
          />
        </Link>
      </header>

      <div className="mx-auto max-w-2xl w-full text-center">
        {/* Fuzzy Text 404 */}
        <div className="flex container justify-center mx-auto pe-4">
          {mounted && (
            <FuzzyText
              baseIntensity={0.2}
              color={textColor}
              enableHover={enableHover}
              fontSize={fontSize}
              hoverIntensity={hoverIntensity}
            >
              404
            </FuzzyText>
          )}
        </div>

        <h2 className="text-gray-800 dark:text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
          Halaman Tidak Ditemukan
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-sm sm:max-w-lg mx-auto px-2">
          Halaman yang Anda cari tidak tersedia. Mungkin telah dipindahkan atau
          dihapus.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-2">
          <Button
            className="flex items-center justify-center gap-2 min-h-[44px]"
            color="default"
            size="lg"
            variant="bordered"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5" />
            Kembali
          </Button>
        </div>

        <div className="flex justify-center mt-6 sm:mt-8">
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm px-2">
            Jika menurut Anda ini adalah kesalahan, silakan hubungi
            administrator.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-3 sm:py-4 px-6 text-center text-gray-500 dark:text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Raehost. All rights reserved.
      </footer>
    </div>
  );
}
