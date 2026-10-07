import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (latin subset) so dev and build never depend on reaching Google Fonts.
const sans = localFont({
  src: "./fonts/InstrumentSans-Variable.woff2",
  weight: "400 700",
  variable: "--font-sans",
});

const serif = localFont({
  src: [
    { path: "./fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Kayumba Omari · Ingénieur Full Stack web & mobile",
  description:
    "Kayumba Omari, ingénieur Full Stack web & mobile basé à Tunis. Je conçois et développe des produits numériques de bout en bout, pensés pour les réalités de l'Afrique francophone.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
