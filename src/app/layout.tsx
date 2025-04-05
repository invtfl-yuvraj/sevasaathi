import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import AuthProvider from "./context/AuthProvider";

const inter = Inter({subsets : ["latin"]})

export const metadata: Metadata = {
  title:
    "Hire Local Workers Instantly – Electricians, Plumbers & More | Real-Time Booking & Tracking",
  description:
    "Find and hire skilled local workers like electricians, plumbers, and handymen in real-time. Check ratings, book instantly, track worker location, and make secure payments. Fast, reliable, and hassle-free hiring at your fingertips!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${inter.className}`}
        >
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
