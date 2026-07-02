import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aera One | Smart Air Purifier",
  description:
    "Premium smart air purifier featuring real-time PM2.5 monitoring, HEPA filtration, automatic purification, and intelligent app control.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aera One | Smart Air Purifier",
    description:
      "Premium smart air purifier featuring real-time PM2.5 monitoring, HEPA filtration, automatic purification, and intelligent app control.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aera One smart air purifier hero card",
      },
    ],
    locale: "en_US",
    siteName: "Aera One",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aera One | Smart Air Purifier",
    description:
      "Premium smart air purifier featuring real-time PM2.5 monitoring, HEPA filtration, automatic purification, and intelligent app control.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans text-foreground">{children}</body>
    </html>
  );
}
