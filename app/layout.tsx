import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import GrainOverlay from "@/components/ui/GrainOverlay";
import MeshGradient from "@/components/ui/MeshGradient";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
        <Nav />
        <main className="relative z-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
