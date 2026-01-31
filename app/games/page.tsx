import { Metadata } from "next";

import GamesClient from "./components/GamesClient";
// SEO Metadata untuk halaman games
export const metadata: Metadata = {
  title:
    "Raehost - Game Server Hosting Indonesia Terbaik | Minecraft, Palworld, Rust",
  description:
    "Hosting game server Indonesia terpercaya dengan performa tinggi. Mendukung Minecraft, Palworld, Rust, Valheim, dan 50+ game lainnya. AMD EPYC, NVMe SSD, DDoS Protection, uptime 99.9%.",
  keywords: [
    "game server hosting indonesia",
    "minecraft server hosting",
    "palworld server hosting",
    "rust server hosting",
    "valheim server hosting",
    "raehost game hosting",
    "server game indonesia",
    "hosting minecraft murah",
    "game server terpercaya",
    "dedicated game server",
    "vps gaming indonesia",
    "server hosting gaming",
  ],
  openGraph: {
    title:
      "Raehost - Game Server Hosting Indonesia Terbaik | 50+ Game Supported",
    description:
      "Hosting game server Indonesia dengan performa tinggi untuk Minecraft, Palworld, Rust, dan 50+ game lainnya. AMD EPYC, NVMe SSD, DDoS Protection.",
    type: "website",
    url: "https://raehost.com/games",
    // images: [
    //   {
    //     url: "https://raehost.com/assets/og/games-raehost.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Raehost Game Server Hosting - Minecraft, Palworld, Rust Indonesia",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raehost - Game Server Hosting Indonesia Terbaik | 50+ Game",
    description:
      "Hosting game server Indonesia dengan performa tinggi untuk Minecraft, Palworld, Rust, dan 50+ game lainnya. AMD EPYC, NVMe SSD, DDoS Protection.",
    // images: ["https://raehost.com/assets/og/games-raehost.jpg"],
  },
  alternates: {
    canonical: "https://raehost.com/games",
  },
};

// Server Component untuk metadata dan import client
export default function GamesPage() {
  return <GamesClient />;
}
