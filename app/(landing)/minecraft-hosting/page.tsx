import { Metadata } from "next";

import MinecraftHost from "./components/MinecraftHost";
// SEO Metadata untuk halaman Minecraft Hosting
export const metadata: Metadata = {
  title: "Raehost - Minecraft Server Hosting Indonesia Murah | 24/7 Support",
  description:
    "Minecraft server hosting Indonesia terbaik dengan harga terjangkau. Plugin support, mod support, 1-click install, backup otomatis, DDoS protection. Mulai dari Rp 25.000/bulan.",
  keywords: [
    "minecraft server hosting indonesia",
    "minecraft hosting murah",
    "server minecraft indonesia",
    "hosting minecraft terpercaya",
    "minecraft server rental",
    "raehost minecraft",
    "minecraft hosting 24/7",
    "minecraft server mod support",
    "minecraft plugin hosting",
    "minecraft bedrock hosting",
    "minecraft java hosting",
    "server minecraft murah",
  ],
  openGraph: {
    title:
      "Raehost - Minecraft Server Hosting Indonesia Murah | Mulai Rp 25.000",
    description:
      "Minecraft server hosting Indonesia terbaik dengan plugin/mod support, backup otomatis, dan DDoS protection. Mulai dari Rp 25.000/bulan dengan 24/7 support.",
    type: "website",
    url: "https://raehost.com/minecraft-hosting",
    // images: [
    //   {
    //     url: "https://raehost.com/assets/og/minecraft-raehost.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Raehost Minecraft Server Hosting Indonesia - Plugin & Mod Support",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raehost - Minecraft Server Hosting Indonesia Murah",
    description:
      "Minecraft server hosting Indonesia terbaik dengan plugin/mod support, backup otomatis, dan DDoS protection. Mulai dari Rp 25.000/bulan.",
    // images: ["https://raehost.com/assets/og/minecraft-raehost.jpg"],
  },
  alternates: {
    canonical: "https://raehost.com/minecraft-hosting",
  },
};

// Server Component untuk metadata dan import client
export default function MinecraftHostingPage() {
  return <MinecraftHost />;
}
