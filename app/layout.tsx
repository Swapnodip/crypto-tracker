import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import CryptoContextProvider from "@/context/CryptoContext";

export const metadata: Metadata = {
  title: "Crypto Tracker",
  description: "Web app for tracking price of cryptocurrencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CryptoContextProvider>
        <body className="bg-[#1E2034]">
          <Header />
          {children}
        </body>
      </CryptoContextProvider>
    </html>
  );
}
