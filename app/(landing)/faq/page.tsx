import { Metadata } from "next";

import FaqPage from "./components/FAQ";
// SEO Metadata untuk halaman FAQ
export const metadata: Metadata = {
  title:
    "Raehost - FAQ Game Server Hosting Indonesia | Panduan & Troubleshooting",
  description:
    "Pertanyaan yang sering diajukan tentang game server hosting Raehost. Panduan setup Minecraft, troubleshooting, billing, teknis, dan tips optimasi server gaming.",
  keywords: [
    "faq raehost",
    "pertanyaan game server hosting",
    "panduan minecraft server",
    "troubleshooting game server",
    "raehost help",
    "cara setup server minecraft",
    "masalah server gaming",
    "billing raehost",
    "technical support faq",
    "game hosting guide",
    "minecraft hosting help",
    "server optimization tips",
  ],
  openGraph: {
    title: "Raehost - FAQ Game Server Hosting Indonesia | Panduan Lengkap",
    description:
      "Pertanyaan yang sering diajukan tentang game server hosting Raehost. Panduan setup, troubleshooting, billing, dan tips optimasi server gaming.",
    type: "website",
    url: "https://raehost.com/faq",
    // images: [
    //   {
    //     url: "https://raehost.com/assets/og/faq-raehost.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Raehost FAQ - Panduan Game Server Hosting Indonesia",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raehost - FAQ Game Server Hosting Indonesia",
    description:
      "Pertanyaan yang sering diajukan tentang game server hosting Raehost. Panduan setup, troubleshooting, dan tips optimasi.",
    // images: ["https://raehost.com/assets/og/faq-raehost.jpg"],
  },
  alternates: {
    canonical: "https://raehost.com/faq",
  },
};

// Server Component untuk metadata dan import client
export default function FAQPage() {
  return <FaqPage />;
}
