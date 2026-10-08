import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elevate Commercial Construction | Workplace Fitout & Budget Calculator",
  description:
    "Precision commercial fitouts & workplace solutions in Metropolitan Melbourne. Calculate estimated fitout costs, spatial requirements, and lead times in under 60 seconds. ISO 9001, 14001 & 45001 certified registered builder.",
  keywords: [
    "commercial construction Melbourne",
    "office fitout",
    "workplace fitout cost calculator",
    "medical fitout",
    "retail fitout",
    "Elevate Commercial Construction",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Elevate Commercial Construction | Workplace Fitout & Budget Calculator",
    description:
      "Calculate estimated fitout costs, spatial requirements, and lead times in under 60 seconds.",
    siteName: "Elevate Commercial Construction",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white text-charcoal`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
