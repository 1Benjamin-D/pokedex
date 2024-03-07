import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon List",
  description: "All Pokemon are there",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" bg-black text-white">
      <Suspense fallback={<Loading/>}>  
        <body className={inter.className}>
          {children}
        </body>
      </Suspense>
    </html>
  );
}
