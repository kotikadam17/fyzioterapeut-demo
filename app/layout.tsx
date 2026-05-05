import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mgr. Petra Marková — Soukromá fyzioterapeutka Kolín",
  description:
    "Soukromá fyzioterapeutická praxe v Kolíně. Individuální přístup, max. 5 pacientů denně. Bolesti zad, sportovní fyzioterapie, terapie pro ženy.",
  openGraph: {
    title: "Mgr. Petra Marková — Soukromá fyzioterapeutka Kolín",
    description:
      "Soukromá fyzioterapeutická praxe v Kolíně. Individuální přístup, max. 5 pacientů denně.",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="cs" className={`${playfair.variable} ${jakarta.variable} h-full`} style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}>
        <body className="min-h-full antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
