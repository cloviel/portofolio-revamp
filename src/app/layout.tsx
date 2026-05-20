import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Nendy Rosiano (Clovie) — Portfolio",
  description: "Profesional multidisiplin dengan keahlian di Web3, analisis pasar, fotografi, dan penulisan.",
  authors: [{ name: "Nendy Rosiano" }],
  keywords: ["Nendy Rosiano", "Clovie", "Clov Valencied", "Web3 Developer", "Portfolio"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${instrument.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
