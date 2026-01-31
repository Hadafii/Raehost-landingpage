import { Metadata } from "next";

import ContactClient from "./components/Contact";
// SEO Metadata untuk halaman Contact
export const metadata: Metadata = {
  title: "Raehost - Kontak & Support Game Server Hosting Indonesia | 24/7 Help",
  description:
    "Hubungi tim support Raehost Indonesia 24/7. Live chat, WhatsApp, email, dan Discord support untuk game server hosting. Respon cepat dalam 5 menit untuk bantuan teknis.",
  keywords: [
    "kontak raehost",
    "support raehost",
    "customer service raehost",
    "bantuan game server hosting",
    "live chat raehost",
    "whatsapp raehost",
    "support 24/7 hosting",
    "technical support indonesia",
    "hubungi raehost",
    "help desk gaming",
    "contact game hosting",
    "raehost customer support",
  ],
  openGraph: {
    title: "Raehost - Kontak & Support Game Server Hosting Indonesia | 24/7",
    description:
      "Hubungi tim support Raehost Indonesia 24/7. Live chat, WhatsApp, email, Discord untuk bantuan game server hosting. Respon cepat dalam 5 menit.",
    type: "website",
    url: "https://raehost.com/contact",
    // images: [
    //   {
    //     url: "https://raehost.com/assets/og/contact-raehost.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Raehost Contact Support - 24/7 Game Server Hosting Indonesia",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raehost - Kontak & Support 24/7 Game Server Hosting",
    description:
      "Hubungi tim support Raehost Indonesia 24/7. Live chat, WhatsApp, email, Discord untuk bantuan game server hosting.",
    // images: ["https://raehost.com/assets/og/contact-raehost.jpg"],
  },
  alternates: {
    canonical: "https://raehost.com/contact",
  },
};

// Server Component untuk metadata dan import client
export default function ContactPage() {
  return <ContactClient />;
}
