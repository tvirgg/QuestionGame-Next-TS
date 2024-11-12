import localFont from "next/font/local";
import "./globals.css";

// Подключаем каждый вес и стиль, который вам нужен
const mulishRegular = localFont({
  src: "./fonts/Mulish-Regular.ttf",
  variable: "--font-mulish-regular",
});

const mulishLight = localFont({
  src: "./fonts/Mulish-Light.ttf",
  variable: "--font-mulish-light",
});

const mulishBold = localFont({
  src: "./fonts/Mulish-Bold.ttf",
  variable: "--font-mulish-bold",
});

const mulishSemiBold = localFont({
  src: "./fonts/Mulish-SemiBold.ttf",
  variable: "--font-mulish-semibold",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body
        className={`${mulishRegular.variable} ${mulishLight.variable} ${mulishBold.variable} ${mulishSemiBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
