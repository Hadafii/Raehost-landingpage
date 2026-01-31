// Footer.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import Image from "next/image";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Newsletter form state
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dangerousChars = /[<>'"\\;(){}[\]]/;

    return (
      emailRegex.test(email) &&
      !dangerousChars.test(email) &&
      email.length <= 150
    );
  };

  // Handle input change with sanitization
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Sanitize input untuk prevent XSS
    const sanitizedValue = DOMPurify.sanitize(rawValue);

    setEmail(sanitizedValue);
  };

  // Handle newsletter submission
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setMessage("Mohon masukkan alamat email");
      setMessageType("error");

      return;
    }

    // Client-side validation
    if (!validateEmail(trimmedEmail)) {
      setMessage(
        "Format email tidak valid atau mengandung karakter yang tidak diizinkan"
      );
      setMessageType("error");

      return;
    }

    setIsLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await axios.post(
        "/api/newsletter",
        {
          email: trimmedEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      setMessage(response.data.message);
      setMessageType("success");
      setEmail(""); // Clear form on success
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setMessage(error.response.data.error || error.response.data.message);
          setMessageType(error.response.status === 409 ? "success" : "error");
        } else if (error.request) {
          setMessage("Koneksi bermasalah. Silakan coba lagi nanti.");
          setMessageType("error");
        } else {
          setMessage("Terjadi kesalahan. Silakan coba lagi nanti.");
          setMessageType("error");
        }
      } else {
        setMessage("Terjadi kesalahan. Silakan coba lagi nanti.");
        setMessageType("error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-black  transition-colors z-10">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and about section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            {" "}
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 mr-2 relative">
                <Image
                  fill
                  alt="Raehost Logo"
                  className="dark:hidden object-contain"
                  src="/assets/Raehost_logo_(dark).svg"
                />
                <Image
                  fill
                  alt="Raehost Logo"
                  className="hidden dark:block object-contain"
                  src="/assets/Raehost_logo.svg"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Raehost
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Solusi server game terbaik untuk komunitas gaming Indonesia.
              Performa tinggi, harga bersahabat.
            </p>
            <div className="flex space-x-3">
              <a
                className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                href="https://twitter.com/raehost"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                className="text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                href="https://discord.gg/c8zC5Qfkvh"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </a>
              <a
                className="text-gray-500 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
                href="https://instagram.com/raehost"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clipRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <span className="text-xs text-default-500">
              Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257
            </span>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Layanan
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                  href="/games"
                >
                  Game Servers
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                  href="/minecraft-hosting"
                >
                  Minecraft Hosting
                </Link>
              </li>
            </ul>
          </div>

          {/* Company info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Perusahaan
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                  href="/about"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                  href="/contact"
                >
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                  href="/faq"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                  href="https://status.raehost.com"
                  target="_blank"
                >
                  Status Layanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Newsletter
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Dapatkan update dan promo terbaru dari kami.
            </p>
            <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  required
                  autoComplete="email"
                  disabled={isLoading}
                  maxLength={150}
                  placeholder="Email kamu"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Button
                  className="min-w-[100px]"
                  disabled={isLoading || !email.trim()}
                  type="submit"
                  variant="ghost"
                >
                  {isLoading ? "Loading..." : "Subscribe"}
                </Button>
              </div>

              {/* Message display */}
              {message && (
                <div
                  className={`text-sm p-2 rounded ${
                    messageType === "success"
                      ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20"
                      : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/20"
                  }`}
                >
                  {message}
                </div>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Kami tidak akan membagikan email kamu dengan siapapun. Baca{" "}
                <Link
                  className="text-primary hover:underline"
                  href="/terms-of-service"
                >
                  Kebijakan Privasi
                </Link>{" "}
                kami.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom section with copyright and links */}
      <div className="border-t border-gray-200 dark:border-gray-800 transition-colors">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} Raehost. All rights reserved.
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                href="/terms-of-service"
              >
                Terms of Service
              </Link>
              <Link
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
