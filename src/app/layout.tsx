import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";

const jetJetBrains_Mono = JetBrains_Mono({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Aarish Ali - Front-end Developer based in Bengaluru, India",
  description:
    "I write code that writes code. Building interfaces where AI meets pixels.",
  openGraph: {
    type: "website",
    title: "Aarish Ali - Front-end Developer based in Bengaluru, India",
    description:
      "I write code that writes code. Building interfaces where AI meets pixels.",
    images: [
      {
        url: "/seo-image.jpg",
        alt: "Aarish Ali - Front-end Developer based in Bengaluru, India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarish Ali - Front-end Developer based in Bengaluru, India",
    description:
      "I write code that writes code. Building interfaces where AI meets pixels.",
    images: [
      {
        url: "/seo-image.jpg",
        alt: "Aarish Ali - Front-end Developer based in Bengaluru, India",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/favicons/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicons/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    apple: [
      {
        url: "/favicons/apple-touch-icon.png",
        sizes: "152x152",
      },
    ],
    shortcut: [
      {
        url: "/favicons/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetJetBrains_Mono.className} ${caveat.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
