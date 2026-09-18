import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YZEV Tech",
  description:
    "Criamos softwares, automações e soluções digitais para pequenas e médias empresas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
