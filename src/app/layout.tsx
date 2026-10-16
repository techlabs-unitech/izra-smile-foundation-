import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { siteImages } from "@/data/images";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;
const siteTitle = "Izra Smile Foundation | Bringing Hope, Creating Smiles, Changing Lives";
const siteDescription =
  "Izra Smile Foundation is a Section 8 non-profit working toward the welfare and support of vulnerable and underserved communities, including children, women, elderly people, people with disabilities, cancer patients, disadvantaged families, and street animals. Bringing Hope • Creating Smiles • Changing Lives.";

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Izra Smile Foundation",
  keywords: [
    "Izra Smile Foundation",
    "Section 8 non-profit",
    "community welfare",
    "social support",
    "children and education",
    "healthcare support",
  ],
  authors: [{ name: "Izra Smile Foundation" }],
  creator: "Izra Smile Foundation",
  publisher: "Izra Smile Foundation",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  ...(metadataBase ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Izra Smile Foundation",
    locale: "en_IN",
    type: "website",
    ...(metadataBase
      ? {
          url: "/",
          images: [
            {
              url: siteImages.hero,
              alt: "Community support and care",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: metadataBase ? "summary_large_image" : "summary",
    title: siteTitle,
    description: siteDescription,
    ...(metadataBase ? { images: [siteImages.hero] } : {}),
  },
  icons: {
    icon: siteImages.logo,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-slate-900">{children}</body>
    </html>
  );
}
