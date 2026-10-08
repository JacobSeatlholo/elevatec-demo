import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const archivo = localFont({
  src: [
    {
      path: "../../public/fonts/archivo-var.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/archivo-var-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-archivo",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elevatec.com.au"),
  title: "Elevate Commercial Construction | Workplace Fitout & Budget Calculator",
  description:
    "Commercial construction specialists working in Melbourne, Victoria. Calculate estimated fitout costs, spatial requirements and lead times in under 60 seconds. ISO 9001, ISO 14001 & ISO 45001 certified — registered commercial builder CCB-L 100313.",
  keywords: [
    "commercial construction Melbourne",
    "office fitout cost calculator",
    "workplace fitout Melbourne",
    "registered commercial builder Victoria",
    "fitout budget estimator",
    "Elevate Commercial Construction",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Elevate Commercial Construction | Workplace Fitout & Budget Calculator",
    description:
      "Calculate estimated fitout costs, spatial requirements and lead times in under 60 seconds. Servicing Metropolitan Melbourne and Regional Victoria.",
    siteName: "Elevate Commercial Construction",
    type: "website",
    images: [{ url: "/brand/hero-image.jpg", width: 2000, height: 1334 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <body
        className={`${archivo.variable} font-sans antialiased bg-white text-ink`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
