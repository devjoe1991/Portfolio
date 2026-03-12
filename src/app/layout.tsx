import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://techpreneurjoe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TechpreneurJoe — Developer & Entrepreneur",
    template: "%s | TechpreneurJoe",
  },
  description:
    "Joe is a techpreneur — a developer and entrepreneur building products at the intersection of technology and business. Explore my projects, writing, and work.",
  keywords: [
    "techpreneur",
    "developer",
    "entrepreneur",
    "software engineer",
    "portfolio",
    "Joe",
    "TechpreneurJoe",
    "Next.js",
    "React",
    "full stack",
  ],
  authors: [{ name: "Joe", url: siteUrl }],
  creator: "Joe",
  publisher: "TechpreneurJoe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TechpreneurJoe",
    title: "TechpreneurJoe — Developer & Entrepreneur",
    description:
      "Joe is a techpreneur building products at the intersection of technology and business.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TechpreneurJoe — Developer & Entrepreneur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechpreneurJoe — Developer & Entrepreneur",
    description:
      "Joe is a techpreneur building products at the intersection of technology and business.",
    images: ["/og-image.png"],
    creator: "@techpreneurjoe",
  },
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <Header />
          <main className="pt-[57px] pb-[72px]">
            {children}
          </main>
          <TabBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
