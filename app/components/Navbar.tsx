"use client";
import React from "react";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Divider,
} from "@heroui/react";
import { usePathname } from "next/navigation";
import {
  Home,
  GamepadIcon,
  TagIcon,
  GraduationCap,
  HelpCircle,
} from "lucide-react";

import { GithubIcon, DiscordIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

interface AppNavbarProps {
  isTransparent?: boolean;
}

export default function AppNavbar({ isTransparent = false }: AppNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Games", href: "/games", icon: <GamepadIcon size={20} /> },
    { name: "Pricing", href: "/pricing", icon: <TagIcon size={20} /> },
    {
      name: "Tutorials",
      href: "/tutorials",
      icon: <GraduationCap size={20} />,
    },
    { name: "Bantuan", href: "/contact", icon: <HelpCircle size={20} /> },
    {
      name: "Discord",
      href: siteConfig.links.discord,
      icon: <DiscordIcon size={20} />,
    },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (item: {
    name: string;
    href: string;
    icon?: React.ReactNode;
  }) => {
    // Exact match untuk home page
    if (item.href === "/") {
      return pathname === "/";
    }

    // Untuk halaman lain, cek apakah pathname dimulai dengan href
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <>
      <Navbar
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isTransparent
            ? "backdrop-blur-md bg-white/5 dark:bg-black/30" // Persis seperti navbartrans.tsx
            : scrolled
              ? "backdrop-blur-md bg-white/30 dark:bg-black/30"
              : "!bg-white dark:!bg-black !backdrop-blur-none"
        }`}
        isBlurred={true}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Rest of your navbar code remains the same */}
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="flex items-center">
            {/* <Link className="flex items-center" href="/">
              <Image
                priority
                alt="Raehost Logo"
                className="h-8 w-auto dark:hidden"
                height={32}
                src="/assets/Raehost_Title_2_(dark).svg"
                style={{ height: "auto", width: "auto" }}
                width={120}
              />
            </Link>

            <Link className="flex items-center" href="/">
              <Image
                priority
                alt="Raehost Logo Dark"
                className="h-8 w-auto hidden dark:inline"
                height={32}
                src="/assets/Raehost_Title_2.svg"
                style={{ height: "auto", width: "auto" }}
                width={120}
              />
            </Link> */}

            <Link className="flex items-center" href="/">
              <Image
                priority
                alt="Raehost Logo Dark"
                className="h-8 w-auto  "
                height={32}
                src="/assets/Raehost_Title_2.svg"
                style={{ height: "auto", width: "auto" }}
                width={120}
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.name} isActive={isActive(item)}>
              <Link
                className={isActive(item) ? "font-medium" : ""}
                color={isActive(item) ? "primary" : "foreground"}
                href={item.href}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex gap-2">
            <Link
              aria-label="Discord"
              href={siteConfig.links.discord}
              target="_blank"
            >
              <DiscordIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="Github"
              href={siteConfig.links.github}
              target="_blank"
            >
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch className="text-default-500" />
          </NavbarItem>
          <NavbarItem className="flex gap-2">
            <div className="flex md:hidden ">
              <Link
                aria-label="Discord"
                href={siteConfig.links.discord}
                target="_blank"
              >
                <DiscordIcon className="text-default-500" />
              </Link>
            </div>
            <Button
              as={Link}
              color="primary"
              href="https://clients.raehost.com"
              variant="flat"
            >
              Dashboard
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu
          className={`${
            isTransparent
              ? "backdrop-blur-md bg-white/5 dark:bg-black/30" // Konsisten dengan navbar utama
              : scrolled
                ? "backdrop-blur-md bg-white/30 dark:bg-black/30"
                : "!bg-white dark:!bg-black !backdrop-blur-none"
          }`}
        >
          <div className="flex flex-col ">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <NavbarMenuItem key={item.name}>
                  <Link
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item)
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-default-100"
                    }`}
                    color={isActive(item) ? "primary" : "foreground"}
                    href={item.href}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </NavbarMenuItem>
              ))}
            </div>

            <Divider className="my-4" />

            <div className="mt-auto mb-12 flex flex-col gap-4 ">
              <Button
                as={Link}
                className="w-full"
                color="primary"
                href="/login"
                size="lg"
              >
                Dashboard
              </Button>
              <div className="flex justify-center mt-4">
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </NavbarMenu>
      </Navbar>
    </>
  );
}
