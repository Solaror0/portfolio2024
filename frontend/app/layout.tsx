import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jun Nur Mustaqeem's Portfolio!",
  description: "Created with Next.js",
  openGraph: {
    type: "website",
    url: "https://junnur.vercel.app",
    title: "Jun Nur's Portfolio",
    description: "Made with Next.js",
    images: [
      {
        url: "/junBanner.png",
        width: 1600,
        height: 400,
        alt: "Jun Nur's Portfolio Banner",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
