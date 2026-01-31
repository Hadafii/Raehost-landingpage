import { Metadata } from "next";

import Tutorials from "./components/Tutorials";
// SEO Metadata untuk halaman Tutorials
export const metadata: Metadata = {
  title:
    "Raehost - Tutorial Game Server Hosting Indonesia | Setup & Konfigurasi",
  description:
    "Tutorial lengkap setup dan konfigurasi game server di Raehost. Panduan Minecraft server, plugin installation, mod setup, backup, security, dan optimasi performa server gaming.",
  keywords: [
    "tutorial game server hosting",
    "panduan minecraft server setup",
    "tutorial raehost",
    "cara install plugin minecraft",
    "setup mod minecraft server",
    "konfigurasi game server",
    "tutorial hosting gaming",
    "panduan server optimization",
    "minecraft server tutorial",
    "game hosting guide indonesia",
    "tutorial backup server",
    "security server gaming",
  ],
  openGraph: {
    title: "Raehost - Tutorial Game Server Hosting Indonesia | Setup Lengkap",
    description:
      "Tutorial lengkap setup dan konfigurasi game server di Raehost. Panduan Minecraft, plugin, mod, backup, security, dan optimasi performa.",
    type: "website",
    url: "https://raehost.com/tutorials",
    // images: [
    //   {
    //     url: "https://raehost.com/assets/og/tutorials-raehost.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Raehost Tutorials - Panduan Game Server Hosting Indonesia",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raehost - Tutorial Game Server Hosting Indonesia",
    description:
      "Tutorial lengkap setup dan konfigurasi game server di Raehost. Panduan Minecraft, plugin, mod, backup, dan optimasi.",
    // images: ["https://raehost.com/assets/og/tutorials-raehost.jpg"],
  },
  alternates: {
    canonical: "https://raehost.com/tutorials",
  },
};

// Server Component untuk metadata dan import client
export default function TutorialsPage() {
  return <Tutorials />;
}
