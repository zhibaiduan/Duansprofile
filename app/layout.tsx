import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import GrainOverlay from "@/components/ui/GrainOverlay";
import MeshGradient from "@/components/ui/MeshGradient";

const dmSerifDisplay = localFont({
  src: "./fonts/DMSerifDisplay-Regular.ttf",
  variable: "--font-dm-serif-display",
  weight: "400",
  style: "normal",
  display: "swap",
});

const plusJakartaSans = localFont({
  src: [
    {
      path: "./fonts/PlusJakartaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PlusJakartaSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/PlusJakartaSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/PlusJakartaSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Duan",
  description: "Personal portfolio and writing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${GeistMono.variable}`}
    >
<body className="antialiased">
        <MeshGradient />
        <GrainOverlay />
        <main className="relative z-content">
          {children}
        </main>
      </body>
    </html>
  );
}
