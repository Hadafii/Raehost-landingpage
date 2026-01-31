import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { fontFigtree } from "@/config/fonts";

// SEO Configuration yang comprehensive
const seoConfig = {
  siteName: "Raehost",
  title: "Raehost - Game Server Hosting Terbaik Indonesia",
  description:
    "Hosting game server terbaik di Indonesia. Deploy server dalam hitungan detik dengan performa tinggi, harga terjangkau, dan support 24/7. Uptime 99.9% guaranteed!",
  keywords: [
    // Primary Keywords
    "raehost",
    "raehost.com",
    "game server hosting",
    "minecraft server hosting",
    "hosting game indonesia",

    // Location-based Keywords
    "game server hosting indonesia",
    "minecraft hosting indonesia",
    "server hosting murah",
    "hosting minecraft murah",
    "server minecraft indonesia",
    "server hosting indonesia",
    "hosting server indonesia",
    "hosting game server indonesia",
    "hosting minecraft indonesia",
    "hosting server murah indonesia",
    "hosting server indonesia murah",
    "hosting server indonesia terbaik",
    "hosting server indonesia cepat",
    "hosting minecraft server",
    "hosting minecraft server indonesia",
    "hosting server minecraft indonesia",
    "minecraft server hosting indonesia",
    "minecraft server hosting",
    "minecraft hosting murah",
    "minecraft hosting server",
    "minecraft hosting",
    "minecraft server indonesia",
    "server minecraft",
    "buat server minecraft",
    "buat server minecraft indonesia",
    "buat server minecraft murah",
    "server minecraft murah",
    "server minecraft cepat",
    "server minecraft",

    // Game-specific Keywords
    "minecraft server indonesia",

    // Technical Keywords
    "ssd game hosting",
    "nvme server hosting",
    "amd epyc hosting",
    "unlimited slots server",
    "backup server hosting",

    // Commercial Keywords
    "cheap game hosting",
    "affordable minecraft hosting",
    "best game server provider",
    "server hosting terpercaya",
    "hosting game terbaik",
    "hosting game termurah",
    "promo hosting server",
    "diskon server hosting",
    "trial hosting gratis",
  ],
  url: "https://raehost.com",
  image: "/assets/seo/raehost-og-image.jpg",
  favicon: "/favicon.ico",
  author: "Raehost Team",
  type: "website",
  locale: "id_ID",
  alternateLocales: ["en_US"],
};

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.url),
  title: {
    default: seoConfig.title,
    template: `%s | ${seoConfig.siteName} - Game Server Hosting Indonesia`,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.author, url: seoConfig.url }],
  creator: seoConfig.author,
  publisher: seoConfig.siteName,
  // Open Graph
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    alternateLocale: seoConfig.alternateLocales,
    url: seoConfig.url,
    siteName: seoConfig.siteName,
    title: seoConfig.title,
    description: seoConfig.description,
    images: [
      {
        url: seoConfig.image,
        width: 1200,
        height: 630,
        alt: `${seoConfig.siteName} - Game Server Hosting Terbaik Indonesia`,
        type: "image/jpeg",
      },
    ],
    emails: "support@raehost.com",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@raehos_id",
    creator: "@raehost",
    title: seoConfig.title,
    description: seoConfig.description,
    images: [seoConfig.image],
  },

  // Additional Meta Tags
  other: {
    // Geographic targeting
    "geo.region": "ID-JB",
    "geo.placename": "Bandung",
    "geo.position": "-6.9175;107.6191",
    ICBM: "-6.9175, 107.6191",

    // Business info
    "business:contact_data:locality": "Bandung",
    "business:contact_data:region": "Jawa Barat",
    "business:contact_data:country_name": "Indonesia",
    "business:contact_data:email": "support@raehost.com",

    // Content classification
    classification: "Gaming, Technology, Web Hosting",
    category: "Game Server Hosting Provider",
    coverage: "Indonesia",
    distribution: "Global",
    rating: "General",

    // Additional SEO
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },

  // App Links
  appLinks: {
    web: {
      url: seoConfig.url,
      should_fallback: true,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  // Web App Manifest
  manifest: "/site.webmanifest",

  // Sitemap and Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Sitemap reference
  alternates: {
    canonical: seoConfig.url,
    types: {
      "application/xml": `${seoConfig.url}/sitemap.xml`,
    },
  },

  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#006FEE" },
    { media: "(prefers-color-scheme: dark)", color: "#001731" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="id">
      <head>
        <link href="/sitemap.xml" rel="sitemap" type="application/xml" />

        {/* Additional favicon meta tags for better browser support */}
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />

        {/* Preload critical icons for better performance */}
        <link as="image" href="/favicon-32x32.png" rel="preload" />
        <link as="image" href="/apple-touch-icon.png" rel="preload" />

        {/* Web App Manifest */}
        <link href="/site.webmanifest" rel="manifest" />

        {/* PWA Meta Tags */}
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="default" name="apple-mobile-web-app-status-bar-style" />
        <meta content="Raehost" name="apple-mobile-web-app-title" />
        <meta content="Raehost" name="application-name" />
        <meta content="#006FEE" name="msapplication-TileColor" />
        <meta content="/browserconfig.xml" name="msapplication-config" />
      </head>
      <body
        className={clsx(
          "bg-background font-figtree antialiased transition-colors",
          fontFigtree.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
