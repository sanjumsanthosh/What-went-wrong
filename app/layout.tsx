import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ResetButton from "@/components/ResetButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "What went wrong",
  description: "A simple page to show what went wrong",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ResetButton />
        {children}
      </body>
    </html>
  );
}
