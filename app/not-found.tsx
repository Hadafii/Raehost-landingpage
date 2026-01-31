"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import { Button, Card, CardBody } from "@heroui/react";
import { useTheme } from "next-themes";

import { ThemeSwitch } from "@/components/theme-switch";

// Dynamically import FuzzyText to avoid SSR issues with canvas
const FuzzyText = dynamic(() => import("@/components/FuzzyText"), {
  ssr: false,
});

// Daftar path yang sudah pindah ke clients.raehost.com
const MIGRATED_PATHS = [
  "/dashboard",
  "/new-order",
  "/history",
  "/server",
  "/tickets",
  "/calculator",
  "/checkout",
  "/account",
  "/profile",
  "/balance",
  "/login",
  "/register",
  "/reset-password",
  "/verify-email",
];

export default function NotFound() {
  const pathname = usePathname();
  const [hoverIntensity, setHoverIntensity] = useState(0.5);
  const [enableHover, setEnableHover] = useState(true);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [autoRedirect, setAutoRedirect] = useState(false);

  const fontSize = "10rem";

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if current path is a migrated path
  const isMigratedPath = MIGRATED_PATHS.some((path) =>
    pathname?.toLowerCase().startsWith(path.toLowerCase()),
  );

  // Construct the new URL for clients subdomain
  const clientsUrl = `https://clients.raehost.com${pathname || ""}`;

  // Auto redirect countdown
  useEffect(() => {
    if (isMigratedPath && autoRedirect && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isMigratedPath && autoRedirect && countdown === 0) {
      window.location.href = clientsUrl;
    }
  }, [countdown, autoRedirect, isMigratedPath, clientsUrl]);

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

      <div className="mx-auto max-w-3xl w-full text-center">
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

        {isMigratedPath ? (
          // Content for migrated paths
          <>
            <h2 className="text-gray-800 dark:text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
              Halaman Telah Pindah! 🚀
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 max-w-2xl mx-auto px-2">
              Kami telah memindahkan area klien ke domain yang lebih baik untuk
              pengalaman yang lebih optimal.
            </p>

            {/* Info Card */}
            <Card className="max-w-xl mx-auto mb-8 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border-2 border-rose-200 dark:border-rose-800">
              <CardBody className="p-6">
                <div className="flex items-start gap-3 text-left">
                  <div className="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-lg mt-1">
                    <ExternalLink className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Domain Baru Kami
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Semua fitur dashboard, server, order, dan akun sekarang
                      dapat diakses melalui:
                    </p>
                    <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-rose-200 dark:border-rose-800">
                      <code className="text-sm font-mono text-rose-600 dark:text-rose-400 break-all">
                        {clientsUrl}
                      </code>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 px-2">
              <Button
                as="a"
                href={clientsUrl}
                className="flex items-center justify-center gap-2 min-h-[44px] bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                size="lg"
                onClick={() => setAutoRedirect(true)}
              >
                {autoRedirect && countdown > 0 ? (
                  <>Redirect dalam {countdown}s...</>
                ) : (
                  <>
                    Pergi ke Domain Baru
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>

              <Button
                as="a"
                href="/"
                className="flex items-center justify-center gap-2 min-h-[44px]"
                color="default"
                size="lg"
                variant="bordered"
              >
                <ArrowLeft className="h-5 w-5" />
                Kembali ke Beranda
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 max-w-xl mx-auto">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Tips:</strong> Bookmark domain baru kami untuk akses
                lebih cepat ke dashboard dan server Anda!
              </p>
            </div>
          </>
        ) : (
          // Content for regular 404
          <>
            <h2 className="text-gray-800 dark:text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
              Halaman Tidak Ditemukan
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-sm sm:max-w-lg mx-auto px-2">
              Halaman yang Anda cari tidak tersedia. Mungkin telah dipindahkan
              atau dihapus.
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

              <Button
                as="a"
                href="/"
                className="flex items-center justify-center gap-2 min-h-[44px]"
                color="primary"
                size="lg"
              >
                Ke Beranda
              </Button>
            </div>

            <div className="flex justify-center mt-6 sm:mt-8">
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm px-2">
                Jika menurut Anda ini adalah kesalahan, silakan hubungi
                administrator.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-3 sm:py-4 px-6 text-center text-gray-500 dark:text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Raehost. All rights reserved.
      </footer>
    </div>
  );
}
