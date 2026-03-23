import type { Metadata } from "next";
import { Cormorant, DM_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import GrainOverlay from "@/components/ui/GrainOverlay";
import MeshGradient from "@/components/ui/MeshGradient";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
      className={`${cormorant.variable} ${dmSans.variable} ${GeistMono.variable}`}
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
