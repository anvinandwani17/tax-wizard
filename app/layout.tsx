import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tax Wizard",
  description: "Smart Tax Calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* ✅ Theme color */}
        <meta name="theme-color" content="#2563eb" />

        {/* ✅ Mobile support */}
        <meta name="application-name" content="Tax Wizard" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>

      <body className="bg-gray-50 min-h-screen text-gray-900">
        {children}
      </body>
    </html>
  );
}