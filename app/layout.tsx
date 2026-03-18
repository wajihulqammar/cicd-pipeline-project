import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CI/CD Pipeline Dashboard",
  description:
    "A developer portfolio dashboard showcasing CI/CD pipelines, GitHub stats, and deployment activity.",
  keywords: ["CI/CD", "DevOps", "Docker", "GitHub Actions", "Railway"],
  authors: [{ name: "DevOps Engineer" }],
  openGraph: {
    title: "CI/CD Pipeline Dashboard",
    description: "Live CI/CD pipeline monitoring and deployment dashboard",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
