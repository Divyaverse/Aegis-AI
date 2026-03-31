import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aegis.AI — Neuro-Behavioral Anti-Bot Defense",
  description:
    "Real-time detection of automated attacks on FinTech platforms using behavioral AI and Isolation Forest anomaly detection. Team Leviosa — HackUp 2026.",
  keywords: ["cybersecurity", "bot detection", "fintech", "AI", "behavioral analysis"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
