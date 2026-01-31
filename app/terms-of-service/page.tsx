import { Metadata } from "next";

import TermsService from "./components/TermsService";
// SEO Metadata untuk halaman Terms of Service
export const metadata: Metadata = {
  title: "Raehost - Syarat & Ketentuan Game Server Hosting Indonesia | ToS",
  description:
    "Syarat dan ketentuan layanan game server hosting Raehost Indonesia. Kebijakan penggunaan, hak dan kewajiban, billing, refund policy, dan aturan penggunaan server gaming.",
  keywords: [
    "syarat ketentuan raehost",
    "terms of service raehost",
    "tos game server hosting",
    "kebijakan raehost",
    "aturan penggunaan server",
    "refund policy raehost",
    "billing terms raehost",
    "legal raehost indonesia",
    "terms game hosting",
    "ketentuan layanan hosting",
    "policy game server",
    "agreement raehost",
  ],
  openGraph: {
    title: "Raehost - Syarat & Ketentuan Game Server Hosting Indonesia",
    description:
      "Syarat dan ketentuan layanan game server hosting Raehost Indonesia. Kebijakan penggunaan, billing, refund policy, dan aturan server gaming.",
    type: "website",
    url: "https://raehost.com/terms-of-service",
    // images: [
    //   {
    //     url: "https://raehost.com/assets/og/terms-raehost.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Raehost Terms of Service - Syarat Ketentuan Game Server Hosting",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raehost - Syarat & Ketentuan Game Server Hosting",
    description:
      "Syarat dan ketentuan layanan game server hosting Raehost Indonesia. Kebijakan penggunaan, billing, dan aturan server gaming.",
    // images: ["https://raehost.com/assets/og/terms-raehost.jpg"],
  },
  alternates: {
    canonical: "https://raehost.com/terms-of-service",
  },
};

// Server Component untuk metadata dan import client
export default function TermsOfServicePage() {
  return <TermsService />;
}
