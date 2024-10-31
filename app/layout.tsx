import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/Mulish.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tablet",
  description: "Created by Gerus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
