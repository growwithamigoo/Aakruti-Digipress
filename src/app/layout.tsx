import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aakruti Digipress | Premium Wedding Album Printing Vijayawada",
  description: "Luxury photobook printing and binding in Vijayawada. Specializing in Telugu wedding albums, engagement books, and professional photo prints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-ivory text-brand-charcoal selection:bg-brand-gold/30 selection:text-brand-charcoal">
        {children}
      </body>
    </html>
  );
}
