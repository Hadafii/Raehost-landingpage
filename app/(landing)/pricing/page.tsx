import { Metadata } from "next";

import PricingClient from "./components/Pricing";
// SEO Metadata untuk halaman Pricing
export const metadata: Metadata = {
  title:
    "Raehost - Harga Game Server Hosting Indonesia Murah | Mulai Rp 25.000",
  description:
    "Daftar harga game server hosting Raehost Indonesia. Paket mulai Rp 25.000/bulan dengan AMD EPYC, NVMe SSD, unlimited bandwidth, DDoS protection, dan 24/7 support.",
  keywords: [
    "harga game server hosting",
    "raehost pricing",
    "hosting game murah indonesia",
    "biaya server minecraft",
    "harga hosting game server",
    "paket hosting gaming",
    "server hosting terjangkau",
    "raehost harga",
    "game hosting price indonesia",
    "minecraft hosting price",
    "dedicated server price",
    "vps gaming harga",
  ],
  openGraph: {
    title:
      "Raehost - Harga Game Server Hosting Indonesia Murah | Mulai Rp 25.000",
    description:
      "Paket harga game server hosting Raehost mulai Rp 25.000/bulan. AMD EPYC, NVMe SSD, unlimited bandwidth, DDoS protection. Bandingkan paket sekarang!",
    type: "website",
    url: "https://raehost.com/pricing",
    // images: [
    //   {
    //     url: "https://raehost.com/assets/og/pricing-raehost.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Raehost Pricing - Harga Game Server Hosting Indonesia Murah",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raehost - Harga Game Server Hosting Murah | Mulai Rp 25.000",
    description:
      "Paket harga game server hosting Raehost mulai Rp 25.000/bulan. AMD EPYC, NVMe SSD, unlimited bandwidth, DDoS protection.",
    // images: ["https://raehost.com/assets/og/pricing-raehost.jpg"],
  },
  alternates: {
    canonical: "https://raehost.com/pricing",
  },
};

// Server Component untuk metadata dan import client
export default function PricingPage() {
  return <PricingClient />;
}
