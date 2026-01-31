import { Metadata } from "next";

import PrivacyPolicy from "./components/PrivacyPolicy";
// SEO Metadata untuk halaman Privacy Policy
export const metadata: Metadata = {
  title:
    "Raehost - Kebijakan Privasi Game Server Hosting Indonesia | Privacy Policy",
  description:
    "Kebijakan privasi Raehost Indonesia tentang perlindungan data pribadi pengguna game server hosting. Informasi pengumpulan, penggunaan, dan keamanan data customer.",
  keywords: [
    "kebijakan privasi raehost",
    "privacy policy raehost",
    "perlindungan data raehost",
    "keamanan data hosting",
    "privasi game server hosting",
    "gdpr compliance raehost",
    "data protection raehost",
    "privacy game hosting",
    "kebijakan data customer",
    "security policy raehost",
    "data privacy indonesia",
    "customer data protection",
  ],
  openGraph: {
    title: "Raehost - Kebijakan Privasi Game Server Hosting Indonesia",
    description:
      "Kebijakan privasi Raehost tentang perlindungan data pribadi pengguna game server hosting. Keamanan dan perlindungan data customer.",
    type: "website",
    url: "https://raehost.com/privacy-policy",
    // images: [
    //   {
    //     url: "https://raehost.com/assets/og/privacy-raehost.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Raehost Privacy Policy - Kebijakan Privasi Game Server Hosting",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raehost - Kebijakan Privasi Game Server Hosting",
    description:
      "Kebijakan privasi Raehost tentang perlindungan data pribadi pengguna game server hosting. Keamanan data customer.",
    // images: ["https://raehost.com/assets/og/privacy-raehost.jpg"],
  },
  alternates: {
    canonical: "https://raehost.com/privacy-policy",
  },
};

// Server Component untuk metadata dan import client
export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
