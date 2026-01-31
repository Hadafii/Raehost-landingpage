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
} from "@heroui/react";
import { usePathname } from "next/navigation";

import { GithubIcon, DiscordIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

interface AppNavbarProps {
  activePage?: string;
}

export default function AppNavbar({ activePage }: AppNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Games", href: "/games" },
    { name: "Pricing", href: "/pricing" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Bantuan", href: "/contact" },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // threshold scrollY
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (item: { name: string; href: string }) => {
    // If activePage prop is provided directly
    if (activePage) {
      // For home page
      if (item.href === "/" && activePage === "Home") {
        return true;
      }

      // For other pages
      return activePage === item.name;
    }

    // If no activePage prop, rely on pathname
    if (item.href === "/") {
      return pathname === "/";
    }

    // Check if current path matches or starts with the href
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <Navbar
      className={`sticky top-0 left-0 right-0 z-50 transition-colors duration-300 ${"backdrop-blur-md bg-white/5 dark:bg-black/30"}`}
      isBlurred={true}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex items-center">
          <Link className="flex items-center" href="/">
            <Image
              priority
              alt="Raehost Logo"
              className="h-8 w-auto dark:hidden"
              height={32}
              src="/assets/Raehost_Title_2_(dark).svg"
              width={120}
            />
          </Link>

          {/* Dark mode logo */}
          <Link className="flex items-center" href="/">
            <Image
              priority
              alt="Raehost Logo Dark"
              className="h-8 w-auto hidden dark:inline"
              height={32}
              src="/assets/Raehost_Title_2.svg"
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
          <Link aria-label="Discord" href="#">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="https://clients.raehost.com/login"
            variant="flat"
          >
            Dashboard
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link
              className="w-full"
              color={isActive(item) ? "primary" : "foreground"}
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <ThemeSwitch />
      </NavbarMenu>
    </Navbar>
  );
}
