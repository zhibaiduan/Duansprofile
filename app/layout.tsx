import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import GrainOverlay from "@/components/ui/GrainOverlay";
import MeshGradient from "@/components/ui/MeshGradient";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
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
      className={`${playfairDisplay.variable} ${dmSans.variable} ${GeistMono.variable}`}
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
