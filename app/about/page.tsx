import { Metadata } from "next";

import AboutClient from "./components/AboutClient";

// SEO Metadata untuk halaman About
export const metadata: Metadata = {
  title:
    "Tentang Raehost - Tim Passionate Gamers Behind Game Server Hosting Terbaik",
  description:
    "Kenali tim passionate gamers di balik Raehost. Dari gamer untuk gamer, kami membangun infrastruktur hosting game server terbaik Indonesia dengan teknologi AMD EPYC dan uptime 99.9%.",
  keywords: [
    "tentang raehost",
    "raehost",
    "tim raehost",
    "game hosting indonesia",
    "server hosting terpercaya",
    "founder raehost",
    "cerita raehost",
    "visi misi raehost",
    "Siapa Raehost",
    "Apa itu Raehost",
  ],
  openGraph: {
    title:
      "Tentang Raehost - Tim Passionate Gamers Behind Game Server Hosting Terbaik",
    description:
      "Kenali tim passionate gamers di balik Raehost. Dari gamer untuk gamer, kami membangun infrastruktur hosting game server terbaik Indonesia.",
    type: "website",
    url: "https://raehost.com/about",
    // images: [
    //   {
    //     url: "/assets/seo/about-og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Tim Raehost - Game Server Hosting Indonesia",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Raehost - Tim Passionate Gamers",
    description:
      "Kenali tim passionate gamers di balik Raehost. Dari gamer untuk gamer, kami membangun infrastruktur hosting game server terbaik Indonesia.",
    // images: ["/assets/seo/about-twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://raehost.com/about",
  },
};

// Server Component untuk metadata dan import client
export default function AboutPage() {
  return <AboutClient />;
}
